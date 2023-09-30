import setAuthTokenAxios from '@/utils/setAuthTokenAxios';
import store from '@/store/store';
import router from '../router';

const Logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expiration');
  localStorage.removeItem('user');

  store.dispatch('logoutUser');

  setAuthTokenAxios();

  router.push({ 'name': 'Login' });
};

export default Logout;
