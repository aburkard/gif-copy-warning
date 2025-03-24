// Simple GIF warning notification
document.addEventListener('contextmenu', function(event) {
  // Check if right-clicking on an image
  if (event.target.tagName === 'IMG') {
    const img = event.target;
    
    // Check if the image is a GIF
    if (img.src.toLowerCase().endsWith('.gif') || img.src.toLowerCase().includes('.gif')) {
      showWarningNotification('Warning: This is a GIF image!');
    }
  }
});

// Create and show an attention-grabbing notification
function showWarningNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  
  // Style the notification - more attention-grabbing
  Object.assign(notification.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f44336',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    zIndex: '999999',
    maxWidth: '400px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    animation: 'notification-pulse 1s infinite',
    border: '3px solid white'
  });
  
  // Add keyframe animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes notification-pulse {
      0% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.05); }
      100% { transform: translate(-50%, -50%) scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  // Set the notification message
  notification.textContent = message;
  
  // Add to the page
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
      document.body.removeChild(notification);
      document.head.removeChild(style);
    }, 500);
  }, 3000);
}