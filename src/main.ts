import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faTrashAlt,
  faArrowUp,
  faArrowDown,
  faGraduationCap,
  faChalkboardTeacher,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import './index.css';

library.add(
  faTrashAlt,
  faArrowUp,
  faArrowDown,
  faGraduationCap,
  faChalkboardTeacher,
  faWindowClose
);
createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(createPinia)
  .mount('#app');
