import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store';
import Login from '@/components/Public/Login';
import Index from '@/components/Private/Index';
import Search from '@/components/Private/Search';
import { fetchToken, getMe } from '@/utils/spotify';
import { SetAccessToken, SetExpiration, SetUser } from '@/utils/SetUser';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return { x: 0, y: 0 };
  },
  routes: [
    // requiresGuest
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    // must be logged - requiresAuth
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        requiresAuth: true
      }
    },
    // default
    {
      path: '*',
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (store.getters.tokenIsExpired) {
    // try to refresh the token
    fetchToken({ grantType: 'refresh_token', refreshToken: store.state.refreshToken })
      .then((data) => {
        const { access_token, expires_in } = data;
        const expiration = new Date().getTime() + (expires_in * 1000);
        SetAccessToken(access_token);
        SetExpiration(expiration);
        getMe(access_token).then((user) => SetUser(user));
      });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.state.user) {
      next({
        name: 'Index',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      next()
    }
  } else {
    next()
  }
});

export default router;
