<template>
  <div class="main-container">
    <link rel="stylesheet" href="https://unpkg.com/@trevoreyre/autocomplete-js/dist/style.css"/>
  <autocomplete :search="search" placeholder="노래 검색" aria-label="Search for a country" class="autocomplete"></autocomplete> 
  <div class="main">
  </div>

  <div style="width:100%;">
      <div style="width:10%; display: inline-block;"></div>

 <div style="width:40%; display:inline-block;">
              <a>이달의 연주자</a>
  <hooper
        style="height: 250px; position:relative; left:-20%;"
        :itemsToShow="3"
        :centerMode="true"
        :autoPlay="true"
        :infiniteScroll="true">
        <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/dongju.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>김동주</a>
           </div>
        </slide>
 <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/suzy.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>수지</a>
           </div>
        </slide>
        <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/mingue.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>조민규</a>
           </div>
        </slide>
        <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/suzy.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>김동주</a>
           </div>
        </slide>
        <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/suzy.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>수지</a>
           </div>
        </slide>
        <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/band.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>벤드</a>
           </div>
        </slide>
      </hooper>
  </div>

  <div style="width:10%; display: inline-block;">
</div>
<div style="width:40%; display: inline-block;">
              <a>이달의 밴드</a>
   <hooper
        style="height: 250px; position:relative; left:-20%;"
        :itemsToShow="3"
        :centerMode="true"
        :autoPlay="true"
        :infiniteScroll="true">
        <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/dongju.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>김동주</a>
           </div>
        </slide>
 <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/suzy.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>수지</a>
           </div>
        </slide>
        <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/mingue.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>조민규</a>
           </div>
        </slide>
        <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/suzy.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>김동주</a>
           </div>
        </slide>
        <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/suzy.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>수지</a>
           </div>
        </slide>
        <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/band.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a>벤드</a>
           </div>
        </slide>
      </hooper>
  </div>
  </div>


</div>
</template>


<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
  import { Hooper, Slide } from 'hooper';
  import 'hooper/dist/hooper.css';

export default {
  name: 'Profile',
  props: {
    msg: String
  },
 data: function() {
    return {
      hooperSettings: {
        infiniteScroll: true,
        centerMode: true,
        autoPlay: true,
        playSpeed: 2000,
        breakpoints: {
          2400: {
            itemsToShow: 5
            },
          1800: {
            itemsToShow: 4
          },
          1500: {
            itemsToShow: 3
          },
          1100: {
            itemsToShow: 2.5
          },
          0: {
            itemsToShow: 1.5
          }
        }
      } 
    }
  },
  components: {
      Autocomplete,
      Hooper,
      Slide
  },
  methods:{
  }
}
</script>

<style scoped>

.main-container{
  width:100%;
  z-index: 0;
  position:absolute;
}

.autocomplete{
  width:20%;
  position:relative;
  left:40%;
  margin-top:10px;
}

.main-banner{
  width: 100%;
  height:100%;
  position:absolute;
}
.main{
  border-top:5px solid #A4A4A4;
  margin-top:10px;
  margin-bottom:10px
}
.hooper-slide.is-current {
  transform: scale(1.2);
}
.hooper-slide.is-current {
  transform: scale(1.2);
}
.images {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}
.img1 {
  background: salmon;
}
.img2 {
  background: lightblue;
}
.img3 {
  background: coral;
}
.img4 {
  background: lightgreen;
}
.img5 {
  background: pink;
}
h2 {
  color: #fff
}
.hooper {
  height: 100vh;
}
</style>
