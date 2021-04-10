<template>
  <div class="background justify-content-center">
    <div id="search-music" class="container">
      <!-- row 1: search input -->
      <div id="search-music-row1" class="d-flex align-items-center justify-content-center">
        <div id="search-input-wrapper" class="d-flex align-items-center">
          <input id="search-input" placeholder="Enter any keyword ..." />
          <button id="search-button" @click="fetchData()"></button>
        </div>
      </div>

      <!-- row 2: search results -->
      <div id="search-music-row2" class="card">
        <!-- header(filter) -->
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a :class="{ 'nav-link': true, active: order.isRelOrdActive }" href="#" @click="setOrder('rel')">관련순</a>
            </li>
            <li class="nav-item">
              <a :class="{ 'nav-link': true, active: order.isRcdOrdActive }" href="#" @click="setOrder('rcd')">녹음순</a>
            </li>
            <li class="nav-item">
              <a :class="{ 'nav-link': true, active: order.isLikeOrdActive }" href="#" @click="setOrder('like')">좋아요순</a>
            </li>
          </ul>
        </div>
        <!-- results -->
        <ul class="search-result-ul">
          <li v-for="music in musics" :key="music.id" id="music-result-li">
            <div class="card-body d-flex flex-row">
              <div class="img-wrapper ml-4 mr-5">
                <img class="img-profile" src="../assets/images/default_music.png" />
              </div>
              <div class="txt-wrapper card-text flex-grow-1">
                <a :href="`./musics/${music.id}`" class="card-title font-weight-bold"> {{ music.title }}</a>
                <div class="d-flex justify-content-between mt-2">
                    <dt class="col">가수</dt>
                    <dd class="col">{{ music.singer }}</dd>
                    <dt class="col">작곡가</dt>
                    <dd class="col">{{ music.composer }}</dd>
                </div>
              </div>
            </div>
          </li>
        </ul>
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
      musics: [ // temp
        {          id: 1,          title: "좋은 날",          composer: "dong-ju",          singer: "IU(아이유)",          image: "../assets/images/default_music.png",        },
        {          id: 2,          title: "celebrity2",          composer: "kyeong-min",          singer: "IU(아이유)",          image: "../assets/images/default_music.png",        },
        {          id: 3,          title: "celebrity3",          composer: "jung-jae",          singer: "IU(아이유)",          image: "../assets/images/default_music.png",        },
      ],
      order: {
        isRelOrdActive: true,
        isRcdOrdActive: false,
        isLikeOrdActive: false,
      }
    };
  },
  
  methods: {
    setOrder(clicked){
      for(var o in this.order) {
        if (this.order[o]){
          this.order[o] = false;
        }
      }

      if (clicked === "rel")
        this.order.isRelOrdActive = true;
      else if (clicked === "rcd")
        this.order.isRcdOrdActive = true;
      else if (clicked === "like")
        this.order.isLikeOrdActive = true;
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
    width: 100%;
    background-color: #ffffff;
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

  .img-wrapper {
    width: 65px;
    height: 65px;
    border-radius: 70%;
    overflow: hidden;
  }

  .img-profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .search-result-ul {
    list-style: none;
    padding-left: 0px;
  }

  #music-result-li {
    border-bottom: 1px solid #dfdfdf;
  }
</style>
