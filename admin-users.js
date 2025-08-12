// Sample user data
const users = [
    {
        id: 1,
        name: "Ali Khan",
        phone: "+923001234567",
        package: "gold",
        joiningDate: "2023-05-15",
        totalInvestment: 2500.00,
        totalProfit: 1250.50,
        monthlyProfit: 350.75,
        teamMembers: 12,
        teamInvestment: 15000.00,
        notes: "Active investor"
    },
    {
        id: 2,
        name: "Sara Ahmed",
        phone: "+923451234567",
        package: "diamond",
        joiningDate: "2022-11-20",
        totalInvestment: 8500.00,
        totalProfit: 4250.25,
        monthlyProfit: 950.50,
        teamMembers: 35,
        teamInvestment: 45000.00,
        notes: "Top performer"
    },
    {
        id: 3,
        name: "Usman Malik",
        phone: "+923001234568",
        package: "silver",
        joiningDate: "2023-08-10",
        totalInvestment: 1500.00,
        totalProfit: 450.75,
        monthlyProfit: 125.25,
        teamMembers: 5,
        teamInvestment: 5000.00,
        notes: "New member"
    }
];

// DOM Elements
const menuButton = document.getElementById('menuButton');
const packagesMenu = document.getElementById('packagesMenu');
const usersList = document.getElementById('usersList');
const searchBar = document.querySelector('.search-bar');
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const cancelEdit = document.getElementById('cancelEdit');
const editUserId = document.getElementById('editUserId');
const editUserName = document.getElementById('editUserName');
const editUserPhone = document.getElementById('editUserPhone');
const editUserPackage = document.getElementById('editUserPackage');
const editUserJoiningDate = document.getElementById('editUserJoiningDate');
const editUserTotalInvestment = document.getElementById('editUserTotalInvestment');
const editUserTotalProfit = document.getElementById('editUserTotalProfit');
const editUserMonthlyProfit = document.getElementById('editUserMonthlyProfit');
const editUserTeamMembers = document.getElementById('editUserTeamMembers');
const editUserTeamInvestment = document.getElementById('editUserTeamInvestment');
const editUserNotes = document.getElementById('editUserNotes');

// Package colors mapping
const packageColors = {
    bronze: 'bronze',
    silver: 'silver',
    gold: 'gold',
    platinum: 'platinum',
    diamond: 'diamond'
};

// Package display names
const packageNames = {
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
    diamond: 'Diamond'
};

// Format currency
const formatCurrency = (amount) => {
    return '$' + amount.toFixed(2);
};

// Format date
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Current filter state
let currentFilter = 'all';
let currentSearch = '';

// Initialize the page
function init() {
    renderUsers(users);
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Toggle packages menu
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        packagesMenu.classList.toggle('active');
    });

    // Close menu when clicking elsewhere
    document.addEventListener('click', () => {
        packagesMenu.classList.remove('active');
    });

    // Filter by package
    document.querySelectorAll('.package-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            currentFilter = option.dataset.package;
            packagesMenu.classList.remove('active');
            filterUsers();
        });
    });

    // Search functionality
    searchBar.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        filterUsers();
    });

    // Edit modal
    cancelEdit.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Form submission
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveUserChanges();
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
}

// Render users to the page
function renderUsers(usersToRender) {
    usersList.innerHTML = '';
    
    if (usersToRender.length === 0) {
        usersList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px;">No users found matching your criteria</p>';
        return;
    }

    usersToRender.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <h3 class="user-name">${user.name}</h3>
            <span class="user-package ${packageColors[user.package]}">${packageNames[user.package]}</span>
            
            <div class="user-details">
                <div><span>Phone:</span> <span>${user.phone}</span></div>
                <div><span>Joined:</span> <span>${formatDate(user.joiningDate)}</span></div>
                <div><span>Investment:</span> <span>${formatCurrency(user.totalInvestment)}</span></div>
                <div><span>Total Profit:</span> <span>${formatCurrency(user.totalProfit)}</span></div>
                <div><span>Monthly Profit:</span> <span>${formatCurrency(user.monthlyProfit)}</span></div>
                <div><span>Team Members:</span> <span>${user.teamMembers}</span></div>
                <div><span>Team Investment:</span> <span>${formatCurrency(user.teamInvestment)}</span></div>
            </div>
            
            <button class="edit-btn" data-id="${user.id}">Edit Details</button>
        `;
        usersList.appendChild(userCard);
    });

    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            openEditModal(parseInt(btn.dataset.id));
        });
    });
}

// Filter users based on current filter and search
function filterUsers() {
    let filteredUsers = [...users];
    
    // Apply package filter
    if (currentFilter !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.package === currentFilter);
    }
    
    // Apply search filter
    if (currentSearch) {
        filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(currentSearch) ||
            user.phone.includes(currentSearch)
        );
    }
    
    renderUsers(filteredUsers);
}

// Open edit modal with user data
function openEditModal(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    // Fill the form with user data
    editUserId.value = user.id;
    editUserName.value = user.name;
    editUserPhone.value = user.phone;
    editUserPackage.value = user.package;
    editUserJoiningDate.value = user.joiningDate;
    editUserTotalInvestment.value = user.totalInvestment;
    editUserTotalProfit.value = user.totalProfit;
    editUserMonthlyProfit.value = user.monthlyProfit;
    editUserTeamMembers.value = user.teamMembers;
    editUserTeamInvestment.value = user.teamInvestment;
    editUserNotes.value = user.notes || '';
    
    editModal.style.display = 'flex';
}

// Save user changes
function saveUserChanges() {
    const userId = parseInt(editUserId.value);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        // Update all editable fields
        users[userIndex].name = editUserName.value;
        users[userIndex].phone = editUserPhone.value;
        users[userIndex].package = editUserPackage.value;
        users[userIndex].joiningDate = editUserJoiningDate.value;
        users[userIndex].totalInvestment = parseFloat(editUserTotalInvestment.value);
        users[userIndex].totalProfit = parseFloat(editUserTotalProfit.value);
        users[userIndex].monthlyProfit = parseFloat(editUserMonthlyProfit.value);
        users[userIndex].teamMembers = parseInt(editUserTeamMembers.value);
        users[userIndex].teamInvestment = parseFloat(editUserTeamInvestment.value);
        users[userIndex].notes = editUserNotes.value;
        
        filterUsers(); // Refresh the list
        editModal.style.display = 'none';
        
        // Show success message
        alert('User details updated successfully!');
    }
}

// Initialize the application
init();