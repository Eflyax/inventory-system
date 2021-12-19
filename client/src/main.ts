import 'vuetify/dist/vuetify.min.css';
import App from './App.vue'
import MyInput from './components/form/MyInput/MyInput.vue';
import MyForm from './components/form/MyForm/MyForm.vue';
import router from './router'
import VeeValidate from 'vee-validate';
import Vue from 'vue'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify';

Vue.component('MyForm', MyForm);
Vue.component('MyInput', MyInput);

Vue.use(VeeValidate, {events: 'blur'});

Vue.use(Vuetify, {
	icons: {
		iconfont: 'mdi'
	},
	theme: {
		dark: true
	}
});

Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')
