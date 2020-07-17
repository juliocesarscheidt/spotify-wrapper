<template>
  <nav class="navbar navbar-default" id="nav-main">
    <div class="container-fluid">

      <div class="navbar-header">

        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-collapse" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>

      <div class="collapse navbar-collapse" id="bs-collapse">

        <ul class="nav navbar-nav">
          <li v-if="userLoggedIn">
            <router-link v-bind:to="{ name: 'Index' }" tag="a">
              Home <i class="fa fa-home" aria-hidden="true"></i>
            </router-link>
          </li>

          <li v-if="userLoggedIn">
            <router-link v-bind:to="{ name: 'Search' }" tag="a">
              Search <i class="fas fa-search" aria-hidden="true"></i>
            </router-link>
          </li>

          <li v-if="!userLoggedIn">
            <router-link v-bind:to="{ name: 'Login' }" tag="a">
              Login <i class="fas fa-sign-in-alt"></i>
            </router-link>
          </li>

          <li v-if="userLoggedIn">
            <a v-on:click="Logout" href="#!">Logout <i class="fas fa-sign-out-alt"></i></a>
          </li>

        </ul>

        <template v-if="userLoggedIn">
          <img v-bind:src="user.image" alt="User Image">
        </template>

      </div>

    </div>
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
    Logout() {
      Logout();
    },
  },
}
</script>

<style scoped>
.navbar-toggle{
  transition: background-color .5s !important;
  background-color: rgba(0,0,0,0) !important;
}
.navbar-toggle:hover{
  background-color: rgba(100,100,100,.50) !important;
}

.navbar-default{
  background-color: #000 !important;
}
.navbar-default .navbar-nav>li>a{
  transition: .5s;
  color: #fff;
}
.navbar-default .navbar-nav>li>a:hover, .navbar-default .navbar-nav>li>a:focus{
  color: #f22;
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
