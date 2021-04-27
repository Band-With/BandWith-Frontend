<template>
  <div class="col-md-12">
    <div class="card card-container">
    <form name="form" @submit.prevent="insertMusic(music)">
        <div v-if="!successful">
          <div class="form-group">
            <label for="title">노래제목</label>
            <input
              v-model="music.title"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="title"
            />
            <span v-if="submitted &&errors.has('title')">ID를 정상적으로 입력해주세요.</span><br>
          </div>
          <div class="form-group">
            <label for="composer">작곡가 이름</label>
            <input
              v-model="music.composer"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="composer"
            />
                        <span v-if="submitted &&errors.has('composer')">이름을 정상적으로 입력해주세요.</span><br>

          </div>
          <div class="form-group">
            <label for="singer">가수</label>
            <input
              v-model="music.singer"
              v-validate="'required|min:6|max:40'"
              class="form-control"
              name="singer"
              type="text"
            />
          </div>
                  <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>
  </div>

  </div>
</template>

<script>
import Music from '../models/music';
import axios from 'axios';
const API_URL = 'http://localhost:8080/';

export default {
  name: 'Music',
  data() {
    return {
        music: new Music('', '', ''),
        loading: false,
        submitted: false,
        successful: false,
    };
  },
  components:{
  },
  computed: {
  },
  methods: {
    insertMusic() {
      axios.post(API_URL+'musics/insert', {
        title: "dfd.",
        composer:"df",
        singer:"sdf"
        })
        .then(res => {
          console.log(res.data)
        })
    }
   
  }
};
</script>
