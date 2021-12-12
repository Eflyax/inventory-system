import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// import Form from '../src/form/Form/Form.vue';

// Vue.component('Form', Form);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
