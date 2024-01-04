// Function to append a message to the chat box
function appendMessage(sender, message, senderClass) {
    let chatBox = document.getElementById('chat-box');
    let msgDiv = document.createElement('div');
    let msgContent = document.createElement('div');
    let msgSender = document.createElement('span');
    let msgText = document.createElement('span');

    msgSender.textContent = sender + ": ";
    msgText.textContent = message;

    msgDiv.classList.add('message', senderClass);
    msgContent.classList.add('message-content');
    msgContent.appendChild(msgSender);
    msgContent.appendChild(msgText);
    msgDiv.appendChild(msgContent);

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the newest message
}

// Function to create and return a typing indicator element
function createTypingIndicator() {
    let typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.style.display = 'none'; // Initially hidden
    typingIndicator.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>`;
    return typingIndicator;
}

// Insert typing indicator above the message form
document.addEventListener('DOMContentLoaded', function() {
    let chatContainer = document.getElementById('chat-container');
    let messageForm = document.getElementById('message-form');
    chatContainer.insertBefore(createTypingIndicator(), messageForm);

    // Event listener for login button
    document.getElementById('login-btn').addEventListener('click', function() {
        window.location.href = '/login'; // Redirect to the login page
    });
});

// Event listener for the message form submission
document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let messageInput = document.getElementById('message-input');
    let message = messageInput.value;
    messageInput.value = '';

    appendMessage("User", message, 'user');

    // Show typing indicator
    let typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = 'flex';

    // Send the message to the server
    fetch('/send_message', {
        method: 'POST',
        body: new URLSearchParams('message=' + message),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Hide typing indicator
        typingIndicator.style.display = 'none';

        // Append message from bot
        appendMessage('Bot', data.response, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
        // Hide typing indicator in case of error
        typingIndicator.style.display = 'none';
    });
});


//voice 

document.addEventListener('DOMContentLoaded', function() {
    // Check if the browser supports SpeechRecognition
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    if (typeof SpeechRecognition === "undefined") {
        alert("Your browser does not support speech recognition. Please try a different browser.");
    } else {
        let recognition = new SpeechRecognition();
        let isListening = false;
        const messageInput = document.getElementById('message-input');
        const voiceBtn = document.getElementById('voice-btn');

        recognition.continuous = true;
        recognition.interimResults = true; // Get results in real-time
        recognition.onresult = function(event) {
            const lastResult = event.results[event.results.length - 1];
            if (lastResult.isFinal) {
                messageInput.value = lastResult[0].transcript;
                recognition.stop();
                isListening = false;
            }
        };

        voiceBtn.addEventListener('click', function() {
            if (isListening) {
                recognition.stop();
                isListening = false;
            } else {
                recognition.start();
                isListening = true;
            }
        });
    }
});

