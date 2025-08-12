// Sample withdrawal requests data
const withdrawalRequests = [
    {
        id: 'USR12345',
        name: 'John Doe',
        phone: '+91 9876543210',
        email: 'john.doe@example.com',
        amount: '500 USDT',
        network: 'BEP20 (USDT)',
        wallet: '0x71C...8976F',
        fullWallet: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        date: '2023-06-15 14:30',
        status: 'pending',
        investment: '$5,250.00',
        totalWithdrawal: '$1,200.00',
        totalProfit: '$2,100.00',
        teamMembers: 12,
        teamInvestment: '$24,500.00',
        teamProfit: '$3,675.00'
    },
    {
        id: 'USR67890',
        name: 'Jane Smith',
        phone: '+91 8765432109',
        email: 'jane.smith@example.com',
        amount: '250 USDT',
        network: 'TRC20 (USDT)',
        wallet: 'TYq...4XyZ',
        fullWallet: 'TYqu3XjK9LmN4XyZbVcRt7SwQ2Eh5Yp8F',
        date: '2023-06-14 10:15',
        status: 'pending',
        investment: '$3,800.00',
        totalWithdrawal: '$950.00',
        totalProfit: '$1,520.00',
        teamMembers: 8,
        teamInvestment: '$15,200.00',
        teamProfit: '$2,280.00'
    },
    {
        id: 'USR54321',
        name: 'Robert Johnson',
        phone: '+91 7654321098',
        email: 'robert.j@example.com',
        amount: '1000 USDT',
        network: 'ERC20 (USDT)',
        wallet: '0x8f...3EeD',
        fullWallet: '0x8f3A2d7b5C1e9F6a3EeD4c2B8f5A6D3EeD7b9C',
        date: '2023-06-13 18:45',
        status: 'pending',
        investment: '$8,500.00',
        totalWithdrawal: '$2,750.00',
        totalProfit: '$3,400.00',
        teamMembers: 20,
        teamInvestment: '$42,000.00',
        teamProfit: '$6,300.00'
    },
    {
        id: 'USR09876',
        name: 'Sarah Williams',
        phone: '+91 6543210987',
        email: 'sarah.w@example.com',
        amount: '150 USDT',
        network: 'BEP20 (USDT)',
        wallet: 'bnb...7HkL',
        fullWallet: 'bnb1q3e9rk0h7hkly8q7j2f4x5g6h7j8k9l0m1n2o3p4',
        date: '2023-06-12 11:20',
        status: 'completed',
        investment: '$2,100.00',
        totalWithdrawal: '$600.00',
        totalProfit: '$840.00',
        teamMembers: 5,
        teamInvestment: '$8,500.00',
        teamProfit: '$1,275.00'
    },
    {
        id: 'USR13579',
        name: 'Michael Brown',
        phone: '+91 5432109876',
        email: 'michael.b@example.com',
        amount: '750 USDT',
        network: 'TRC20 (USDT)',
        wallet: 'TNP...9MnB',
        fullWallet: 'TNPq9W2eE4rRt7Yu8I9MnBv6Ct5Dc3FvG',
        date: '2023-06-11 16:30',
        status: 'rejected',
        investment: '$6,750.00',
        totalWithdrawal: '$1,800.00',
        totalProfit: '$2,700.00',
        teamMembers: 15,
        teamInvestment: '$30,000.00',
        teamProfit: '$4,500.00'
    }
];

// Current selected request and confirmation data
let currentRequest = null;
let pendingAction = {
    type: null,
    requestId: null,
    callback: null
};

// DOM elements
const requestsList = document.getElementById('requestsList');
const userModal = document.getElementById('userModal');
const confirmationModal = document.getElementById('confirmationModal');
const modalClose = document.getElementById('modalClose');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const confirmModalClose = document.getElementById('confirmModalClose');
const approveBtn = document.getElementById('approveBtn');
const rejectBtn = document.getElementById('rejectBtn');
const updateMinAmountBtn = document.getElementById('updateMinAmountBtn');
const updateNetworksBtn = document.getElementById('updateNetworksBtn');
const confirmActionBtn = document.getElementById('confirmActionBtn');
const cancelActionBtn = document.getElementById('cancelActionBtn');
const confirmModalTitle = document.getElementById('confirmModalTitle');
const confirmModalMessage = document.getElementById('confirmModalMessage');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateRequests();
    setupEventListeners();
});

function setupEventListeners() {
    // Modal close handlers
    modalClose.addEventListener('click', closeModal);
    modalCloseBtn.addEventListener('click', closeModal);
    confirmModalClose.addEventListener('click', closeConfirmationModal);
    cancelActionBtn.addEventListener('click', closeConfirmationModal);
    
    // Modal action buttons
    approveBtn.addEventListener('click', () => showConfirmation('approve'));
    rejectBtn.addEventListener('click', () => showConfirmation('reject'));
    
    // Confirmation modal button
    confirmActionBtn.addEventListener('click', executePendingAction);
    
    // Settings buttons
    updateMinAmountBtn.addEventListener('click', () => showConfirmation('updateMinAmount'));
    updateNetworksBtn.addEventListener('click', () => showConfirmation('updateNetworks'));
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === userModal) closeModal();
        if (event.target === confirmationModal) closeConfirmationModal();
    });
}

// Populate withdrawal requests table
function populateRequests() {
    requestsList.innerHTML = '';
    
    withdrawalRequests.forEach(request => {
        const row = document.createElement('tr');
        const statusClass = `status-${request.status}`;
        
        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.amount}</td>
            <td>${request.network}</td>
            <td>${request.wallet}</td>
            <td>${request.date}</td>
            <td class="${statusClass}">${request.status}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-view view-btn" data-id="${request.id}">View</button>
                    <button class="btn btn-approve approve-btn" data-id="${request.id}">Approve</button>
                    <button class="btn btn-reject reject-btn" data-id="${request.id}">Reject</button>
                </div>
            </td>
        `;
        
        requestsList.appendChild(row);
    });
    
    // Add event listeners to dynamically created buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            showRequestDetails(requestId);
        });
    });
    
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const requestId = this.getAttribute('data-id');
            showConfirmation('approve', requestId);
        });
    });
    
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const requestId = this.getAttribute('data-id');
            showConfirmation('reject', requestId);
        });
    });
}

// Show request details in modal
function showRequestDetails(requestId) {
    currentRequest = withdrawalRequests.find(req => req.id === requestId);
    
    if (currentRequest) {
        // Populate modal with request details
        document.getElementById('detail-id').textContent = currentRequest.id;
        document.getElementById('detail-name').textContent = currentRequest.name;
        document.getElementById('detail-phone').textContent = currentRequest.phone;
        document.getElementById('detail-email').textContent = currentRequest.email;
        document.getElementById('detail-investment').textContent = currentRequest.investment;
        document.getElementById('detail-withdrawal').textContent = currentRequest.totalWithdrawal;
        document.getElementById('detail-profit').textContent = currentRequest.totalProfit;
        document.getElementById('detail-team').textContent = currentRequest.teamMembers;
        document.getElementById('detail-team-investment').textContent = currentRequest.teamInvestment;
        document.getElementById('detail-team-profit').textContent = currentRequest.teamProfit;
        document.getElementById('detail-amount').textContent = currentRequest.amount;
        document.getElementById('detail-network').textContent = currentRequest.network;
        document.getElementById('detail-wallet').textContent = currentRequest.fullWallet;
        document.getElementById('detail-date').textContent = currentRequest.date;
        
        // Show modal
        userModal.style.display = 'flex';
    }
}

// Show confirmation dialog
function showConfirmation(actionType, requestId = null) {
    pendingAction.type = actionType;
    pendingAction.requestId = requestId;
    
    switch(actionType) {
        case 'approve':
            confirmModalTitle.textContent = 'Approve Withdrawal';
            confirmModalMessage.textContent = requestId 
                ? `Are you sure you want to approve withdrawal request ${requestId}?` 
                : `Are you sure you want to approve this withdrawal request?`;
            pendingAction.callback = requestId ? () => approveRequest(requestId) : approveCurrentRequest;
            break;
            
        case 'reject':
            confirmModalTitle.textContent = 'Reject Withdrawal';
            confirmModalMessage.textContent = requestId 
                ? `Are you sure you want to reject withdrawal request ${requestId}?` 
                : `Are you sure you want to reject this withdrawal request?`;
            pendingAction.callback = requestId ? () => rejectRequest(requestId) : rejectCurrentRequest;
            break;
            
        case 'updateMinAmount':
            confirmModalTitle.textContent = 'Update Minimum Amount';
            confirmModalMessage.textContent = 'Are you sure you want to update the minimum withdrawal amount?';
            pendingAction.callback = updateMinAmount;
            break;
            
        case 'updateNetworks':
            confirmModalTitle.textContent = 'Update Networks';
            confirmModalMessage.textContent = 'Are you sure you want to update the available networks?';
            pendingAction.callback = updateNetworks;
            break;
    }
    
    confirmationModal.style.display = 'flex';
}

// Execute the pending action after confirmation
function executePendingAction() {
    if (pendingAction.callback) {
        pendingAction.callback();
    }
    closeConfirmationModal();
}

// Close confirmation modal
function closeConfirmationModal() {
    confirmationModal.style.display = 'none';
    pendingAction = {
        type: null,
        requestId: null,
        callback: null
    };
}

// Close user details modal
function closeModal() {
    userModal.style.display = 'none';
    currentRequest = null;
}

// Approve request
function approveRequest(requestId) {
    const request = withdrawalRequests.find(req => req.id === requestId);
    if (request) {
        request.status = 'completed';
        populateRequests();
        alert(`Withdrawal of ${request.amount} approved successfully! Payment has been released.`);
    }
}

// Reject request
function rejectRequest(requestId) {
    const request = withdrawalRequests.find(req => req.id === requestId);
    if (request) {
        const reason = prompt("Please specify reason for rejection:");
        if (reason !== null && reason.trim() !== '') {
            request.status = 'rejected';
            populateRequests();
            alert(`Withdrawal of ${request.amount} has been rejected. Reason: ${reason}`);
        }
    }
}

// Approve current request from modal
function approveCurrentRequest() {
    if (currentRequest) {
        currentRequest.status = 'completed';
        populateRequests();
        closeModal();
        alert(`Withdrawal of ${currentRequest.amount} approved successfully! Payment has been released.`);
    }
}

// Reject current request from modal
function rejectCurrentRequest() {
    if (currentRequest) {
        const reason = prompt("Please specify reason for rejection:");
        if (reason !== null && reason.trim() !== '') {
            currentRequest.status = 'rejected';
            populateRequests();
            closeModal();
            alert(`Withdrawal of ${currentRequest.amount} has been rejected. Reason: ${reason}`);
        }
    }
}

// Update minimum withdrawal amount
function updateMinAmount() {
    const input = document.getElementById('minAmountInput');
    const newValue = input.value;
    
    if (newValue && !isNaN(newValue)) {
        alert(`Minimum withdrawal amount updated to ${newValue} USDT for all networks!`);
        input.value = '';
    } else {
        alert('Please enter a valid amount');
    }
}

// Update available networks
function updateNetworks() {
    const checkedNetworks = Array.from(document.querySelectorAll('#networkCheckboxes input:checked'))
        .map(checkbox => checkbox.parentElement.textContent.trim());
    
    if (checkedNetworks.length > 0) {
        alert(`Available networks updated to: ${checkedNetworks.join(', ')}`);
    } else {
        alert('Please select at least one network');
    }
}