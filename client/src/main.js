import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { sync } from 'vuex-router-sync';
import store from '@/store/store';
import Multiselect from 'vue-multiselect';
import Notifications from 'vue-notification';
import { SetUser, SetAccessToken, SetRefreshToken, SetExpiration } from '@/utils/SetUser';

Vue.config.productionTip = false;
Vue.config.devtools = process.env.DEV_TOOLS || true;

sync(store, router);

// check for token
if (localStorage.accessToken && localStorage.user && localStorage.refreshToken) {
  const { accessToken, refreshToken, expiration } = localStorage;
  SetAccessToken(accessToken);
  SetRefreshToken(refreshToken);
  SetExpiration(expiration);

  const user = JSON.parse(localStorage.user);
  SetUser(user);
}

Vue.component('multiselect', Multiselect);
Vue.use(Notifications);

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
