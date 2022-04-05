import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faTrashAlt,
  faArrowUp,
  faArrowDown,
  faGraduationCap,
  faChalkboardTeacher,
  faWindowClose,
  faBuilding,
  faDoorOpen,
  faClock,
  faChevronLeft,
  faChevronRight,
  faArrowCircleLeft,
  faFileCsv,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import './index.css';

const pinia = createPinia();

library.add(
  faTrashAlt,
  faArrowUp,
  faArrowDown,
  faGraduationCap,
  faChalkboardTeacher,
  faWindowClose,
  faBuilding,
  faDoorOpen,
  faClock,
  faChevronLeft,
  faChevronRight,
  faArrowCircleLeft,
  faFileCsv,
  faPlus
);
createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(pinia)
  .use(router)
  .mount('#app');
