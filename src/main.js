import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';
// require('@/assets/main.scss');
import './../node_modules/Bulma/CSS/bulma.css';
import App from './App.vue';
import router from './router';

// import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
