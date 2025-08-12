// Knowledge Base for Crypto Investment
const investmentKB = {
    "investment": [
        {
            "questionKeywords": ["invest", "how to start", "begin", "deposit"],
            "answer": `To start investing with CryptoInvest Pro:
            <ol>
                <li>Register an account on our platform</li>
                <li>Complete your KYC verification</li>
                <li>Go to the 'Deposit' section in your dashboard</li>
                <li>Select your preferred cryptocurrency (BTC, ETH, USDT, etc.)</li>
                <li>Choose an investment package that suits your goals</li>
                <li>Transfer the required minimum amount</li>
                <li>Your investment will be activated immediately</li>
            </ol>
            <p>The minimum investment amount is $100 or equivalent in crypto.</p>`,
            "sources": ["CryptoInvest Pro Terms"],
            "related": ["investment packages", "minimum deposit"]
        },
        {
            "questionKeywords": ["package", "plan", "return", "percentage"],
            "answer": `We offer several investment packages with daily returns:
            <table class="package-table">
                <tr>
                    <th>Package</th>
                    <th>Investment Range</th>
                    <th>Daily Return</th>
                    <th>Duration</th>
                </tr>
                <tr>
                    <td>Starter</td>
                    <td>$100 - $1,000</td>
                    <td><span class="profit-badge">1.5%</span></td>
                    <td>30 days</td>
                </tr>
                <tr>
                    <td>Professional</td>
                    <td>$1,001 - $10,000</td>
                    <td><span class="profit-badge">2.2%</span></td>
                    <td>45 days</td>
                </tr>
                <tr>
                    <td>Premium</td>
                    <td>$10,001 - $50,000</td>
                    <td><span class="profit-badge">3.0%</span></td>
                    <td>60 days</td>
                </tr>
                <tr>
                    <td>VIP</td>
                    <td>$50,001+</td>
                    <td><span class="profit-badge">4.0%</span></td>
                    <td>90 days</td>
                </tr>
            </table>
            <p>Returns are calculated daily and credited to your account balance at midnight UTC.</p>`,
            "sources": ["Investment Plans 2023"],
            "related": ["profit calculation", "compound interest"]
        },
        {
            "questionKeywords": ["profit", "daily", "how much", "earn"],
            "answer": `Your daily profit depends on:
            <ul>
                <li>The package you selected</li>
                <li>Your investment amount</li>
                <li>Whether you choose to compound earnings</li>
            </ul>
            
            <p><strong>Example Calculation:</strong><br>
            If you invest $5,000 in our Professional package (2.2% daily):<br>
            Daily profit = $5,000 × 2.2% = $110<br>
            Monthly profit = $110 × 30 = $3,300</p>
            
            <p>Profits are automatically credited to your account daily and can be withdrawn or reinvested.</p>`,
            "sources": ["Profit Calculation Guide"],
            "related": ["withdrawal process", "compounding"]
        },
        {
            "questionKeywords": ["withdraw", "withdrawal", "cash out", "how to get money"],
            "answer": `<h4>Complete Withdrawal Process:</h4>
            <ol class="withdrawal-steps">
                <li>Ensure your profit balance meets the minimum withdrawal amount ($50)</li>
                <li>Login to your CryptoInvest Pro dashboard</li>
                <li>Navigate to the 'Wallet' section</li>
                <li>Select your preferred blockchain network (ERC-20, BEP-20, TRC-20)</li>
                <li>Enter the exact wallet address for withdrawals (double-check this)</li>
                <li>Input the amount you wish to withdraw</li>
                <li>Click 'Withdraw' and confirm the transaction</li>
            </ol>
            
            <p><strong>Withdrawal Policies:</strong></p>
            <ul>
                <li>Minimum withdrawal: $50 or equivalent</li>
                <li>Processing time: 24-48 hours for crypto withdrawals</li>
                <li>Initial capital is locked until the end of your investment period</li>
                <li>Withdrawal fees: 0.5% of transaction amount (minimum $1)</li>
                <li>Daily withdrawal limit: $10,000 unless VIP member</li>
            </ul>`,
            "sources": ["Withdrawal Policy v3.1"],
            "related": ["withdrawal limits", "processing time"]
        },
        {
            "questionKeywords": ["strategy", "trading", "how you make profit", "experience"],
            "answer": `Our professional trading team uses a combination of strategies to generate consistent returns:
            <ul>
                <li><strong>Algorithmic Trading:</strong> Advanced bots executing high-frequency trades based on 15+ technical indicators</li>
                <li><strong>Arbitrage:</strong> Exploiting price differences across 8 major exchanges with latency under 50ms</li>
                <li><strong>Market Making:</strong> Providing liquidity to earn spreads with 0.8-1.5% daily returns</li>
                <li><strong>Technical Analysis:</strong> Our team has 25+ years combined experience in crypto markets</li>
                <li><strong>Portfolio Diversification:</strong> 60% BTC/ETH, 30% stablecoins, 10% altcoins</li>
            </ul>
            
            <p>We maintain a conservative risk profile, never risking more than 2% of capital on any single trade. Our historical success rate is 82% profitable trades over the last 3 years.</p>
            
            <p><strong>Experience Matters:</strong><br>
            Our lead traders have successfully navigated multiple market cycles since 2016, including the 2018 bear market and 2020 COVID crash, consistently delivering profits to our investors.</p>`,
            "sources": ["Trading Strategy Whitepaper 2023", "Performance Reports"],
            "related": ["risk management", "performance history"]
        },
        {
            "questionKeywords": ["safe", "secure", "protection", "risk"],
            "answer": `We prioritize the security of your investments through:
            <ul>
                <li><strong>Cold Storage:</strong> 95% of funds kept in offline wallets across multiple geographical locations</li>
                <li><strong>Insurance:</strong> All digital assets are insured against theft up to $50 million</li>
                <li><strong>2FA Authentication:</strong> Required for all account access and withdrawals</li>
                <li><strong>Regular Audits:</strong> Quarterly financial audits by third-party firm CryptoAudit LLC</li>
                <li><strong>DDoS Protection:</strong> Enterprise-grade Cloudflare protection</li>
                <li><strong>Smart Contracts:</strong> All profit distributions are automated via audited smart contracts</li>
                <li><strong>Bank-Grade Encryption:</strong> 256-bit SSL encryption for all transactions</li>
            </ul>
            
            <p>While crypto investments carry inherent risks, we implement multiple safeguards to protect your capital and maintain transparency.</p>`,
            "sources": ["Security Protocol v2.3", "Insurance Policy"],
            "related": ["insurance coverage", "audit reports"]
        }
    ]
};

// DOM Elements
const submitBtn = document.getElementById('submitQuery');
const userQuestion = document.getElementById('userQuestion');
const autoResponse = document.getElementById('autoResponse');
const viewAnswerBtns = document.querySelectorAll('.view-answer');
const faqCards = document.querySelectorAll('.faq-card');
const feedbackModal = document.getElementById('feedbackModal');
const closeFeedback = document.getElementById('closeFeedback');

// Extract keywords from question
function extractKeywords(question) {
    const stopWords = ['what', 'how', 'does', 'do', 'the', 'a', 'an', 'is', 'are', 'for', 'in', 'on', 'at', 'to'];
    return question.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.includes(word));
}

// Find best match in knowledge base
function findBestMatch(keywords) {
    let bestMatch = null;
    let highestScore = 0;

    // Search through all categories
    for (const category in investmentKB) {
        investmentKB[category].forEach(entry => {
            let score = 0;
            entry.questionKeywords.forEach(keyword => {
                if (keywords.includes(keyword)) {
                    score += 1;
                }
            });
            
            if (score > highestScore) {
                highestScore = score;
                bestMatch = {
                    answer: entry.answer,
                    sources: entry.sources,
                    related: entry.related,
                    confidence: score / entry.questionKeywords.length
                };
            }
        });
    }

    return bestMatch || {
        answer: "Thank you for your question about our crypto investment platform. While I couldn't find a specific answer, our support team will review your query. In the meantime, you might want to ask about:<ul><li>Our investment packages</li><li>How daily profits work</li><li>The withdrawal process</li><li>Our trading strategy</li></ul>",
        confidence: 0
    };
}

// Generate response HTML
function generateResponse(match) {
    let html = match.answer;
    
    if (match.sources) {
        html += `<div class="sources" style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed rgba(255, 215, 0, 0.3);">
            <strong style="color: var(--golden);">Sources:</strong> ${match.sources.join(', ')}
        </div>`;
    }
    
    if (match.related && match.related.length > 0) {
        html += `<div class="related" style="margin-top: 15px;">
            <strong style="color: var(--golden);">Related Questions:</strong>
            <ul style="padding-left: 20px; margin-top: 5px;">`;
        
        match.related.forEach(item => {
            html += `<li style="margin-bottom: 5px;">${item}</li>`;
        });
        
        html += `</ul></div>`;
    }
    
    if (match.confidence < 0.4) {
        html += `<div class="feedback" style="margin-top: 20px; background: rgba(255, 215, 0, 0.1); padding: 15px; border-radius: 5px; border-left: 3px solid var(--golden);">
            <p>Was this answer helpful? 
                <button class="feedback-btn yes-btn" style="background: transparent; border: 1px solid var(--golden); color: var(--golden); padding: 3px 10px; margin: 0 5px; border-radius: 3px; cursor: pointer;">Yes</button>
                <button class="feedback-btn no-btn" style="background: transparent; border: 1px solid var(--golden); color: var(--golden); padding: 3px 10px; margin: 0 5px; border-radius: 3px; cursor: pointer;">No</button>
            </p>
        </div>`;
    }
    
    return html;
}

// Handle question submission
submitBtn.addEventListener('click', function() {
    const question = userQuestion.value.trim();
    
    if (!question) {
        autoResponse.innerHTML = '<p style="color: #ff6b6b;">Please enter your investment question first.</p>';
        return;
    }
    
    // Show loading state
    autoResponse.innerHTML = '<p>Searching our knowledge base... <span class="loading-dots"></span></p>';
    
    // Simulate API call delay
    setTimeout(() => {
        const keywords = extractKeywords(question);
        const bestMatch = findBestMatch(keywords);
        autoResponse.innerHTML = generateResponse(bestMatch);
        
        // Add event listeners to feedback buttons if they exist
        document.querySelectorAll('.yes-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                showFeedbackModal();
            });
        });
        
        document.querySelectorAll('.no-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                showFeedbackModal();
                // In a real implementation, you might want to track negative feedback
            });
        });
    }, 1000);
});

// Show feedback modal
function showFeedbackModal() {
    feedbackModal.style.display = 'flex';
    setTimeout(() => {
        feedbackModal.style.opacity = '1';
    }, 10);
}

// Close feedback modal
closeFeedback.addEventListener('click', function() {
    feedbackModal.style.opacity = '0';
    setTimeout(() => {
        feedbackModal.style.display = 'none';
    }, 300);
});

// Handle FAQ card clicks
faqCards.forEach((card, index) => {
    card.addEventListener('click', function(e) {
        if (e.target.classList.contains('view-answer')) {
            const questions = [
                "How do I invest in your platform?",
                "What investment packages do you offer?",
                "How are daily profits calculated?",
                "How do I withdraw my profits?",
                "What trading strategy do you use?",
                "How do you secure my investments?"
            ];
            
            userQuestion.value = questions[index];
            submitBtn.click();
        }
    });
});

// Allow pressing Enter in textarea to submit
userQuestion.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitBtn.click();
    }
});