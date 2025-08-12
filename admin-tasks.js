// Task management system
const taskState = {
    whatsapp: { visible: true, folder: '' },
    facebook: { visible: true, folder: '' },
    youtube: { visible: true, folder: '' },
    tiktok: { visible: true, folder: '' },
    login: { visible: true },
    memory: { visible: true },
    coin: { visible: true },
    wheel: { visible: true },
    bitcoin: { visible: true },
    ethereum: { visible: true },
    bnb: { visible: true }
};

// Initialize the panel
document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings from localStorage
    loadSettings();
    
    // Set up folder path displays
    updateFolderDisplays();
    
    // Set up video previews (simulated - in real app would connect to server)
    setupVideoPreviews();
    
    // Initialize all task buttons and statuses
    initializeTaskButtons();
});

// Initialize all task buttons and statuses
function initializeTaskButtons() {
    for (const taskId in taskState) {
        updateTaskButton(taskId);
    }
}

// Update individual task button and status
function updateTaskButton(taskId) {
    const btn = document.querySelector(`#${taskId}-task .toggle-btn`);
    const statusBadge = document.getElementById(`${taskId}-status`);
    
    if (btn) {
        btn.textContent = taskState[taskId].visible ? 'Hide Task' : 'Show Task';
    }
    
    if (statusBadge) {
        statusBadge.textContent = taskState[taskId].visible ? 'Active' : 'Hidden';
        statusBadge.style.backgroundColor = taskState[taskId].visible 
            ? 'rgba(76, 175, 80, 0.2)' 
            : 'rgba(244, 67, 54, 0.2)';
        statusBadge.style.color = taskState[taskId].visible ? '#4CAF50' : '#F44336';
        statusBadge.style.borderColor = taskState[taskId].visible ? '#4CAF50' : '#F44336';
    }
}

// Toggle task visibility
function toggleTask(taskId) {
    taskState[taskId].visible = !taskState[taskId].visible;
    updateTaskButton(taskId);
    saveSettings();
}

// Save folder path for a task
function saveFolder(taskId) {
    const input = document.getElementById(`${taskId}-folder`);
    taskState[taskId].folder = input.value.trim();
    
    updateFolderDisplays();
    saveSettings();
    
    // Simulate loading a random video from the folder
    loadRandomVideo(taskId);
}

// Update folder path displays
function updateFolderDisplays() {
    for (const taskId in taskState) {
        if (taskState[taskId].folder) {
            const display = document.getElementById(`${taskId}-folder-path`);
            if (display) {
                display.textContent = taskState[taskId].folder;
            }
        }
    }
}

// Simulate loading a random video from folder
function loadRandomVideo(taskId) {
    // In a real implementation, this would fetch from server
    const videos = [
        'video1.mp4',
        'video2.mp4',
        'video3.mp4',
        'promo.mp4',
        'tutorial.mp4'
    ];
    
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    const preview = document.getElementById(`${taskId}-video-preview`);
    
    // Simulate loading a video (in real app would use actual file from folder)
    preview.src = `https://example.com/videos/${randomVideo}`;
    preview.load();
    
    console.log(`Loaded random video for ${taskId}: ${randomVideo}`);
}

// Set up video previews (simulated)
function setupVideoPreviews() {
    const socialTasks = ['whatsapp', 'facebook', 'youtube', 'tiktok'];
    
    socialTasks.forEach(taskId => {
        if (taskState[taskId].folder) {
            loadRandomVideo(taskId);
        }
    });
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('taskSettings', JSON.stringify(taskState));
}

// Load settings from localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('taskSettings');
    if (savedSettings) {
        Object.assign(taskState, JSON.parse(savedSettings));
        
        // Update folder inputs
        for (const taskId in taskState) {
            const input = document.getElementById(`${taskId}-folder`);
            if (input) {
                input.value = taskState[taskId].folder || '';
            }
        }
    }
}