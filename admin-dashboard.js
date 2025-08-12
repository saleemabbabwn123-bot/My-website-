document.addEventListener('DOMContentLoaded', function() {
    // Welcome Popup
    const welcomePopup = document.getElementById('welcomePopup');
    const closePopup = document.getElementById('closePopup');
    const continueBtn = document.getElementById('continueBtn');
    
    // Show welcome popup immediately
    setTimeout(() => {
        welcomePopup.classList.add('active');
    }, 100);
    
    // Close popup functionality
    if(closePopup) {
        closePopup.addEventListener('click', () => {
            welcomePopup.classList.remove('active');
        });
    }
    
    // Continue button functionality
    if(continueBtn) {
        continueBtn.addEventListener('click', () => {
            welcomePopup.classList.remove('active');
        });
    }

    // Notification system
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const clearNotificationsBtn = document.getElementById('clearNotifications');
    const viewNotificationsBtn = document.getElementById('viewNotificationsBtn');
    const notificationBadge = document.querySelector('.notification-badge');
    
    // Toggle notification dropdown
    if(notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
        });
    }
    
    // Close notification dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if(!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.remove('active');
        }
    });
    
    // Clear all notifications
    if(clearNotificationsBtn) {
        clearNotificationsBtn.addEventListener('click', function() {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            notificationBadge.textContent = '0';
            document.querySelector('.announcement p:nth-child(2)').innerHTML = 
                'All notifications have been marked as read.';
        });
    }
    
    // View notifications button in popup
    if(viewNotificationsBtn) {
        viewNotificationsBtn.addEventListener('click', function() {
            welcomePopup.classList.remove('active');
            notificationDropdown.classList.add('active');
        });
    }

    // Fixed Navigation with Loading Animation
    document.querySelectorAll('.quick-actions-grid a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href');
            
            // Show loading animation
            // document.body.innerHTML = `
            //     <div class="loading-screen">
            //         <div class="spinner"></div>
            //         <p class="loading-text">Loading...</p>
            //     </div>
            // `;
            
            // Navigate after 2 seconds
            setTimeout(() => {
                window.location.href = targetPage;
            }, 2000);
        });
    });

    // Fixed Logout Functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading animation
            document.body.innerHTML = `
                <div class="loading-screen">
                    <div class="spinner"></div>
                    <p class="loading-text">Logging out...</p>
                </div>
            `;
            
            // Simulate server logout process
            setTimeout(() => {
                // Clear authentication data
                localStorage.removeItem('adminToken');
                sessionStorage.removeItem('adminSession');
                
                // Redirect to login page and prevent back navigation
                window.location.replace('login.html');
                history.pushState(null, null, 'login.html');
                window.addEventListener('popstate', function() {
                    history.pushState(null, null, 'login.html');
                });
            }, 2000);
        });
    }

    // Admin control buttons
    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestItem = this.closest('.request-item');
            alert('Request approved successfully');
            requestItem.style.opacity = '0.5';
            requestItem.style.pointerEvents = 'none';
            setTimeout(() => {
                requestItem.remove();
            }, 1000);
        });
    });

    document.querySelectorAll('.btn-reject').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestItem = this.closest('.request-item');
            alert('Request rejected');
            requestItem.style.opacity = '0.5';
            requestItem.style.pointerEvents = 'none';
            setTimeout(() => {
                requestItem.remove();
            }, 1000);
        });
    });
});