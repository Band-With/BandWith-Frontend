<template>
  <div class="header d-flex align-items-center px-5" id='nav'>
    <a href="/login">
      <img src="../assets/images/logo/logo.png" width="50" height="50">
    </a>
    <headerHome v-if="isHome"></headerHome>
  </div>
</template>

<script>
import headerHome from '@/components/HeaderHome.vue'

export default {
  name: 'bandwith-header',
  components: {
    headerHome
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
    border: none;
  }
</style>