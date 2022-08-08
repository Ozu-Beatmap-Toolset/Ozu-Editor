import { createApp } from 'vue'
import App from './App.vue'
import mittBuilder from 'mitt';
const events = mittBuilder();

const app = createApp(App);
app.config.globalProperties.events = events;
app.mount('#app');
