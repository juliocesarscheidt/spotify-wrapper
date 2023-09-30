
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    token: null,
    refreshToken: null,
    expiration: null,
    user: null,
    userLoggedIn: false,
  },
  mutations: {
    setToken (state, token) {
      state.token = token
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
      state.token = null
      state.refreshToken = null
      state.expiration = null
      state.user = null

      state.userLoggedIn = false
    },
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
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
