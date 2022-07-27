<template>
  <div class="h-[100vh]">
    <div class="bg-sky-50 h-[80vh] box-grow" id="chat">
      <div
        v-for="todo in todos"
        class="bg-sky-100 py-0.5 w-fit rounded-full px-4"
      >
        {{ todo.name }}: {{ todo.content }}
      </div>
    </div>

    <div class="">
      <form class="">
        <div class="">
          <div class="py-3">
            <input
              v-model="newTodoContent"
              class="input w-full"
              type="text"
              placeholder="Write a message..."
            />
          </div>
          <div class="text-center bottom-0">
            <button
              class="bg-sky-200 py-3 text-center w-full rounded-full"
              :disabled="!newTodoContent"
              @click.prevent="addNewTodo"
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
const todosCollectionRef = collection(db, "messages");
const todosColletionQuery = query(todosCollectionRef, orderBy("date", "asc"));

const todos = ref([]);

const storeAuth = useStoreAuth();
const user = storeAuth.user;

onMounted(() => {
  onSnapshot(todosColletionQuery, (querySnapshot) => {
    chat.scrollTo(0, 0);
    // chat.scrollTo({
    //   top: 0,
    //   left: 100,
    //   behavior: "smooth",
    // });
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
        name: doc.data().email,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});
const newTodoContent = ref("");
const addNewTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
    email: user.email,
  });

  newTodoContent.value = "";
};

const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
};
const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done,
  });
};
</script>

<style scoped>
@import "@/index.css";

.box-grow {
  display: flex; /* formerly flex: 1 0 auto; */
  flex-direction: column;

  padding: 5px;
  margin: 5px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>