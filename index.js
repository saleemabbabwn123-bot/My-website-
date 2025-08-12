// Create falling stars
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 1000;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 12 + 3}s`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        star.style.width = `${Math.random() * 2 + 0.5}px`;
        star.style.height = star.style.width;
        
        container.appendChild(star);
    }
}

// Article data
const articlesData = [
    {
        title: "How to Invest in Crypto Safely",
        description: "Learn the best practices for investing in cryptocurrencies while minimizing risks and maximizing returns.",
        category: "Investment"
    },
    {
        title: "Top 5 Profit Strategies for 2023",
        description: "Discover the most effective trading strategies used by professional crypto investors this year.",
        category: "Trading"
    },
    {
        title: "Understanding Market Trends",
        description: "Learn how to read market charts and identify profitable trends before they happen.",
        category: "Analysis"
    },
    {
        title: "Staking vs Trading: Which is Better?",
        description: "Compare passive income through staking with active trading to find what suits your style.",
        category: "Earnings"
    }
];

// Display articles
function displayArticles() {
    const container = document.getElementById('articles-container');
    container.innerHTML = '';
    
    articlesData.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';
        articleCard.innerHTML = `
            <div class="article-content">
                <div class="article-meta">${article.category}</div>
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="#" class="article-link">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        container.appendChild(articleCard);
    });
}

// Rotate articles every hour
function rotateArticles() {
    // Move first article to end of array
    const firstArticle = articlesData.shift();
    articlesData.push(firstArticle);
    displayArticles();
}

// Fetch live crypto data from Binance API
async function fetchLiveCryptoData() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const data = await response.json();
        
        // Filter top 15 coins
        const topCoins = data.filter(coin => 
            ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'SOLUSDT', 
             'ADAUSDT', 'DOGEUSDT', 'DOTUSDT', 'SHIBUSDT', 'AVAXUSDT',
             'LINKUSDT', 'LTCUSDT', 'UNIUSDT', 'BCHUSDT', 'XLMUSDT'].includes(coin.symbol)
        ).slice(0, 15);
        
        return topCoins.map(coin => ({
            symbol: coin.symbol.replace('USDT', ''),
            price: parseFloat(coin.lastPrice).toFixed(coin.symbol === 'BTCUSDT' ? 2 : 4),
            change: parseFloat(coin.priceChangePercent),
            volume: parseFloat(coin.volume)
        }));
    } catch (error) {
        console.error("Binance API failed, using backup data:", error);
        return getMockCryptoData();
    }
}

// Mock data fallback
function getMockCryptoData() {
    const cryptoData = [
        { symbol: 'BTC', price: (40000 + Math.random() * 2000).toFixed(2), change: (Math.random() * 10 - 5), volume: (10000 + Math.random() * 5000) },
        { symbol: 'ETH', price: (2200 + Math.random() * 200).toFixed(2), change: (Math.random() * 10 - 5), volume: (5000 + Math.random() * 3000) },
        { symbol: 'BNB', price: (300 + Math.random() * 50).toFixed(2), change: (Math.random() * 10 - 5), volume: (2000 + Math.random() * 1000) },
        { symbol: 'XRP', price: (0.55 + Math.random() * 0.1).toFixed(4), change: (Math.random() * 20 - 10), volume: (1000 + Math.random() * 500) },
        { symbol: 'SOL', price: (95 + Math.random() * 20).toFixed(2), change: (Math.random() * 10 - 5), volume: (800 + Math.random() * 400) },
        { symbol: 'ADA', price: (0.45 + Math.random() * 0.1).toFixed(4), change: (Math.random() * 10 - 5), volume: (600 + Math.random() * 300) },
        { symbol: 'DOGE', price: (0.08 + Math.random() * 0.02).toFixed(4), change: (Math.random() * 20 - 10), volume: (500 + Math.random() * 250) },
        { symbol: 'DOT', price: (6.5 + Math.random() * 2).toFixed(2), change: (Math.random() * 10 - 5), volume: (400 + Math.random() * 200) },
        { symbol: 'SHIB', price: (0.000008 + Math.random() * 0.000002).toFixed(8), change: (Math.random() * 20 - 10), volume: (300 + Math.random() * 150) },
        { symbol: 'AVAX', price: (35 + Math.random() * 10).toFixed(2), change: (Math.random() * 10 - 5), volume: (200 + Math.random() * 100) },
        { symbol: 'LINK', price: (15 + Math.random() * 5).toFixed(2), change: (Math.random() * 10 - 5), volume: (150 + Math.random() * 75) },
        { symbol: 'LTC', price: (70 + Math.random() * 15).toFixed(2), change: (Math.random() * 10 - 5), volume: (100 + Math.random() * 50) },
        { symbol: 'UNI', price: (6.2 + Math.random() * 2).toFixed(2), change: (Math.random() * 10 - 5), volume: (80 + Math.random() * 40) },
        { symbol: 'BCH', price: (240 + Math.random() * 50).toFixed(2), change: (Math.random() * 10 - 5), volume: (60 + Math.random() * 30) },
        { symbol: 'XLM', price: (0.12 + Math.random() * 0.03).toFixed(4), change: (Math.random() * 10 - 5), volume: (40 + Math.random() * 20) }
    ];
    
    return cryptoData;
}

// Display crypto data with live graphs
async function displayCryptoData() {
    const data = await fetchLiveCryptoData();
    const container = document.getElementById('coins-container');
    container.innerHTML = '';
    
    data.forEach(coin => {
        const isPositive = coin.change >= 0;
        
        // Generate mini chart data
        const chartData = [];
        let value = 50;
        for (let i = 0; i < 8; i++) {
            value = Math.max(10, Math.min(90, value + (Math.random() - 0.5) * 20));
            chartData.push(value);
        }
        
        const coinCard = document.createElement('div');
        coinCard.className = 'coin-card';
        coinCard.innerHTML = `
            <div class="coin-header">
                <img src="https://cryptologos.cc/logos/${coin.symbol.toLowerCase()}-${coin.symbol.toLowerCase()}-logo.png" alt="${coin.symbol}" class="coin-icon" onerror="this.src='https://cryptologos.cc/logos/bnb-bnb-logo.png'">
                <span class="coin-name">${coin.symbol}</span>
            </div>
            <div class="coin-price">$${coin.price}</div>
            <div class="live-rate">Live rate updating</div>
            <div class="coin-change ${isPositive ? 'positive' : 'negative'}">
                ${isPositive ? '+' : ''}${coin.change.toFixed(2)}%
            </div>
            <div class="coin-chart">
                <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <polyline 
                        fill="none" 
                        stroke="${isPositive ? '#4CAF50' : '#F44336'}" 
                        stroke-width="2" 
                        points="${chartData.map((val, i) => `${i * (100/7)},${50 - val}`).join(' ')}"
                    />
                </svg>
            </div>
        `;
        container.appendChild(coinCard);
    });
}

// Generate wallet addresses
function generateWalletAddresses() {
    const chars = '0123456789ABCDEF';
    const addresses = [];
    
    for (let i = 0; i < 1000; i++) {
        let address = '0x';
        for (let j = 0; j < 40; j++) {
            address += chars[Math.floor(Math.random() * 16)];
        }
        addresses.push(address);
    }
    
    return addresses;
}

// Transaction system
const walletAddresses = generateWalletAddresses();
let usedAddresses = new Set();
let scrollPosition = 0;
let scrollInterval;

// Add new transaction entry
function addTransaction() {
    if (usedAddresses.size >= walletAddresses.length) {
        usedAddresses = new Set(); // Reset if all addresses used
    }
    
    const availableAddresses = walletAddresses.filter(addr => !usedAddresses.has(addr));
    if (availableAddresses.length === 0) return;
    
    const randomAddress = availableAddresses[Math.floor(Math.random() * availableAddresses.length)];
    
    // 80% chance for amount between $100-$2,000, 20% chance for $2,000-$10,000
    const amount = Math.random() > 0.2 ? 
        100 + Math.floor(Math.random() * 1900) : // $100-$2,000
        2000 + Math.floor(Math.random() * 8000); // $2,000-$10,000
        
    const isDeposit = Math.random() > 0.5;
    const status = Math.random() > 0.7 ? 'processing' : 'completed';
    
    usedAddresses.add(randomAddress);
    
    const container = document.getElementById('transactions-demo');
    const entry = document.createElement('div');
    entry.className = 'transaction-entry';
    entry.innerHTML = `
        <div class="transaction-info">
            <span class="transaction-type ${isDeposit ? 'deposit' : 'withdrawal'}">
                ${isDeposit ? 'Deposit' : 'Withdrawal'}
            </span>
            <span class="transaction-address">${randomAddress.substring(0, 3)}...${randomAddress.substring(38)}</span>
        </div>
        <div>
            <span class="transaction-amount ${isDeposit ? 'deposit-amount' : 'withdrawal-amount'}">
                $${amount.toLocaleString()}
            </span>
            <span class="transaction-status ${status}">
                ${status === 'processing' ? 'Processing' : 'Completed'}
            </span>
        </div>
    `;
    container.appendChild(entry);
    
    // Remove old entries if too many
    if (container.children.length > 10) {
        container.removeChild(container.children[0]);
    }
}

// Smooth one-direction scroll (upwards only)
function scrollTransactions() {
    const container = document.getElementById('transactions-demo');
    scrollPosition += 0.1; // Slower scroll speed
    
    // Continuous upward scroll without bouncing
    if (scrollPosition >= 40) {
        scrollPosition = 0;
    }
    
    container.style.transform = `translateY(-${scrollPosition}px)`;
}

// Initialize transactions
function initTransactions() {
    // Add initial transactions
    for (let i = 0; i < 10; i++) {
        addTransaction();
    }
    
    // Start scrolling
    scrollInterval = setInterval(scrollTransactions, 50);
    
    // Add new transaction every 2 seconds
    setInterval(addTransaction, 2000);
}

// Initialize
window.onload = function() {
    createStars();
    displayArticles();
    displayCryptoData();
    initTransactions();
    
    // Rotate articles every hour
    setInterval(rotateArticles, 3600000);
    
    // Update crypto data every second
    setInterval(displayCryptoData, 1000);
};