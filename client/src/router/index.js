import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store';

// Private
import Login from '@/components/Public/Login';

// Public
import Index from '@/components/Private/Index';
import Search from '@/components/Private/Search';

Vue.use(Router);

const router = new Router({

  scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return { x: 0, y: 0 };
  },

  // mode: 'history',

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
  if(to.matched.some(record => record.meta.requiresAuth)) {
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
  }else if (to.matched.some(record => record.meta.requiresGuest)) {
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
  }else{
    next()
  }
});

export default router;
