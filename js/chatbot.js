/* ===============================
   DOM Ready
================================ */
document.addEventListener("DOMContentLoaded", () => {
  initTextareaBehavior();
});

/* ===============================
   Global Constants
================================ */
const lineHeight = 22;
const maxRows = 5;
const maxHeight = lineHeight * maxRows;

/* ===============================
   Toggle Chatbot Open / Close
================================ */
function toggleChatbot() {
  const chatbot = document.getElementById("chatbotContainer");
  const chatMessages = document.getElementById("chatMessages");
  const textarea = document.getElementById("userInput");

  if (chatbot.style.display === "flex") {
    chatbot.style.display = "none";
    chatMessages.innerHTML = "";
    textarea.value = "";
    resetTextarea();
  } else {
    chatbot.style.display = "flex";
    chatbot.style.flexDirection = "column";
    appendMessage("bot", "Hello! I'm your assistant. How can I help you today?");
  }
}

/* ===============================
   GPT-Style Textarea Logic
================================ */
function initTextareaBehavior() {
  const textarea = document.getElementById("userInput");

  /* Auto grow on wrap + enter */
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";

    if (textarea.scrollHeight <= maxHeight) {
      textarea.style.height = textarea.scrollHeight + "px";
      textarea.style.overflowY = "hidden";
    } else {
      textarea.style.height = maxHeight + "px";
      textarea.style.overflowY = "auto";
    }
  });

  /* ENTER = SEND | SHIFT + ENTER = NEW LINE */
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

/* Reset textarea after send */
function resetTextarea() {
  const textarea = document.getElementById("userInput");
  textarea.style.height = lineHeight + "px";
  textarea.style.overflowY = "hidden";
}

/* ===============================
   Send Message
================================ */
function sendMessage() {
  const textarea = document.getElementById("userInput");
  const msg = textarea.value.trim();
  if (!msg) return;

  appendMessage("user", msg);
  textarea.value = "";
  resetTextarea();

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    appendMessage("bot", generateBotReply(msg));
  }, 1000);
}

/* ===============================
   Append Message
================================ */
function appendMessage(sender, text) {
  const chat = document.getElementById("chatMessages");

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar-chatbot");

  const icon = document.createElement("i");
  icon.className = sender === "user" ? "fas fa-user" : "fas fa-robot";
  avatar.appendChild(icon);

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = text;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(bubble);
  chat.appendChild(messageDiv);

  chat.scrollTop = chat.scrollHeight;
}

/* ===============================
   Typing Indicator
================================ */
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

/* ===============================
   Bot Reply Logic
================================ */
function generateBotReply(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! How can I assist you today?";
  } else if (msg.includes("how are you")) {
    return "I'm doing great 😊 How about you?";
  } else if (msg.includes("bye") || msg.includes("goodbye")) {
    return "Goodbye! Have a wonderful day 🌟";
  } else {
    return "I'm still learning 🤖 Can you rephrase or ask something else?";
  }
}
