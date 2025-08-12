// Track task completion status and last claim date/time
let dailyTasksCompleted = false;
let lastClaimDateTime = null;
let todaysProfit = 245.50;
let hasClaimedToday = false;

function checkTasksCompletion() {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    const allTasks = ['whatsapp-task', 'facebook-task', 'youtube-task', 'tiktok-task', 'flip-coin-task', 'bitcoin-task', 'ethereum-task', 'bnb-task'];
    return allTasks.every(task => completedTasks.includes(task));
}

function updateClaimButton() {
    const claimBtn = document.getElementById('claimProfitBtn');
    const tasksCompleted = checkTasksCompletion();
    
    if (hasClaimedToday) {
        claimBtn.classList.remove('btn-claim');
        claimBtn.classList.add('btn-gold');
        claimBtn.textContent = 'Already Claimed';
        claimBtn.disabled = true;
    } else if (tasksCompleted) {
        claimBtn.classList.remove('btn-gold');
        claimBtn.classList.add('btn-claim');
        claimBtn.textContent = 'Claim Profit';
        claimBtn.onclick = handleProfitClaim;
        claimBtn.disabled = false;
    } else {
        claimBtn.classList.remove('btn-claim');
        claimBtn.classList.add('btn-gold');
        claimBtn.textContent = 'Complete Tasks First';
        claimBtn.onclick = function() {
            window.location.href = 'tasks.html';
        };
        claimBtn.disabled = false;
    }
}

function handleProfitClaim() {
    if (hasClaimedToday) {
        document.getElementById('alreadyClaimedPopup').classList.add('active');
        return;
    }
    
    const loading = showGoldenLoading("Claiming Your Profit");
    
    setTimeout(() => {
        if (document.body.contains(loading)) {
            document.body.removeChild(loading);
        }
        
        const now = new Date();
        const usaTimeStr = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"})).toISOString();
        lastClaimDateTime = usaTimeStr;
        hasClaimedToday = true;
        
        localStorage.setItem('lastClaimDateTime', lastClaimDateTime);
        localStorage.setItem('hasClaimedToday', 'true');
        
        alert(`Successfully claimed $${todaysProfit.toFixed(2)}!`);
        updateClaimButton();
    }, 2000);
}

function isNewDayInUSATime() {
    const now = new Date();
    const usaTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
    
    if (!lastClaimDateTime) return true;
    
    const lastClaimDate = new Date(lastClaimDateTime);
    const lastClaimUSATime = new Date(lastClaimDate.toLocaleString("en-US", {timeZone: "America/New_York"}));
    
    return usaTime.getDate() !== lastClaimUSATime.getDate() || 
           usaTime.getMonth() !== lastClaimUSATime.getMonth() || 
           usaTime.getFullYear() !== lastClaimUSATime.getFullYear();
}

// Modern Golden Loading Animation
function showGoldenLoading(message = "Processing...") {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'golden-loading';
    loadingDiv.innerHTML = `
        <div class="golden-loader">
            <div class="golden-orb"></div>
            <div class="golden-ring"></div>
            <div class="golden-ring"></div>
        </div>
        <div class="golden-loading-text">${message}</div>
    `;
    document.body.appendChild(loadingDiv);
    
    setTimeout(() => {
        if(document.body.contains(loadingDiv)) {
            document.body.removeChild(loadingDiv);
        }
    }, 2000);
    
    return loadingDiv;
}

function navigateTo(page) {
    const loading = showGoldenLoading("Loading Dashboard");
    
    setTimeout(() => {
        if (document.body.contains(loading)) {
            document.body.removeChild(loading);
        }
        
        window.location.href = page;
    }, 2000);
}

function logout() {
    showGoldenLoading("Logging Out");
    
    setTimeout(() => {
        localStorage.removeItem('lastClaimDateTime');
        localStorage.removeItem('hasClaimedToday');
        localStorage.removeItem('completedTasks');
        
        window.location.href = 'login.html';
        
        if(window.history && window.history.pushState) {
            window.history.pushState(null, null, 'login.html');
            window.addEventListener('popstate', function() {
                window.history.pushState(null, null, 'login.html');
            });
        }
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Show welcome popup on first load
    setTimeout(() => {
        document.getElementById('welcomePopup').classList.add('active');
    }, 500);
    
    document.getElementById('closeWelcome').addEventListener('click', function() {
        document.getElementById('welcomePopup').classList.remove('active');
    });
    
    document.getElementById('continueToDashboard').addEventListener('click', function() {
        document.getElementById('welcomePopup').classList.remove('active');
    });
    
    // Load saved state
    lastClaimDateTime = localStorage.getItem('lastClaimDateTime');
    hasClaimedToday = localStorage.getItem('hasClaimedToday') === 'true';
    
    if (isNewDayInUSATime()) {
        hasClaimedToday = false;
        todaysProfit = 245.50;
        localStorage.removeItem('hasClaimedToday');
    }
    
    updateClaimButton();
    document.getElementById('claimProfitBtn').addEventListener('click', handleProfitClaim);
    
    document.getElementById('goToTasksBtn').addEventListener('click', function() {
        document.getElementById('taskPopup').classList.remove('active');
        navigateTo('tasks.html');
    });
    
    document.getElementById('closeTaskPopup').addEventListener('click', function() {
        document.getElementById('taskPopup').classList.remove('active');
    });
    
    document.getElementById('closeAlreadyClaimedPopup').addEventListener('click', function() {
        document.getElementById('alreadyClaimedPopup').classList.remove('active');
    });
    
    const toggleMenu = document.getElementById('toggleMenu');
    const navMenu = document.getElementById('navMenu');
    
    toggleMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });

    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const referralLink = document.querySelector('.referral-link-container').textContent.trim();
            navigator.clipboard.writeText(referralLink).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            });
        });
    }

    const closeNodes = document.getElementById('closeNodes');
    const nodesPopup = document.getElementById('nodesPopup');
    const nodeButtons = [];
    
    function addNodeButtonEvents() {
        document.querySelectorAll('.view-nodes').forEach(btn => {
            if (nodeButtons.includes(btn)) return;
            
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                nodesPopup.classList.add('active');
            });
            
            nodeButtons.push(btn);
        });
    }
    
    closeNodes.addEventListener('click', () => {
        nodesPopup.classList.remove('active');
    });

    const transactionsList = document.getElementById('transactionsList');
    const transactionTypes = ['withdrawal', 'deposit'];
    const transactionStatuses = ['processing', 'completed'];
    
    const walletPrefixes = {
        btc: ['1', '3', 'bc1'],
        eth: ['0x'],
        bnb: ['bnb', '0x'],
        xrp: ['r'],
        ltc: ['L', 'M', '3'],
        usdt: ['1', '3', '0x']
    };
    
    function generateRealisticWallet(type) {
        const prefixes = walletPrefixes[type] || ['1', '3', '0x'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const chars = '0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
        let wallet = prefix;
        
        for (let i = 0; i < (type === 'xrp' ? 25 : 32); i++) {
            wallet += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        if (wallet.length > 6) {
            return wallet.substr(0, 3) + '...' + wallet.substr(-3);
        }
        return wallet;
    }
    
    function generateTransactionAmount() {
        const rand = Math.random();
        
        if (rand < 0.8) {
            return Math.floor(100 + Math.random() * 900);
        } 
        else if (rand < 0.9) {
            return Math.floor(1000 + Math.random() * 4000);
        } 
        else {
            return Math.floor(5000 + Math.random() * 10000);
        }
    }
    
    function addInitialTransactions() {
        transactionsList.innerHTML = '';
        
        for (let i = 0; i < 5; i++) {
            addRandomTransaction();
        }
    }
    
    function addRandomTransaction() {
        const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
        const amount = generateTransactionAmount();
        const status = transactionStatuses[Math.floor(Math.random() * transactionStatuses.length)];
        const cryptoTypes = Object.keys(walletPrefixes);
        const cryptoType = cryptoTypes[Math.floor(Math.random() * cryptoTypes.length)];
        const wallet = generateRealisticWallet(cryptoType);
        
        const transactionItem = document.createElement('div');
        transactionItem.className = 'withdrawal-item';
        
        if (type === 'deposit') {
            transactionItem.innerHTML = `
                <div class="withdrawal-info">
                    <span class="transaction-type deposit">Deposit:</span>
                    <div class="withdrawal-amount deposit">+$${amount.toFixed(2)}</div>
                    <div class="withdrawal-wallet">${wallet}</div>
                </div>
                <div class="withdrawal-status status-${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</div>
            `;
        } else {
            transactionItem.innerHTML = `
                <div class="withdrawal-info">
                    <span class="transaction-type loss">Withdraw:</span>
                    <div class="withdrawal-amount loss">-$${amount.toFixed(2)}</div>
                    <div class="withdrawal-wallet">${wallet}</div>
                </div>
                <div class="withdrawal-status status-${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</div>
            `;
        }
        
        transactionsList.insertBefore(transactionItem, transactionsList.firstChild);
        
        if (transactionsList.children.length > 10) {
            transactionsList.removeChild(transactionsList.lastChild);
        }
    }
    
    addInitialTransactions();
    setInterval(addRandomTransaction, 8000);

    async function fetchCryptoPrices() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,ripple,solana,cardano,polkadot,dogecoin&order=market_cap_desc&per_page=10&page=1&sparkline=false');
            
            if (!response.ok) {
                throw new Error(`CoinGecko API error: ${response.status}`);
            }
            
            const data = await response.json();
            updateCoinTable(data);
            
        } catch (error) {
            console.error('CoinGecko API failed, trying backup API:', error);
            
            try {
                const response = await fetch('https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,binance-coin,ripple,solana,cardano,polkadot,dogecoin');
                
                if (!response.ok) {
                    throw new Error(`CoinCap API error: ${response.status}`);
                }
                
                const data = await response.json();
                const formattedData = data.data.map(coin => ({
                    symbol: coin.symbol,
                    current_price: parseFloat(coin.priceUsd),
                    price_change_percentage_24h: parseFloat(coin.changePercent24Hr)
                }));
                
                updateCoinTable(formattedData);
                
            } catch (backupError) {
                console.error('Both APIs failed, using fallback data:', backupError);
                useFallbackData();
            }
        }
    }
    
    function updateCoinTable(data) {
        const coinsTableBody = document.getElementById('coinsTableBody');
        coinsTableBody.innerHTML = '';
        
        data.forEach(coin => {
            const change24h = coin.price_change_percentage_24h;
            const change12h = (change24h * 0.5) + (Math.random() * 0.5 - 0.25);
            const changeClass = change12h >= 0 ? 'profit' : 'loss';
            const changeSymbol = change12h >= 0 ? '↑' : '↓';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="coin-name">${coin.symbol.toUpperCase()}</td>
                <td>$${coin.current_price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td class="${changeClass}">${change12h.toFixed(2)}% ${changeSymbol}</td>
                <td><button class="view-nodes">Nodes</button></td>
            `;
            coinsTableBody.appendChild(row);
        });
        
        addNodeButtonEvents();
    }
    
    function useFallbackData() {
        const coinsTableBody = document.getElementById('coinsTableBody');
        coinsTableBody.innerHTML = `
            <tr>
                <td class="coin-name">BTC</td>
                <td>$${(42000 + Math.random() * 2000).toFixed(2)}</td>
                <td class="${Math.random() > 0.5 ? 'profit' : 'loss'}">${(Math.random() * 2).toFixed(2)}% ${Math.random() > 0.5 ? '↑' : '↓'}</td>
                <td><button class="view-nodes">Nodes</button></td>
            </tr>
            <tr>
                <td class="coin-name">ETH</td>
                <td>$${(2300 + Math.random() * 200).toFixed(2)}</td>
                <td class="${Math.random() > 0.5 ? 'profit' : 'loss'}">${(Math.random() * 2).toFixed(2)}% ${Math.random() > 0.5 ? '↑' : '↓'}</td>
                <td><button class="view-nodes">Nodes</button></td>
            </tr>
            <tr>
                <td class="coin-name">BNB</td>
                <td>$${(300 + Math.random() * 20).toFixed(2)}</td>
                <td class="${Math.random() > 0.5 ? 'profit' : 'loss'}">${(Math.random() * 2).toFixed(2)}% ${Math.random() > 0.5 ? '↑' : '↓'}</td>
                <td><button class="view-nodes">Nodes</button></td>
            </tr>
            <tr>
                <td class="coin-name">XRP</td>
                <td>$${(0.5 + Math.random() * 0.3).toFixed(2)}</td>
                <td class="${Math.random() > 0.5 ? 'profit' : 'loss'}">${(Math.random() * 2).toFixed(2)}% ${Math.random() > 0.5 ? '↑' : '↓'}</td>
                <td><button class="view-nodes">Nodes</button></td>
            </tr>
            <tr>
                <td class="coin-name">SOL</td>
                <td>$${(90 + Math.random() * 10).toFixed(2)}</td>
                <td class="${Math.random() > 0.5 ? 'profit' : 'loss'}">${(Math.random() * 2).toFixed(2)}% ${Math.random() > 0.5 ? '↑' : '↓'}</td>
                <td><button class="view-nodes">Nodes</button></td>
            </tr>
            <tr>
                <td class="coin-name">ADA</td>
                <td>$${(0.4 + Math.random() * 0.1).toFixed(2)}</td>
                <td class="${Math.random() > 0.5 ? 'profit' : 'loss'}">${(Math.random() * 2).toFixed(2)}% ${Math.random() > 0.5 ? '↑' : '↓'}</td>
                <td><button class="view-nodes">Nodes</button></td>
            </tr>
            <tr>
                <td class="coin-name">DOT</td>
                <td>$${(6 + Math.random() * 1).toFixed(2)}</td>
                <td class="${Math.random() > 0.5 ? 'profit' : 'loss'}">${(Math.random() * 2).toFixed(2)}% ${Math.random() > 0.5 ? '↑' : '↓'}</td>
                <td><button class="view-nodes">Nodes</button></td>
            </tr>
            <tr>
                <td class="coin-name">DOGE</td>
                <td>$${(0.1 + Math.random() * 0.02).toFixed(2)}</td>
                <td class="${Math.random() > 0.5 ? 'profit' : 'loss'}">${(Math.random() * 2).toFixed(2)}% ${Math.random() > 0.5 ? '↑' : '↓'}</td>
                <td><button class="view-nodes">Nodes</button></td>
            </tr>
        `;
        
        addNodeButtonEvents();
    }

    fetchCryptoPrices();
    setInterval(fetchCryptoPrices, 1000);
    
    setInterval(function() {
        if (isNewDayInUSATime()) {
            hasClaimedToday = false;
            todaysProfit = 245.50;
            localStorage.removeItem('hasClaimedToday');
            updateClaimButton();
        }
    }, 60000);
});

function simulateTasksCompletion() {
    completeDailyTasks();
}