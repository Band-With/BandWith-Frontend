<style scoped>
.main{
    max-width: 100vw;
    width: 100vw;
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto 30px;
    margin-top: 160px;
}
.textInput{
background-color:#0B173B;
color:#FFFFFF; 
display: flex; 
align-items:center;
text-align : right;
width:50px;
margin:5px;
font-size:12px;
}
.container {
  width: 100%;
  padding-right: 5%;
  margin-top:150px;
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
#search-music-row1,#search-music-row2
#search-music-row3 {
  height: 110px;
}
#search-music-row2{
  width:1200px;
}

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
#body{
    background-color: #fafafa;
}
.main{
    max-width: 100vw;
    width: calc(100% - 40px);
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto 30px;
    margin-top: 60px;
}
.col-md-1{
  background-color: #fafafa;
}
</style>
   
<template>
    <div id="body" class="d-flex flex-column align-items-center">
        <div class="main">
        <div class="row" style="margin-top:20px;"> 
            <div class="col-md-1" style="height:30vh;">
                
            </div>
            <div class="col-md-2" style="height:30vh;">
                  <div style="position:absolute; width:250px; height:250px; z-index:10; left:5%;">
                    <img style="border-radius:20px;" :src="imgPreUrl + musicInfo.img" class="w-100 h-100"/>
                  </div>
            </div>
            <div class="col-md-3" style="height:30vh;">
              <span style="color: #000; font-size: 25px; font-weight: bold; z-index:11;">{{ musicInfo.title }}</span>
              <span style="color: #000; font-size: 18px; font-weight: lighter; z-index:11;">   {{ musicInfo.singer }}<br></span>
              <span style="color: #000; font-size: 18px; font-weight: lighter; z-index:11;">   {{ musicInfo.composer }}</span>
            </div>
         
            <div class="col-md-4" style="height:30vh;">
                <button class="btn btn-secondary" id="startBtn" v-on:click="startBtn" style="position:relative; visibility:visible; height:100px; margin:10px;">적용 및 재생</button>                
                <button class="btn btn-secondary" id="stopBtn" v-on:click="stopBtn" style="position:relative; visibility:hidden; height:100px; margin:10px;">편집 종료 후 제출</button>   
                <audio :src="this.modifiedUrl" style="margin-top:30px; width:80%" controls/>           
            </div>            
            <div class="col-md-2" style="height:30vh;">
            </div>

            <div class="col-md-1" style="height:30vh;">
                
            </div>
             <div class="col-md-5" style="  background-color:#0B173B; margin-top:2px;">
                <div class="row" style="border-bottom:2px solid #bcbcbc; text-align:center; padding:20px; justify-content:center; background-color:#fafafa;">      
                원본 <audio :src="this.selectedData.url" style="margin-top:30px; width:80%" controls/>
              </div>
              <div class="row" style="border:2px solid #bcbcbc; text-align: center; padding:20px;">      
                <div class="textInput" style="height:110px;">볼륨 </div>
                <slider style="width:80%" min="0"  max="100" raising v-model="volume"></slider>
              </div>            
              <div class="row" style="border:2px solid #bcbcbc; text-align:center; padding:20px; justify-content:center;">      
                <button class="btn btn-success" id="apply" v-on:click="denoising" style="height:100px; margin:10px;">소음 제거 적용</button>
                <button class="btn btn-secondary" id="non" v-on:click="nondenoise" style="height:100px; margin:10px;">소음 제거 미적용</button>
              </div>

        </div>        
            <div class="col-md-5" style="background-color:#0B173B;">
                  <div class="row" style="border:2px solid #bcbcbc; text-align: center; padding:20px;">      
                    <div class="textInput">리버브</div>
                    <round-slider radius="60" width="30" v-model="reverbTime" rangeColor="#81F781" @input="changeval()"/>
                    <div class="textInput">Time</div>
                    <round-slider radius="60" width="30" v-model="reverbDecay" rangeColor="#F3F781" @input="changeval()"/>
                    <div class="textInput">Decay</div>
                    <round-slider radius="60" width="30"  v-model="reberbMix" rangeColor="#BE81F7" @input="changeval()"/>
                    <div class="textInput">Mix</div>
                  </div>
                  <div class="row" style="border:2px solid #bcbcbc; text-align: center; padding:20px;">      
                    <div class="textInput">딜레이</div>
                    <round-slider radius="60" width="30"  v-model="delayTime" rangeColor="#FE642E" @input="changeval()"/>
                    <div class="textInput">Time</div>
                    <round-slider radius="60" width="30"  v-model="feedback" rangeColor="#BE81F7" @input="changeval()"/>
                    <div class="textInput">Feedback</div>
                    <round-slider radius="60" width="30"  v-model="delayMix" rangeColor="#D0FA58" @input="changeval()"/>

                    <div class="textInput">Mix</div>
                  </div>
                  <div class="row" style="border:2px solid #bcbcbc; text-align: center; padding:20px;">      
                    <div class="textInput">트레몰로</div>
                    <round-slider radius="60" width="30"  v-model="tremoloSpeed" rangeColor="#FE2EF7" @input="changeval()"/>  
                    <div class="textInput">Speed</div>
                    <round-slider radius="60" width="30"  v-model="tremoloDepth" rangeColor="#F781D8" @input="changeval()"/>                    
                    <div class="textInput">Depth</div>
                    <round-slider radius="60" width="30"  v-model="tremoloMix" rangeColor="#81F7D8" @input="changeval()"/>
                    <div class="textInput">Mix</div>
                  </div>
            </div>
           
      </div>

    </div>         

  </div>
    
</template>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pizzicato/0.6.4/Pizzicato.js"></script>
    <script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>

<script>
import Vue from 'vue'
import NoiseService from '../services/noise.service';
import RoundSlider from 'vue-round-slider'
import Slider from "vue-custom-range-slider";
import "vue-custom-range-slider/dist/vue-custom-range-slider.css";
import SearchService from '../services/search.service';
import UserService from '../services/user.service';

import PizzicatoRecorder from 'pizzicato-recorder'
import Pizzicato from 'pizzicato'



export default {
    name: '404',
   data: function() {
    return {
      imgPreUrl: "data:image/jpeg;base64,",
      musicInfo:'',
      reverbTime:0,
      reverbDecay: 0,
      reberbMix:0,
      feedback: 0,
      delayTime: 0,
      delayMix: 0,
      tremoloSpeed: 0,
      tremoloDepth: 0,
      tremoloMix: 0,
      sound:"",
      denoised:'',
      volume:50,
      modifiedUrl:'',
      none: [
          {
            label: "Not at all",
            value: "0"
          }
      ]
      }
    },
  components: {
    RoundSlider,Slider
  },
  computed: {
    selectedData() {
      return this.$route.params.file;
    },
    music_id() {
      return this.$route.params.music_id;
    }
    },
    mounted(){
      SearchService.getMusic(this.$route.params.music_id).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.musicInfo = response.data;
                }
            },
            error => {
                if(error.response.status === 404)
                console.log("wow");
            }
        );
    },
    methods:{
      

    nondenoise(){
      document.getElementById("non").style.background = "#5cb85c";
      document.getElementById("apply").style.background = "#292b2c";
    },
    playBtn(){
          const self=this;
          self.soud.play();
    },
    denoising(){
      document.getElementById("apply").style.background = "#5cb85c";
      document.getElementById("non").style.background = "#292b2c";

      NoiseService.denoise(this.selectedData).then(
            response => {
              this.denoised = response.data;
            },
            error => {  
              console.log
                        }
        );    
      },
     startBtn(){
          document.getElementById("stopBtn").style.visibility='visible';
          document.getElementById("startBtn").style.visibility='hidden';
          const self=this;
            //console.log(this.selectedData);
          // extend Pizzicato
          PizzicatoRecorder(Pizzicato);
          Pizzicato.Recorder.start({ mute: false });
                    console.log(Pizzicato.Recorder)

          self.sound = new Pizzicato.Sound(this.selectedData.url, function() {    // Sound loaded!
            var reverb = new Pizzicato.Effects.Reverb({
              time: self.reverbTime/100,
              decay: self.reverbDecay/100,
              reverse: false,
              mix: self.reberbMix/100
            });
            var delay = new Pizzicato.Effects.Delay({
             feedback: self.feedback/100,
             time: self.delayTime/100,
             mix: self.delayMix/100
             });
            var tremolo = new Pizzicato.Effects.Tremolo({
              speed: self.tremoloSpeed/100,
              depth: self.tremoloDepth/100,
              mix: self.tremoloMix/100
            });
          self.sound.addEffect(tremolo);
          self.sound.addEffect(reverb);
          self.sound.addEffect(delay);
          self.sound.volume=(self.volume)/100;
          self.sound.play();
        
            self.sound.on('end',function(){
              console.log("did?");
              Pizzicato.Recorder.stop('wav', function(file) {
                let url = URL.createObjectURL(file);
                self.modifiedUrl=url;
                console.log(self.modifiedUrl);
              })
            })
          //  self.sound.volume = self.volume;
          })



      },



      stopBtn(){
          document.getElementById("startBtn").style.visibility='visible';
          this.sound.stop();
          
          const file = new File([this.modifiedUrl.blob], 'file', { type: 'wav' });
          UserService.uploadRecord(this.$route.params.username, this.$route.params.music_id, this.$route.params.instrument, this.$route.params.visible, this.$route.params.option, file);
          this.$router.push('/musics');

      },
      changeval(){
      

      },
      


    },
}

</script>