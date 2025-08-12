// Create Golden Stars
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    
    star.style.left = Math.random() * 100 + 'vw';
    
    const size = Math.random() * 10 + 8;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    
    const duration = Math.random() * 5 + 4;
    star.style.animationDuration = duration + 's';
    star.style.animationDelay = Math.random() * 3 + 's';
    
    document.getElementById('stars-container').appendChild(star);
    
    setTimeout(() => {
        star.remove();
        createStar();
    }, duration * 1000);
}

// Generate stars
for (let i = 0; i < 30; i++) createStar();
setInterval(createStar, 150);

// PWA Installation
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-block';
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                installBtn.textContent = 'ADDED!';
                installBtn.style.background = '#2ECC71';
            }
            deferredPrompt = null;
        });
    }
}

installBtn.addEventListener('click', installPWA);

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}