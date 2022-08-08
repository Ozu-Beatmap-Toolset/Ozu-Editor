import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt';
const events = mitt();

const app = createApp(App);
app.config.globalProperties.events = events;
app.mount('#app');
