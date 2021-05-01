<template>
  <div class="background justify-content-center">
    <div id="search-record" class="container">
      <!-- row 1: search info -->
      <div id="search-record-row1" class="mt-5 mb-3">
        <b>'{{ music_title }}'</b>에 대한 검색 결과입니다.
      </div>
      <!-- row 2 -->
      <div id="search-record-row2" class="d-flex">
        <!-- row 2: left -->
        <div id="search-record-left" class="mr-5">
          <!-- nav filter -->
          <div>
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <router-link
                  :to="{ name: 'record-by-latest', query: {} }"
                  :class="{ 'nav-link': true, active: false }"
                >
                  <!-- <img id="latest" src="../assets/images/icon/clock.png" /> -->
                  <span>최신순</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'record-by-like', query: {} }"
                  :class="{ 'nav-link': true, active: false }"
                >
                  <!-- <img id="like" src="@/assets/images/icon/like_off.png" /> -->
                  <span>좋아요순</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'record-by-follow', query: {} }"
                  :class="{ 'nav-link': true, active: false }"
                >
                  <!-- <img id="follow" src="../assets/images/icon/follower.png" /> -->
                  <span>팔로우순</span>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- result records -->
          <div>
            <router-view></router-view>
          </div>
        </div>
        <!-- row 2: right -->
        <div id="search-record-right" class="d-flex flex-column">
          <div id="record-cart" class="p-2 my-3">
            cart
          </div>
          <div id="record-comment" class="p-2">
            comment
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-music",
  data() {
    return {
      music_title: "아이유 - 하루끝",
    };
  },

  methods: {},
  create() {},
};
</script>

<style scoped>
.background {
  padding-top: 60px;
  width: 100%;
  height: 100vh;
  background-color: #fafafa;
}

/* #search-record-row1 {
  height: 150px;
} */

#search-record-row1 b {
  color: #007bff;
}

li a {
  opacity: 0.5;
  font-size: 0.8rem;
  border: none !important;
  color: black;
}

li a.router-link-exact-active {
  opacity: 1 !important;
  color: black;
  font-weight: bold;
  border-bottom: 2px solid #2080e0 !important;
}

a:hover {
  border: none;
}

#latest,
#like,
#follow {
  width: 15px;
  height: 15px;
}

#record-cart, #record-comment {
  background: #ffffff;
}
</style>
