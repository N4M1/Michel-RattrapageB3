import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/HomePage.vue'; 
import SignUpPage from '../components/SignUpPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/signup',
    component: SignUpPage, // Use the new component for the sign-up page
  },
];

const router = new VueRouter({
  routes,
});

export default router;