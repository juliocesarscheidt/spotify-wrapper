
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    accessToken: null,
    refreshToken: null,
    expiration: null,
    user: null,
    userLoggedIn: false,
  },
  getters: {
    tokenIsExpired(state) {
      const curTime = Date.now() / 1000;
      return Boolean((state.expiration <= curTime) && state.refreshToken);
    },
  },
  mutations: {
    setAccessToken (state, accessToken) {
      state.accessToken = accessToken
    },
    setRefreshToken (state, refreshToken) {
      state.refreshToken = refreshToken
    },
    setExpiration (state, expiration) {
      state.expiration = expiration
    },
    setUser (state, user) {
      state.user = user
      state.userLoggedIn = true
    },
    logoutUser (state) {
      state.accessToken = null
      state.refreshToken = null
      state.expiration = null
      state.user = null

      state.userLoggedIn = false
    },
  },
  actions: {
    setAccessToken ({ commit }, accessToken) {
      commit('setAccessToken', accessToken)
    },
    setRefreshToken ({ commit }, refreshToken) {
      commit('setRefreshToken', refreshToken)
    },
    setExpiration ({ commit }, expiration) {
      commit('setExpiration', expiration)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    logoutUser({ commit }) {
      commit('logoutUser')
    },
  }
});

export default store;
