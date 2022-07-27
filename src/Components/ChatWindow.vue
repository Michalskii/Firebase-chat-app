<template>
  <div class="h-[100vh]">
    <div><button @click="scrollToBottom">das</button></div>
    <div class="bg-sky-50 h-[80vh] chatWindow" id="chat">
      <div
        v-for="message in messages"
        class="bg-sky-100 py-0.5 w-fit rounded-full px-4"
      >
        {{ message.name }}: {{ message.content }}
      </div>
    </div>

    <div class="">
      <form class="">
        <div class="">
          <div class="py-3">
            <input
              v-model="newMessageContent"
              class="input w-full"
              type="text"
              placeholder="Write a message..."
            />
          </div>
          <div class="text-center bottom-0">
            <button
              class="bg-sky-200 py-3 text-center w-full rounded-full"
              :disabled="!newMessageContent"
              @click.prevent="addNewMessage"
            >
              <span class="text-sky-700 font-bold">Send a message</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatWindow",
};
</script>
<script setup>
import { ref, onMounted } from "vue";
import { useStoreAuth } from "../stores/storeAuth";

import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "@/firebase";
const messagesCollectionRef = collection(db, "messages");
const messagesCollectionQuery = query(
  messagesCollectionRef,
  orderBy("date", "asc")
);

const messages = ref([]);

const storeAuth = useStoreAuth();
const user = storeAuth.user;

//scroll

const scrollToBottom = () => {
  chat.scroll({ top: chat.scrollHeight, behavior: "smooth" });
};

onMounted(() => {
  onSnapshot(messagesCollectionQuery, (querySnapshot) => {
    const fbMessages = [];

    const notification = {
      soundurl: "../src//assets/noti2.wav",
    };

    const playSound = () => {
      var audio = new Audio(notification.soundurl);
      console.log("playing sound");
      audio.play();
    };

    querySnapshot.forEach((doc) => {
      const message = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
        name: doc.data().email,
      };
      fbMessages.push(message);

      //   playSound();
      scrollToBottom();
    });
    messages.value = fbMessages;
  });
});
const newMessageContent = ref("");

const addNewMessage = () => {
  addDoc(messagesCollectionRef, {
    content: newMessageContent.value,
    done: false,
    date: Date.now(),
    email: user.email,
  });

  newMessageContent.value = "";
};

const toggleDone = (id) => {
  const index = messages.value.findIndex((message) => message.id === id);

  updateDoc(doc(messagesCollectionRef, id), {
    done: !messages.value[index].done,
  });
};
</script>

<style scoped>
@import "@/index.css";

.chatWindow {
  display: flex; /* formerly flex: 1 0 auto; */
  flex-direction: column;

  padding: 5px;
  margin: 5px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>