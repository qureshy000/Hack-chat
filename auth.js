// Hardcoded users (for initial implementation)
const users = {
    "admin": "admin123", // Default admin account
    "gf": "gfpassword"  // Example user account
};

// Get DOM elements
const authContainer = document.getElementById('auth-container');
const chatContainer = document.getElementById('chat-container');
const loginForm = document.getElementById('login-form');

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (authenticateUser(username, password)) {
        // Successful login
        authContainer.classList.add('hidden');
        chatContainer.classList.remove('hidden');
        startChatSession(username);
    } else {
        alert('Invalid username or password');
    }
});

// Authentication function
function authenticateUser(username, password) {
    return users[username] && users[username] === password;
}

// Start chat session
function startChatSession(username) {
    // Initialize chat with the logged-in username
    window.currentUser = username;
    console.log(`${username} logged in successfully`);
}
