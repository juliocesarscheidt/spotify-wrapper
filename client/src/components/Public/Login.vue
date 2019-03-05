<template>
  <div class="container-small">
    <h2 class="page-header text-center">Login</h2>
    <form id="form" method="POST" v-on:click="submitForm($event)">
      <h4>Spotify Wrapper</h4>
      <!-- <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" autofocus="true" type="text" name="username" class="form-control" placeholder="username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" name="password" class="form-control" placeholder="password">
      </div>
      <br>
      <div class="row-class">
        <button type="button" class="btnlarge button-blue">Login
          <i class="fas fa-sign-in-alt"></i>
        </button>
      </div>
      <br> -->
      <div class="row-class">
        <button type="button" class="btnlarge button-green" v-on:click="loginSpotify($event)">Login with Spotify
          <i class="fab fa-spotify"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import SetUser from '@/utils/SetUser';
import env from '@/utils/env.js';

export default {
  name: 'Login',
  components: {

  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {

  },
  watch: {
    '$route.path': {
      immediate: true,
      handler (value) {
        if (value.indexOf('access_token') > 0) {
          const access_token = value.split('access_token=')[1].split('&token_type=')[0];
          const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${access_token}`
          }
          axios.get('https://api.spotify.com/v1/me', { headers })
            .then(res => {
              const user = {
                'id': res.data.id,
                'href': res.data.href,
                'name': res.data.display_name,
                'email': res.data.email,
                'image': res.data.images[0].url,
                'external_urls': res.data.external_urls.spotify,
              }
              SetUser(user, access_token);
              this.$router.push({ 'name': 'Index' });
            })
            .catch(err => {
              throw err;
            });
        }
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    submitForm(e) {
      e.preventDefault();
    },
    loginSpotify() {
      const clientId = env.clientId;
      const urlSpotify = env.urlSpotify;

      const url = window.encodeURIComponent(`${window.location.protocol}//${window.location.host}/#/login`);

      window.location.href = `${urlSpotify}?client_id=${clientId}&response_type=token&redirect_uri=${url}&scope=user-read-private%20user-read-email`;
    },
  }
}
</script>

<style scoped>

</style>
