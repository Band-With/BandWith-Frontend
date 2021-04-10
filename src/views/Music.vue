<template>
  <div class="col-md-12">
    <div class="card card-container">
   <form name="form" @submit.prevent="insertMusic" class="form">
      <div class="box-container">
        <div class="form-fields"><br>
          <label for="username">노래 제목</label>
          <input id="Title"
            class="form-control"
            name="title"
            type="text"
            v-model="music.title"
            v-validate="'required'" 
            placeholder="제목"/>
        </div>
        <br><br>
<div class="form-fields"><br>
          <label for="username">노래 작곡가제목</label>
          <input id="Composer"
            class="form-control"
            name="username"
            type="text"
            v-model="music.composer"
            placeholder="ddd제목"/>
        </div>
        <br><br>
        <div class="form-fields"><br>
          <label for="username">노래 sdf작곡가제목</label>
          <input id="Singer"
            class="form-control"
            name="username"
            type="text"
            v-model="music.singer"
            placeholder="가수"/>
        </div>
        <div class="form-fields">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>SignIn</span>
          </button>
        </div>
        <div v-if="message" class="alert alert-danger" role="alert">
          {{message}}
        </div>
        <br><br>
      </div>

    </form>
  </div>

  </div>
</template>

<script>
import Music from '../models/music';

export default {
  name: 'Music',
  data() {
    return {
        music: new Music('', '', ''),
        loading: false,
        message: ''
    };
  },
  components:{
  },
  computed: {
  },
  methods: {
 insertMusic() {
              this.$store.dispatch('/musics', this.music).then(
            () => {
              this.$router.push('/');
            }

          );
      }
    }
};
</script>
