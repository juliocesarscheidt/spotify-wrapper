
import setAuthTokenAxios from '@/utils/setAuthTokenAxios';
import store from '@/store/store';

const SetUser = (user, token) => {
  store.dispatch('setUser', user);
  store.dispatch('setToken', token);
  setAuthTokenAxios(token);
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export default SetUser;
