<template>
  <div id="home">
    <div id="banner" class="background">
          <link rel="stylesheet" href="https://unpkg.com/@trevoreyre/autocomplete-js/dist/style.css"/>
           <autocomplete :search="search" placeholder="노래 검색" aria-label="Search for a country" class="autocomplete"></autocomplete>
    </div>
    
    <div style="position:absolute; height:5px; width: 100%; border:5px solid #CECEF6;"></div>
    <div style="margin-top:10px;width:40%; position:relative; top:70%; left:10%;float:left;">
            <a class="font">이달의 연주자</a>

      <center>
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
                <a class="font">김동주</a>
               </div>
                </slide>
                <slide>
          <div style="text-align: center; hegith:130xp">
            <pre></pre><pre></pre>
          <img src="../assets/images/suzy.jpg" alt style="border-radius: 50%; width:100px; heights:100px;">
          <a class="font">수지</a>
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

      </center>
    </div>

    <div style="margin-top:10px;width:40%;width:40%; position:relative; top:70%; left:20%;float:left;">
            <a class="font">이달의 밴드</a>

      <center>
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

      </center>

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
@import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');

.main-container{
  width: 100%; position: absolute; top: 0; z-index: -1;

}

.autocomplete{
  width:30%;
  position:relative;
  left:35%;
  top:20%
}

 .background {
    background-position:top center; background-repeat:no-repeat; background-size:100% 100%;
  }
  #home {
    width: 100%; position: absolute; top: 0; z-index: -1;
     background-color:#A4A4A4;
  }
  #banner {
    height: 70vh; background-image: url("../assets/images/profile.jpg"); color: white;
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
.font{
font-family: 'Nanum Brush Script', cursive;
font-size: 30px;
margin-left: 5px;
color:#000000
}
</style>
