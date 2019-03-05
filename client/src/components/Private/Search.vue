<template>
  <div>

    <div v class="container-small">
      <h2 class="page-header text-center">Welcome</h2>

      <div class="center">
        <div id="title">Find your music <b>{{ user.name.toUpperCase() }}</b></div>
        <br>

        <div class="form-group">
          <label for="search">Search</label>
          <input v-model="search" autofocus="true" type="text" name="search" class="form-control" placeholder="search">
        </div>

        <div class="form-group">
          <multiselect v-model="type" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" deselect-label="Can't remove this value" :options="optionType" placeholder="type" ></multiselect>
        </div>

        <div class="form-group">
          <button type="button" class="btnlarge button-blue" v-on:click="makeSearch($event)">
            Search <i class="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>

        <div class="form-group">
          <button type="button" class="btnlarge button-red" v-on:click="clear($event)">
            Clear <i class="fas fa-eraser"></i>
          </button>
        </div>

      </div>
    </div>

    <div class="container-regular container-items" v-bind:class="{ 'flex-column' : checkTypesSearched, 'flex-row': !checkTypesSearched }">

      <div v-if="albums.length" v-bind:class="{ 'full-width' : checkTypesSearched }">
        <h3>Albums</h3>
        <ul v-for="album in albums" v-bind:key="album.id">
          <li class="flex flex-row flex-space-between flex-align-items-center">
            <span><b>{{ album.name }}</b></span>
            <span>Release Date: {{ album.release_date }}</span>
            <span>
              <a v-bind:href="album.external_urls" target="new">
                <img v-if="album.image" v-bind:src="album.image" alt="image">
              </a>
            </span>
          </li>
        </ul>
      </div>

      <div v-if="artists.length" v-bind:class="{ 'full-width' : checkTypesSearched }">
        <h3>Artists</h3>
        <ul v-for="artist in artists" v-bind:key="artist.id">
          <li class="flex flex-row flex-space-between flex-align-items-center">
            <span><b>{{ artist.name }}</b></span>
            <span>Popularity: {{ artist.popularity }}</span>
            <span>
              <a v-bind:href="artist.external_urls" target="new">
                <img v-if="artist.image" v-bind:src="artist.image" alt="image">
              </a>
            </span>
          </li>
        </ul>
      </div>

      <div v-if="playlists.length" v-bind:class="{ 'full-width' : checkTypesSearched }">
        <h3>Playlists</h3>
        <ul v-for="playlist in playlists" v-bind:key="playlist.id">
          <li class="flex flex-row flex-space-between flex-align-items-center">
            <span><b>{{ playlist.name }}</b></span>
            <span>
              <a v-bind:href="playlist.external_urls" target="new">
                <img v-if="playlist.image" v-bind:src="playlist.image" alt="image">
              </a>
            </span>
          </li>
        </ul>
      </div>

      <div v-if="tracks.length" v-bind:class="{ 'full-width' : checkTypesSearched }">
        <h3>Tracks</h3>
        <ul v-for="track in tracks" v-bind:key="track.id">
          <li class="flex flex-row flex-space-between flex-align-items-center">
            <span><b>{{ track.name }}</b></span>
            <span>Album: {{ track.album }}</span>
            <span>
              External URLs:
              <a v-bind:href="track.external_urls" target="new">Link</a>
            </span>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'Search',
  components: {

  },
  data() {
    return {
      search: '',
      type: '',
      optionType: [
        'album',
        'artist',
        'playlist',
        'track',
      ],
      albums: [],
      artists: [],
      playlists: [],
      tracks: [],
      checkTypesSearched: false,
    }
  },
  computed: {
    ...mapState(['user', 'userLoggedIn', 'token']),
  },
  watch: {

  },
  created() {

  },
  mounted() {
    if (localStorage.getItem('search')) {
      this.search = localStorage.getItem('search');
    }
    if (localStorage.getItem('type')) {
      this.type = localStorage.getItem('type').split(',');
    }
  },
  methods: {
    clear() {
      this.search = '';
      this.type = '';
    },
    makeSearch() {
      if (this.search) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }

        // building a array of types
        if (typeof this.type === 'string') {
          if (this.type.indexOf(',') > 0) {
            this.type = this.type.length ? this.type.split(',') : this.optionType;
          } else{
            this.type = this.type.length ? [ this.type ] : this.optionType;
          }
        } else {
          this.type = this.type.length ? this.type : this.optionType;
        }
        // join the types to query string
        const type = this.type.join(',');

        // using the length of array of types to adjust css classes
        this.checkTypesSearched = this.type.length > 2;

        localStorage.setItem('search', this.search);
        localStorage.setItem('type', this.type);

        axios.get(`https://api.spotify.com/v1/search?q=${this.search}&type=${type}`, { headers })
          .then(res => {

            this.albums = res.data.albums ? res.data.albums.items.map(item => {
              item = {
                'id': item.id,
                'name': item.name,
                'href': item.href,
                'release_date': item.release_date,
                'total_tracks': item.total_tracks,
                'external_urls': item.external_urls.spotify,
                'image': item.images.length ? item.images[0].url : '',
              };
              return item;
            }) : [];

            this.artists = res.data.artists ? res.data.artists.items.map(item => {
              item = {
                'id': item.id,
                'name': item.name,
                'external_urls': item.external_urls.spotify,
                'image': item.images.length ? item.images[0].url : '',
                'popularity': item.popularity,
              };
              return item;
            }) : [];

            this.playlists = res.data.playlists ? res.data.playlists.items.map(item => {
              item = {
                'id': item.id,
                'name': item.name,
                'external_urls': item.external_urls.spotify,
                'image': item.images.length ? item.images[0].url : '',
              };
              return item;
            }) : [];

            this.tracks = res.data.tracks ? res.data.tracks.items.map(item => {
              item = {
                'id': item.id,
                'name': item.name,
                'href': item.href,
                'external_urls': item.external_urls.spotify,
                'album': item.album.name
              };
              return item;
            }) : [];

          })
          .catch(err => {
            throw err;
          });
      } else {
        this.$notify({
          group: 'information',
          title: 'Aviso',
          text: 'O campo de busca é requerido',
          type: 'error'
        });
      }
    },
  }
}
</script>

<style scoped>
  .full-width {
    width: 100% !important;
  }
  ul{
    list-style-type: none;
    margin: 0px !important;
    padding: 0px !important;
  }
  li {
    padding: 5px;
    height: 60px;
    margin: 5px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .1);
  }
  li span img {
    height: 40px;
    width: auto;
    max-width: 40px;
  }
  .container-items {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .container-items > div {
    min-width: 50%;
    margin: 0px !important;
    padding: 0px !important;
  }
  @media screen and (max-width: 640px){
    .container-items {
      flex-direction: column !important;
    }
  }
</style>
