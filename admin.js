// Get DOM elements
const addUserForm = document.getElementById('add-user-form');
const userList = document.getElementById('user-list');

// Load existing users from auth.js
let users = {
    "admin": "admin123", // Default admin account
    "gf": "gfpassword"    // Example user account
};

// Display initial user list
updateUserList();

// Handle add user form submission
addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;

    if (addUser(username, password)) {
        alert('User added successfully');
        addUserForm.reset();
        updateUserList();
    } else {
        alert('Username already exists');
    }
});

// Add new user
function addUser(username, password) {
    if (users[username]) {
        return false;
    }
    users[username] = password;
    return true;
}

// Update user list display
function updateUserList() {
    userList.innerHTML = '';
    for (const [username, password] of Object.entries(users)) {
        const li = document.createElement('li');
        li.textContent = `${username}`;
        userList.appendChild(li);
    }
}

// Note: In a real implementation, this data would be stored securely
// on a server rather than in the client-side code
