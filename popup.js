// Load settings when popup opens
document.addEventListener('DOMContentLoaded', function() {
  // Get references to UI elements
  const reallyAnnoyingModeToggle = document.getElementById('reallyAnnoyingMode');
  const emojiElement = document.getElementById('emoji');
  const warningElement = document.getElementById('warning');
  
  // Load current settings
  chrome.runtime.sendMessage({ action: 'getSettings' }, function(response) {
    // Set toggle based on stored setting
    reallyAnnoyingModeToggle.checked = response.reallyAnnoyingMode;
    
    // Update UI to match setting
    updateUI(response.reallyAnnoyingMode);
  });
  
  // Add event listener for the toggle
  reallyAnnoyingModeToggle.addEventListener('change', function() {
    const isEnabled = this.checked;
    
    // Save the new setting
    chrome.runtime.sendMessage({ 
      action: 'saveSettings', 
      reallyAnnoyingMode: isEnabled 
    }, function(response) {
      if (response.success) {
        // Update UI to match new setting
        updateUI(isEnabled);
      }
    });
  });
  
  // Function to update UI based on setting
  function updateUI(isEnabled) {
    // Update emoji
    emojiElement.textContent = isEnabled ? '🤪' : '😴';
    
    // Show/hide warning
    warningElement.style.display = isEnabled ? 'block' : 'none';
    
    // Add animation to emoji if enabled
    if (isEnabled) {
      emojiElement.style.animation = 'pulse 0.5s infinite';
    } else {
      emojiElement.style.animation = 'none';
    }
  }
});