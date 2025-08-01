<template>
  <div class="chat-wrapper">
    <div class="chat-box">
      <div class="messages">
        <transition-group name="slide" tag="div">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="message"
            :class="{ mine: msg.userId === userId, theirs: msg.userId !== userId }"
          >
            <div class="bubble">{{ msg.text }}</div>
          </div>
        </transition-group>
      </div>
      <div class="input-area">
        <input
          v-model="input"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const userId = Math.random().toString(36).substring(2, 10);
const input = ref('');
const messages = ref<{ userId: string; text: string }[]>([]);
let socket: WebSocket;

const sendMessage = () => {
  if (input.value.trim() && socket.readyState === WebSocket.OPEN) {
    const payload = JSON.stringify({ userId, text: input.value.trim() });
    socket.send(payload);
    input.value = '';
  }
};

onMounted(() => {
  socket = new WebSocket('ws://localhost:3001');
  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    messages.value.push(data);
    if (messages.value.length > 50) messages.value.shift();
  });
});
</script>

<style scoped>
.chat-wrapper {
  width: 100vw;
  height: 100vh;
  background: #f5f6fa;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.chat-box {
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 90vh;
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #f7f9fc;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  display: flex;
}

.message.mine {
  justify-content: flex-end;
}

.message.theirs {
  justify-content: flex-start;
}

.bubble {
  padding: 10px 14px;
  margin-bottom: 10px;
  border-radius: 18px;
  max-width: 75%;
  word-break: break-word;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.message.mine .bubble {
  background-color: #dcf8c6;
  color: #333;
  border-bottom-right-radius: 4px;
}

.message.theirs .bubble {
  background-color: #e5e5ea;
  color: #000;
  border-bottom-left-radius: 4px;
}

.input-area {
  padding: 12px;
  border-top: 1px solid #eee;
  background: #fff;
}

.input-area input {
  width: 90%;
  padding: 12px 16px;
  font-size: 14px;
  border-radius: 24px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.2s;
}

.input-area input:focus {
  border-color: #4caf50;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
