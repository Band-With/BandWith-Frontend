<template>
  <div id="nav" :class="{ 'border-none': isHome }">
    <div class="position-relative header d-flex align-items-center justify-content-between h-100">
      <!-- 로고 이미지 -->
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/images/logo/logo.png" width="50" height="50" />
      </router-link>

      <!-- 홈 화면 헤더 -->
      <div v-if="isHome" id="header-home-btn" class="ml-auto p-2">
        <ul class="nav">
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link active"
              style="color: white"
              ><b>로그인</b></router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/join" class="nav-link btn btn-primary"
              ><b>회원가입</b></router-link
            >
          </li>
        </ul>
      </div>

      <!-- 일반 헤더 -->
      <div
        v-else
        class="d-flex align-items-center justify-content-center"
      >
        <HeaderDropdown></HeaderDropdown>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDropdown from "@/components/HeaderDropdown.vue";

export default {
  name: "bandwith-header",
  components: {
    HeaderDropdown,
  },
  props: {
    user: Object,
  },
  computed: {
    isHome() {
      return this.$route.name === "Home";
    },
  },
};
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
.header {
  margin: 0 auto;
  max-width: 1320px;
  padding-left: 20px;
  padding-right: 20px;
}

.login {
  position: relative;
  left: 75%;
}

.border-none {
  background-color: transparent !important;
  border: none !important;
}
</style>
