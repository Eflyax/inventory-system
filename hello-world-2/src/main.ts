import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VeeValidate from 'vee-validate';

Vue.use(Vuetify);
Vue.use(VeeValidate, {events: 'blur'});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
