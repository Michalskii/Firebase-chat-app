<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': !register }">
          <a @click.prevent="register = false">Login</a>
        </li>
        <li :class="{ 'is-active': register }">
          <a @click.prevent="register = true">Register</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                v-model="credentials.email"
                placeholder="e.g. alexsmith@gmail.com"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="credentials.password"
                placeholder="Enter a password"
              />
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">{{ formTitle }}</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
// imports
import { useRouter, useRoute } from "vue-router";

import { ref, computed, reactive } from "vue";
import { useStoreAuth } from "../stores/storeAuth";

//router
const router = useRouter();
const route = useRoute();
// store
const storeAuth = useStoreAuth();

// register/login

const register = ref(false);

// form title
const formTitle = computed(() => {
  return register.value ? "Register" : "Login";
});
// credentials

const credentials = reactive({
  email: "",
  password: "",
});

//submit

const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert("Please enter email and a password");
  } else {
    if (register.value) {
      storeAuth.registerUser(credentials);
      router.push("/gz");
    } else {
      storeAuth.loginUser(credentials);
      router.push("/");
    }
  }
};
</script>
<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>