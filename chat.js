// Get DOM elements
const chatWindow = document.getElementById('chat-window');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const statusIndicator = document.getElementById('connection-status');

// Initialize Socket.IO connection
const socket = io();

// Connection status handling
socket.on('connect', () => {
    statusIndicator.textContent = 'Connected';
    statusIndicator.style.color = 'green';
});

socket.on('disconnect', () => {
    statusIndicator.textContent = 'Disconnected';
    statusIndicator.style.color = 'red';
});


// Initialize chat
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    
    if (message) {
        sendMessage(message);
        messageInput.value = '';
    }
});

// Display message in chat window
function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    if (sender === window.currentUser) {
        messageElement.classList.add('self');
        messageElement.textContent = `You: ${message}`;
    } else {
        messageElement.textContent = `${sender}: ${message}`;
    }
    
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Send message via Socket.IO
function sendMessage(message) {
    if (message) {
        socket.emit('chat message', {
            sender: window.currentUser,
            message: message
        });
    }
}

// Receive messages from server
socket.on('chat message', (data) => {
    displayMessage(data.sender, data.message);
});


// Initial welcome message
socket.on('connect', () => {
    displayMessage('System', 'Welcome to the private chat!');
});
