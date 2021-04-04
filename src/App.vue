
<template>
  <div id="app">
<<<<<<< HEAD
 <!--  <div id="nav">
    <router-link to="/">Home</router-link> |
      <router-link to="/find">아이디나 비밀번호를 잊어버리셨나요?</router-link>
    </div>-->
=======
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <bandwithHeader></bandwithHeader>
>>>>>>> feature/main
    <router-view/>
  </div>
</template>

<script>
import bandwithHeader from '@/components/Header.vue'

export default {
  name: 'me',
  components: {
    bandwithHeader
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
