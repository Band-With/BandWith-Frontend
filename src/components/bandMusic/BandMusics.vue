<template>
  <ul class="search-result-ul">
    <li v-for="music in musics" :key="music.music_id" id="music-result-li">
      <div class="card-body d-flex flex-row align-items-center">
        <div class="img-wrapper ml-4 mr-5">
          <img
            v-if="music.img === null"
            src="@/assets/images/icon/default_music.png"
            class="img-profile"
          />
          <img v-else :src="imgPreUrl + music.img" class="img-profile" />
        </div>
        <div class="txt-wrapper card-text flex-grow-1 ">
          <span style="color: #2080e0; font-weight: bold;">{{
            music.title
          }}</span>
          <div class="d-flex mt-2">
            <dt style="width: 10%">가수</dt>
            <dd style="width: 30%" class="mr-4">{{ music.singer }}</dd>
            <dt style="width: 10%">작곡가</dt>
            <dd style="width: 40%" class="mr-4">{{ music.composer }}</dd>
          </div>
        </div>
        <div>
          <a
            ><button
              class="btn btn-primary"
              @click="addBandMusic(music.music_id)"
            >
              밴드 합주 생성
            </button></a
          >
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import BandService from "@/services/band.service";

export default {
  props: {
    musics: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      imgPreUrl: "data:image/jpeg;base64,",
    };
  },

  computed: {
    bandname() {
      return this.$route.params.bandname;
    },
  },

  methods: {
    addBandMusic(music_id) {
      BandService.addBandMusic(this.bandname, music_id).then(
        (res) => {
          if (res.status === 200) {
            alert("밴드의 진행 중인 곡에 추가되었습니다.");
            this.$router.push("/bands/" + this.bandname);
          }
        },
        (error) => {
          error =
            (error.res && error.res.data) || error.message || error.toString();
          alert(error);
        }
      );
    },
  },
};
</script>

<style scoped>
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

.search-result-ul {
  list-style: none;
  font-size: 0.9rem;
  padding-left: 0px;
  min-width: 700px;
}

#music-result-li {
  background: #ffffff;
  border-bottom: 1px solid #dfdfdf;
}
</style>
