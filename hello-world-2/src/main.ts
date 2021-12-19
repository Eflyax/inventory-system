import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate';
import Input from './components/form/Input/Input.vue';
import Vuetify from 'vuetify';
// import vuetify from './plugins/vuetify';
// import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.component('Input', Input);
Vue.use(VeeValidate, {events: 'blur'});

Vue.use(Vuetify, {
	icons: {
		iconfont: 'mdi'
	},
	theme: {
		dark: true
	}
})
// Vue.use(Vuetify, {
// 	theme: {
// 		defaultTheme: 'dark'
// 	}
// });

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
