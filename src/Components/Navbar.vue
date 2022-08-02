 <template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start text-xl">
        <RouterLink class="navbar-item" to="/">Home</RouterLink>

        <RouterLink class="navbar-item" to="/chatview">Chat </RouterLink>

        <RouterLink v-if="isLoggedIn" class="navbar-item" to="/auth">
          Login</RouterLink
        >
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button
              v-if="!isLoggedIn"
              @click="storeAuth.logoutUser"
              class="button is-medium is-info mt-3 p-3"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- <div class="bg-sky-200 w-full py-2 rounded-md text-center">
    <RouterLink to="/">Chat</RouterLink>
    <RouterLink to="/auth"> Auth</RouterLink>
    <div>
      <button
        @click="storeAuth.logoutUser"
        class="button is-small is-info mt-3 p-3"
      >
        Log out
      </button>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "Navbar",
};
</script>
<script setup >
import { useStoreAuth } from "../stores/storeAuth";
import { computed } from "vue";

const storeAuth = useStoreAuth();
const user = storeAuth.user;

const isLoggedIn = computed(() => Object.keys(user).length === 0);
</script>
 
<style scoped>
@import "@/index.css";
</style>