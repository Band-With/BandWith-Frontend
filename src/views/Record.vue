<style scope>
    .main{
        max-width: 1320px;
        width: calc(100% - 40px);
        padding-left: 20px;
        padding-right: 20px;
        margin: 0 auto 30px;
        margin-top: 60px;
    }
    #search-area{
      border: 1px solid #ABABAB;
      border-radius: 15px;
      height: 30px;
      background-color: #fff;
    }
    button{
      background-color: #5A88FF;
      border: none;
      color: #fff;
      border-radius: 5px
    }
    button:hover{
      background-color: #3a66d4;
    }
    .stopButton{
      background-color: red;
      color: #fff
    }
    .stopButton:hover{
      background-color: rgb(199, 10, 10)
    }
</style>

<template>
  <div class="d-flex vh-100">
    <div class="main d-flex">

      <div>
        <div style="width:125px; height:300px; margin-top:50px;">
          <h3 class="text-center" style="font-size: 14px; font-weight: 100">Metronome</h3>
          <h1 class="text-center mt-1 mb-1" style="font-size: 24px; font-weight: 300">{{this.bpm}} BPM</h1>
          <input v-model="bpm" @input="changeBPM()" style="width: 125px;" class="form-control" type="range" id="bpm" min="40" max="220" value="60" />
          <audio id="sound" src="@/assets/sound.wav"></audio>
          <button class="mt-1" :class="{stopButton: isPlay}" style="width:125px; height: 20px; font-size: 12px" @click="startBtn">
            <span v-if="isPlay===false">Start</span>
            <span v-else>Stop</span>
          </button>
        </div>
      </div>

      <div class="d-flex flex-column align-items-center justify-content-center" style="width:840px; margin-right: 40px">
        
        <JJRecorder v-on:update="updateBlob" style="margin-bottom: 100px"></JJRecorder>
        
        <div class="d-flex flex-row" style="margin-bottom: 30px">
          <button class="mr-3" style="height: 42px; width: 150px" @click="send">녹음 등록하기</button>
          <button class="ml-3" style="height: 42px; width: 150px" @click="move()">편집하기</button>
        </div>
      </div>

      <div style="width:400px"> <!--오른쪽-->
        <div class="d-flex flex-column justify-content-center" style="height: 180px">
          <!-- <div id="search-area" class="d-flex w-100 px-2 py-1"> -->
            <MusicSearchBar @updateBookmark="updateBookmark"/>
          <!-- </div> -->
        </div>
      
        <div class="d-flex flex-column" style="height: 250px">
          <span style="font-size: 18px; margin-bottom: 20px">현재 선택된 노래</span>
          <div class="d-flex flex-row">
            <div class="d-flex justify-content-center align-items-center" style="height: 110px; width: 110px; background-color: #ddd">
              <img v-if="selectedMusic.img === null" style="height:80px; width: 80px" src="@/assets/images/icon/record_disk.png"/>
              <img v-else  style="height:110px; width: 110px" :src="selectedMusic.img"/>
            </div>
            <div class="d-flex flex-column ml-3">
                <span style="font-size: 18px; color: #444">{{ selectedMusic.title }}</span>
                <span style="font-size: 14px; font-weight: 200px; color: #034AFF">{{ selectedMusic.singer }}</span>
            </div>
          </div>
        </div>
      
        <div>
          <span>
            <span style="color: #034AFF">"{{selectedMusic.title}}"</span>
            <span>에 저장해 놓은 북마크입니다.</span>
          </span>
          <hr/>
          <div class="d-flex flex-column" style="overflow: auto; height: 200px">
            <div v-for="item in selectedBookmarks" :key="item.bookmark_id" class="d-flex flex-row align-items-center px-3 mb-2" style="background-color: #EFEFEF; min-height: 70px">
              <span>{{item.title}}</span>
              <audio controls :src="item.file_url" style="width: 250px; height:30px"></audio>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import AudioRecorder from 'vue-audio-recorder'
  import UserService from '../services/user.service';
  import SearchService from "@/services/search.service";
  import JJRecorder from "@/components/JJRecorder.vue";
  import MusicSearchBar from "@/components/search/MusicSearchBar.vue";

  //https://evan-moon.github.io/2019/08/21/javascript-audio-effectors-practice/
  Vue.use(AudioRecorder)
  export default {
    name:'recording',
    components: {
      JJRecorder,
      MusicSearchBar,
    },
    data: function() {
      return {
        selectedMusic:{
          title: "노래 제목",
          singer: "가수",
          composer: "작곡가",
          img: null
        },
        blob: null,
        bpm: 60,
        isPlay: false,
        selectedBookmarks: [],
        bookmarks: null,
        var_music_id: null
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
        return this.$route.params.instrument;
      },
      option() {
        return this.$route.params.searchable;
      },
      visible() {
        return this.$route.params.visible;
      },
    },
    async mounted() {
      this.var_music_id = null
      if(this.music_id != null){
        this.var_music_id = this.music_id;
        await SearchService.getMusic(this.music_id).then(
          (res) => {
            if (Object.keys(res.data).length !== 0) {
              console.log(res.data);
              this.selectedMusic.img = res.data.img;
              this.selectedMusic.singer = res.data.singer;
              this.selectedMusic.title = res.data.title;
              this.selectedMusic.composer = res.data.composer;
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

        UserService.getBookmarkContent(this.user.username, true).then(
          response => {
            console.log(response.data)
            this.bookmarks = response.data
            
            this.selectedBookmarks = []
            for(let bookmark of this.bookmarks){
              if(bookmark.music.music_id === this.music_id)
                this.selectedBookmarks.push(bookmark)
            }
          }
        )
      }
    },
    methods:{
      startBtn(){
        let sound=document.getElementById("sound");
        if (this.isPlay) {
          clearInterval(this.timer);
        } 
        else {
          sound.currentTime = 0;
          sound.play();
          this.timer = setInterval(function(){  
            let sound = document.getElementById("sound");
            sound.currentTime = 0;
            sound.play();
            }, (60 * 1000) / this.bpm);            
        }
        this.isPlay = !this.isPlay;
      },
      changeBPM(){
        if (this.isPlay) {
          clearInterval(this.timer);
          this.timer = setInterval(function(){  
            let sound=document.getElementById("sound");
            sound.currentTime = 0;sound.play();
          }, 
          (60 * 1000) / this.bpm);
        }
      },
      updateBlob(blob){
        this.blob = blob
      },
      updateBookmark(id) {
        this.var_music_id = id;
        
        this.selectedBookmarks = [];
        for(let bookmark of this.bookmarks) {
          if(bookmark.music.music_id === this.var_music_id)
            this.selectedBookmarks.push(bookmark);
        }
      },
      send(){
        if(this.blob != null && this.var_music_id != null){
          this.musicID=this.$route.params.musicId;
          this.username=this.user.username;
          const file = new File([this.blob], 'file', { type: 'wav' });
          UserService.uploadRecord(this.username, this.$route.params.musicId, this.$route.params.instrument, this.$route.params.visible, this.$route.params.searchable, file);
          this.$router.push('/musics');
        }
        else{
          if(this.var_music_id == null)
            alert("노래를 선택해주세요!");
          else
            alert("음악을 녹음해주세요!");
        }
      },
      move(){
        const URL = window.URL || window.webkitURL
        const selectedData = URL.createObjectURL(this.blob)
        this.$router.push({name: 'edit', params: {music_id:this.$route.params.musicId, file:selectedData}});
      }
    }
  }
</script>