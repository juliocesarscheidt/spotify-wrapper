import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { sync } from 'vuex-router-sync';
import store from '@/store/store';
import Multiselect from 'vue-multiselect';
import Logout from '@/utils/Logout';
import SetUser from '@/utils/SetUser';
import Notifications from 'vue-notification'

Vue.config.productionTip = false;
Vue.config.devtools = process.env.DEV_TOOLS || true;

sync(store, router);

// check for token
if (localStorage.jwtToken && localStorage.user) {
  const token = localStorage.jwtToken;
  const user = JSON.parse(localStorage.user);
  SetUser(user, token);

  // check for expired token
  const curTime = Date.now() / 1000;
  if (user.exp < curTime) {
    Logout();
  }
}

Vue.component('multiselect', Multiselect);
Vue.use(Notifications);

const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

export default vm;
