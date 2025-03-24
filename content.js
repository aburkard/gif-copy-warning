// Simple GIF warning notification
document.addEventListener('contextmenu', function(event) {
  // Check if right-clicking on an image
  if (event.target.tagName === 'IMG') {
    const img = event.target;
    
    // Simple check if the image is a GIF
    if (img.src.toLowerCase().endsWith('.gif') || img.src.toLowerCase().includes('.gif')) {
      // Don't block the context menu, just show a notification
      showNotification('Warning: This is a GIF image');
    }
  }
});

// Create and show a simple non-blocking notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#ff9800',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    zIndex: '9999',
    maxWidth: '300px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'opacity 0.3s ease-in-out'
  });
  
  // Set the notification message
  notification.textContent = message;
  
  // Add to the page
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}