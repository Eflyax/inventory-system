import {createApp} from 'vue';
import {loadFonts} from './plugins/webfontloader';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/index';
//
import Form from '@/components/form/Form/Form.vue';
import Input from '@/components/form/Input/Input.vue';

loadFonts();

const app = createApp(App)
	.use(vuetify)
	.use(router)

app.component('Form', Form);
app.component('Input', Input);

app.mount('#app');
