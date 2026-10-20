# VibeVault

> **Save the vibe. Remember why.**

VibeVault is a minimalist, local-first Chrome extension for visual context bookmarking. It helps you save interesting webpages and highlighted text alongside the personal notes, quotes, and ideas that made them worth keeping.

Instead of collecting links you might never revisit, VibeVault helps you remember **what caught your attention and why it mattered to you**.

##  Features

- **Quick Capture Popup** — Save the current webpage's title and URL, add tags, and record why you want to keep it.
- **Right-Click Text Saver** — Highlight text on any webpage and save it instantly as a note using the context menu.
- **Full-Tab Dashboard** — Browse, search, and filter your saved references in a dedicated dark-mode workspace.
- **Collections & Tags** — Organise saved references into categories such as Design, Dev, Articles, Music, and General, with support for dynamic tags.
- **Local-First Privacy** — Store your library locally using `chrome.storage.local`, without accounts, external servers, or tracking.

##  Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Popup and dashboard structure |
| CSS3 | Responsive layouts and dark-mode styling |
| JavaScript (ES6+) | Capture logic, search, filtering, and interactions |
| Chrome Extension Manifest V3 | Extension configuration and permissions |
| Chrome Storage API | Local data persistence |
| Chrome Tabs API | Access current tab information |
| Chrome Context Menus API | Save highlighted text from the right-click menu |

**Dependencies:** None. VibeVault uses native browser APIs without requiring npm or a build process.

##  Project Structure

```text
vibevault/
├── manifest.json
├── background/
│   └── service-worker.js
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
└── dashboard/
    ├── dashboard.html
    ├── dashboard.css
    └── dashboard.js
```

| File or Directory | Description |
|---|---|
| `manifest.json` | Defines the extension configuration, permissions, and entry points |
| `background/service-worker.js` | Handles the right-click context menu and related events |
| `popup/` | Contains the quick-capture interface and page-saving logic |
| `dashboard/` | Contains the saved-reference library, search, and filtering interface |

##  Installation

VibeVault can be installed locally through Chrome's Developer Mode. No build tools or package installation are required.

1. **Download or clone the repository.**

   ```bash
   git clone <your-repository-url>
   ```

   Alternatively, download the repository as a ZIP file and extract it.

2. **Open Chrome Extensions.**

   Navigate to:

   ```text
   chrome://extensions/
   ```

3. **Enable Developer Mode.**

   Turn on the **Developer mode** toggle in the top-right corner.

4. **Load the extension.**

   Click **Load unpacked** and select the `vibevault/` root directory containing `manifest.json`.

5. **Pin VibeVault.**

   Open Chrome's Extensions menu and pin VibeVault to your toolbar for convenient access.

##  How to Use

### 1. Save a Webpage

1. Open the webpage you want to keep.
2. Click the VibeVault icon in your Chrome toolbar.
3. Add your personal context note and any relevant tags.
4. Click **Save Reference**.

### 2. Save Highlighted Text

1. Highlight a quote, paragraph, or useful piece of information on a webpage.
2. Right-click the selected text.
3. Choose **Save highlighted text to VibeVault note**.

### 3. Manage Your Library

1. Open the extension popup.
2. Click **Dashboard →** to open the full-tab workspace.
3. Search, filter, and browse your saved references to revisit ideas and information.

##  Privacy & Data Storage

VibeVault is designed around a local-first approach.

- **Local storage:** Saved data is stored using Chrome's `chrome.storage.local` API.
- **No accounts:** No registration or sign-in is required.
- **No backend:** The extension does not require a remote server.
- **No tracking:** No analytics or tracking services are required.

Your saved library is stored in the browser's local extension storage. Removing the extension or clearing its stored data may result in losing your saved references, so export or back up your data if a backup feature is available.

##  Future Improvements

Potential enhancements include:

- Automatic colour palette extraction from saved references.
- Advanced search across notes, tags, and saved content.
- Export and import for personal backups.
- Optional cloud synchronisation across devices.
- Shareable collections for collaborative inspiration boards.

##  Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request describing the improvement.

For larger changes, consider opening an issue first to discuss the proposed feature.

##  License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

*VibeVault — Keep the reference. Keep the reason.*
