// Schedule a daily alarm on install
chrome.runtime.onInstalled.addListener(() => {
  // clear any existing
  chrome.alarms.clear("dailyBackup");
  // schedule first run one minute from now, then every 24h
  chrome.alarms.create("dailyBackup", { delayInMinutes: 1, periodInMinutes: 1440 });
});

// Backup handler
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name !== "dailyBackup") return;
  chrome.bookmarks.getTree(tree => {
    const timestamp = new Date().toISOString();
    chrome.storage.local.set({
      bookmarksBackup: tree,
      lastBackup: timestamp
    }, () => {
      console.log(`Bookmarks backed up at ${timestamp}`);
    });
  });
});
