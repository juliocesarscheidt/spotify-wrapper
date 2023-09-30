<template>
  <nav class="navbar navbar navbar-expand-lg navbar-light bg-light">

    <button class="navbar-toggler" type="button" data-toggle="collapse"
      data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li v-if="userLoggedIn" class="nav-item active">
          <router-link v-bind:to="{ name: 'Index' }" tag="a">
            <i class="fa fa-home" aria-hidden="true"></i> Home
          </router-link>
        </li>

        <li v-if="userLoggedIn" class="nav-item">
          <router-link v-bind:to="{ name: 'Search' }" tag="a">
            <i class="fas fa-search" aria-hidden="true"></i> Search
          </router-link>
        </li>

        <li v-if="!userLoggedIn" class="nav-item">
          <router-link v-bind:to="{ name: 'Login' }" tag="a">
            <i class="fas fa-sign-in-alt"></i> Login
          </router-link>
        </li>

        <li v-if="userLoggedIn" class="nav-item">
          <a v-on:click="Logout" href="#!">Logout <i class="fas fa-sign-out-alt"></i></a>
        </li>
      </ul>
    </div>

    <template v-if="userLoggedIn && user && user.image">
      <img v-bind:src="user.image" alt="User Image">
    </template>
  </nav>
</template>

<script>
import Logout from '@/utils/Logout';
import { mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState(['user', 'userLoggedIn'])
  },
  methods: {
    Logout
  },
}
</script>

<style scoped>

/* .navbar-light {
  min-height: 60px;
} */

.navbar-light .navbar-nav>li>a{
  transition: .5s;
  color: #000;
}

.navbar-light .navbar-nav>li>a:hover, .navbar-light .navbar-nav>li>a:focus{
  color: #f22;
  text-decoration: none;
}

.nav-item {
  padding: 10px !important;
}

img {
  height: 40px;
  width: auto;
  max-width: 40px;
  float: right;
  border-radius: 50%;
  margin-top: 5px;
}
</style>
