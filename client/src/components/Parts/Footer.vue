<template>
  <footer class="text-center footer">
    <p>@BlackDevs | {{ new Date().getFullYear() }} &trade;</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  components: {

  },
  data() {
    return {

    }
  },
  computed: {

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
  .footer{
    padding-top: 14px;
    padding-bottom: 8px;
    margin-top: 20px;
    background-color: #000;
    border-top: 1px solid #ddd;
    font-size: 12px;
    font-weight: bold;
    color: #fff;
  }
</style>
