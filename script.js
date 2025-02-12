// Get elements from the document
const chatbox = document.getElementById('chatbox');
const questionInput = document.getElementById('questionInput');
const responses = document.getElementById('responses');
const sendButton = document.getElementById('send-button');

// Cookie Consent elements
const cookieConsent = document.getElementById('cookie-consent');
const acceptButton = document.getElementById('accept-cookies');

// Check if user has accepted cookies
const hasConsent = document.cookie.includes('myCookieName=true');

if (!hasConsent) {
    cookieConsent.classList.remove('hidden');
} else {
    cookieConsent.classList.add('hidden');
}

// Handle cookie acceptance
acceptButton.addEventListener('click', () => {
    cookieConsent.classList.add('hidden');
    document.cookie = 'myCookieName=true; path=/'; // Set session cookie
});

// Function to handle user input and get AI response
async function askQuestion() {
    const userInput = questionInput.value.trim();

    if (!userInput) return; // Don't process empty input

    // Add user message to the chat
    const userMessage = document.createElement('div');
    userMessage.textContent = `Въпрос: ${userInput}`;
    userMessage.classList.add('user-message');
    responses.appendChild(userMessage);

    // Clear the input field
    questionInput.value = '';

    // Call the Cloudflare Worker API
    try {
        const response = await fetch(`https://my-chatbot.alex-r-goranov1.workers.dev/api/chat?q=${encodeURIComponent(userInput)}`);
        const data = await response.json();

        // Add AI response to the chat
        const aiMessage = document.createElement('div');
        aiMessage.textContent = `Сашко отговор: ${data.response}`;
        aiMessage.classList.add('ai-message');
        responses.appendChild(aiMessage);

        // Scroll to the bottom to show new messages
        chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Грешка: Не успяхме да получим отговор от Сашко!';
        errorMessage.classList.add('ai-message');
        responses.appendChild(errorMessage);
    }
}

// Add event listener for send button click
sendButton.addEventListener('click', askQuestion);

// Allow pressing "Enter" to send message
questionInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        askQuestion();
    }
});


