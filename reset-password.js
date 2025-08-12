document.getElementById('resetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading screen
    document.getElementById('loadingScreen').classList.add('active');
    
    // Get email value
    const email = document.getElementById('email').value;
    
    // Simulate email sending (replace with actual API call)
    setTimeout(() => {
        // Hide loading screen
        document.getElementById('loadingScreen').classList.remove('active');
        
        if (email) {
            alert('Password reset link has been sent to your email!');
            // In a real app, you would redirect or show success message
        } else {
            alert('Please enter a valid email address');
        }
    }, 2000);
});

// Add more bubbles dynamically (7x more bubbles)
function createBubbles() {
    const bubblesContainer = document.querySelector('.floating-bubbles');
    const bubbleCount = 35; // 7 times more bubbles
    
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
        bubblesContainer.appendChild(bubble);
    }
}

// Create bubbles when page loads
window.addEventListener('load', createBubbles);