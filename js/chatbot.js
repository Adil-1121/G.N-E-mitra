// Toggle Chatbot Open/Close
function toggleChatbot() {
  const chatbot = document.getElementById("chatbotContainer");
  const chatMessages = document.getElementById("chatMessages");
  const input = document.getElementById("userInput");

  if (chatbot.style.display === "flex") {
    chatbot.style.display = "none";
    chatMessages.innerHTML = ""; // clear messages
    input.value = "";
  } else {
    chatbot.style.display = "flex";
    chatbot.style.flexDirection = "column";

    // Bot welcome msg
    appendMessage("bot", "Hello! I'm your assistant. How can I help you today?");
  }
}

// Send message
function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage("user", msg);
  input.value = "";

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    appendMessage("bot", generateBotReply(msg));
  }, 1000);
}

// Append message
function appendMessage(sender, text) {
  const chat = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  // Avatar using Font Awesome
  const avatar = document.createElement("div");
  avatar.classList.add("avatar-chatbot");

  const icon = document.createElement("i");
  if (sender === "user") {
    icon.className = "fas fa-user"; // user icon
  } else {
    icon.className = "fas fa-robot"; // bot icon
  }
  avatar.appendChild(icon);

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = text;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(bubble);
  chat.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
}


// Typing indicator
function showTypingIndicator() {
  const chat = document.getElementById("chatMessages");
  const typing = document.createElement("div");
  typing.classList.add("typing");
  typing.id = "typingIndicator";
  typing.textContent = "AI Assistant is typing...";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("typingIndicator");
  if (typing) typing.remove();
}

// Bot replies
function generateBotReply(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! How can I assist you today?";
  } else if (msg.includes("how are you")) {
    return "I'm doing great, thanks for asking! How about you?";
  } else if (msg.includes("bye") || msg.includes("goodbye")) {
    return "Goodbye! Have a wonderful day!";
  } else {
    return "I'm still learning. Can you rephrase or ask something else?";
  }
}
