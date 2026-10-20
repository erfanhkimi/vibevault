// Setup context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "vibevault-quick-save",
    title: "Save highlighted text to VibeVault note",
    contexts: ["selection"]
  });
});

// Handle right-click text selection saves
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "vibevault-quick-save") {
    const selectedText = info.selectionText ? info.selectionText.trim() : "";
    const newItem = {
      id: Date.now().toString(),
      title: tab.title || "Untitled Page",
      url: tab.url,
      note: `"${selectedText}"`,
      collection: "Quick Notes",
      tags: ["quick-highlight"],
      dateAdded: new Date().toISOString(),
      pinned: false
    };

    chrome.storage.local.get(["vibes"], (result) => {
      const currentVibes = result.vibes || [];
      const updated = [newItem, ...currentVibes];
      chrome.storage.local.set({ vibes: updated });
    });
  }
});