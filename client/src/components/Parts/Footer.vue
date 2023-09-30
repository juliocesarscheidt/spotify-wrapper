<template>
  <footer class="text-center footer">
    <p>@Blackdevs | {{ new Date().getFullYear() }} &trade;</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.footer{
  padding-top: 20px;
  padding-bottom: 8px;
  margin-top: 20px;
  border-top: 1px solid #eee;
  font-size: 12px;
  font-weight: bold;
  color: #000;
}
</style>
