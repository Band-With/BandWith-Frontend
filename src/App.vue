
<template>
  <div id="app">
 <!--  <div id="nav">
    <router-link to="/">Home</router-link> |
      <router-link to="/find">아이디나 비밀번호를 잊어버리셨나요?</router-link>
    </div>-->
    <bandwithHeader v-if="!(isLogin || isRegister)" style="z-index:999"></bandwithHeader>
    <router-view style="z-index:1"></router-view>
  </div>
</template>

<script>
import bandwithHeader from '@/components/Header.vue'

export default {
  name: 'app',
  components: {
    bandwithHeader
  },
  computed: {
    isLogin() {
      return this.$route.name === 'Login'
    },
    isRegister() {
      return this.$route.name === 'Join'
    }
  } 
}
</script>

<style>
  .app{
    width: 100%;
    height: 100%
  }
</style>
