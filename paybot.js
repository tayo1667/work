// Initialize bot knowledge
let botKnowledge = {
    "i want to do a transfer": "Oya nau send aza",
    "can you help me send money": "Sure! To send money, open the app, select 'Transfer,' and input the recipient's account details.",
    "send money for me to this account": "Please provide the account details, and I'll guide you through the transfer process.",
    "hello": "Hello, welcome to Orbytpay! I'm Tayo. How may I assist you?",
    "hi": "Hi there! Welcome to Orbytpay. How can I help you today?",
    "how are you": "I'm just a bot, but I'm here to help! How can I assist you?",
};

// Function to get the bot response
function getTransferResponse(userMessage) {
    userMessage = userMessage.toLowerCase();

    // Check if the message contains any known transfer-related questions
    for (let question in botKnowledge) {
        if (userMessage.includes(question)) {
            return botKnowledge[question];
        }
    }

    // If not related to transfer, show the popup
    showPopup();
    return null; // No response
}

// Function to show the popup
function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Function to display transfer input fields
function showTransferFields() {
    document.getElementById('transfer-inputs').style.display = 'block';
    document.getElementById('account-number').style.display = 'block';
}

// Function to handle account number input
function handleAccountNumberInput() {
    const accountNumber = document.getElementById('account-number-input').value.trim();

    if (accountNumber) {
        // Simulating an API response that fetches the bank name and account holder name based on the account number
        const bankName = "Access Bank";  // Example bank name
        const accountName = "Tayo Oyelere";  // Example account name, replace with actual API response

        // Show the bank name and account holder's name
        document.getElementById('bank-name').textContent = `Bank: ${bankName}`;
        document.getElementById('account-name').textContent = `Account Holder: ${accountName}`;

        // Show confirm button after the details
        document.getElementById('account-details').style.display = 'block';
        document.getElementById('confirm-btn').style.display = 'inline-block';
    }
}

// Main function to handle message sending
document.getElementById('send-btn').onclick = function () {
    const userMessage = document.getElementById('user-input').value.trim().toLowerCase();

    if (userMessage) {
        const userMessageElement = document.createElement("div");
        userMessageElement.classList.add("user-message");
        userMessageElement.textContent = userMessage;
        document.getElementById('chat-box').appendChild(userMessageElement);

        let botResponse = getTransferResponse(userMessage);

        if (botResponse) {
            const botMessageElement = document.createElement("div");
            botMessageElement.classList.add("bot-message");
            botMessageElement.textContent = botResponse;
            document.getElementById('chat-box').appendChild(botMessageElement);

            // If the bot response asks for an account number, show input field
            if (botResponse === "Oya nau send aza") {
                showTransferFields();
            }
        }

        // Clear the input field after sending
        document.getElementById('user-input').value = "";
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight; // Scroll to the latest message
    }
};

// Handle account number input
document.getElementById('account-number-input').addEventListener('input', handleAccountNumberInput);

// Handle confirmation button
document.getElementById('confirm-btn').onclick = function () {
    // After confirmation, redirect to a new page
    window.location.href = "transfer-confirmation.html";  // Replace with the actual confirmation page URL
};
