import setAuthTokenAxios from '@/utils/setAuthTokenAxios';
import store from '@/store/store';
import router from '../router';

const Logout = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('user');

  store.dispatch('logoutUser');

  setAuthTokenAxios();

  router.push({ 'name': 'Login' });
};

export default Logout;
