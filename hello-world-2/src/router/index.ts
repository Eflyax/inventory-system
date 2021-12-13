import EditProduct from '../views/EditProduct.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import SettingsProduct from '../views/SettingsProduct.vue';
import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [{
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
