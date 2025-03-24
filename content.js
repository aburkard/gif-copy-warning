// Simple GIF warning notification with Really Annoying Mode
let reallyAnnoyingMode = false; // Default value until settings are loaded

// Load settings when extension starts
loadSettings();

// Function to load settings from storage
function loadSettings() {
  chrome.runtime.sendMessage({ action: 'getSettings' }, function(response) {
    reallyAnnoyingMode = response.reallyAnnoyingMode;
    console.log('[GIF-Copy-Warning] Really Annoying Mode:', reallyAnnoyingMode ? 'ENABLED 🤪' : 'disabled 😴');
  });
}

// Listen for settings changes
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'settingsUpdated') {
    loadSettings();
  }
  return true;
});

// Check for GIFs on right-click
document.addEventListener('contextmenu', function(event) {
  // Check if right-clicking on an image
  if (event.target.tagName === 'IMG') {
    const img = event.target;
    
    // Check if the image is a GIF
    if (img.src.toLowerCase().endsWith('.gif') || img.src.toLowerCase().includes('.gif')) {
      showWarningNotification('WARNING: THIS IS A GIF IMAGE!', reallyAnnoyingMode);
    }
  }
});

// Create and show a notification with optional REALLY annoying mode
function showWarningNotification(message, reallyAnnoying = false, duration = 3000) {
  // Create notification element
  const notification = document.createElement('div');
  
  // Common styles
  const commonStyles = {
    position: 'fixed',
    backgroundColor: '#f44336',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    zIndex: '999999',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    textAlign: 'center',
  };
  
  // Apply appropriate styles based on mode
  if (reallyAnnoying) {
    // REALLY ANNOYING STYLES
    Object.assign(notification.style, commonStyles, {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '36px',
      animation: 'crazyAnimation 0.5s infinite',
      border: '8px dashed yellow',
      textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000',
      background: 'linear-gradient(45deg, #f44336, #ff9800, #ffeb3b, #4caf50, #2196f3, #9c27b0)',
      backgroundSize: '400% 400%',
      boxShadow: '0 0 20px 10px rgba(255,255,255,0.8)',
      padding: '30px',
      maxWidth: '80%'
    });
    
    // Create absolutely wild CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes crazyAnimation {
        0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); filter: hue-rotate(0deg); }
        25% { transform: translate(-50%, -50%) rotate(5deg) scale(1.1); filter: hue-rotate(90deg); }
        50% { transform: translate(-50%, -50%) rotate(0deg) scale(1); filter: hue-rotate(180deg); }
        75% { transform: translate(-50%, -50%) rotate(-5deg) scale(1.1); filter: hue-rotate(270deg); }
        100% { transform: translate(-50%, -50%) rotate(0deg) scale(1); filter: hue-rotate(360deg); }
      }
      
      @keyframes backgroundAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes textShadowAnimation {
        0% { text-shadow: 2px 2px 0 red; }
        25% { text-shadow: 2px -2px 0 blue; }
        50% { text-shadow: -2px -2px 0 green; }
        75% { text-shadow: -2px 2px 0 yellow; }
        100% { text-shadow: 2px 2px 0 red; }
      }
      
      .notification-animated {
        animation: crazyAnimation 0.5s infinite, backgroundAnimation 5s infinite !important;
      }
      
      .text-animated {
        animation: textShadowAnimation 1s infinite;
      }
      
      .warning-text {
        display: inline-block;
        font-size: 150%;
      }
      
      @keyframes letterDance {
        0% { transform: translateY(0) rotate(0); }
        25% { transform: translateY(-5px) rotate(5deg); }
        50% { transform: translateY(0) rotate(0); }
        75% { transform: translateY(5px) rotate(-5deg); }
        100% { transform: translateY(0) rotate(0); }
      }
    `;
    
    document.head.appendChild(style);
    notification.classList.add('notification-animated');
    
    // Create rainbow dancing text
    notification.innerHTML = '';
    const letters = message.split('');
    letters.forEach((letter, i) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.display = 'inline-block';
      span.style.animation = `letterDance 0.3s infinite ${i * 0.05}s`;
      span.style.color = `hsl(${i * (360 / letters.length)}, 100%, 70%)`;
      span.style.fontSize = `${Math.max(100, 100 + Math.sin(i) * 50)}%`;
      span.style.textShadow = '2px 2px 0 #000';
      notification.appendChild(span);
    });
    
    // Add additional madness - emoji rain
    const emojiContainer = document.createElement('div');
    emojiContainer.style.position = 'fixed';
    emojiContainer.style.top = '0';
    emojiContainer.style.left = '0';
    emojiContainer.style.width = '100%';
    emojiContainer.style.height = '100%';
    emojiContainer.style.pointerEvents = 'none';
    emojiContainer.style.zIndex = '999998';
    document.body.appendChild(emojiContainer);
    
    // Generate falling emojis
    const emojis = ['🤪', '⚠️', '🔥', '🎯', '🎮', '🎥', '🚫', '⛔', '🗡️', '💣'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const emoji = document.createElement('div');
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.textContent = randomEmoji;
        emoji.style.position = 'absolute';
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = '-50px';
        emoji.style.fontSize = `${Math.random() * 30 + 20}px`;
        emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
        emoji.style.opacity = `${Math.random() * 0.5 + 0.5}`;
        emoji.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        emojiContainer.appendChild(emoji);
        
        setTimeout(() => {
          if (emojiContainer.contains(emoji)) {
            emojiContainer.removeChild(emoji);
          }
        }, 5000);
      }, i * 100);
    }
    
    // Add falling animation
    const fallStyle = document.createElement('style');
    fallStyle.textContent = `
      @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(${window.innerHeight + 100}px) rotate(720deg); }
      }
    `;
    document.head.appendChild(fallStyle);
    
    // Make the screen briefly flash
    const flashElement = document.createElement('div');
    flashElement.style.position = 'fixed';
    flashElement.style.top = '0';
    flashElement.style.left = '0';
    flashElement.style.width = '100%';
    flashElement.style.height = '100%';
    flashElement.style.backgroundColor = 'white';
    flashElement.style.opacity = '0.7';
    flashElement.style.zIndex = '999997';
    flashElement.style.pointerEvents = 'none';
    document.body.appendChild(flashElement);
    
    setTimeout(() => {
      if (document.body.contains(flashElement)) {
        document.body.removeChild(flashElement);
      }
    }, 100);
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'MAKE IT STOP!';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = 'yellow';
    closeButton.style.color = 'red';
    closeButton.style.border = '3px solid red';
    closeButton.style.borderRadius = '5px';
    closeButton.style.fontSize = '20px';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.cursor = 'pointer';
    closeButton.style.animation = 'crazyAnimation 1s infinite';
    
    closeButton.addEventListener('click', () => {
      if (document.body.contains(notification)) document.body.removeChild(notification);
      if (document.body.contains(emojiContainer)) document.body.removeChild(emojiContainer);
      if (document.head.contains(style)) document.head.removeChild(style);
      if (document.head.contains(fallStyle)) document.head.removeChild(fallStyle);
    });
    
    notification.appendChild(document.createElement('br'));
    notification.appendChild(closeButton);
    
    // Schedule cleanup
    setTimeout(() => {
      try {
        if (document.body.contains(notification)) document.body.removeChild(notification);
        if (document.body.contains(emojiContainer)) document.body.removeChild(emojiContainer);
        if (document.head.contains(style)) document.head.removeChild(style);
        if (document.head.contains(fallStyle)) document.head.removeChild(fallStyle);
      } catch(e) {
        // Elements may already be removed
      }
    }, duration * 2); // Double duration for annoying mode
    
  } else {
    // NORMAL MODE STYLES
    Object.assign(notification.style, commonStyles, {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '18px',
      animation: 'notification-pulse 1s infinite',
      border: '3px solid white',
      maxWidth: '400px'
    });
    
    // Add normal animation
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
    
    // Schedule cleanup
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s ease-in-out';
      setTimeout(() => {
        if (document.body.contains(notification)) document.body.removeChild(notification);
        if (document.head.contains(style)) document.head.removeChild(style);
      }, 500);
    }, duration);
  }
  
  // Add to the page
  document.body.appendChild(notification);
}