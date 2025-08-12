// Create falling stars with 20x faster animation
document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.getElementById('stars');
    const starCount = 1500;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1 and 3 pixels
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration between 2.5s and 7.5s (20x faster than original)
        const duration = (Math.random() * 5 + 2.5); // Original was 50-150s
        star.style.animationDuration = `${duration}s`;
        
        // Random delay
        star.style.animationDelay = `${Math.random() * 5}s`; // Reduced delay range
        
        starsContainer.appendChild(star);
    }
    
    // Minimum withdrawal amount (editable from admin panel)
    const MIN_WITHDRAWAL = 100; // USDT
    
    // Sample blockchain networks (only USDT networks)
    const blockchainNetworks = [
        { id: 'bep20', name: 'BEP20 (USDT)' },
        { id: 'trc20', name: 'TRC20 (USDT)' },
        { id: 'erc20', name: 'ERC20 (USDT)' }
    ];
    
    // Set minimum withdrawal amount (kept in one line)
    document.getElementById('minAmount').textContent = `${MIN_WITHDRAWAL} USDT`;
    
    // Populate blockchain options
    const blockchainOptions = document.getElementById('blockchainOptions');
    blockchainNetworks.forEach(network => {
        const option = document.createElement('div');
        option.classList.add('blockchain-option');
        option.textContent = network.name;
        option.dataset.id = network.id;
        blockchainOptions.appendChild(option);
    });
    
    // Toggle blockchain options
    const blockchainToggle = document.getElementById('blockchainToggle');
    const selectedBlockchain = document.getElementById('selectedBlockchain');
    
    blockchainToggle.addEventListener('click', () => {
        blockchainOptions.classList.toggle('show');
    });
    
    // Select blockchain option
    document.querySelectorAll('.blockchain-option').forEach(option => {
        option.addEventListener('click', () => {
            selectedBlockchain.textContent = option.textContent;
            blockchainOptions.classList.remove('show');
            document.getElementById('walletAddressGroup').style.display = 'block';
            checkFormCompletion();
        });
    });
    
    // Close blockchain options when clicking outside
    document.addEventListener('click', (e) => {
        if (!blockchainToggle.contains(e.target) && !blockchainOptions.contains(e.target)) {
            blockchainOptions.classList.remove('show');
        }
    });
    
    // Check if form is complete to enable submit button
    function checkFormCompletion() {
        const amount = parseFloat(document.getElementById('amount').value) || 0;
        const blockchainSelected = selectedBlockchain.textContent !== 'Select a blockchain';
        const walletAddress = document.getElementById('walletAddress').value;
        
        // Validate minimum amount
        const isValidAmount = amount >= MIN_WITHDRAWAL;
        
        document.getElementById('submitBtn').disabled = !(isValidAmount && blockchainSelected && walletAddress);
    }
    
    document.getElementById('amount').addEventListener('input', checkFormCompletion);
    document.getElementById('walletAddress').addEventListener('input', checkFormCompletion);
    
    // Form submission
    document.getElementById('submitBtn').addEventListener('click', () => {
        const withdrawalForm = document.getElementById('withdrawalForm');
        const processing = document.getElementById('processing');
        
        withdrawalForm.style.display = 'none';
        processing.style.display = 'block';
        
        // In a real app, you would send this data to your server
        const withdrawalData = {
            amount: document.getElementById('amount').value + ' USDT',
            blockchain: selectedBlockchain.textContent,
            walletAddress: document.getElementById('walletAddress').value,
            status: 'pending',
            date: new Date().toLocaleString()
        };
        
        // Simulate processing delay
        setTimeout(() => {
            // Add to history
            addToHistory(withdrawalData);
            
            // Reset form
            withdrawalForm.style.display = 'block';
            processing.style.display = 'none';
            document.getElementById('amount').value = '';
            selectedBlockchain.textContent = 'Select a blockchain';
            document.getElementById('walletAddress').value = '';
            document.getElementById('walletAddressGroup').style.display = 'none';
            document.getElementById('submitBtn').disabled = true;
            
            // Add to recent withdrawals if amount is >= $100
            if (parseFloat(withdrawalData.amount) >= 100) {
                addToRecent(withdrawalData);
            }
        }, 3000);
    });
    
    // Sample history data (USDT only, all >= $100)
    const historyData = [
        { amount: '150 USDT', wallet: 'TYq...', date: '2023-05-14 09:15', status: 'completed' },
        { amount: '250 USDT', wallet: '0x8...', date: '2023-05-12 18:45', status: 'completed' },
        { amount: '100 USDT', wallet: 'bnb...', date: '2023-05-10 11:20', status: 'completed' },
        { amount: '500 USDT', wallet: 'TNP...', date: '2023-05-08 16:30', status: 'completed' }
    ];
    
    // Sample recent withdrawals (all >= $100)
    let recentWithdrawals = [
        { amount: '120 USDT', wallet: '0x7...' },
        { amount: '200 USDT', wallet: 'TYq...' },
        { amount: '150 USDT', wallet: 'bnb...' },
        { amount: '300 USDT', wallet: 'TNP...' },
        { amount: '100 USDT', wallet: '0x8...' }
    ];
    
    // Track used amounts to prevent duplicates
    const usedAmounts = new Set(recentWithdrawals.map(w => w.amount));
    
    // Network connection status
    let isOnline = true;
    let updateInterval;
    
    // Check network status
    function checkNetworkStatus() {
        isOnline = navigator.onLine;
        const networkStatus = document.getElementById('networkStatus');
        
        if (isOnline) {
            networkStatus.className = 'network-status network-online';
            networkStatus.innerHTML = '<div class="network-indicator online"></div><span>Online - Live Updates</span>';
            startAutoUpdate();
        } else {
            networkStatus.className = 'network-status network-offline';
            networkStatus.innerHTML = '<div class="network-indicator offline"></div><span>Offline - Updates Paused</span>';
            stopAutoUpdate();
        }
    }
    
    // Start auto-updating recent withdrawals
    function startAutoUpdate() {
        if (!updateInterval) {
            updateInterval = setInterval(autoUpdateRecent, 5000);
        }
    }
    
    // Stop auto-updating
    function stopAutoUpdate() {
        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = null;
        }
    }
    
    // Auto-update recent withdrawals (70% $100-$2000, 30% $2000+)
    function autoUpdateRecent() {
        if (!isOnline) return;
        
        // Generate amount based on 70/30 distribution
        let newAmount;
        const isLargeAmount = Math.random() < 0.3; // 30% chance for >$2000
        
        if (isLargeAmount) {
            // $2000-$5000 (30%)
            newAmount = `${Math.floor(Math.random() * 3000) + 2000} USDT`;
        } else {
            // $100-$2000 (70%)
            newAmount = `${Math.floor(Math.random() * 1900) + 100} USDT`;
        }
        
        // Generate a random wallet prefix (first 3 characters)
        const newWallet = generateRandomWalletPrefix() + '...';
        
        // Create new withdrawal
        const newItem = {
            amount: newAmount,
            wallet: newWallet
        };
        
        // Add to recent withdrawals
        recentWithdrawals.unshift(newItem);
        
        // Keep only the last 5 items
        if (recentWithdrawals.length > 5) {
            recentWithdrawals.pop();
        }
        
        // Update the display
        populateRecent();
    }
    
    // Generate random wallet prefix (3 characters)
    function generateRandomWalletPrefix() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < 3; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    // Populate history
    function populateHistory() {
        const historyContainer = document.getElementById('withdrawalHistory');
        historyContainer.innerHTML = ''; // Clear existing
        
        historyData.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            
            historyItem.innerHTML = `
                <div class="history-amount">${item.amount}</div>
                <div class="history-wallet">${item.wallet}</div>
                <div>
                    <div>${item.date}</div>
                    <div class="history-status status-${item.status}">${item.status}</div>
                </div>
            `;
            
            historyContainer.appendChild(historyItem);
        });
    }
    
    // Populate recent withdrawals with new layout
    function populateRecent() {
        const recentContainer = document.getElementById('recentWithdrawals');
        recentContainer.innerHTML = ''; // Clear existing
        
        recentWithdrawals.forEach(item => {
            const recentItem = document.createElement('div');
            recentItem.classList.add('recent-item');
            
            recentItem.innerHTML = `
                <div class="recent-amount">${item.amount}</div>
                <div class="recent-wallet">${item.wallet}</div>
                <div class="recent-label">Withdrawal</div>
            `;
            
            recentContainer.appendChild(recentItem);
        });
    }
    
    // Add new item to history
    function addToHistory(data) {
        const historyContainer = document.getElementById('withdrawalHistory');
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        
        // Format wallet address (show first 3 characters with dots)
        const formattedWallet = data.walletAddress.length > 3 
            ? `${data.walletAddress.substring(0, 3)}...`
            : data.walletAddress + '...';
        
        historyItem.innerHTML = `
            <div class="history-amount">${data.amount}</div>
            <div class="history-wallet">${formattedWallet}</div>
            <div>
                <div>${data.date}</div>
                <div class="history-status status-pending">pending</div>
            </div>
        `;
        
        historyContainer.insertBefore(historyItem, historyContainer.firstChild);
    }
    
    // Add new item to recent withdrawals (only if >= $100)
    function addToRecent(data) {
        const amount = parseFloat(data.amount);
        if (amount < 100) return;
        
        const recentContainer = document.getElementById('recentWithdrawals');
        const recentItem = document.createElement('div');
        recentItem.classList.add('recent-item');
        
        // Format wallet address (show first 3 characters with dots)
        const formattedWallet = data.walletAddress.length > 3 
            ? `${data.walletAddress.substring(0, 3)}...`
            : data.walletAddress + '...';
        
        recentItem.innerHTML = `
            <div class="recent-amount">${data.amount}</div>
            <div class="recent-wallet">${formattedWallet}</div>
            <div class="recent-label">Withdrawal</div>
        `;
        
        // Add to recent withdrawals list
        recentWithdrawals.unshift({
            amount: data.amount,
            wallet: formattedWallet
        });
        
        // Keep only the 5 most recent items
        if (recentWithdrawals.length > 5) {
            recentWithdrawals.pop();
        }
        
        // Update the display
        populateRecent();
    }
    
    // Initialize the page
    function init() {
        populateHistory();
        populateRecent();
        checkNetworkStatus();
        startAutoUpdate();
        
        // Listen for network status changes
        window.addEventListener('online', checkNetworkStatus);
        window.addEventListener('offline', checkNetworkStatus);
    }
    
    // Run initialization when DOM is fully loaded
    init();
});