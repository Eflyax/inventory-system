import EditProduct from '../views/EditProduct.vue';
import EditStock from '../views/EditStock.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Auth from '../views/Auth.vue';
import UserSettings from '../views/UserSettings.vue';
import Transaction from '../views/Transaction.vue';
import Transactions from '../views/Transactions.vue';
import SettingsProduct from '../views/SettingsProduct.vue';
import SettingsStock from '../views/SettingsStock.vue';
import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [{
	path: '/',
	name: 'Home',
	component: Home
}, {
	path: '/login',
	name: 'Login',
	component: Login
}, {
	path: '/auth',
	name: 'Auth',
	component: Auth
}, {
	path: '/user-settings',
	name: 'UserSettings',
	component: UserSettings
}, {
	path: '/transaction/sell',
	name: 'sell',
	component: Transaction
}, {
	path: '/transaction/buy',
	name: 'buy',
	component: Transaction
}, {
	path: '/transaction/move',
	name: 'move',
	component: Transaction
}, {
	path: '/transaction/remove',
	name: 'remove',
	component: Transaction
}, {
	path: '/transactions/',
	name: 'Transactions',
	component: Transactions
}, {
	path: '/settings/stock/',
	name: 'SettingsStock',
	component: SettingsStock
}, {
	path: '/settings/stock/edit/:id?',
	name: 'EditStock',
	component: EditStock
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
