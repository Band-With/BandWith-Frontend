<template>
  <div class="background justify-content-center">
 <div id="search-record" class="container" style="float:left; width:30vw; height:100vh">
      <!-- row 1: search info -->
      <div id="search-record-row1" class="mt-5 mb-3">
        <b>'{{ music.singer + " - " + music.title }}'</b> 에 대한 다른 사람들의 녹음입니다.
      </div>
      <!-- row 2 -->
      <div id="search-record-row2" class="row" style="width:800px;">
        <!-- row 2: left -->
        <div id="search-record-left" class="col-sm-8 pr-4">
          <!-- nav filter -->
          <div>
            <ul class="nav nav-tabs">
              <li
                v-for="type in filter_list"
                :key="type.ename"
                class="nav-item"
                :class="{ active: type.ename == sort_type }"
              >
                <a class="nav-link" @click="toggleFilter(type.ename)">{{
                  type.kname
                }}</a>
              </li>
            </ul>
          </div>
          <!-- result records -->
          <Records
            :is_visible="this.is_comment_visible"
            @update-visibility="updateVisibility"
          />
        </div>
        <!-- row 2: right -->
     
      </div>
      <!-- row 3: pagination -->
      <!-- <Paging /> -->
    </div>
 <div id="search-record" class="container" style="float:left; width:70vw; height:100vh">


      <!-- row 3: pagination -->
        <div style="margin-left:100px; float:left; margin-top:150px;">
           <MusicVisual id="bar1" style="float:left; margin-left:3px; animation-play-state:paused;"></MusicVisual>
           <MusicVisual id="bar2" style="float:left;margin-left:3px; animation-delay: 0.2s;animation-play-state:paused;"></MusicVisual>
           <MusicVisual id="bar3" style="float:left;margin-left:3px;animation-delay: 0.4s;animation-play-state:paused;"></MusicVisual>
        </div>


        
       <div id="search-music-row4" style="width:80vw; float:left">
          <audio-recorder ref="recorder" :format="WAV" :show-upload-button="false" :after-recording="setRecorded" :before-recording="startRecord" :select-record="selectedRecord" :pause-recording="visual" />
      </div>

        <vue-confirmation-button  ref="confirmationButton"
          style="width:250px; float:left;"
          :messages="customMessages" v-on:confirmation-incremented="check()"
          v-on:confirmation-success="send()">
        </vue-confirmation-button> 
 </div>
  </div>
</template>


<script>
import Vue from 'vue';
import AudioRecorder from 'vue-audio-recorder'
import MusicVisual from '../components/MusicVisual'
import vueConfirmationButton from 'vue-confirmation-button';
import UserService from '../services/user.service';
import SearchService from "@/services/search.service";
import Records from "@/components/search/Records.vue";

Vue.use(AudioRecorder)
export default {
  name:'recording',
  components: {
    MusicVisual,
    'vue-confirmation-button': vueConfirmationButton,
        Records,
      },
 data: function() {
    return {
      visualization:"false",
      selectedData:"",
      instrunmentchecked:'0',
      musicID:'',
      username:'',
      recordchecked:'0',
      OnlyMyRecord:[],
      music: {},
      filter_list: [
        { ename: "latest", kname: "최신순" },
        { ename: "like", kname: "좋아요순" },
        // { ename: "follow", kname: "팔로우순" },
      ],
      sort_type: "latest", // 검색 필터 초깃값 설정
      is_comment_visible: false, // 댓글창 visibility
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
 
    music_id() {
      return this.$route.params.music_id;
    },
    records() {
      return this.$store.state.records.records;
    },
    instrument() {
      return this.$route.params.selectedInstrunment;
    },
        option() {
      return this.$route.params.selectedInstrunment;
    },
        visible() {
      return this.$route.params.selectedInstrunment;
    },
    },

  mounted() {
      SearchService.getMusic(this.music_id).then(
        (res) => {
          if (Object.keys(res.data).length !== 0) {
            console.log(res.data);
            this.music = res.data;
          }
          else {
            this.$router.push('/musics');
          }
        },
        (error) => {
          error =
            (error.res && error.res.data) || error.message || error.toString();
          alert(error);
          this.$router.push('/musics');
        }
      );

    const sort_type = this.$route.query.filter;

    // query string = "like", "follow"
    if (sort_type === "like"
    //  || sort_type === "follow"
     ) {
      this.setFilter(sort_type);
      this.getRecords(sort_type);
    }
    // query string = "latest", undefined, etc.
    else {
      this.getRecords("latest");
    }
  },
 methods:{
     // 화면 필터 토글
    toggleFilter(type) {
      if (this.sort_type != type) {
        this.setFilter(type); // 필터 설정
        this.getRecords(type); // 데이터 가져오기

        // 현재 라우트 경로를 유지하면서, 쿼리스트링만 변경
        return this.$router.replace({
          path: "",
          query: {
            filter: type,
          },
        });
      }
    },

    // 필터 설정
    setFilter(type) {
      if (this.sort_type != type) {
        this.sort_type = type;
      }
    },

    // 데이터 가져오기 (axios)
    getRecords(sort_type) {
      this.$store.dispatch("records/getRecords", {
        music_id: this.music_id,
        filter: sort_type,
      });
    },

    // 댓글창 visibility 전환
    updateVisibility() {
      this.is_comment_visible = !this.is_comment_visible;
    },
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
    this.OnlyMyRecord.push(this.selectedData);
    this.recordchecked='1';

    for(let i = 0; i < this.OnlyMyRecord.length; i++) {
        const currElem = this.OnlyMyRecord[i];
         for(let j = i+1; j < this.OnlyMyRecord.length; j++) {
           if(currElem === this.OnlyMyRecord[j]) {
             this.OnlyMyRecord.pop(currElem);

   }

  }

}

    console.log(this.OnlyMyRecord);
  },
  visual() {
    this.setVisual(false);
	},
  send(){
    this.musicID=this.$route.params.musicId;
    this.username=this.user.username;

    const file = new File([this.selectedData.blob], 'file', { type: 'wav' });
    UserService.uploadRecord(this.username, this.musicID, this.instrument, this.visible, this.option, file);
    this.$router.push('/musics');

  },

  check(){
      if(this.recordchecked==='1'){
      console.log(this.recordchecked)
      }
      else{
        console.log('2')
        this.$refs.confirmationButton.reset();
      }
  },


 }
}
</script>


<style scoped>


.background {
  padding-top: 60px;
  min-height: 100vh;
  background-color: #fafafa;
}

.icon {
  width: 15px;
  height: 15px;
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

/* row 1: record info */
#search-record-row1 b {
  color: #007bff;
}

/* row 2 left: filter */
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

  /* &.ar-player__play--active {
    background-color: #171003 !important;
  } */
}
.noise{
  font-size: 25px;
}
::v-deep .ar-player__play {
  fill: white !important;
  background-color: #ff6b64 !important;
  cursor: inherit;

  /* &.ar-player__play--active {
    background-color: #ff6b64 !important;
  } */
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

.radio{
  font-size: 20px;
  margin-left: 5px;
  margin-right: 10px;
  float:left;
  margin-top:10px;
  margin-bottom:10px;
}
.musicinfo{
  width:300px;
}

/* disalbed 처리 */
/* ::v-deep .ar-player {
	order:-1;
  opacity: 0.5;
  cursor: default;
  &.abled {
    opacity: 1;
    cursor: pointer;
  }
} */

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
::v-deep .ar-records__record--selected{
  background-color:#F5F6CE;
}

</style>