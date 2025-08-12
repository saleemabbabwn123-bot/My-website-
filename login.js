document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Show loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('active');

    // Simulate 2-second authentication delay
    setTimeout(() => {
        // Hide loading
        loadingScreen.classList.remove('active');

        // Check if credentials are correct (replace with real logic if needed)
        if (username === "admin" && password === "1234") {
            // Show success notification
            showNotification("Login successful! Redirecting...", true);

            // Redirect after short delay
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);
        } else {
            // Show error notification
            showNotification("Invalid username or password. Please try again.", false);
        }
    }, 2000);
});

// Notification function
function showNotification(message, success) {
    let notification = document.createElement('div');
    notification.className = 'notification show';
    notification.innerHTML = `
        <i class="fas ${success ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    notification.style.background = success ? 'rgba(20, 60, 20, 0.9)' : 'rgba(60, 20, 20, 0.9)';
    notification.style.color = success ? '#4CAF50' : '#F44336';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('show');
        notification.remove();
    }, 3000);
}

// Floating bubbles effect (same as before)
function createBubbles() {
    const bubblesContainer = document.querySelector('.floating-bubbles');
    const bubbleCount = 35;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.style.position = 'absolute';
        bubble.style.bottom = '-100px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.width = Math.random() * 30 + 10 + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.backgroundColor = `rgba(212, 175, 55, ${Math.random() * 0.15 + 0.05})`;
        bubble.style.borderRadius = '50%';
        bubble.style.animation = `bubble ${Math.random() * 15 + 10}s linear infinite`;
        bubble.style.animationDelay = Math.random() * 5 + 's';
        document.querySelector('.floating-bubbles').appendChild(bubble);
    }
}

window.addEventListener('load', createBubbles);