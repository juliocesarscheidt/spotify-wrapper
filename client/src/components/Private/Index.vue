<template>
  <div class="container-small">
    <h2 class="page-header text-center">Welcome</h2>
    <div class="center">
      <div id="title">Welcome back <b>{{ user.name }}</b></div>
      <br>
      <div class="row">
        <div class="col-lg-12 col-md-6 col-sm-3" style="padding: 0px;">
          Email: {{ user.email }}
        </div>
        <br><br>
        <div class="col-lg-12 col-md-6 col-sm-3" style="padding: 0px;">
          <a
            v-if="user.external_urls && user.image"
            v-bind:href="user.external_urls"
            target="new"
          >
            <img v-bind:src="user.image" alt="">
          </a>
        </div>
        <br><br>
        <div class="col-lg-12 col-md-6 col-sm-3" style="padding: 0px;" v-if="user.followers">
          <p><b>Total Followers:</b> {{ user.followers }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Index',
  computed: {
    ...mapState(['user'])
  },
}
</script>

<style scoped>
img {
  height: 200px;
  margin: auto;
  width: auto;
  max-width: 200px;
}
</style>
