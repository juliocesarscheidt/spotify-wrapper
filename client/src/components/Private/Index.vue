<template>
  <div class="container-small">
    <h2 class="page-header text-center">Welcome</h2>
    <div class="center">
      <div id="title">Welcome back <b>{{ user.name.toUpperCase() }}</b></div>
      <br>
      <div class="row">
        <div class="col-lg-12">
          Email: {{ user.email }}
        </div>
        <br>
        <div class="col-lg-12">
          <a v-bind:href="user.external_urls" target="new">
            <img v-bind:src="user.image" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Index',
  components: {

  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
  img {
    height: 200px;
    width: auto;
    max-width: 200px;
  }
</style>
