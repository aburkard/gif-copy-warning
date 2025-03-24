// Add context menu item for GIF images
document.addEventListener('contextmenu', function(event) {
  const target = event.target;
  
  // Check if the target is an image and specifically a GIF
  if (target.tagName === 'IMG' && target.src.toLowerCase().endsWith('.gif')) {
    // Add data attribute to mark this as a GIF for later reference
    target.dataset.isGif = 'true';
  } else {
    // Remove the attribute for non-GIF elements
    delete target.dataset.isGif;
  }
});

// Create the background.js script to handle context menu functionality
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'copyImage') {
    // Handle the copy image action
    const img = document.querySelector('[data-is-gif="true"]');
    if (img) {
      if (confirm('Warning: You are about to copy a GIF image. Are you sure you want to continue?')) {
        // User confirmed, proceed with copying
        copyImageToClipboard(img);
      }
    }
  }
});

// Function to copy an image to clipboard
function copyImageToClipboard(imgElement) {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = imgElement.naturalWidth;
  canvas.height = imgElement.naturalHeight;
  
  // Draw the image onto the canvas
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgElement, 0, 0);
  
  // Convert canvas to blob and copy to clipboard
  canvas.toBlob(function(blob) {
    try {
      navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]).then(() => {
        console.log('Image copied to clipboard successfully');
      }).catch(err => {
        console.error('Failed to copy image: ', err);
      });
    } catch (err) {
      console.error('ClipboardItem is not supported in this browser', err);
    }
  });
}