// Complete list of all countries with flags and codes
const countries = [
    { name: "Afghanistan", code: "+93", flag: "🇦🇫" },
    { name: "Albania", code: "+355", flag: "🇦🇱" },
    { name: "Algeria", code: "+213", flag: "🇩🇿" },
    { name: "Andorra", code: "+376", flag: "🇦🇩" },
    { name: "Angola", code: "+244", flag: "🇦🇴" },
    { name: "Antigua and Barbuda", code: "+1-268", flag: "🇦🇬" },
    { name: "Argentina", code: "+54", flag: "🇦🇷" },
    { name: "Armenia", code: "+374", flag: "🇦🇲" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
    { name: "Austria", code: "+43", flag: "🇦🇹" },
    { name: "Azerbaijan", code: "+994", flag: "🇦🇿" },
    { name: "Bahamas", code: "+1-242", flag: "🇧🇸" },
    { name: "Bahrain", code: "+973", flag: "🇧🇭" },
    { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
    { name: "Barbados", code: "+1-246", flag: "🇧🇧" },
    { name: "Belarus", code: "+375", flag: "🇧🇾" },
    { name: "Belgium", code: "+32", flag: "🇧🇪" },
    { name: "Belize", code: "+501", flag: "🇧🇿" },
    { name: "Benin", code: "+229", flag: "🇧🇯" },
    { name: "Bhutan", code: "+975", flag: "🇧🇹" },
    { name: "Bolivia", code: "+591", flag: "🇧🇴" },
    { name: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦" },
    { name: "Botswana", code: "+267", flag: "🇧🇼" },
    { name: "Brazil", code: "+55", flag: "🇧🇷" },
    { name: "Brunei", code: "+673", flag: "🇧🇳" },
    { name: "Bulgaria", code: "+359", flag: "🇧🇬" },
    { name: "Burkina Faso", code: "+226", flag: "🇧🇫" },
    { name: "Burundi", code: "+257", flag: "🇧🇮" },
    { name: "Cabo Verde", code: "+238", flag: "🇨🇻" },
    { name: "Cambodia", code: "+855", flag: "🇰🇭" },
    { name: "Cameroon", code: "+237", flag: "🇨🇲" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "Central African Republic", code: "+236", flag: "🇨🇫" },
    { name: "Chad", code: "+235", flag: "🇹🇩" },
    { name: "Chile", code: "+56", flag: "🇨🇱" },
    { name: "China", code: "+86", flag: "🇨🇳" },
    { name: "Colombia", code: "+57", flag: "🇨🇴" },
    { name: "Comoros", code: "+269", flag: "🇰🇲" },
    { name: "Congo (Congo-Brazzaville)", code: "+242", flag: "🇨🇬" },
    { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
    { name: "Croatia", code: "+385", flag: "🇭🇷" },
    { name: "Cuba", code: "+53", flag: "🇨🇺" },
    { name: "Cyprus", code: "+357", flag: "🇨🇾" },
    { name: "Czechia (Czech Republic)", code: "+420", flag: "🇨🇿" },
    { name: "Denmark", code: "+45", flag: "🇩🇰" },
    { name: "Djibouti", code: "+253", flag: "🇩🇯" },
    { name: "Dominica", code: "+1-767", flag: "🇩🇲" },
    { name: "Dominican Republic", code: "+1-809, +1-829, +1-849", flag: "🇩🇴" },
    { name: "Ecuador", code: "+593", flag: "🇪🇨" },
    { name: "Egypt", code: "+20", flag: "🇪🇬" },
    { name: "El Salvador", code: "+503", flag: "🇸🇻" },
    { name: "Equatorial Guinea", code: "+240", flag: "🇬🇶" },
    { name: "Eritrea", code: "+291", flag: "🇪🇷" },
    { name: "Estonia", code: "+372", flag: "🇪🇪" },
    { name: "Eswatini", code: "+268", flag: "🇸🇿" },
    { name: "Ethiopia", code: "+251", flag: "🇪🇹" },
    { name: "Fiji", code: "+679", flag: "🇫🇯" },
    { name: "Finland", code: "+358", flag: "🇫🇮" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Gabon", code: "+241", flag: "🇬🇦" },
    { name: "Gambia", code: "+220", flag: "🇬🇲" },
    { name: "Georgia", code: "+995", flag: "🇬🇪" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "Ghana", code: "+233", flag: "🇬🇭" },
    { name: "Greece", code: "+30", flag: "🇬🇷" },
    { name: "Grenada", code: "+1-473", flag: "🇬🇩" },
    { name: "Guatemala", code: "+502", flag: "🇬🇹" },
    { name: "Guinea", code: "+224", flag: "🇬🇳" },
    { name: "Guinea-Bissau", code: "+245", flag: "🇬🇼" },
    { name: "Guyana", code: "+592", flag: "🇬🇾" },
    { name: "Haiti", code: "+509", flag: "🇭🇹" },
    { name: "Honduras", code: "+504", flag: "🇭🇳" },
    { name: "Hungary", code: "+36", flag: "🇭🇺" },
    { name: "Iceland", code: "+354", flag: "🇮🇸" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "Indonesia", code: "+62", flag: "🇮🇩" },
    { name: "Iran", code: "+98", flag: "🇮🇷" },
    { name: "Iraq", code: "+964", flag: "🇮🇶" },
    { name: "Ireland", code: "+353", flag: "🇮🇪" },
    { name: "Israel", code: "+972", flag: "🇮🇱" },
    { name: "Italy", code: "+39", flag: "🇮🇹" },
    { name: "Jamaica", code: "+1-876", flag: "🇯🇲" },
    { name: "Japan", code: "+81", flag: "🇯🇵" },
    { name: "Jordan", code: "+962", flag: "🇯🇴" },
    { name: "Kazakhstan", code: "+7", flag: "🇰🇿" },
    { name: "Kenya", code: "+254", flag: "🇰🇪" },
    { name: "Kiribati", code: "+686", flag: "🇰🇮" },
    { name: "Korea, North", code: "+850", flag: "🇰🇵" },
    { name: "Korea, South", code: "+82", flag: "🇰🇷" },
    { name: "Kosovo", code: "+383", flag: "🇽🇰" },
    { name: "Kuwait", code: "+965", flag: "🇰🇼" },
    { name: "Kyrgyzstan", code: "+996", flag: "🇰🇬" },
    { name: "Laos", code: "+856", flag: "🇱🇦" },
    { name: "Latvia", code: "+371", flag: "🇱🇻" },
    { name: "Lebanon", code: "+961", flag: "🇱🇧" },
    { name: "Lesotho", code: "+266", flag: "🇱🇸" },
    { name: "Liberia", code: "+231", flag: "🇱🇷" },
    { name: "Libya", code: "+218", flag: "🇱🇾" },
    { name: "Liechtenstein", code: "+423", flag: "🇱🇮" },
    { name: "Lithuania", code: "+370", flag: "🇱🇹" },
    { name: "Luxembourg", code: "+352", flag: "🇱🇺" },
    { name: "Madagascar", code: "+261", flag: "🇲🇬" },
    { name: "Malawi", code: "+265", flag: "🇲🇼" },
    { name: "Malaysia", code: "+60", flag: "🇲🇾" },
    { name: "Maldives", code: "+960", flag: "🇲🇻" },
    { name: "Mali", code: "+223", flag: "🇲🇱" },
    { name: "Malta", code: "+356", flag: "🇲🇹" },
    { name: "Marshall Islands", code: "+692", flag: "🇲🇭" },
    { name: "Mauritania", code: "+222", flag: "🇲🇷" },
    { name: "Mauritius", code: "+230", flag: "🇲🇺" },
    { name: "Mexico", code: "+52", flag: "🇲🇽" },
    { name: "Micronesia", code: "+691", flag: "🇫🇲" },
    { name: "Moldova", code: "+373", flag: "🇲🇩" },
    { name: "Monaco", code: "+377", flag: "🇲🇨" },
    { name: "Mongolia", code: "+976", flag: "🇲🇳" },
    { name: "Montenegro", code: "+382", flag: "🇲🇪" },
    { name: "Morocco", code: "+212", flag: "🇲🇦" },
    { name: "Mozambique", code: "+258", flag: "🇲🇿" },
    { name: "Myanmar", code: "+95", flag: "🇲🇲" },
    { name: "Namibia", code: "+264", flag: "🇳🇦" },
    { name: "Nauru", code: "+674", flag: "🇳🇷" },
    { name: "Nepal", code: "+977", flag: "🇳🇵" },
    { name: "Netherlands", code: "+31", flag: "🇳🇱" },
    { name: "New Zealand", code: "+64", flag: "🇳🇿" },
    { name: "Nicaragua", code: "+505", flag: "🇳🇮" },
    { name: "Niger", code: "+227", flag: "🇳🇪" },
    { name: "Nigeria", code: "+234", flag: "🇳🇬" },
    { name: "North Macedonia", code: "+389", flag: "🇲🇰" },
    { name: "Norway", code: "+47", flag: "🇳🇴" },
    { name: "Oman", code: "+968", flag: "🇴🇲" },
    { name: "Pakistan", code: "+92", flag: "🇵🇰" },
    { name: "Palau", code: "+680", flag: "🇵🇼" },
    { name: "Panama", code: "+507", flag: "🇵🇦" },
    { name: "Papua New Guinea", code: "+675", flag: "🇵🇬" },
    { name: "Paraguay", code: "+595", flag: "🇵🇾" },
    { name: "Peru", code: "+51", flag: "🇵🇪" },
    { name: "Philippines", code: "+63", flag: "🇵🇭" },
    { name: "Poland", code: "+48", flag: "🇵🇱" },
    { name: "Portugal", code: "+351", flag: "🇵🇹" },
    { name: "Qatar", code: "+974", flag: "🇶🇦" },
    { name: "Romania", code: "+40", flag: "🇷🇴" },
    { name: "Russia", code: "+7", flag: "🇷🇺" },
    { name: "Rwanda", code: "+250", flag: "🇷🇼" },
    { name: "Saint Kitts and Nevis", code: "+1-869", flag: "🇰🇳" },
    { name: "Saint Lucia", code: "+1-758", flag: "🇱🇨" },
    { name: "Saint Vincent and the Grenadines", code: "+1-784", flag: "🇻🇨" },
    { name: "Samoa", code: "+685", flag: "🇼🇸" },
    { name: "San Marino", code: "+378", flag: "🇸🇲" },
    { name: "Sao Tome and Principe", code: "+239", flag: "🇸🇹" },
    { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
    { name: "Senegal", code: "+221", flag: "🇸🇳" },
    { name: "Serbia", code: "+381", flag: "🇷🇸" },
    { name: "Seychelles", code: "+248", flag: "🇸🇨" },
    { name: "Sierra Leone", code: "+232", flag: "🇸🇱" },
    { name: "Singapore", code: "+65", flag: "🇸🇬" },
    { name: "Slovakia", code: "+421", flag: "🇸🇰" },
    { name: "Slovenia", code: "+386", flag: "🇸🇮" },
    { name: "Solomon Islands", code: "+677", flag: "🇸🇧" },
    { name: "Somalia", code: "+252", flag: "🇸🇴" },
    { name: "South Africa", code: "+27", flag: "🇿🇦" },
    { name: "South Sudan", code: "+211", flag: "🇸🇸" },
    { name: "Spain", code: "+34", flag: "🇪🇸" },
    { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
    { name: "Sudan", code: "+249", flag: "🇸🇩" },
    { name: "Suriname", code: "+597", flag: "🇸🇷" },
    { name: "Sweden", code: "+46", flag: "🇸🇪" },
    { name: "Switzerland", code: "+41", flag: "🇨🇭" },
    { name: "Syria", code: "+963", flag: "🇸🇾" },
    { name: "Taiwan", code: "+886", flag: "🇹🇼" },
    { name: "Tajikistan", code: "+992", flag: "🇹🇯" },
    { name: "Tanzania", code: "+255", flag: "🇹🇿" },
    { name: "Thailand", code: "+66", flag: "🇹🇭" },
    { name: "Timor-Leste", code: "+670", flag: "🇹🇱" },
    { name: "Togo", code: "+228", flag: "🇹🇬" },
    { name: "Tonga", code: "+676", flag: "🇹🇴" },
    { name: "Trinidad and Tobago", code: "+1-868", flag: "🇹🇹" },
    { name: "Tunisia", code: "+216", flag: "🇹🇳" },
    { name: "Turkey", code: "+90", flag: "🇹🇷" },
    { name: "Turkmenistan", code: "+993", flag: "🇹🇲" },
    { name: "Tuvalu", code: "+688", flag: "🇹🇻" },
    { name: "Uganda", code: "+256", flag: "🇺🇬" },
    { name: "Ukraine", code: "+380", flag: "🇺🇦" },
    { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "Uruguay", code: "+598", flag: "🇺🇾" },
    { name: "Uzbekistan", code: "+998", flag: "🇺🇿" },
    { name: "Vanuatu", code: "+678", flag: "🇻🇺" },
    { name: "Vatican City", code: "+379", flag: "🇻🇦" },
    { name: "Venezuela", code: "+58", flag: "🇻🇪" },
    { name: "Vietnam", code: "+84", flag: "🇻🇳" },
    { name: "Yemen", code: "+967", flag: "🇾🇪" },
    { name: "Zambia", code: "+260", flag: "🇿🇲" },
    { name: "Zimbabwe", code: "+263", flag: "🇿🇼" }
];

// Create optimized golden falling stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = Math.min(300, Math.floor(window.innerWidth * window.innerHeight / 1500));
    
    // Clear existing stars
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Smaller size for mobile
        const size = Math.random() * 1.2 + 0.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        
        // Random animation duration (5-15s)
        const duration = Math.random() * 10 + 5;
        star.style.animation = `fall ${duration}s linear infinite`;
        
        // Random delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        // Random opacity
        star.style.opacity = Math.random() * 0.5 + 0.1;
        
        starsContainer.appendChild(star);
    }
}

// Populate country dropdown
function populateCountries() {
    const countrySelect = document.getElementById('countryCode');
    const countryList = document.getElementById('countryList');
    
    // Clear existing options
    countrySelect.innerHTML = '<option value="" disabled selected>Select Country</option>';
    countryList.innerHTML = '';
    
    // Add all countries to both select and search list
    countries.forEach(country => {
        // Add to dropdown
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.flag} ${country.name} (${country.code})`;
        countrySelect.appendChild(option);
        
        // Add to search list
        const listItem = document.createElement('div');
        listItem.classList.add('country-option');
        listItem.innerHTML = `
            <span class="country-flag">${country.flag}</span>
            <span>${country.name} (${country.code})</span>
        `;
        listItem.addEventListener('click', () => {
            countrySelect.value = country.code;
            document.getElementById('countrySearchContainer').classList.remove('visible');
            document.getElementById('countrySearchInput').value = '';
            filterCountries();
        });
        countryList.appendChild(listItem);
    });
}

// Filter countries based on search input
function filterCountries() {
    const searchTerm = document.getElementById('countrySearchInput').value.toLowerCase();
    const countryOptions = document.querySelectorAll('.country-option');
    
    countryOptions.forEach(option => {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            option.style.display = 'flex';
        } else {
            option.style.display = 'none';
        }
    });
}

// Toggle country search dropdown
function toggleCountrySearch() {
    const container = document.getElementById('countrySearchContainer');
    container.classList.toggle('visible');
    
    if (container.classList.contains('visible')) {
        document.getElementById('countrySearchInput').focus();
    }
}

// Password strength indicator
function updatePasswordStrength(password) {
    const weak = document.querySelector('.password-strength .weak');
    const medium = document.querySelector('.password-strength .medium');
    const strong = document.querySelector('.password-strength .strong');
    
    // Reset
    weak.style.background = '';
    medium.style.background = '';
    strong.style.background = '';
    
    if (!password) return;
    
    // Check strength
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    
    // Number check
    if (/\d/.test(password)) strength++;
    
    // Special char check
    if (/[!@#$%^&*]/.test(password)) strength++;
    
    // Capital letter check
    if (/[A-Z]/.test(password)) strength++;
    
    // Update indicators
    if (strength >= 1) {
        weak.style.background = '#ff4d4d';
    }
    if (strength >= 3) {
        medium.style.background = '#ffa500';
    }
    if (strength >= 4) {
        strong.style.background = '#4CAF50';
    }
}

// Validate password
function validatePassword(password) {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const hasCapital = /[A-Z]/.test(password);
    
    return (
        password.length >= minLength &&
        hasNumber &&
        hasSpecialChar &&
        hasCapital
    );
}

// Show loading animation
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.add('active');
    
    // Redirect after 3 seconds
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 3000);
}

// Google Sign Up
function handleGoogleSignup() {
    const phone = prompt('Please enter your phone number for verification:');
    if (phone) {
        showLoading();
    } else {
        alert('Phone number is required for Google sign up.');
    }
}

// Initialize everything when page loads
window.addEventListener('load', function() {
    // Create optimized golden falling stars
    createStars();
    
    // Reposition stars on resize
    window.addEventListener('resize', createStars);
    
    // Populate country dropdown
    populateCountries();
    
    // Country code search functionality
    document.getElementById('countryCode').addEventListener('click', toggleCountrySearch);
    document.getElementById('countrySearchInput').addEventListener('input', filterCountries);
    
    // Close country dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.country-select-wrapper')) {
            document.getElementById('countrySearchContainer').classList.remove('visible');
        }
    });
    
    // Password strength real-time update
    document.getElementById('password').addEventListener('input', function(e) {
        updatePasswordStrength(e.target.value);
    });
    
    // Google signup button
    document.getElementById('googleSignupBtn').addEventListener('click', handleGoogleSignup);
    
    // Form submission
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate password
        if (!validatePassword(password)) {
            alert('Password must contain:\n- At least 8 characters\n- One number (0-9)\n- One special character (!@#$%^&*)\n- One uppercase letter (A-Z)');
            return;
        }
        
        // Check password match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Show loading animation
        showLoading();
    });
});