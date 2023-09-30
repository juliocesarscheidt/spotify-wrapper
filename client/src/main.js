import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { sync } from 'vuex-router-sync';
import store from '@/store/store';
import Multiselect from 'vue-multiselect';
import Logout from '@/utils/Logout';
import Notifications from 'vue-notification';
import { SetUser, SetAccessToken, SetRefreshToken, SetExpiration } from '@/utils/SetUser';
import { fetchToken, getMe } from './utils/spotify';

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

  // check for expired token
  const curTime = Date.now() / 1000;

  if (expiration <= curTime && refreshToken) {
    // try to refresh the token
    fetchToken({ grantType: 'refresh_token', refreshToken })
      .then((data) => {
        const { access_token, expires_in } = data
        const expiration = new Date().getTime() + (expires_in * 1000);

        SetAccessToken(access_token);
        SetExpiration(expiration);

        getMe(access_token)
          .then((user) => {
            SetUser(user);
            router.push({ 'name': 'Index' });

          }).catch((err) => {
            console.error(err); // eslint-disable-line
            Logout();
          });

      }).catch((err) => {
        console.error(err); // eslint-disable-line
        Logout();
      });

  }
}

Vue.component('multiselect', Multiselect);
Vue.use(Notifications);

export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
