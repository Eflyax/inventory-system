import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue'
import MyInput from './components/form/MyInput/MyInput.vue';
import MyForm from './components/form/MyForm/MyForm.vue';
import router from './router'
import VeeValidate from 'vee-validate';
import Vue from 'vue'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n'
import messages from './locales/messages';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'cs',
  messages,
});

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
	i18n,
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')
