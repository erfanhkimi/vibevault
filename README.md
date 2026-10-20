VibeVault
Save the vibe. Remember why.

VibeVault is a minimalist, local-first Chrome extension for visual context bookmarking. Instead of saving dead links, it lets you capture web references alongside the exact personal notes, quotes, or inspiration behind them.

Features
Quick Capture Popup: Click the extension toolbar icon to grab page titles, URLs, tags, and context notes.

Right-Click Text Saver: Highlight any text on a webpage, right-click, and instantly save it as a note.

Full-Tab Dashboard: View, search, and filter your saved library in a clean, dark-mode workspace (dashboard.html).

Collections & Tags: Group items into categories (Design, Dev, Articles, Music, General) or dynamic tags.

100% Private & Local: Runs entirely on chrome.storage.local. No accounts, servers, or tracking.

Installation Guide (Local / Developer Mode)
Since VibeVault runs natively in Chrome without build steps or npm setup, you can load it in under a minute:

Download or Clone the Project
Download the source files into a folder named vibevault on your computer.

Open Chrome Extensions Manager
Open Google Chrome and navigate to:

Plaintext
chrome://extensions/
Enable Developer Mode
Toggle the Developer mode switch in the top-right corner of the extensions page.

Load Unpacked Extension

Click Load unpacked in the top-left menu.

Select your vibevault root directory (the folder containing manifest.json).

Pin VibeVault
Click Chrome's puzzle piece icon (Extensions) in your browser toolbar and pin VibeVault for quick access.

How to Use
Save a Page: Click the VibeVault icon in your toolbar on any active tab, type why you saved it, and hit Save Reference.

Save Highlighted Text: Select any text on a website, right-click, and select Save highlighted text to VibeVault note.

Open Your Vault: Click Dashboard → inside the popup (or bookmark chrome-extension://<your-extension-id>/dashboard/dashboard.html).

Project File Structure
Plaintext
vibevault/
├── manifest.json               # Extension configuration
├── background/
│   └── service-worker.js       # Right-click context menu handler
├── popup/
│   ├── popup.html              # Extension capture interface
│   ├── popup.css               # Dark mode styles
│   └── popup.js                # Page scraper & storage logic
└── dashboard/
    ├── dashboard.html          # Workspace library view
    ├── dashboard.css           # Workspace grid styles
    └── dashboard.js            # Real-time search & tag filtering
Tech Stack
Manifest Version: Chrome Extension V3

Frontend: Plain HTML5, Modern CSS, ES6+ JavaScript

Chrome APIs: chrome.storage.local, chrome.tabs, chrome.contextMenus

Dependencies: None

License
MIT License. Free for personal and commercial use.
