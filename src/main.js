import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://localhost:8080/p3l_api_android-master/api';
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    vuetify,
    components: { App }
}).$mount('#app')