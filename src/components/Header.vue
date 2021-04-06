<template>
  <div class="header d-flex align-items-center px-5" id='nav'>
    <a href="/">
        <img src="../assets/images/logo.png"
                width="50" height="50">
    </a>
    <div class="login">    <router-link to="/login">로그인</router-link>
</div>
    <Dropdown></Dropdown>
  </div>  
</template>

<script>
import Dropdown from '@/components/Dropdown.vue'
export default {
  name: 'bandwith-header',
  props: {
    user: Object
  },
  components:{
    Dropdown
  }
}
</script>
<style>
.login{
  position:relative;
  left:75%;
}
</style>