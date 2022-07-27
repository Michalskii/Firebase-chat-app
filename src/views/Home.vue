<template>
  <div class="h-[100vh]">
    <Navbar />
    <!-- <router-link to="/auth">Auth</router-link>
    <router-view></router-view> -->
    <ChatWindow />
  </div>
</template>
<script>
export default {
  name: "home",
};
</script>
<script setup>
import ChatWindow from "../Components/ChatWindow.vue";
</script>
