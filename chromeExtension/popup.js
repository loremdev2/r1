// --- bookmark list rendering (as before) ---
function createList(nodes) {
  const ul = document.createElement('ul');
  for (const node of nodes) {
    const li = document.createElement('li');
    if (node.url) {
      const a = document.createElement('a');
      a.href = node.url;
      a.textContent = node.title || node.url;
      a.target = '_blank';
      li.appendChild(a);
    } else {
      const span = document.createElement('span');
      span.textContent = node.title || '📁 Folder';
      span.style.fontWeight = 'bold';
      li.appendChild(span);
    }
    if (node.children) {
      li.appendChild(createList(node.children));
    }
    ul.appendChild(li);
  }
  return ul;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('bookmark-container');
  chrome.bookmarks.getTree(tree => {
    container.textContent = '';
    container.appendChild(createList(tree));
  });

  const status = document.getElementById('status');
  
  // --- Export ---
  document.getElementById('export-btn').addEventListener('click', () => {
    // get the latest backup if any, else fetch fresh
    chrome.storage.local.get(['bookmarksBackup'], data => {
      const tree = data.bookmarksBackup;
      if (!tree) {
        status.textContent = 'No backup found. Please wait for first daily backup.';
        return;
      }
      const blob = new Blob([JSON.stringify(tree, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      chrome.downloads.download({
        url,
        filename: `bookmarks-backup-${new Date().toISOString().slice(0,10)}.json`,
        saveAs: true
      });
      status.textContent = 'Export started…';
    });
  });

  // --- Import ---
  const importFile = document.getElementById('import-file');
  document.getElementById('import-btn').addEventListener('click', () => {
    importFile.click();
  });
  importFile.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let nodes;
      try {
        nodes = JSON.parse(reader.result);
      } catch (err) {
        status.style.color = 'red';
        status.textContent = 'Invalid JSON.';
        return;
      }
      // create a top-level folder for imports
      chrome.bookmarks.create({ title: 'Imported Bookmarks' }, folder => {
        function recurse(list, parentId) {
          for (const n of list) {
            if (n.url) {
              chrome.bookmarks.create({ parentId, title: n.title, url: n.url });
            } else {
              chrome.bookmarks.create({ parentId, title: n.title }, newFolder => {
                if (n.children) recurse(n.children, newFolder.id);
              });
            }
          }
        }
        recurse(nodes, folder.id);
        status.style.color = 'green';
        status.textContent = 'Import complete!';
      });
    };
    reader.readAsText(file);
  });
});
