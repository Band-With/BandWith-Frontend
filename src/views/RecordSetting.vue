<template>
  <div class="background justify-content-center">
    <div id="search-music" class="container">
      <div>
    <vue-good-wizard 
      :steps="steps"
      :onNext="nextClicked"
      :onBack="backClicked">
      <div slot="page1">
      <div  class="d-flex align-items-center justify-content-center" id="search-music-row2" style="min-height: 150px">
       <Roller style="font-size:50px;" :wordWrap="20" class="roller" :text="selectedInstrunment" defaultChar="" :transition="1" :charList="['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']"></Roller>
      </div>
      <div id="search-music-row1" class="d-flex align-items-center justify-content-center">
          <div class="instrument">
           <img v-on:click="pickGuitar" src="@/assets/images/icon/elec.png" alt style="position:absolute; left:0%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
           <img id="guitar" src="@/assets/images/icon/check.png" alt style="position:absolute; display:none; left:0%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
          </div>
          <div class="instrument">
           <img v-on:click="pickPiano" src="@/assets/images/icon/piano.png" alt style="position:absolute; left:0%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
           <img id="piano" src="@/assets/images/icon/check.png" alt style="position:absolute; display:none; left:0%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
          </div>
          <div class="instrument">
           <img v-on:click="pickViolin" src="@/assets/images/icon/violin.png" alt style="position:absolute; left:0%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
           <img id="violin" src="@/assets/images/icon/check.png" alt style="position:absolute; display:none; left:0%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
          </div>
          <div class="instrument">
           <img v-on:click="pickDrum" src="@/assets/images/icon/drum.png" alt style="position:absolute; left:0%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
           <img id="drum" src="@/assets/images/icon/check.png" alt style="position:absolute; display:none; left:0%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
          </div>
         </div>
      </div>
      <div slot="page2" style="text-align:center; justify-content:center">
      <div  class="d-flex align-items-center justify-content-center" id="search-music-row2" style="min-height: 300px; font-size:40px; margin-top:5px;">        
        <div style="width:200px; height:100px; align-items:center; justify-content:center; float:left;">
          <div v-on:click="setPublic" style="float:left; border-radius: 50%; width:100px; heights:100px; font-size:18px;">Public</div>
          <img id="public" src="@/assets/images/icon/check.png" alt style="visibility:visible; border-radius: 50%; width:50px; heights:30px; float:left;">
        </div>             
        <div style="width:200px; height:100px; align-items:center; justify-content:center; float:left;">
          <div v-on:click="setPrivate" style="order-radius: 50%; width:100px; heights:100px; float:left; font-size:18px;">Private</div>
          <img id="private" src="@/assets/images/icon/check.png" alt style="visibility:hidden; left:45%; top:0%; border-radius: 50%; width:50px; heights:30px; float:left;">
        </div>
      </div>
      </div>
      <div slot="page3">
 <div  class="d-flex align-items-center justify-content-center" id="search-music-row2" style="min-height: 300px; font-size:40px; margin-top:5px;">
        <div style="width:200px; height:100px; align-items:center; justify-content:center; float:left;">
          <div v-on:click="setOption" style="float:left; border-radius: 50%; width:100px; heights:100px; font-size:18px;">검색 가능</div>
          <img id="option" src="@/assets/images/icon/check.png" alt style="visibility:visible; border-radius: 50%; width:50px; heights:30px; float:left;">
        </div>             
        <div style="width:200px; height:100px; align-items:center; justify-content:center; float:left;">
          <div v-on:click="setNoOption" style="order-radius: 50%; width:100px; heights:100px; float:left; font-size:18px;">검색 불가능</div>
          <img id="no" src="@/assets/images/icon/check.png" alt style="visibility:hidden; left:45%; top:0%; border-radius: 50%; width:50px; heights:30px; float:left;">
        </div>
      </div>
      </div>
      <div slot="page4">
         <div  class="d-flex align-items-center justify-content-center" id="search-music-row2" style="min-height: 100px; font-size:20px; margin-top:5px;">
        <h1 v-if="selectedInstrunment">{{selectedInstrunment}}</h1>
        <h1 v-else>악기를 정해주세요!</h1></div>
         <div  class="d-flex align-items-center justify-content-center" id="search-music-row2" style="min-height: 100px; font-size:3020pxpx; margin-top:5px;">

        <h1 v-if="visible">Public</h1>
        <h1 v-else>Private</h1>
                 </div>
          <div  class="d-flex align-items-center justify-content-center" id="search-music-row2" style="min-height: 100px; font-size:20px; margin-top:5px;">

        <h1 v-if="option">검색 가능</h1>
        <h1 v-else>검색 불가능</h1>
        </div>
      </div>
    </vue-good-wizard>
  </div>



      </div>

      
    
    </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
.main{
    max-width: 1300px;
    width: calc(100% - 40px);
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto 30px;
    margin-top: 160px;
}
.instrument{
  position:relative;
  margin:20px;
  width:100px;
  height:100px;
  float:left;
}
.roller .rollerBlock {
		margin: 20px;
    widows: 800px;
    height: 200px;
    font-size: 1000px;
  font-family: 'Poppins', sans-serif;

	}
  .container {
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  margin-right: auto;
  margin-left: auto;
}
.background {
  padding-top: 100px;
  min-height: 100vh;
  background-color: #fafafa;
}
/* row 1: search input */
#search-music-row1,#search-music-row2,
#search-music-row3 {
  height: 110px;
  background-color: #fff;
  width:800px;
  padding-right: 5%;
  padding-left: 5%;
  margin-right: auto;
  font-family: 'Poppins', sans-serif;
  margin-left: auto;
  margin-top:20px;
}
#setting{
  font-family: 'Poppins', sans-serif;
  width:800px;
}

</style>

<script>
import Roller from "vue-roller";

import Vue from 'vue';
import VueGoodWizard from 'vue-good-wizard';

Vue.use(VueGoodWizard);

export default {
  name:'recordsetting',
  components: {
    Roller
  },
 data: function() {
    return {
      selectedInstrunment:'',
      selectedData:"",
      option:true,
      visible:true,
      instrunmentchecked:'0',
      music_id:'',
      username:'',
       steps: [
        {
          label: '악기 정하기',
          slot: 'page1',
        },
        {
          label: '공개 범위 정하기',
          slot: 'page2',
        },
        {
          label: '검색 여부 정하기',
          slot: 'page3',
        },
        {
          label: '세팅 확인',
          slot: 'page4',
        }
      ],
    }
  },
  computed: {
    user() {
            return JSON.parse(localStorage.getItem('user'));
        },
    musicParam() {
            return this.$route.params.musicId;
        },
    },
   mounted() {
    },
 methods:{
     nextClicked(currentPage) {
      console.log('next clicked', currentPage);
      if(currentPage==3){
          this.$router.push({name: 'recording', params: {music_id:this.musicParam, instrument:this.selectedInstrunment, visible:this.visible, searchable:this.option}});
      }

      return true; //return false if you want to prevent moving to next page
    },
    backClicked(currentPage) {
      console.log('back clicked', currentPage);
      return true; //return false if you want to prevent moving to previous page
    },
  pickPiano(){
    this.selectedInstrunment='piano';
    console.log(this.selectedInstrunment);
    document.getElementById("piano").style.display='inline';
    document.getElementById("guitar").style.display='none';
    document.getElementById("drum").style.display='none ';
    document.getElementById("violin").style.display='none ';
    this.instrunmentchecked='1';
  },
  pickGuitar(){
    this.selectedInstrunment='guitar';    console.log(this.selectedInstrunment);
    document.getElementById("piano").style.display='none';
    document.getElementById("guitar").style.display='inline';
    document.getElementById("drum").style.display='none ';
    document.getElementById("violin").style.display='none ';
    this.instrunmentchecked='1';

  },
  pickViolin(){
    this.selectedInstrunment='violin';    console.log(this.selectedInstrunment);
    document.getElementById("piano").style.display='none';
    document.getElementById("guitar").style.display='none';
    document.getElementById("drum").style.display='none ';
    document.getElementById("violin").style.display='inline ';
    this.instrunmentchecked='1';

  },
  pickDrum(){
    this.selectedInstrunment='drum';    console.log(this.selectedInstrunment);
    document.getElementById("piano").style.display='none';
    document.getElementById("guitar").style.display='none';
    document.getElementById("drum").style.display='inline ';
    document.getElementById("violin").style.display='none ';    
    this.instrunmentchecked='1';

  },

  setOption(){
    this.option=true;
    document.getElementById("option").style.visibility='visible';
    document.getElementById("no").style.visibility='hidden';
  },

  setNoOption(){
    this.option=false;
    document.getElementById("option").style.visibility='hidden';
    document.getElementById("no").style.visibility='visible';
  },

setPublic(){
    this.visible=true;
    document.getElementById("public").style.visibility='visible';
    document.getElementById("private").style.visibility='hidden';
  },

  setPrivate(){
    this.visible=false;
    document.getElementById("public").style.visibility='hidden';
    document.getElementById("private").style.visibility='visible';

  },


  check(){
      console.log(this.instrunmentchecked)
      console.log(this.recordchecked)
  },


 }
}
</script>
