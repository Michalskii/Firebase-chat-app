<template>
  <div>
    <form>
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="newTodoContent"
            class="input"
            type="text"
            placeholder="Add a todo"
          />
        </div>
        <div class="control">
          <button
            :disabled="!newTodoContent"
            @click.prevent="addNewTodo"
            class="button is-info ml-3"
          >
            Search
          </button>
        </div>
      </div>
    </form>

    <div
      v-for="todo in todos"
      :class="{ 'has-background-success-light': todo.done }"
      class="card mb-5"
    >
      <div class="card-content">
        <div class="columns is-mobile is-vcentered">
          <div
            :class="{ 'has-text-success line-through': todo.done }"
            class="column"
          >
            {{ todo.content }}
          </div>
          <div class="column has-text-right">
            <button
              :class="todo.done ? 'is-success' : 'is-light'"
              class="button is-light"
              @click="toggleDone(todo.id)"
            >
              &check;
            </button>
            <button @click="deleteTodo(todo.id)" class="button is-danger ml-2">
              &cross;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
const todosColletionQuery = query(todosCollectionRef, orderBy("date", "desc"));

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
<style>
@import "/node_modules/bulma/css/bulma.min.css";
.line-through {
  text-decoration: line-through;
}
</style>