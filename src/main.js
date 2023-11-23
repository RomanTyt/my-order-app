// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/HomeContent.vue';
import ViewOrder from './components/ViewOrder.vue';
import CreateOrder from './components/CreateOrder.vue';
import AddProduct from './components/AddProduct.vue';
import AllOrders from './components/AllOrders.vue'; // Добавлено

const routes = [
  { path: '/', component: Home },
  { path: '/create-order', component: CreateOrder },
  { path: '/view-order', component: ViewOrder },
  { path: '/add-product', component: AddProduct },
  { path: '/all-orders', component: AllOrders }, // Добавлено
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
