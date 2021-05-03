<template>
  <div class="background justify-content-center">
    <div id="search-music" class="container">
      <!-- row 1: search input -->
      <div
        id="search-music-row1"
        class="d-flex align-items-center justify-content-center"
      >
        <div id="search-input-wrapper" class="d-flex align-items-center">
          <input id="search-input" placeholder="Enter any keyword ..." />
          <button id="search-button"></button>
        </div>
      </div>

      <!-- row 2: search results -->
      <div id="search-music-row2" class="">
        <!-- nav filter -->
        <div>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <router-link
                :key="$route.fullPath"
                :to="{ name: 'music-by-related', query: { filter: 'rel' } }"
                class="nav-link"
                >관련순</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :key="$route.fullPath"
                :to="{ name: 'music-by-record', query: { filter: 'rcd' } }"
                class="nav-link"
                >녹음순</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :key="$route.fullPath"
                :to="{ name: 'music-by-like', query: { filter: 'like' } }"
                class="nav-link"
                >좋아요순</router-link
              >
            </li>
          </ul>
        </div>

        <!-- results -->
        <router-view></router-view>
      </div>

      <!-- row 3: pagination -->
      <Paging />
    </div>
  </div>
</template>

<script>
import Paging from "@/components/Paging.vue";

export default {
  name: "search-music",
  data() {
    return {};
  },

  components: {
    Paging
  },

  methods: {

  },

  mounted() {
    
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  margin-right: auto;
  margin-left: auto;
}

.background {
  padding-top: 60px;
  min-height: 100vh;
  background-color: #fafafa;
}

/* row 1: search input */
#search-music-row1,
#search-music-row3 {
  height: 110px;
}

#search-input-wrapper {
  width: 450px;
  height: 50px;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0px 3px 7px #aaa;
}

#search-input {
  width: 80%;
  height: 100%;
  margin: 20px;
  border: none;
}

#search-input:focus {
  outline: none;
}

#search-button {
  width: 25px;
  height: 25px;
  border: none;
  cursor: pointer;
  background: no-repeat center/100% url("../assets/images/icon/search_icon.png");
}

/* row 2: search result */
.nav-item {
  opacity: 0.5;
  font-size: 0.8rem;
  border: none !important;
}

.nav-item a {
  color: black;
}
.nav-item a:hover {
  cursor: pointer;
}

.active {
  opacity: 1 !important;
  color: black;
  font-weight: bold;
  border-bottom: 2px solid #2080e0 !important;
}
</style>
