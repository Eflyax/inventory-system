import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SettingsProduct from '../views/SettingsProduct.vue';
import EditProduct from '../views/EditProduct.vue';

const routes = [{
		path: '/',
		name: 'Home',
		component: Home
}, {
		path: '/login',
		name: 'Login',
		component: Login
}, {
		path: '/settings/product/',
		name: 'SettingsProduct',
		component: SettingsProduct
}, {
		path: '/settings/product/edit/:id?',
		name: 'EditProduct',
		component: EditProduct
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
