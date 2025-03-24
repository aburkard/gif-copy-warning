// Create context menu item for GIF images
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copyGif',
    title: 'Copy GIF image',
    contexts: ['image'],
    documentUrlPatterns: ['<all_urls>']
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'copyGif') {
    // Send message to content script to handle the copy operation with warning
    chrome.tabs.sendMessage(tab.id, {
      action: 'copyImage',
      srcUrl: info.srcUrl
    });
  }
});