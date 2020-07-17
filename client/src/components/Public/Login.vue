<template>
  <div class="container-small">
    <h2 class="page-header text-center">Login</h2>
    <form id="form" method="POST" v-on:click="submitForm($event)">
      <h4>Spotify Wrapper</h4>
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

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
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
            .then((res) => {
              const data = res.data;
              const user = {
                'id': data.id,
                'href': data.href,
                'name': data.display_name,
                'email': data.email,
                'image': data.images[0].url,
                'external_urls': data.external_urls.spotify,
              }
              SetUser(user, access_token);
              this.$router.push({ 'name': 'Index' });
            }).catch((err) => {
              console.error(err); // eslint-disable-line
            });
        }
      }
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
    },
    loginSpotify() {
      const clientId = process.env.VUE_APP_CLIENT_ID;
      const urlSpotify = 'https://accounts.spotify.com/authorize';

      const url = window.encodeURIComponent(`${window.location.protocol}//${window.location.host}/#/login`);
      window.location.href = `${urlSpotify}?client_id=${clientId}&response_type=token&redirect_uri=${url}&scope=user-read-private%20user-read-email`;
    },
  },
}
</script>
