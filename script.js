document.addEventListener('DOMContentLoaded', () => {
    const chatArea = document.getElementById('chat-area');
    const userInput = document.getElementById('user-input'); // Fix ID
    const sendButton = document.getElementById('send-button'); 
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptButton = document.getElementById('accept-cookies');

    if (!sendButton) {
        console.error("⚠️ ERROR: 'send-button' not found in the HTML.");
        return;
    }

    sendButton.addEventListener('click', askQuestion);

    // Handle cookie consent
    const hasConsent = document.cookie.includes('myCookieName=true'); 
    if (!hasConsent) {
        cookieConsent.classList.remove('hidden');
    }

    acceptButton.addEventListener('click', () => {
        cookieConsent.classList.add('hidden');
        document.cookie = 'myCookieName=true; path=/';
    });

    async function askQuestion() {
        if (!userInput) {
            console.error("⚠️ ERROR: 'user-input' not found in the HTML.");
            return;
        }

        const userMessage = userInput.value.trim();
        if (!userMessage) return; 

        // Add user message
        const userDiv = document.createElement('div');
        userDiv.textContent = `You: ${userMessage}`;
        userDiv.classList.add('user-message');
        chatArea.appendChild(userDiv);

        // Clear input
        userInput.value = '';

        // Fetch AI response
        try {
            const response = await fetch(`https://my-chatbot.alex-r-goranov1.workers.dev/api/chat?q=${encodeURIComponent(userMessage)}`);
            const data = await response.json();

            const aiDiv = document.createElement('div');
            aiDiv.textContent = `Sparky: ${data.response}`;
            aiDiv.classList.add('ai-message');
            chatArea.appendChild(aiDiv);

            chatArea.scrollTop = chatArea.scrollHeight;
        } catch (error) {
            console.error("⚠️ Fetch error:", error);
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Error: Unable to get a response from Sparky!';
            errorDiv.classList.add('ai-message');
            chatArea.appendChild(errorDiv);
        }
    }
});


