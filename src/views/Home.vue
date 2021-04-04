<template>
<div class="home">
  <div style="position: relative; background-color: #81F7F3 g;">
    <br><br><br><br><br><br>
  </div>
  <div style="position: relative; left:10px;top:-110px;">
    <img src="../assets/logo.png" style="float:left"><br/><br/>
  </div>
  <div>
  <Login msg=""/>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
    components: {
      Login
    }
  }
  </script>

  <style type="text/css">
  body {
  }
  img {
    height:90px;
    border-style: none;
  }
  </style>

