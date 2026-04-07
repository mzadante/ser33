import { createRouter, createWebHistory } from 'vue-router';

// Lazy loading views for performance
const HomeView = () => import('../views/HomeView.vue');
const DashboardView = () => import('../views/DashboardView.vue');
const NumberDetailView = () => import('../views/NumberDetailView.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { showGoldenSphere: true }
  },
  {
    path: '/results',
    name: 'Results',
    component: DashboardView,
    meta: { showGoldenSphere: false }
  },
  {
    path: '/number/:id',
    name: 'NumberDetail',
    component: NumberDetailView,
    meta: { showGoldenSphere: false }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
