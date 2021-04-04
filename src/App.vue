<template>
  <div id="app">
 <!--  <div id="nav">
    <router-link to="/">Home</router-link> |
      <router-link to="/find">아이디나 비밀번호를 잊어버리셨나요?</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<style>
#app {
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
}
</style>
