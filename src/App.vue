<template>
  <Navbar />

  <RouterView />
</template>

<script setup>
import Navbar from "./Components/Navbar.vue";
import { onMounted } from "vue";
import ChatWindow from "./Components/ChatWindow.vue";
import { useStoreAuth } from "@/stores/storeAuth";
const storeAuth = useStoreAuth();

onMounted(() => {
  storeAuth.init();
});
</script>
<style scoped>
@import "index.css";
</style>