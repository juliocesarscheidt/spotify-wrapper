import setAuthTokenAxios from '@/utils/setAuthTokenAxios';
import store from '@/store/store';

const SetUser = (user) => {
  store.dispatch('setUser', user);
  localStorage.setItem('user', JSON.stringify(user));
};

const SetAccessToken = (token) => {
  store.dispatch('setToken', token);
  setAuthTokenAxios(token);
  localStorage.setItem('accessToken', token);
};

const SetRefreshToken = (refreshToken) => {
  store.dispatch('setRefreshToken', refreshToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const SetExpiration = (expiration) => {
  store.dispatch('setExpiration', expiration);
  localStorage.setItem('expiration', expiration);
};

export {
  SetUser,
  SetAccessToken,
  SetRefreshToken,
  SetExpiration,
};
