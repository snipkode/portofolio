  // Chat Widget Toggle
  const chatButton = document.getElementById('chatButton');
  const chatWidget = document.getElementById('chatWidget');
  let isOpen = false;

  chatButton.addEventListener('click', () => {
      isOpen = !isOpen;
      chatWidget.classList.toggle('active', isOpen);
  });

  // Close chat when clicking outside
  document.addEventListener('click', (event) => {
      if (!chatWidget.contains(event.target) && !chatButton.contains(event.target) && isOpen) {
          isOpen = false;
          chatWidget.classList.remove('active');
      }
  });

  // Send message functionality
  const chatInput = document.querySelector('.chat-input');
  const sendButton = document.querySelector('.chat-send');
  const chatBody = document.querySelector('.chat-body');

  function sendMessage() {
      const message = chatInput.value.trim();
      if (message) {
          // Create and append new message
          const messageDiv = document.createElement('div');
          messageDiv.className = 'chat-bubble right';
          messageDiv.textContent = message;
          chatBody.appendChild(messageDiv);

          // Clear input
          chatInput.value = '';

          // Scroll to bottom
          chatBody.scrollTop = chatBody.scrollHeight;

          // Simulate response after 1 second
          setTimeout(() => {
              const responseDiv = document.createElement('div');
              responseDiv.className = 'chat-bubble';
              responseDiv.textContent = 'Terima kasih atas pesannya. Saya akan segera menghubungi Anda melalui WhatsApp.';
              chatBody.appendChild(responseDiv);
              chatBody.scrollTop = chatBody.scrollHeight;
          }, 1000);
      }
  }

  sendButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });


  // Fungsi membuka pop-up
  function openPopup(url) {
      const popup = document.getElementById("popup");
      const iframe = document.getElementById("popup-iframe");

      iframe.src = url;
      popup.style.display = "flex";
  }

  // Fungsi menutup pop-up
  function closePopup() {
      const popup = document.getElementById("popup");
      const iframe = document.getElementById("popup-iframe");

      popup.style.display = "none";
      iframe.src = ""; // Hentikan iframe
  }

// Fungsi toggle fullscreen
function toggleFullscreen() {
    const iframe = document.getElementById("popup-iframe");

    // Check if iframe supports fullscreen
    if (iframe.requestFullscreen) {
        // Request fullscreen for iframe
        if (!document.fullscreenElement) {
            iframe.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
}

// Add event listener to the fullscreen button
const fullscreenButton = document.getElementById("fullscreenButton");
fullscreenButton.addEventListener("click", toggleFullscreen);


  const trainingCards = document.querySelectorAll('.training-card');
  const countTraining = document.getElementById("count-training");
        countTraining.textContent = trainingCards.length;
