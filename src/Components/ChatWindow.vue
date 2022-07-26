<template>
  <div class="h-full">
    <div v-for="todo in todos">
      <div>
        <div>
          <div>
            {{ todo.content }}
          </div>
          <!-- <div>
            <button @click="toggleDone(todo.id)">&check;</button>
            <button @click="deleteTodo(todo.id)">&cross;</button>
          </div> -->
        </div>
      </div>
    </div>

    <div class="">
      <form class="">
        <div class="">
          <div class="">
            <input
              v-model="newTodoContent"
              class="input"
              type="text"
              placeholder="Write a message..."
            />
          </div>
          <div class="bg-gray-300 rounded-full text-center">
            <button
              class="border-gray-300 text-center"
              :disabled="!newTodoContent"
              @click.prevent="addNewTodo"
            >
              Send a message
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
const todosCollectionRef = collection(db, "todos");
const todosColletionQuery = query(todosCollectionRef, orderBy("date", "asc"));

const todos = ref([]);

onMounted(() => {
  onSnapshot(todosColletionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
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
</style>