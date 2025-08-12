// Initialize star background when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    createStarBackground();
});

function createStarBackground() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Configure star properties
        configureStar(star);
        
        // Add twinkling effect randomly
        if (Math.random() > 0.7) {
            addTwinkleEffect(star);
        }
        
        starsContainer.appendChild(star);
    }
}

function configureStar(starElement) {
    const size = Math.random() * 2 + 1;
    const posX = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 20 + 10;
    
    starElement.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}vw;
        top: ${Math.random() * 20 - 10}vh;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        opacity: ${Math.random() * 0.7 + 0.1};
        background: var(--gold);
        border-radius: 50%;
        filter: drop-shadow(0 0 2px var(--gold));
        position: absolute;
        animation: fall linear infinite;
    `;
}

function addTwinkleEffect(starElement) {
    const currentDuration = starElement.style.animationDuration;
    starElement.style.animationName = 'fall, twinkle';
    starElement.style.animationDuration = `${currentDuration}, ${Math.random() * 3 + 1}s`;
}