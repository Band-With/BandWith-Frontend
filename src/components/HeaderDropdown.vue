<template>
  <div class="d-flex align-items-center justify-content-center">
    <!-- first dropdown -->
    <b-dropdown id="route-dropdown" right variant="primary" class="m-0">
      <b-dropdown-item class="my-1" href="/musics/recordsetting"
        >연주 녹음하기</b-dropdown-item
      >
      <b-dropdown-item class="my-1" href="/musics">
        나만의 북마크 생성</b-dropdown-item
      >
      <b-dropdown-item class="my-1" href="/bandmusics">
        밴드 합주 둘러보기</b-dropdown-item
      >
    </b-dropdown>

    <!-- second dropdown -->
    <b-dropdown id="user-dropdown" right variant="primary" class="m-0">
      <b-dropdown-item class="my-1" :href="`/${user.username}`">
        마이페이지
        <!-- <router-link
          :to="{ name: 'myPage', params: { username: user.username } }"
          >마이페이지
        </router-link> -->
      </b-dropdown-item>
      <b-dropdown-item class="my-1" :href="`${user.username}/profile`"
        >회원정보 수정</b-dropdown-item
      >
      <b-dropdown-item class="my-1" @click="handleLogout"
        >로그아웃</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "bandwith-header",
  data() {
    return {
      imgPreUrl: "data:image/jpeg;base64,",
    };
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  mounted() {
    // 드롭다운에 이미지 추가
    let new_route_img = document.createElement("img");
    new_route_img.id = "route-dropdown-img";
    new_route_img.src = require("@/assets/images/icon/add.png");
    let route_dd_button = document.getElementById("route-dropdown__BV_toggle_");
    route_dd_button.appendChild(new_route_img);

    // 드롭다운에 이미지 추가
    let new_user_img = document.createElement("img");
    new_user_img.id = "user-dropdown-img";
    if (this.user.profileImg == null)
      new_user_img.src = require("@/assets/images/profile.jpg");
    else new_user_img.src = this.imgPreUrl + this.user.profileImg;

    let user_dd_button = document.getElementById("user-dropdown__BV_toggle_");
    user_dd_button.appendChild(new_user_img);
  },
};
</script>

<style scoped>
a {
  color: black;
}
a:hover {
  color: black;
  text-decoration: none;
}
/* ::v-deep li a {
  padding: 0;
} */
::v-deep #route-dropdown-img {
  height: 15px;
  width: 15px;
  border: none;
}
::v-deep #user-dropdown-img {
  height: 25px;
  width: 25px;
  border: 1px solid #808080;
  border-radius: 50%;
}
::v-deep #user-dropdown__BV_toggle_,
::v-deep #route-dropdown__BV_toggle_ {
  color: black;
  background-color: #fff;
  border-color: #fff;
}
</style>
