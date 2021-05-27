<template>
  <div id='nav' :class="{ 'border-none': isHome }">
    <div class="position-relative header d-flex align-items-center h-100">
      <a href="/">
        <img src="../assets/images/logo/logo.png" width="50" height="50">
      </a>

      <headerHome v-if="isHome"></headerHome>
      <div v-else class="d-flex w-100 h-100 align-items-center justify-content-end">
        <router-link to="/" class="mr-3"><img src="../assets/images/icon/home.png" style="width:30px; height: 30px"></router-link>
        <Dropdown></Dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue'
import headerHome from '@/components/HeaderHome.vue'

export default {
  name: 'bandwith-header',
  components: {
    headerHome,
    Dropdown
  },
  props: {
    user: Object
  },
  computed: {
    isHome() {
      return this.$route.name === 'Home'
    }
  }
}
</script>

<style scoped>
  #nav {
    position: fixed;
    width: 100%;
    background-color: #fff;
    height: 60px;
    border-bottom: 1px solid #ddd;
  }

  #nav a {
    font-weight: bold;
  }
  .header{
    margin: 0 auto;
    max-width: 1320px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .login{
    position:relative;
    left: 75%;
  }

  .border-none{
    background-color: transparent!important;
    border: none!important;
  }
</style>