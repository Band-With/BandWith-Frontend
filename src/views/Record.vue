<template>
  <div class="inner d-flex">
	<div class="record">
		<div class="mictest">
      <MusicVisual id="bar1" style="float:left; margin-left:3px; animation-play-state:paused;"></MusicVisual>
      <MusicVisual id="bar2" style="float:left;margin-left:3px; animation-delay: 0.2s;animation-play-state:paused;"></MusicVisual>
      <MusicVisual id="bar3" style="float:left;margin-left:3px;animation-delay: 0.4s;animation-play-state:paused;"></MusicVisual>
    </div>
    <div class="visibility">
      <div class="noise">공개 범위</div><div style="margin-left:20px; margin-right:100px">
      <div style="float:left; height:50px;"><input type="radio" name="visible" value="noise" checked="checked" style="margin-top:20px; margin-bottom:10px;"></div>
      <div class="radio">Public</div></div>
      <div>
      <div style="float:left; height:50px;"><input type="radio" name="visible" value="none" style="margin-top:20px; margin-bottom:10px;"></div>
      <div class="radio">Privacy</div></div>
    </div>
		<div class="options">
      <div class="noise">잡음 제거</div><div style="margin-left:20px; margin-right:100px">
      <div style="float:left; height:50px;"><input type="radio" name="chk_info" value="noise" checked="checked" style="margin-top:20px; margin-bottom:10px;"></div>
      <div class="radio">자동</div></div>
      <div>
      <div style="float:left; height:50px;"><input type="radio" name="chk_info" value="none" style="margin-top:20px; margin-bottom:10px;"></div>
      <div class="radio">없음</div></div>
    </div>
    <div class="submit">
<div class="confirmation__button">
  <vue-confirmation-button
    :messages="customMessages"
    v-on:confirmation-success="submit()">
  </vue-confirmation-button>
</div>    </div>
		<div class="musicinfo">
			<img src="../assets/images/IU.jpg" alt style="border-radius: 50%; width:150px; heights:150px; float:left;">
      <div style="float:left; margin-right:10px; font-size:20px; margin-left:15px; margin-top:10px">김동주</div>
      <div style="float:left; font-size:18px; margin-top:10px;">전선을 간다</div>
		</div>
		<audio-recorder ref="recorder" :show-upload-button="false" :after-recording="setRecorded" :before-recording="startRecord" :select-record="selectedRecord"
    :pause-recording="visual" />
	</div>
  </div>
</template>

<script>
import Vue from 'vue';
import AudioRecorder from 'vue-audio-recorder'
import MusicVisual from '../components/MusicVisual'
import vueConfirmationButton from 'vue-confirmation-button';

Vue.use(AudioRecorder)
export default {
  components: {
    MusicVisual,
    'vue-confirmation-button': vueConfirmationButton
  },
 data: function() {
    return {
      visualization:"false",
      volumne:"0",
      selectedData:"",
      customMessages: [
      '녹음본을 선택하고 눌러주세요',
      '정말 이 녹음본으로 하시겠습니까?',
      '1초 뒤 목록으로 이동합니다.'
    ]
    }
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

        setTimeout(() => {
            this.setRecentRecord();
            this.setPlayerAbled();
        }, 800);
	},
	startRecord() {
		this.showStopBtn();
    this.setVisual(true);
    },
	selectedRecord() {
    console.log("hi")
    var i;
    const recorder = this.$refs.recorder;
    for(i=0; i<recorder.recordList.length; i++){
        console.log(recorder.recordList)

    }
    
  }
  },
  visual() {
    this.setVisual(false);
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
	align-content: center;
	justify-content: center;
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
  margin: auto;
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
  position:absolute;
  top : 85%;
  left:50%;
  transform: translate(-50%,-60%);
}
.submit{
  position:absolute;
  top : -16%;
  left:70%;
  transform: translate(-50%,-60%);
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
  position:absolute;
  top : -170%;
  left:17%;
  transform: translate(-50%,-60%);
}
.options{
  position:absolute;
  top : -15%;
  left:10%;
  transform: translate(-50%,-60%);
}
.mictest{
  position:absolute;
  top : -90%;
  left:27%;
  transform: translate(-50%,-60%);
}
.visibility{
  position:absolute;
  top : -110%;
  left:60%;
  transform: translate(-50%,-60%);
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
  position:absolute;
  top : 50%;
  left:50%;
  transform: translate(-50%,-50%);
  padding:0px;
  }

::v-deep .confirmation__button.confirmation__button--complete{
  width:200px;
  position:absolute;
  top : 50%;
  left:50%;
  transform: translate(-50%,-50%);
  }
::v-deep #data-v-4917ee8b{
  width:200px;
  position:absolute;
  top : 50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.inner d-flex {
	height: 400px;
	padding-top: 300px;
	float:left;
	left:30%;
	width: 100%;
}




</style>