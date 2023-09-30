import axios from 'axios';
import querystring from 'querystring';

const fetchToken = async({ grantType, code, state, redirectUrl, refreshToken }) => {
  const clientId = process.env.VUE_APP_CLIENT_ID;
  const clientSecret = process.env.VUE_APP_CLIENT_SECRET;

  const spotifyUrl = 'https://accounts.spotify.com/api/token';

  const payload = {
    grant_type: grantType,
  };
  if (code) {
    payload.code = code;
  }
  if (state) {
    payload.state = state;
  }
  if (redirectUrl) {
    payload.redirect_uri = redirectUrl;
  }
  if (refreshToken) {
    payload.refresh_token = refreshToken;
  }

  return new Promise((resolve, reject) => {
    axios.post(spotifyUrl, querystring.stringify(payload), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64')),
      }
    }).then((res) => {
      const { data } = res;
      resolve(data);

    }).catch((err) => {
      console.error(err); // eslint-disable-line
      reject(err);
    });
  })
}

const getMe = async(accessToken) => {
  const spotifyUrl = 'https://api.spotify.com/v1/me';

  return new Promise((resolve, reject) => {
    axios.get(spotifyUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then((res) => {
      const { data } = res;
      const user = {
        id: data.id,
        href: data.href,
        name: data.display_name,
        email: data.email,
        image: data.images && data.images[0] && data.images[0].url,
        external_urls: data.external_urls.spotify,
        followers: data.followers.total,
      }
      resolve(user);

    }).catch((err) => {
      console.error(err); // eslint-disable-line
      reject(err);
    });
  })
}

export {
  fetchToken,
  getMe,
}
