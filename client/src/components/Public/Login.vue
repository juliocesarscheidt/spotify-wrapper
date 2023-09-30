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
import querystring from 'querystring';
import { SetUser, SetAccessToken, SetRefreshToken, SetExpiration } from '@/utils/SetUser';
import { fetchToken, getMe } from '@/utils/spotify';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      async handler (route) {
        const { code, state } = route.query;
        if (!code || !state) return;

        try {
          const redirectUrl = `${window.location.protocol}//${window.location.host}/login`;

          const { access_token, expires_in, refresh_token } =
            await fetchToken({ grantType: 'authorization_code', code, state, redirectUrl });

          const expiration = new Date().getTime() + (expires_in * 1000);

          SetAccessToken(access_token);
          SetRefreshToken(refresh_token);
          SetExpiration(expiration);

          const user = await getMe(access_token);
          SetUser(user);

          this.$router.push({ 'name': 'Index' });

        } catch (error) {
          console.error(error); // eslint-disable-line
        }
      }
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
    },
    generateRandomString(length) {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    loginSpotify() {
      const clientId = process.env.VUE_APP_CLIENT_ID;
      // const clientSecret = process.env.VUE_APP_CLIENT_SECRET;

      const spotifyUrl = 'https://accounts.spotify.com/authorize';
      const redirectUrl = `${window.location.protocol}//${window.location.host}/login`;

      const scope = 'user-read-private%20user-read-email';
      const state = this.generateRandomString(16);

      const query = querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUrl,
        scope,
        state,
      });

      window.location.href = `${spotifyUrl}?${query}`;
    },
  },
}
</script>
