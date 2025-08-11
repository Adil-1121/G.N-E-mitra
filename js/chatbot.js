function toggleChatbot() {
  const chatbot = document.getElementById('chatbotContainer');
  const chatMessages = document.getElementById('chatMessages');
  const input = document.getElementById('userInput');

  if (chatbot.style.display === 'flex') {
    chatbot.style.display = 'none';
    chatMessages.innerHTML = ''; // Clear chat
    input.value = '';            // Clear input
  } else {
    chatbot.style.display = 'flex';
    chatbot.style.flexDirection = 'column';

    // Show bot welcome message when chat opens
    appendMessage('bot', "Hello! I'm your assistant. How can I help you today?");
  }
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (message === '') return;

  appendMessage('user', message);
  input.value = '';

  showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    appendMessage('bot', generateBotReply(message));
  }, 1000);
}

function appendMessage(sender, text) {
  const chat = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);

  const avatar = document.createElement('div');
  avatar.classList.add('avatar');
  avatar.style.backgroundImage = sender === 'user'
  ? "url('assets/icon/user.jpg')"  // user avatar
  : "url('assets/icon/favicon.ico')";          // bot avatar, relative path

  const bubble = document.createElement('div');
  bubble.classList.add('bubble');
  bubble.textContent = text;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(bubble);
  chat.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
}

function showTypingIndicator() {
  const chat = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.classList.add('typing');
  typing.id = 'typingIndicator';
  typing.textContent = "AI Assistant is typing...";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
}

function generateBotReply(userMessage) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hii') || msg.includes('hey')) {
    return "Hello! How can I assist you today?";
  } 
  else if (msg.includes('how are you')) {
    return "I'm doing great, thanks for asking! How about you?";
  } 
  else if (msg.includes('bye') || msg.includes('goodbye')|| msg.includes('byy')|| msg.includes('by')|| msg.includes('goodby')) {
    return "Goodbye! Have a wonderful day!";
  } 
  else {
    return "I'm still learning. Can you rephrase or ask something else?";
  }
}

