<template>
  <div class="background justify-content-center">
    <div id="search-music" class="container">
      <!-- row 1: search input -->
      <div
        id="search-music-row1"
        class="d-flex align-items-center justify-content-center"
      >
      </div>

      <!-- row 2: search results -->
      <div id="search-music-row2" style="min-height: 25vh;" >
        <!-- nav filter -->
        <div class="musicinfo" style="float:left;">
          <img src="../assets/images/IU.jpg" alt style="border-radius: 50%; width:100px; heights:100px; float:left;">
          <div style="float:left; margin-right:10px; font-size:20px; margin-left:15px; margin-top:10px">{{this.$route.params.id}}</div>
          <div style="float:left; font-size:18px; margin-top:10px;">{{this.$route.params.id}}</div>
        </div>
        <!-- no result -->
        <!-- search results -->

        <div style="margin-left:40px; width:210px; float:left;">
           <div class="visibility">
             <div class="noise">공개 범위</div><div style="margin-left:20px; margin-right:100px;">
                <div style="float:left; height:50px;">
                </div>
             <div style="position:relative; margin-top:10px;" >
               <div v-on:click="setPublic" style="position:absolute; left:-20%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left; font-size:18px;">Public</div>
                <img id="public" src="../assets/images/icon/check.png" alt style="position:absolute; display:inline; left:-15%; top:0%; border-radius: 50%; width:30px; heights:30px; float:left;">
             </div>             
             </div>
             <div>
              <div style="float:left; height:50px;">
              </div>
             <div style="position:relative">
               <div v-on:click="setPrivate" style="position:absolute; left:40%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left; font-size:18px;">Private</div>
                <img id="private" src="../assets/images/icon/check.png" alt style="position:absolute; display:none; left:45%; top:0%; border-radius: 50%; width:30px; heights:30px; float:left;">
             </div>                </div>
                </div>
        </div>

        <div style="margin-left:10px; width:210px; float:left;">
           <div class="option">
             <div class="noise">소음 제거</div><div style="margin-left:10px; margin-right:100px">
                <div style="float:left; height:50px;">
                </div>
             <div style="position:relative; margin-top:10px;" >
               <div v-on:click="setOption" style="position:absolute; left:-20%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left; font-size:18px;">적용</div>
                <img id="option" src="../assets/images/icon/check.png" alt style="position:absolute;  left:-15%; top:0%; border-radius: 50%; width:30px; heights:30px; float:left;">
             </div>             </div>
             <div>
              <div style="float:left; height:50px;">
              </div>
             <div style="position:relative">
               <div v-on:click="setNoOption" style="position:absolute; left:40%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left; font-size:18px;">미적용</div>
                <img id="no" src="../assets/images/icon/check.png" alt style="position:absolute; display:none; left:45%; top:0% border-radius: 50%; width:30px; heights:30px; float:left;">
             </div>                </div>
                </div>
        </div>
        <div style="margin-left:10px; width:210px; float:left; font-size:25px;">
                       악기 선택

           <div class="inst" style="width:400px" >
             <div style="position:relative">
               <img v-on:click="pickGuitar" src="../assets/images/icon/guitar.png" alt style="position:absolute; left:0%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
                <img id="guitar" src="../assets/images/icon/check.png" alt style="position:absolute; display:none; left:0%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
             </div>
             <div style="position:relative">
                <img v-on:click="pickPiano" src="../assets/images/icon/piano.png" alt style="position:absolute; left:25%; top:0%;  border-radius: 50%; width:100px; heights:100px; float:left;">
                <img id="piano" src="../assets/images/icon/check.png" alt style="position:absolute;display:none; left:25%; top:0%;   border-radius: 50%; width:100px; heights:100px; float:left;">
             </div>
             <div style="position:relative">
                <img v-on:click="pickViolin" src="../assets/images/icon/violin.png" alt style="position:absolute; left:50%; top:0%;  border-radius: 50%; width:100px; heights:100px; float:left;">
                <img id="violin" src="../assets/images/icon/check.png" alt style="position:absolute; display:none; left:50%; top:0%;  border-radius: 50%; width:100px; heights:100px; float:left;">
             </div>
             <div style="position:relative">
                <img v-on:click="pickDrum" src="../assets/images/icon/drum.png" alt style="position:absolute;  left:75%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
                <img id="drum" src="../assets/images/icon/check.png" alt style="position:absolute;display:none;  left:75%; top:0%; border-radius: 50%; width:100px; heights:100px; float:left;">
             </div>
            </div>
        </div>

      </div>

      <!-- row 3: pagination -->
      <div id="search-music-row3" style="width:1000px; margin-top:100px;">
        <div style="margin-left:100px; float:left;">
           <MusicVisual id="bar1" style="float:left; margin-left:3px; animation-play-state:paused;"></MusicVisual>
           <MusicVisual id="bar2" style="float:left;margin-left:3px; animation-delay: 0.2s;animation-play-state:paused;"></MusicVisual>
           <MusicVisual id="bar3" style="float:left;margin-left:3px;animation-delay: 0.4s;animation-play-state:paused;"></MusicVisual>
        </div>
        <vue-confirmation-button  ref="confirmationButton"
          style="width:250px; margin-left:600px;"
          :messages="customMessages" v-on:confirmation-incremented="check()"
          v-on:confirmation-success="send()">
        </vue-confirmation-button>  
        <div id="search-music-row4" >
          <audio-recorder ref="recorder" :format="WAV" :show-upload-button="false" :after-recording="setRecorded" :before-recording="startRecord" :select-record="selectedRecord" :pause-recording="visual" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue';
import AudioRecorder from 'vue-audio-recorder'
import MusicVisual from '../components/MusicVisual'
import vueConfirmationButton from 'vue-confirmation-button';
import UserService from '../services/user.service';


Vue.use(AudioRecorder)
export default {
  name:'recording',
  components: {
    MusicVisual,
    'vue-confirmation-button': vueConfirmationButton,
      },
 data: function() {
    return {
      visualization:"false",
      selectedInstrunment:' v-on:click="pick"',
      volumne:"0",
      selectedData:"",
      option:'do',
      visible:'public',
      instrunmentchecked:'0',
      music_id:'',
      user_id:'',
      recordchecked:'0',

      customMessages: [
        '모두 선택하신 후에 클릭해주세요!',
      '모두 정상상적으로 선택되었나요?',
      '성공! 목록으로 돌아갑니다.'
    ],
    }
  },
  computed: {
    user() {
            return JSON.parse(localStorage.getItem('user'));
        },
 
    musicParam() {


            return this.$route.params.id;
        },

    },
   mounted() {
     

    },
 methods:{
  setVisual(visualization){
    if(visualization){
    document.getElementById("bar1").style.animationPlayState='running';
    document.getElementById("bar2").style.animationPlayState='running';
    document.getElementById("bar3").style.animationPlayState='running';
    }
    else{
    document.getElementById("bar1").style.animationPlayState='paused';
    document.getElementById("bar2").style.animationPlayState='paused';
    document.getElementById("bar3").style.animationPlayState='paused';
    }
  },
	setPlayerDisabled() {
		const $player = this.$refs.recorder.$el.querySelector('.ar-player');
		$player.classList.remove('abled');
    },
    setPlayerAbled() {
        const $player = this.$refs.recorder.$el.querySelector('.ar-player');
        $player.classList.add('abled');
    },
    hideStopBtn() {
        const $stopBtn = this.$refs.recorder.$el.querySelector('.ar-recorder__stop');
        $stopBtn.style.display = 'none';
    },
	showStopBtn() {
        const $stopBtn = this.$refs.recorder.$el.querySelector('.ar-recorder__stop');
        $stopBtn.style.display = 'block';
    },
    setRecentRecord() {
		const recorder = this.$refs.recorder;
		if (recorder) {
			const top = recorder.recordList.length - 1;
			recorder.selected = recorder.recordList[top];
		}
	},
	setRecorded() {
        this.hideStopBtn();
        this.setPlayerDisabled();
        this.setVisual(false);
    
	},
	startRecord() {
		this.showStopBtn();
    this.setVisual(true);
    },
	selectedRecord() {
    const recorder = this.$refs.recorder;
    this.selectedData=recorder.selected;
    this.recordchecked='1';
  },
  visual() {
    this.setVisual(false);
	},
  send(){
    this.music_id=this.$route.params.id;
    this.user_id=this.user.id;

    const file = new File([this.selectedData.blob], 'music', { type: this.selectedData.blob.type });

    UserService.uploadRecord(this.user_id, this.music_id,this.selectedInstrunment, this.visible, this.option, file);


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
    this.option='do';
    document.getElementById("option").style.display='inline';
    document.getElementById("no").style.display='none';
  },

  setNoOption(){
    this.option='no';
    document.getElementById("option").style.display='none';
    document.getElementById("no").style.display='inline';
  },

setPublic(){
    this.visible='public';
    document.getElementById("public").style.display='inline';
    document.getElementById("private").style.display='none';
  },

  setPrivate(){
    this.visible='private';
    document.getElementById("public").style.display='none';
    document.getElementById("private").style.display='inline';




  },


  check(){
      console.log(this.instrunmentchecked)
      console.log(this.recordchecked)

      if(this.instrunmentchecked==='1'){
        if(this.recordchecked==='1'){
      console.log(this.recordchecked)
        }
        else{
          console.log('2')
          this.$refs.confirmationButton.reset();
        }
      }
      else{
          console.log('3')
          this.$refs.confirmationButton.reset();
      }
  },


 }
}
</script>


<style scoped>

::v-deep .ar-content{
	width:1000px;
	height:200px;
	flex-direction: row !important
}
::v-deep .ar{
	float:left;
}
::v-deep .ar-player__play {
  fill: white !important;
  background-color: #171003 !important;
}

::v-deep .ar-player__play {
  fill: white !important;
  background-color: #ff6b64 !important;
  cursor: inherit;
}
::v-deep .ar-player__play {
  fill: white !important;
  background-color: #171003 !important;

  &.ar-player__play--active {
    background-color: #171003 !important;
  }
}
.noise{
  font-size: 25px;
}
::v-deep .ar-player__play {
  fill: white !important;
  background-color: #ff6b64 !important;
  cursor: inherit;

  &.ar-player__play--active {
    background-color: #ff6b64 !important;
  }
}
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
::v-deep .ar-icon {
  border: none;
  box-shadow: 0 2px 5px 1px rgba(158, 158, 158, 0.5);
}

::v-deep .ar-icon__lg {
  width: 38px;
  height: 38px;
}

::v-deep svg {
  vertical-align: baseline;
}

::v-deep div.ar {
  margin-top:100px;
  width: 1000px;
  box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);
  background-color: #fff;
  border: 1px solid #eff2f7;
  border-radius: 0.375rem;
}

::v-deep .ar-player {
	justify-content: left;
  width: 400px;
}
.record{

}
.submit{

}
.radio{
  font-size: 20px;
  margin-left: 5px;
  margin-right: 10px;
  float:left;
  margin-top:10px;
  margin-bottom:10px;
}
.musicinfo{

}
.options{

}
.mictest{

}
.visibility{

}
/* disalbed 처리 */
::v-deep .ar-player {
	order:-1;
  opacity: 0.5;
  cursor: default;
  &.abled {
    opacity: 1;
    cursor: pointer;
  }
}

::v-deep .ar-player__time {
  width: 3.2rem;
  margin: 0 0.4rem;
}

::v-deep .ar-records {
	height: 150px;
	margin-left: 20px;
	order:100;
}

::v-deep .ar-records__record {
  min-width: 250px;
}
::v-deep .ar-recorder {
  order:0;
}
::v-deep .ar-recorder__duration {
  font-size: 1.3rem;
  margin-left: 60px;
  order:2;
}

::v-deep .ar-player-actions {
  width: 50px;
  justify-content: center;
}

::v-deep .ar-player > .ar-player-bar > .ar-player__progress {
  max-width: 110px;
}

/* 중지 버튼 레코딩 버튼과 겹치기 */

::v-deep .ar-recorder__stop {
	order:1;
  fill: white !important;
  background-color: #ff6b64 !important;
  top: 0;
  right: 10;
  width: 38px;
  height: 38px;
  display: none;
}


::v-deep .confirmation__button{
  width:200px;
  }

::v-deep .confirmation__button.confirmation__button--complete{
  width:200px;
  }
::v-deep #data-v-4917ee8b{
  width:200px;
}
.inner d-flex {
	height: 400px;
	padding-top: 300px;
	float:left;
	left:30%;
	width: 100%;
}




</style>