import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import Dashboard from '../views/Dashboard.vue';
import ProjectList from '../views/ProjectListView.vue';
import ProjectDetail from '../views/ProjectDetailView.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      { path: '', component: Dashboard },
      { path: 'projects', component: ProjectList },
      { path: 'project/:id', name: 'ProjectDetail', component: ProjectDetail, props: true }
    ]
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
