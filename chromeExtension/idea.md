## ✅ Objective

Create a Chrome extension that:

- Detects when new bookmarks are added
    
- Converts the bookmark tree into an `.html` file (standard Chrome export format)
    
- Uploads the file to a GitLab repository automatically
    
- Prompts the user **once** for GitLab credentials
    

---

## 🔧 PART 1: Prerequisites & Setup

### ✅ Tools & Technologies Needed

|Item|Purpose|
|---|---|
|**Chrome Extension (MV3)**|Core application that monitors bookmarks|
|**GitLab Personal Access Token (PAT)**|Authenticate to GitLab via REST API|
|**GitLab repository**|Stores uploaded `.html` files (backups)|
|**JavaScript (ES6 Modules)**|Logic, API calls, DOM interaction|
|**chrome.storage.local**|Store credentials securely in browser|
|**chrome.bookmarks API**|Read bookmarks & detect changes|
|**chrome.runtime APIs**|Open options page, handle events|
|**GitLab REST API**|Upload backup `.html` files|

---

## ⚙️ PART 2: How the Integration Works (Technical Flow)

---

### 🔹 1. Manifest Configuration

- `manifest.json` declares:
    
    - Permissions: `bookmarks`, `storage`, `downloads`, host permissions for `https://gitlab.com/*`
        
    - Background service worker (`background.js`)
        
    - `options_page` for credential setup
        

---

### 🔹 2. First-Time Credential Setup (`options.html`, `options.js`)

- When the user adds a bookmark and no credentials are found in `chrome.storage.local`:
    
    - Extension opens `options.html`
        
    - User is prompted to enter:
        
        - **GitLab Personal Access Token**
            
        - **Project ID** (or path)
            
        - **Branch** (e.g., `main`)
            
    - These values are saved using:
        
        js
        
        CopyEdit
        
        `chrome.storage.local.set({ gitlabToken, projectId, branch });`
        

---

### 🔹 3. Listening for Bookmark Additions (`background.js`)

- Uses `chrome.bookmarks.onCreated.addListener()` to detect any newly added bookmark.
    
- When triggered:
    
    - Fetches credentials from `chrome.storage.local`
        
    - If missing → opens `options.html`
        
    - If present → continues to backup
        

---

### 🔹 4. Creating the Bookmark Backup File (`utils.js`)

- Calls `chrome.bookmarks.getTree()` to get the full bookmarks hierarchy.
    
- Converts the tree into `.html` using the **Netscape Bookmark File Format** (same as Chrome exports):
    
    html
    
    CopyEdit
    
    `<DL><p>   <DT><A HREF="https://...">Bookmark Title</A>   ... </DL><p>`
    
- Generates a filename like:
    
    CopyEdit
    
    `bookmarks-2025-07-04.html`
    

---

### 🔹 5. Uploading to GitLab (`utils.js`)

- Sends the HTML content to GitLab using the REST API:
    
    - **Endpoint**:  
        `POST/PUT https://gitlab.com/api/v4/projects/:projectId/repository/files/:file_path`
        
    - **Headers**:
        
        - `PRIVATE-TOKEN: <personal_access_token>`
            
        - `Content-Type: application/json`
            
    - **Payload**:
        
        json
        
        CopyEdit
        
        `{   "branch": "main",   "content": "<html export>",   "commit_message": "Add bookmarks-YYYY-MM-DD.html" }`
        
- Logic:
    
    - First checks if file exists (using `GET .../files/file_path?ref=branch`)
        
    - If file exists → `PUT` (update)
        
    - If not → `POST` (create)
        

---

## 🧠 PART 3: What’s Stored and Where

|Data|Storage Method|Persistence|
|---|---|---|
|GitLab Token, Project ID, Branch|`chrome.storage.local`|Persistent across sessions|
|Bookmarks tree|Fetched fresh from browser|Not stored in extension|
|Backup `.html` file|Uploaded to GitLab|Appears in repo folder|

---

## 🔁 Flow Summary (Point-Wise)

1. ✅ **Install extension**
    
2. 🔐 **User enters GitLab credentials** on first bookmark add
    
3. 🔖 **User adds a bookmark**
    
4. 📚 Extension detects via `chrome.bookmarks.onCreated`
    
5. 📂 Extension gets full bookmark tree using `chrome.bookmarks.getTree()`
    
6. 📝 Converts tree to `.html` (Netscape format)
    
7. 🛰 Sends it to GitLab repo using REST API with:
    
    - Token
        
    - Project ID
        
    - Branch
        
8. 🔁 Repeats automatically on every bookmark addition
    
9. 💾 Credentials are reused silently unless reset
    

---

## ✅ Things You Must Have Ready

|Item|Mandatory|How to Get It|
|---|---|---|
|**GitLab Account**|✅|[https://gitlab.com](https://gitlab.com)|
|**Personal Access Token (PAT)**|✅|GitLab → Profile → Access Tokens|
|**Private Repo** for backups|✅|Create via GitLab dashboard|
|**Chrome Developer Mode Enabled**|✅|`chrome://extensions` → Enable Dev Mode|

---

## 🔐 Security Notes

- The token is stored in `chrome.storage.local`, **not hardcoded**, and is only sent over HTTPS to GitLab.
    
- Never publish your extension with a token inside the code.
    
- You can add a **"Log out" or "Reset GitLab Config"** button to clear saved credentials.
    

---

## 🔄 Optional Improvements

|Feature|Benefit|
|---|---|
|`chrome.alarms` for daily backup|Backup even without user interaction|
|Gist support (instead of full repo)|Lightweight backups|
|Restore from GitLab|One-click import/restore|
|Export as JSON too|Dev-friendly backups|

---

Let me know if you'd like:

- ✅ A ZIP of this extension
    
- 📦 A version with restore/import
    
- 🔁 Daily backups (instead of per-bookmark)