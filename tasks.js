// Store completed tasks in localStorage
const TASKS_KEY = 'completedTasks';
const LAST_RESET_KEY = 'lastResetTime';

document.addEventListener('DOMContentLoaded', function() {
    checkForDailyReset();
    createStars();
    updateTaskCounter();
    setupSocialTasks();
    setupNoteTasks();
    setupUploadHandlers();
    setupFlipCoinGame();
    
    document.getElementById('dashboard-btn').addEventListener('click', function() {
        document.getElementById('loading-overlay').style.display = 'flex';
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    });
    
    // Load completed tasks from localStorage
    loadCompletedTasks();
});

function checkForDailyReset() {
    const now = new Date();
    const lastReset = localStorage.getItem(LAST_RESET_KEY);
    
    const usaMidnight = new Date();
    usaMidnight.setHours(24, 0, 0, 0);
    const offset = usaMidnight.getTimezoneOffset() / 60;
    usaMidnight.setHours(usaMidnight.getHours() + (offset + 5));
    
    if (!lastReset || now >= new Date(lastReset)) {
        localStorage.removeItem(TASKS_KEY);
        localStorage.setItem(LAST_RESET_KEY, usaMidnight.toISOString());
        window.location.reload();
    } else {
        loadCompletedTasks();
    }
}

function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3;
        const delay = Math.random() * 5;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        
        container.appendChild(star);
    }
}

function updateTaskCounter() {
    const allTasks = document.querySelectorAll('.task');
    const completedTasks = document.querySelectorAll('.task.completed');
    
    document.getElementById('completed-count').textContent = completedTasks.length;
    document.getElementById('total-count').textContent = allTasks.length;
    
    const progress = (completedTasks.length / allTasks.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    
    if (completedTasks.length === allTasks.length) {
        document.getElementById('dashboard-btn').disabled = false;
        document.getElementById('dashboard-btn').classList.add('green-btn');
        document.getElementById('completion-message').style.display = 'block';
        celebrate();
    } else {
        document.getElementById('dashboard-btn').disabled = true;
        document.getElementById('dashboard-btn').classList.remove('green-btn');
        document.getElementById('completion-message').style.display = 'none';
    }
}

function setupSocialTasks() {
    document.getElementById('whatsapp-btn').addEventListener('click', function() {
        window.open('https://wa.me/?text=Check%20out%20this%20awesome%20status%20from%20CryptoX');
        document.getElementById('whatsapp-upload').style.display = 'block';
        this.disabled = true;
        this.textContent = 'Waiting for screenshot...';
    });
    
    document.getElementById('facebook-btn').addEventListener('click', function() {
        window.open('https://www.facebook.com/stories/create');
        document.getElementById('facebook-upload').style.display = 'block';
        this.disabled = true;
        this.textContent = 'Waiting for screenshot...';
    });
    
    document.getElementById('youtube-btn').addEventListener('click', function() {
        window.open('https://www.youtube.com/share');
        document.getElementById('youtube-upload').style.display = 'block';
        this.disabled = true;
        this.textContent = 'Waiting for screenshot...';
    });
    
    document.getElementById('tiktok-btn').addEventListener('click', function() {
        window.open('https://www.tiktok.com/share');
        document.getElementById('tiktok-upload').style.display = 'block';
        this.disabled = true;
        this.textContent = 'Waiting for screenshot...';
    });
}

function setupNoteTasks() {
    const bitcoinBtn = document.getElementById('bitcoin-btn');
    bitcoinBtn.addEventListener('click', function() {
        if (!this.classList.contains('activated')) {
            this.textContent = 'Activated';
            this.classList.add('activated');
            startMining('bitcoin', () => {
                completeTask(document.getElementById('bitcoin-task'));
            });
        }
    });
    
    const ethereumBtn = document.getElementById('ethereum-btn');
    ethereumBtn.addEventListener('click', function() {
        if (!this.classList.contains('activated')) {
            this.textContent = 'Activated';
            this.classList.add('activated');
            startMining('ethereum', () => {
                completeTask(document.getElementById('ethereum-task'));
            });
        }
    });
    
    const bnbBtn = document.getElementById('bnb-btn');
    bnbBtn.addEventListener('click', function() {
        if (!this.classList.contains('activated')) {
            this.textContent = 'Activated';
            this.classList.add('activated');
            startMining('bnb', () => {
                completeTask(document.getElementById('bnb-task'));
            });
        }
    });
}

function setupUploadHandlers() {
    // WhatsApp upload
    document.getElementById('whatsapp-upload-btn').addEventListener('click', function() {
        document.getElementById('whatsapp-screenshot').click();
    });
    
    document.getElementById('whatsapp-screenshot').addEventListener('change', function() {
        if (this.files.length > 0) {
            setTimeout(() => {
                completeTask(document.getElementById('whatsapp-task'));
                showNotification('WhatsApp screenshot uploaded successfully!');
            }, 1000);
        }
    });
    
    // Facebook upload
    document.getElementById('facebook-upload-btn').addEventListener('click', function() {
        document.getElementById('facebook-screenshot').click();
    });
    
    document.getElementById('facebook-screenshot').addEventListener('change', function() {
        if (this.files.length > 0) {
            setTimeout(() => {
                completeTask(document.getElementById('facebook-task'));
                showNotification('Facebook screenshot uploaded successfully!');
            }, 1000);
        }
    });
    
    // YouTube upload
    document.getElementById('youtube-upload-btn').addEventListener('click', function() {
        document.getElementById('youtube-screenshot').click();
    });
    
    document.getElementById('youtube-screenshot').addEventListener('change', function() {
        if (this.files.length > 0) {
            setTimeout(() => {
                completeTask(document.getElementById('youtube-task'));
                showNotification('YouTube screenshot uploaded successfully!');
            }, 1000);
        }
    });
    
    // TikTok upload
    document.getElementById('tiktok-upload-btn').addEventListener('click', function() {
        document.getElementById('tiktok-screenshot').click();
    });
    
    document.getElementById('tiktok-screenshot').addEventListener('change', function() {
        if (this.files.length > 0) {
            setTimeout(() => {
                completeTask(document.getElementById('tiktok-task'));
                showNotification('TikTok screenshot uploaded successfully!');
            }, 1000);
        }
    });
}

function setupFlipCoinGame() {
    const coin = document.getElementById('coin');
    const flipBtn = document.getElementById('flip-coin-btn');
    const resultDisplay = document.getElementById('coin-result');
    
    flipBtn.addEventListener('click', function() {
        flipBtn.disabled = true;
        resultDisplay.textContent = '';
        
        coin.classList.add('flipping');
        
        setTimeout(() => {
            const isHeads = Math.random() < 0.5;
            const result = isHeads ? 'Heads' : 'Tails';
            
            coin.classList.remove('flipping');
            if (!isHeads) {
                coin.style.transform = 'rotateY(180deg)';
            } else {
                coin.style.transform = 'rotateY(0)';
            }
            
            resultDisplay.textContent = `Result: ${result}!`;
            
            if (isHeads) {
                setTimeout(() => {
                    completeTask(document.getElementById('flip-coin-task'));
                    showNotification('Coin flip successful! Task completed.');
                }, 500);
            } else {
                flipBtn.disabled = false;
            }
        }, 1000);
    });
}

function startMining(type, callback) {
    const progressBar = document.getElementById(`${type}-progress`);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            callback();
        }
    }, 30);
}

function completeTask(taskElement) {
    taskElement.classList.add('completed');
    
    const doneMarker = taskElement.querySelector('.done-marker');
    if (doneMarker) doneMarker.style.display = 'block';
    
    const btn = taskElement.querySelector('.complete-btn:not(.upload-btn)');
    if (btn) {
        btn.disabled = true;
        if (taskElement.classList.contains('mining-task')) {
            btn.textContent = 'Activated';
            btn.classList.add('activated');
        }
    }
    
    updateTaskCounter();
    showNotification('Task completed successfully!');
    saveCompletedTask(taskElement.id);
    
    if (document.querySelectorAll('.task.completed').length === document.querySelectorAll('.task').length) {
        document.getElementById('dashboard-btn').disabled = false;
        document.getElementById('dashboard-btn').classList.add('green-btn');
    }
}

function loadCompletedTasks() {
    const completedTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
    
    completedTasks.forEach(taskId => {
        const taskElement = document.getElementById(taskId);
        if (taskElement) {
            taskElement.classList.add('completed');
            
            const doneMarker = taskElement.querySelector('.done-marker');
            if (doneMarker) doneMarker.style.display = 'block';
            
            const btn = taskElement.querySelector('.complete-btn:not(.upload-btn)');
            if (btn) {
                btn.disabled = true;
                if (taskElement.classList.contains('mining-task')) {
                    btn.textContent = 'Activated';
                    btn.classList.add('activated');
                }
            }
            
            // Show upload sections for social tasks
            if (taskId.includes('whatsapp') || 
                taskId.includes('facebook') || 
                taskId.includes('youtube') || 
                taskId.includes('tiktok')) {
                const uploadSection = taskElement.querySelector('.screenshot-upload');
                if (uploadSection) uploadSection.style.display = 'block';
            }
        }
    });
    
    updateTaskCounter();
}

function saveCompletedTask(taskId) {
    let completedTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
    if (!completedTasks.includes(taskId)) {
        completedTasks.push(taskId);
        localStorage.setItem(TASKS_KEY, JSON.stringify(completedTasks));
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    document.getElementById('notification-text').textContent = message;
    
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function celebrate() {
    const celebration = document.getElementById('celebration');
    celebration.innerHTML = '';
    celebration.style.display = 'block';
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        const x = Math.random() * 100;
        const colors = ['#FFD700', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = 3 + Math.random() * 3;
        
        confetti.style.left = `${x}%`;
        confetti.style.backgroundColor = color;
        confetti.style.animationDuration = `${duration}s`;
        
        celebration.appendChild(confetti);
    }
    
    setTimeout(() => {
        celebration.style.display = 'none';
    }, 5000);
}