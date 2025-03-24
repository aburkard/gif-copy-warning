// Initialize default settings
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['reallyAnnoyingMode'], (result) => {
    if (result.reallyAnnoyingMode === undefined) {
      chrome.storage.sync.set({ reallyAnnoyingMode: false });
    }
  });
});

// Handle messages from popup and content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSettings') {
    chrome.storage.sync.get(['reallyAnnoyingMode'], (result) => {
      sendResponse(result);
    });
    return true; // Keep the channel open for the async response
  } else if (message.action === 'saveSettings') {
    chrome.storage.sync.set({ reallyAnnoyingMode: message.reallyAnnoyingMode }, () => {
      sendResponse({ success: true });
    });
    return true; // Keep the channel open for the async response
  }
});