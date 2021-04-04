
<template>
  <div id="app">
 <!--  <div id="nav">
    <router-link to="/">Home</router-link> |
      <router-link to="/find">아이디나 비밀번호를 잊어버리셨나요?</router-link>
    </div>-->
    <bandwithHeader v-if="!isLogin"></bandwithHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import bandwithHeader from '@/components/Header.vue'

export default {
  name: 'me',
  components: {
    bandwithHeader
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  } 
}
</script>

<style>

#nav {
  position: relative;
  height: 70px;
  border-bottom: 1px solid #ddd;
}

#nav a {
  font-weight: bold;
}
</style>
