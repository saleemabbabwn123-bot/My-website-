// Data for blockchain addresses
const blockchainAddresses = [
    { type: "Bitcoin (BTC)", value: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" },
    { type: "Ethereum (ETH)", value: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
    { type: "USDT (TRC20)", value: "TNPZ1QYQY5XQJHUZN9S9KZ9K10DCF9KZ9K" },
    { type: "Litecoin (LTC)", value: "LSN5SqpECU1XmZJsnkYQ1w4QYqQ9Y2YQ9Y" },
    { type: "Bitcoin Cash (BCH)", value: "qpm2qsznhks23z7629mms6s4cwef74vcwvy22gdx6a" }
];

// Data for investment packages
const investmentPackages = [
    {
        name: "Bronze",
        profit: "8.5%",
        range: "$100 - $999",
        daily: "0.023%",
        features: [
            "Basic analytics dashboard",
            "Email support",
            "Weekly market updates",
            "24/7 account access"
        ]
    },
    {
        name: "Silver",
        profit: "10.2%",
        range: "$1,000 - $4,999",
        daily: "0.028%",
        features: [
            "Advanced analytics tools",
            "Priority support",
            "Monthly reports",
            "Personal consultant",
            "Risk management"
        ]
    },
    {
        name: "Gold",
        profit: "12.8%",
        range: "$5,000 - $14,999",
        daily: "0.035%",
        features: [
            "Premium analytics suite",
            "24/7 dedicated support",
            "Weekly reports",
            "VIP webinars",
            "Account protection"
        ]
    },
    {
        name: "Platinum",
        profit: "15.5%",
        range: "$15,000 - $49,999",
        daily: "0.042%",
        features: [
            "Advanced trading tools",
            "Personal account manager",
            "Daily reports",
            "Private sessions",
            "Insurance coverage"
        ]
    },
    {
        name: "Diamond",
        profit: "18.2%",
        range: "$50,000 - $500,000+",
        daily: "0.05%",
        features: [
            "All premium features",
            "Dedicated support team",
            "Custom solutions",
            "Personalized strategy",
            "Highest priority execution"
        ]
    }
];

// Create faster golden stars animation
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 1500;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        
        // Faster animation (30s to 80s duration)
        const duration = Math.random() * 50 + 30;
        star.style.animationDuration = `${duration}s`;
        
        // Random delay
        star.style.animationDelay = `${Math.random() * 10}s`;
        
        starsContainer.appendChild(star);
    }
}

// Populate blockchain addresses
function populateAddresses() {
    const container = document.getElementById('addressesContainer');
    
    blockchainAddresses.forEach(address => {
        const addressItem = document.createElement('div');
        addressItem.className = 'address-item';
        
        addressItem.innerHTML = `
            <div class="address-type">${address.type}</div>
            <div class="address-value">${address.value}</div>
            <button class="copy-address-btn">
                <i class="fas fa-copy"></i> Copy
            </button>
        `;
        
        container.appendChild(addressItem);
        
        // Add click event to the copy button
        const copyBtn = addressItem.querySelector('.copy-address-btn');
        copyBtn.addEventListener('click', () => copyToClipboard(address.value));
    });
}

// Populate investment packages
function populatePackages() {
    const container = document.getElementById('packagesGrid');
    
    investmentPackages.forEach(pkg => {
        const packageCard = document.createElement('div');
        packageCard.className = `package-card ${pkg.name.toLowerCase()}`;
        
        // Create features list
        const featuresList = pkg.features.map(feature => `
            <li>
                <i class="fas fa-check"></i>
                ${feature}
            </li>
        `).join('');
        
        packageCard.innerHTML = `
            <div class="corner-bottom"></div>
            <div class="package-header">
                <h3 class="package-name">${pkg.name}</h3>
                <div class="package-profit">${pkg.profit}</div>
            </div>
            <div class="package-body">
                <div class="investment-range">
                    <div class="investment-label">Investment Range</div>
                    <div class="investment-value">${pkg.range}</div>
                </div>
                <div class="profit-ratio">Daily: ${pkg.daily}</div>
                <ul class="package-features">
                    ${featuresList}
                </ul>
                <button class="invest-btn">
                    Invest in ${pkg.name}
                </button>
            </div>
        `;
        
        container.appendChild(packageCard);
        
        // Add click event to the invest button
        const investBtn = packageCard.querySelector('.invest-btn');
        investBtn.addEventListener('click', () => {
            const minAmount = pkg.range.split(' - ')[0].replace('$', '').replace(/,/g, '');
            document.getElementById('investmentAmount').value = minAmount;
            document.getElementById('investmentAmount').focus();
            document.querySelector('.amount-card').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Toggle blockchain addresses visibility
function setupAddressToggle() {
    document.getElementById('toggleAddresses').addEventListener('click', function() {
        const container = document.getElementById('addressesContainer');
        const icon = document.getElementById('toggleIcon');
        
        container.classList.toggle('show');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
}

// Handle file upload display
function setupFileUpload() {
    document.getElementById('paymentProof').addEventListener('change', function() {
        const fileName = this.files[0] ? this.files[0].name : 'No file selected';
        document.getElementById('fileName').textContent = fileName;
    });
}

// Generate random transaction ID
function generateTxId() {
    const chars = '0123456789ABCDEF';
    let result = 'TX-';
    for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Show pending request
function showPendingRequest(packageName, amount) {
    const pendingCard = document.getElementById('pendingRequestCard');
    const today = new Date().toISOString().split('T')[0];
    const txId = generateTxId();
    
    document.getElementById('requestPackage').textContent = packageName;
    document.getElementById('requestAmount').textContent = '$' + amount;
    document.getElementById('requestDate').textContent = today;
    document.getElementById('requestTxId').textContent = txId;
    
    pendingCard.style.display = 'block';
    pendingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Handle investment submission
function handleInvestmentSubmit() {
    const amountInput = document.getElementById('investmentAmount');
    const fileInput = document.getElementById('paymentProof');
    const minAmount = parseInt(document.getElementById('minInvestment').textContent.replace('$', ''));
    const enteredAmount = parseInt(amountInput.value);
    
    if (!enteredAmount || enteredAmount < minAmount) {
        alert(`Please enter an amount of at least ${document.getElementById('minInvestment').textContent}`);
        return;
    }
    
    if (!fileInput.files || fileInput.files.length === 0) {
        alert('Please upload a payment screenshot');
        return;
    }
    
    // Determine which package this amount falls into
    let selectedPackage = '';
    if (enteredAmount >= 50000) selectedPackage = 'Diamond';
    else if (enteredAmount >= 15000) selectedPackage = 'Platinum';
    else if (enteredAmount >= 5000) selectedPackage = 'Gold';
    else if (enteredAmount >= 1000) selectedPackage = 'Silver';
    else selectedPackage = 'Bronze';
    
    // Show pending request
    showPendingRequest(selectedPackage, enteredAmount);
    
    // In a real app, you would send this data to the server
    console.log('Investment submitted:', {
        amount: enteredAmount,
        package: selectedPackage,
        file: fileInput.files[0].name
    });
    
    // Reset form
    amountInput.value = '';
    fileInput.value = '';
    document.getElementById('fileName').textContent = 'No file selected';
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('Address copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}

// Initialize the application
function init() {
    createStars();
    populateAddresses();
    populatePackages();
    setupAddressToggle();
    setupFileUpload();
    
    // Add event listeners
    document.getElementById('submitInvestment').addEventListener('click', handleInvestmentSubmit);
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);