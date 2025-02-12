// Cookie Consent elements
const cookieConsent = document.getElementById('cookie-consent');
const acceptButton = document.getElementById('accept-cookies');

// Cookie Consent Logic
const hasConsent = document.cookie.includes('myCookieName=true'); // Replace 'myCookieName'

if (!hasConsent) {
    cookieConsent.classList.remove('hidden');
} else {
    cookieConsent.classList.add('hidden');
}

acceptButton.addEventListener('click', () => {
    cookieConsent.classList.add('hidden');
    document.cookie = 'myCookieName=true; path=/'; // Session cookie
});

// Function to handle user input and get AI response
async function askQuestion() {
    const userInput = document.getElementById('questionInput').value;
    
    if (!userInput.trim()) return; // Don't process empty input

    // Add user message to the chat
    const userMessage = document.createElement('div');
    userMessage.textContent = `Въпрос: ${userInput}`;
    userMessage.classList.add('user-message');
    document.getElementById('responses').appendChild(userMessage);

    // Clear the input field
    document.getElementById('questionInput').value = '';

    // Call the Cloudflare Worker API
    try {
        const response = await fetch(`https://my-chatbot.alex-r-goranov1.workers.dev/api/chat?q=${encodeURIComponent(userInput)}`);
        const data = await response.json();

        // Add AI response to the chat
        const aiMessage = document.createElement('div');
        aiMessage.textContent = `Сашко отговор: ${data.response}`;
        aiMessage.classList.add('ai-message');
        document.getElementById('responses').appendChild(aiMessage);

        // Scroll to the bottom to show the new messages
        document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Грешка: Не успяхме да получим отговор от Сашко!';
        errorMessage.classList.add('ai-message');
        document.getElementById('responses').appendChild(errorMessage);
    }
}
