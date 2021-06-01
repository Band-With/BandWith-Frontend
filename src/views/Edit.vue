<style scoped>
.main{
    max-width: 1300px;
    width: 100vw;
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto 30px;
    margin-top: 160px;
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
</style>
   
<template>
     <div class="row-vh d-flex flex-column justify-content-center align-items-center"> 

            <div class="row" style="width:100vw" >
                  <div class="col-md-2" style="border:2px solid #bcbcbc; text-align: center;">      
                    <button type="button" class="btn btn-light">리버브</button>
                    <round-slider radius="80" v-model="reverbTime" rangeColor="#81F781" @input="changeval()"/> Time  
                    <round-slider radius="80" v-model="reverbDecay" rangeColor="#F3F781" @input="changeval()"/> decay
                    <round-slider radius="80" v-model="reberbMix" rangeColor="#BE81F7" @input="changeval()"/> Mix
                  </div>
                  <div class="col-md-2" style="border:2px solid #bcbcbc; text-align: center;">      
                    <button type="button" class="btn btn-light">딜레이</button>
                    <round-slider radius="80" v-model="delayTime" rangeColor="#FE642E" @input="changeval()"/> Time  
                    <round-slider radius="80" v-model="feeback" rangeColor="#BE81F7" @input="changeval()"/> Feedback
                    <round-slider radius="80" v-model="delayMix" rangeColor="#D0FA58" @input="changeval()"/> Mix
                  </div>
                  <div class="col-md-2" style="border:2px solid #bcbcbc; text-align: center;">      
                    <button type="button" class="btn btn-light">트레몰로</button>
                    <round-slider radius="80" v-model="tremoloSpeed" rangeColor="#FE2EF7" @input="changeval()"/> Speed  
                    <round-slider radius="80" v-model="tremoloDepth" rangeColor="#F781D8" @input="changeval()"/> Depth
                    <round-slider radius="80" v-model="tremoloMix" rangeColor="#81F7D8" @input="changeval()"/> Mix
                  </div>
            </div>


            <div style="width:58vw; height=100px;">
               <button class="btn btn-primary" id="denoise" v-on:click="denoising">소음제거</button>
               <button class="btn btn-primary" style="position:relative; visibility:visible;" id="startBtn" v-on:click="startBtn">재생</button>
               <button class="btn btn-secondary" id="stopBtn" v-on:click="stopBtn" style="position:relative; visibility:hidden;">정지</button>
            </div>
    </div>
    
</template>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pizzicato/0.6.4/Pizzicato.js"></script>
<script>
import Vue from 'vue'
import NoiseService from '../services/noise.service';
import RoundSlider from 'vue-round-slider'
export default {
    name: '404',
   data: function() {
    return {
      reverbTime:0,
      reverbDecay: 0,
      reberbMix:0,
      feedback: 0,
      delayTime: 0,
      delayMix: 0,
      tremoloSpeed: 0,
      tremoloDepth: 0,
      tremoloMix: 0,
      sound,
      denoised:''
      }
    },
  components: {
    RoundSlider,
  },
  computed: {
    selectedData() {
      return this.$route.params.file;
    }
    },
    mounted(){
    },
    methods:{
      
    denoising(){
      console.log("????");
NoiseService.denoise(this.selectedData).then(
            response => {
                                  this.denoised = response.data;

            },
            error => {
              console.log(error)
                        }
        );    },
        startBtn(){
          document.getElementById("stopBtn").style.visibility='visible';
          document.getElementById("startBtn").style.visibility='hidden';
          const self=this;
          const file = new File([this.selectedData.blob], 'file', { type: 'wav' });
            //console.log(this.selectedData);
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
          self.sound.play();
        });

      },
      stopBtn(){
          document.getElementById("startBtn").style.visibility='visible';
          document.getElementById("stopBtn").style.visibility='hidden';
          this.sound.stop();
        if(!self.sound.isPlay()){
          document.getElementById("startBtn").style.visibility='visible';
          document.getElementById("stopBtn").style.visibility='hidden';
        }

      },
      changeval(){
        if(document.getElementById("stopBtn").style.visibility=='visible'){
          const self=this;
          const file = new File([this.selectedData.blob], 'file', { type: 'wav' });
            //console.log(this.selectedData);
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
          self.sound.play();
        });
        }


      },
    },
}

</script>