 <template>
  <div class="bg-sky-200 w-full py-2 rounded-md text-center">
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
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
<script setup >
import { useStoreAuth } from "../stores/storeAuth";

const storeAuth = useStoreAuth();
</script>
 
<style scoped>
@import "@/index.css";
</style>