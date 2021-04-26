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
      <div id="search-music-row2" class="card">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <router-link
              :key="$route.fullPath"
                :to="{ name: 'music-by-related', query: { filter: 'rel' } }"
                :class="{ 'nav-link': true, active: order.isRelOrdActive }"
                @click.native="setOrder('rel')"
                >관련순</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
              :key="$route.fullPath"
                :to="{ name: 'music-by-record', query: { filter: 'rcd' } }"
                :class="{ 'nav-link': true, active: order.isRcdOrdActive }"
                @click.native="setOrder('rcd')"
                >녹음순</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
              :key="$route.fullPath"
                :to="{ name: 'music-by-like', query: { filter: 'like' } }"
                :class="{ 'nav-link': true, active: order.isLikeOrdActive }"
                @click.native="setOrder('like')"
                >좋아요순</router-link
              >
            </li>
          </ul>
        </div>
        
        <!-- results -->
        <router-view></router-view>
        
      </div>

      <!-- row 3: pagination -->
      <nav
        id="search-music-row3"
        class="d-flex align-items-center justify-content-center"
      >
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: "search-music",
  data() {
    return {
      order: {
        isRelOrdActive: true,
        isRcdOrdActive: false,
        isLikeOrdActive: false,
      },
    };
  },

  methods: {
    setOrder(clicked) {
      for (var o in this.order) {
        if (this.order[o]) {
          this.order[o] = false;
        }
      }

      if (clicked === "rel") this.order.isRelOrdActive = true;
      else if (clicked === "rcd") this.order.isRcdOrdActive = true;
      else if (clicked === "like") this.order.isLikeOrdActive = true;
    },
  },

  // create() {
  //   axios.get('/musics').then(res => {
  //     this.musics = res.data;
  //   })
  // }
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
  width: 100%;
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
  background: no-repeat center/100% url("../assets/images/search_icon.png");
}

/* row 2: search result */
#search-music-row2 {
  height: 100vh;
}
</style>
