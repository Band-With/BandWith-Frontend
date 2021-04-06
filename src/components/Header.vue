<template>
  <div class="header d-flex align-items-center px-5" id='nav'>
    <a href="/login">
      <img src="../assets/images/logo/logo.png" width="50" height="50">
    </a>

    <headerHome v-if="isHome"></headerHome>
    <Dropdown v-else></Dropdown>
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
  .login{
    position:relative;
    left: 75%;
  }

  #nav {
    border: none;
  }
</style>