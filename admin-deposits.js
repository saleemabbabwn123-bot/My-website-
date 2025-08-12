// Sample Data with Platinum and Diamond Packages Added
const investmentPackages = [
    {
        id: 1,
        name: "Bronze Package",
        level: "Bronze",
        baseProfit: 5,
        duration: 30,
        startInvestment: 100,
        endInvestment: 499,
        description: "Best for beginners with small investments."
    },
    {
        id: 2,
        name: "Silver Package",
        level: "Silver",
        baseProfit: 7,
        duration: 45,
        startInvestment: 500,
        endInvestment: 999,
        description: "For growing investors with steady returns."
    },
    {
        id: 3,
        name: "Gold Package",
        level: "Gold",
        baseProfit: 10,
        duration: 60,
        startInvestment: 1000,
        endInvestment: 4999,
        description: "High returns for serious investors."
    },
    {
        id: 4,
        name: "Platinum Package",
        level: "Platinum",
        baseProfit: 12,
        duration: 75,
        startInvestment: 5000,
        endInvestment: 9999,
        description: "Premium package for high-value investments."
    },
    {
        id: 5,
        name: "Diamond Package",
        level: "Diamond",
        baseProfit: 15,
        duration: 90,
        startInvestment: 10000,
        endInvestment: 50000,
        description: "Top-tier package with maximum profit potential."
    }
];

const investmentRequests = [
    {
        id: 1,
        userName: "John Smith",
        userEmail: "john@example.com",
        userWallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        package: "Gold",
        amount: 5000,
        date: "2023-11-15 14:30:22",
        status: "pending",
        paymentProof: "https://via.placeholder.com/600x300?text=Payment+Proof",
        transactionHash: "0x4a7b8c2d3e1f5a6b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6",
        phone: "+1234567890",
        country: "USA",
        investmentPlan: "6 months",
        referralCode: "INVEST2023"
    },
    {
        id: 2,
        userName: "Sarah Johnson",
        userEmail: "sarah@example.com",
        userWallet: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
        package: "Silver",
        amount: 2500,
        date: "2023-11-14 09:15:45",
        status: "approved",
        paymentProof: "https://via.placeholder.com/600x300?text=Payment+Proof",
        transactionHash: "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4",
        phone: "+441234567890",
        country: "UK",
        investmentPlan: "3 months",
        referralCode: "GOLD2023"
    }
];

const blockchainSettings = {
    minInvestment: 100,
    networks: ["ERC20", "BEP20", "TRC20"],
    addresses: [
        { type: "ERC20", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", active: true },
        { type: "BEP20", address: "0x4a7b8c2d3e1f5a6b9c8d7e6f5a4b3c2d1e0f9a8b7", active: true }
    ]
};

// DOM Loaded
document.addEventListener('DOMContentLoaded', function() {
    loadPackagesList();
    loadRequestsList();
    loadBlockchainSettings();
    
    // Event Listeners
    document.getElementById('addPackageBtn').addEventListener('click', openAddPackageModal);
    document.getElementById('closeModal').addEventListener('click', closePackageModal);
    document.getElementById('packageForm').addEventListener('submit', savePackage);
    document.getElementById('addAddressBtn').addEventListener('click', addNewAddress);
    document.getElementById('saveSettingsBtn').addEventListener('click', saveBlockchainSettings);
    document.getElementById('closeRequestModal').addEventListener('click', closeRequestModal);
});

// Load Packages
function loadPackagesList() {
    const packagesList = document.getElementById('packagesList');
    packagesList.innerHTML = '';
    
    investmentPackages.forEach(pkg => {
        const packageCard = document.createElement('div');
        packageCard.className = 'package-card';
        packageCard.dataset.id = pkg.id;
        
        packageCard.innerHTML = `
            <div class="package-header">
                <div class="package-name">${pkg.name}</div>
                <div class="package-badge ${pkg.level.toLowerCase()}-badge">${pkg.level}</div>
            </div>
            <div class="package-details">
                <div class="detail-item">
                    <div class="detail-label">Profit</div>
                    <div class="detail-value">${pkg.baseProfit}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Duration</div>
                    <div class="detail-value">${pkg.duration} Days</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Min Investment</div>
                    <div class="detail-value">$${pkg.startInvestment}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Max Investment</div>
                    <div class="detail-value">$${pkg.endInvestment}</div>
                </div>
            </div>
            ${pkg.description ? `<p style="margin-top:15px;color:var(--text-gray);font-size:0.9rem;">${pkg.description}</p>` : ''}
            <div class="package-actions">
                <button class="btn btn-info edit-package" data-id="${pkg.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger delete-package" data-id="${pkg.id}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        packagesList.appendChild(packageCard);
    });
    
    // Add event listeners to edit/delete buttons
    document.querySelectorAll('.edit-package').forEach(btn => {
        btn.addEventListener('click', function() {
            const packageId = parseInt(this.dataset.id);
            editPackage(packageId);
        });
    });
    
    document.querySelectorAll('.delete-package').forEach(btn => {
        btn.addEventListener('click', function() {
            const packageId = parseInt(this.dataset.id);
            deletePackage(packageId);
        });
    });
}

// Load Requests
function loadRequestsList() {
    const requestsList = document.getElementById('requestsList');
    requestsList.innerHTML = '';
    
    investmentRequests.forEach(request => {
        const requestCard = document.createElement('div');
        requestCard.className = `request-card ${request.status}`;
        requestCard.dataset.id = request.id;
        
        requestCard.innerHTML = `
            <div class="request-header">
                <div class="request-user">
                    <div class="user-avatar">${getInitials(request.userName)}</div>
                    <div class="user-info">
                        <h3>${request.userName}</h3>
                        <p>${request.userEmail}</p>
                    </div>
                </div>
                <div class="request-status status-${request.status}">
                    ${request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </div>
            </div>
            <div class="request-details">
                <div class="detail-item">
                    <div class="detail-label">Package</div>
                    <div class="detail-value">
                        <span class="package-badge ${request.package.toLowerCase()}-badge">${request.package}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Amount</div>
                    <div class="detail-value">$${request.amount}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Date</div>
                    <div class="detail-value">${formatDate(request.date)}</div>
                </div>
            </div>
            <div class="request-actions">
                <button class="btn btn-view view-request" data-id="${request.id}">
                    <i class="fas fa-eye"></i> View
                </button>
                ${request.status === 'pending' ? `
                <button class="btn btn-success approve-request" data-id="${request.id}">
                    <i class="fas fa-check-circle"></i> Approve
                </button>
                <button class="btn btn-danger reject-request" data-id="${request.id}">
                    <i class="fas fa-times-circle"></i> Reject
                </button>
                ` : ''}
            </div>
        `;
        
        requestsList.appendChild(requestCard);
    });
    
    // Add event listeners to request buttons
    document.querySelectorAll('.view-request').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestId = parseInt(this.dataset.id);
            viewRequestDetails(requestId);
        });
    });
    
    document.querySelectorAll('.approve-request').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestId = parseInt(this.dataset.id);
            approveRequest(requestId);
        });
    });
    
    document.querySelectorAll('.reject-request').forEach(btn => {
        btn.addEventListener('click', function() {
            const requestId = parseInt(this.dataset.id);
            rejectRequest(requestId);
        });
    });
}

// Load Blockchain Settings
function loadBlockchainSettings() {
    document.getElementById('minInvestment').value = blockchainSettings.minInvestment;
    
    // Set network checkboxes
    document.querySelectorAll('input[name="blockchainNetworks"]').forEach(checkbox => {
        checkbox.checked = blockchainSettings.networks.includes(checkbox.value);
    });
    
    // Load addresses
    const addressesTable = document.getElementById('addressesTableBody');
    addressesTable.innerHTML = '';
    
    blockchainSettings.addresses.forEach((addr, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${addr.type}</td>
            <td>${addr.address}</td>
            <td>
                <select class="form-control address-status" data-index="${index}">
                    <option value="true" ${addr.active ? 'selected' : ''}>Active</option>
                    <option value="false" ${!addr.active ? 'selected' : ''}>Inactive</option>
                </select>
            </td>
            <td>
                <button class="btn btn-danger delete-address" data-index="${index}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </td>
        `;
        addressesTable.appendChild(tr);
    });
    
    // Add event listeners for address status changes
    document.querySelectorAll('.address-status').forEach(select => {
        select.addEventListener('change', function() {
            const index = parseInt(this.dataset.index);
            blockchainSettings.addresses[index].active = this.value === 'true';
        });
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-address').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            if (confirm('Are you sure you want to delete this address?')) {
                blockchainSettings.addresses.splice(index, 1);
                loadBlockchainSettings();
            }
        });
    });
}

// Package Modal Functions
function openAddPackageModal() {
    document.getElementById('packageId').value = '';
    document.getElementById('packageForm').reset();
    document.getElementById('modalTitle').textContent = 'Add New Package';
    document.getElementById('packageModal').style.display = 'flex';
}

function closePackageModal() {
    document.getElementById('packageModal').style.display = 'none';
}

function editPackage(packageId) {
    const pkg = investmentPackages.find(p => p.id === packageId);
    if (pkg) {
        document.getElementById('packageId').value = pkg.id;
        document.getElementById('packageName').value = pkg.name;
        document.getElementById('packageLevel').value = pkg.level;
        document.getElementById('baseProfit').value = pkg.baseProfit;
        document.getElementById('duration').value = pkg.duration;
        document.getElementById('startInvestment').value = pkg.startInvestment;
        document.getElementById('endInvestment').value = pkg.endInvestment;
        document.getElementById('packageDescription').value = pkg.description || '';
        
        document.getElementById('modalTitle').textContent = 'Edit Package';
        document.getElementById('packageModal').style.display = 'flex';
    }
}

function savePackage(e) {
    e.preventDefault();
    
    const packageId = document.getElementById('packageId').value;
    const packageData = {
        name: document.getElementById('packageName').value,
        level: document.getElementById('packageLevel').value,
        baseProfit: parseFloat(document.getElementById('baseProfit').value),
        duration: parseInt(document.getElementById('duration').value),
        startInvestment: parseFloat(document.getElementById('startInvestment').value),
        endInvestment: parseFloat(document.getElementById('endInvestment').value),
        description: document.getElementById('packageDescription').value
    };
    
    if (packageId) {
        // Update existing package
        const index = investmentPackages.findIndex(p => p.id === parseInt(packageId));
        if (index !== -1) {
            investmentPackages[index] = { ...investmentPackages[index], ...packageData };
        }
    } else {
        // Add new package
        const newId = investmentPackages.length > 0 ? Math.max(...investmentPackages.map(p => p.id)) + 1 : 1;
        investmentPackages.push({ id: newId, ...packageData });
    }
    
    loadPackagesList();
    closePackageModal();
}

function deletePackage(packageId) {
    if (confirm('Are you sure you want to delete this package?')) {
        const index = investmentPackages.findIndex(p => p.id === packageId);
        if (index !== -1) {
            investmentPackages.splice(index, 1);
            loadPackagesList();
        }
    }
}

// Request Functions
function viewRequestDetails(requestId) {
    const request = investmentRequests.find(req => req.id === requestId);
    if (request) {
        const modalContent = document.getElementById('requestDetailsContent');
        modalContent.innerHTML = `
            <div style="display:flex;align-items:center;gap:15px;margin-bottom:20px;">
                <div class="user-avatar" style="width:60px;height:60px;font-size:1.5rem;">${getInitials(request.userName)}</div>
                <div>
                    <h3 style="margin:0 0 5px 0;">${request.userName}</h3>
                    <p style="margin:0;color:var(--text-gray);">${request.userEmail}</p>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:15px;">
                <div>
                    <div style="font-size:0.9rem;color:var(--text-gray);">Phone</div>
                    <div>${request.phone}</div>
                </div>
                <div>
                    <div style="font-size:0.9rem;color:var(--text-gray);">Country</div>
                    <div>${request.country}</div>
                </div>
                <div>
                    <div style="font-size:0.9rem;color:var(--text-gray);">Package</div>
                    <div><span class="package-badge ${request.package.toLowerCase()}-badge">${request.package}</span></div>
                </div>
                <div>
                    <div style="font-size:0.9rem;color:var(--text-gray);">Amount</div>
                    <div>$${request.amount}</div>
                </div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-size:0.9rem;color:var(--text-gray);">Wallet Address</div>
                <div style="word-break:break-all;">${request.userWallet}</div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-size:0.9rem;color:var(--text-gray);">Transaction Hash</div>
                <div style="word-break:break-all;">${request.transactionHash}</div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-size:0.9rem;color:var(--text-gray);">Payment Proof</div>
                <img src="${request.paymentProof}" class="proof-image">
            </div>
            <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;">
                ${request.status === 'pending' ? `
                <button class="btn btn-success approve-request-modal" data-id="${request.id}" style="padding:10px 20px;">
                    <i class="fas fa-check-circle"></i> Approve
                </button>
                <button class="btn btn-danger reject-request-modal" data-id="${request.id}" style="padding:10px 20px;">
                    <i class="fas fa-times-circle"></i> Reject
                </button>
                ` : ''}
                <button class="btn btn-view close-request-modal" style="padding:10px 20px;">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        `;
        
        // Add event listeners to modal buttons
        document.querySelector('.close-request-modal').addEventListener('click', closeRequestModal);
        document.querySelector('.approve-request-modal')?.addEventListener('click', function() {
            approveRequest(request.id);
            closeRequestModal();
        });
        document.querySelector('.reject-request-modal')?.addEventListener('click', function() {
            rejectRequest(request.id);
            closeRequestModal();
        });
        
        document.getElementById('requestDetailsModal').style.display = 'flex';
    }
}

function closeRequestModal() {
    document.getElementById('requestDetailsModal').style.display = 'none';
}

function approveRequest(requestId) {
    const request = investmentRequests.find(req => req.id === requestId);
    if (request) {
        request.status = 'approved';
        alert('Request approved successfully!');
        loadRequestsList();
    }
}

function rejectRequest(requestId) {
    const request = investmentRequests.find(req => req.id === requestId);
    if (request) {
        request.status = 'rejected';
        alert('Request rejected!');
        loadRequestsList();
    }
}

// Blockchain Functions
function addNewAddress() {
    const type = document.getElementById('newAddressType').value;
    const address = document.getElementById('newAddressValue').value.trim();
    
    if (!address) {
        alert('Please enter a wallet address');
        return;
    }
    
    blockchainSettings.addresses.push({
        type: type,
        address: address,
        active: true
    });
    
    document.getElementById('newAddressValue').value = '';
    loadBlockchainSettings();
}

function saveBlockchainSettings() {
    blockchainSettings.minInvestment = parseInt(document.getElementById('minInvestment').value);
    
    // Get selected networks
    blockchainSettings.networks = [];
    document.querySelectorAll('input[name="blockchainNetworks"]:checked').forEach(checkbox => {
        blockchainSettings.networks.push(checkbox.value);
    });
    
    alert('Settings saved successfully!');
}

// Tab Switching
function switchTab(tabName) {
    document.querySelectorAll('.content-container').forEach(container => {
        container.classList.remove('active');
    });
    
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// Helper Functions
function getInitials(name) {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}