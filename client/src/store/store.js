
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    userLoggedIn: false,
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.userLoggedIn = true
    },
    setUser (state, user) {
      state.user = user
      state.userLoggedIn = true
    },
    logoutUser (state) {
      state.userLoggedIn = false
      state.token = null
      state.user = null
    },
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
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
