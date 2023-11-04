// old code
// import { createApp } from 'vue';
// import App from './App.vue';

// createApp(App).mount('#app')
import { BootstrapIcon } from '@dvuckovic/vue3-bootstrap-icons';
import BootstrapVue3 from 'bootstrap-vue-3';
import { createApp } from 'vue';
import App from './App.vue';

import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(App)
app.use(BootstrapVue3)
app.component('BootstrapIcon', BootstrapIcon);
app.mount('#app')