<template>
  <div id="home">
    <div id="banner">
      <!-- row 1: search input -->
      <div
        id="search-music-row1"
        class="d-flex align-items-center justify-content-center"
      >
        <form id="search-input-wrapper" class="d-flex align-items-center">
          <input
            name="input"
            id="search-input"
            placeholder="검색어를 입력하세요."
          />
          <button @click="submit()" id="search-button"></button>
        </form>
      </div>
    </div>

    <div class="">
    <div
      style="margin-top:10px;width:40%; position:relative; top:70%; left:15%;float:left;"
    >
      <div style="color: #2080e0; font-size: 1.2rem;"> 이달의 연주자</div>

      <center >
        <hooper
          style="height: 250px; position:relative; left:-20%;"
          :itemsToShow="3"
          :centerMode="true"
          :autoPlay="true"
          :infiniteScroll="true"
        >
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/dongju.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>김동주</a>
            </div>
          </slide>
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/suzy.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>수지</a>
            </div>
          </slide>
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/mingue.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>조민규</a>
            </div>
          </slide>
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/suzy.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>김동주</a>
            </div>
          </slide>
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/suzy.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>수지</a>
            </div>
          </slide>
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/band.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>벤드</a>
            </div>
          </slide>
        </hooper>
      </center>
    </div>

    <div
      style="margin-top:10px;width:40%;width:40%; position:relative; top:70%; left:20%;float:left;"
    >
      <div style="color: #2080e0; font-size: 1.2rem;">이달의 밴드</div>

      <center>
        <hooper
          style="height: 250px; position:relative; left:-20%;"
          :itemsToShow="3"
          :centerMode="true"
          :autoPlay="true"
          :infiniteScroll="true"
        >
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/dongju.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>고무밴드</a>
            </div>
          </slide>
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/suzy.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>대일밴드</a>
            </div>
          </slide>
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/mingue.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>락밴드</a>
            </div>
          </slide>
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/suzy.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>문어밴드</a>
            </div>
          </slide>
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/suzy.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>봉봉밴드</a>
            </div>
          </slide>
          <slide>
            <div style="text-align: center; hegith:130xp">
              <pre></pre>
              <pre></pre>
              <img
                src="../assets/images/band.jpg"
                alt
                style="border-radius: 50%; width:100px; heights:100px;"
              />
              <a>경민밴드</a>
            </div>
          </slide>
        </hooper>
      </center>
    </div>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
  name: "Profile",
  props: {
    msg: String,
  },
  data: function() {
    return {
      content: "",
      searched: "",
      hooperSettings: {
        infiniteScroll: true,
        centerMode: true,
        autoPlay: true,
        playSpeed: 2000,
        breakpoints: {
          2400: {
            itemsToShow: 5,
          },
          1800: {
            itemsToShow: 4,
          },
          1500: {
            itemsToShow: 3,
          },
          1100: {
            itemsToShow: 2.5,
          },
          0: {
            itemsToShow: 1.5,
          },
        },
      },
    };
  },
  mounted() {},
  methods: {
    submit() {
      this.searched = document.getElementById("search-input").value;
      this.$router.push({
        name: "search-music",
        query: { q: this.searched, filter: "rel" },
      });
    },
  },
  components: {
    Hooper,
    Slide,
  },
};
</script>

<style scoped>
#search-input-wrapper {
  width: 450px;
  height: 50px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px #aaa;
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
.main-container {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}

#search-music-row1 {
  width: 30%;
  position: relative;
  left: 35%;
  top: 20%;
}
#home {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}
#banner {
  height: 70vh;
  background-image: url("../assets/images/home-background.jpg");

  color: white;
}

.hooper-slide.is-current {
  transform: scale(1.3);
}
.hooper-slide.is-current {
  transform: scale(1.3);
}

.images {
  height: 50vh;
  width: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}

.hooper {
  height: 70vh;
}
.font {
  font-family: "Nanum Brush Script", cursive;
  font-size: 30px;
  margin-left: 100px;
  color: #000000;
}
</style>
