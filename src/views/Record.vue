<template>
  <div>
    <div>
      <div>음량 테스트</div>
      <div v-on:click="checkMic">마이크</div>

    </div>
    <audio-recorder ref="recorder" :after-recording="setRecorded" :before-recording="startRecord" />
    <audio-player src="/demo/example.mp3"/>



  </div>
</template>

<script>
import Vue from 'vue';
import { AudioPlayer, AudioRecorder } from 'vue-audio-recorder';
Vue.use(AudioRecorder)
export default {
  components: {
    AudioRecorder,
    AudioPlayer,
  },
  methods:{
    checkMic(){
      navigator.getUserMedia = navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
            // function(stream) {
            //   console.log("Accessed the Microphone");
            // },
            function(err) {
              console.log("The following error occured: " + err.name);
            }
        );
      } else {
        console.log("getUserMedia not supported");
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

    // 녹음 끝 <audio-recorder ... :after-recording="setRecorded" ... />
    setRecorded() {
      // 중지 버튼 hide
      this.hideStopBtn();

      // 녹음본 저장 및 교체
      this.setPlayerDisabled();
      setTimeout(() => {
        // 마지막 List요소를 selected 오브젝트로 설정해 준다.
        this.setRecentRecord();
        this.setPlayerAbled();
      }, 800);
    },

    // 녹음 시작 <audio-recorder ... :before-recording="startRecord" ... />
    startRecord() {
      // 중지 버튼 show
      this.showStopBtn();
    },
  }
}
</script>


<style scoped>
/* Player, Recorder 관련 css 조정 */

::v-deep .ar-player__play {
  fill: white !important;
  background-color: #171003 !important;

&.ar-player__play--active {
   background-color: #171003 !important;
 }
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
  width: 100%;
  max-width: 510px;
  box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);
  background-color: #fff;
  border: 1px solid #eff2f7;
  border-radius: 0.375rem;
}

::v-deep .ar-player {
  width: 100%;
}

/* disalbed 처리 */
::v-deep .ar-player {
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
  display: none;
}

::v-deep .ar-records__record {
  min-width: 250px;
}

::v-deep .ar-recorder__duration {
  font-size: 1.3rem;
  margin: 0.3rem 0 0 0;
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
  fill: white !important;
  background-color: #ff6b64 !important;
  top: 0;
  right: 0;
  width: 38px;
  height: 38px;
  display: none;
}
</style>