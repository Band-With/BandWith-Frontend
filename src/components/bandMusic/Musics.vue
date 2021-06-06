<template>
  <ul class="card-body p-0 search-result-ul">
    <li
      v-for="music in musics"
      :key="music.music_id"
      id="music-result-li"
      class="d-flex flex-row align-items-center pl-4 pr-3 py-3"
    >
      <div class="pr-4">
        <input
          type="radio"
          name="bandmusic"
          v-model="selected"
          :value="music.music_id"
        />
      </div>
      <div class="card-body d-flex flex-row align-items-center p-0">
        <div class="img-wrapper ml-4 mr-5">
          <img
            v-if="music.img === null"
            src="@/assets/images/icon/default_music.png"
            class="img-profile"
          />
          <img v-else :src="music.img" class="img-profile" />
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
      selected: null,
    };
  },

  computed: {
    bandname() {
      return this.$route.params.bandname;
    },
  },

  methods: {
    addBandMusic() {
      if (this.selected != null) {
        BandService.addBandMusic(this.bandname, this.selected).then(
          (res) => {
            if (res.status === 200) {
              alert("밴드의 진행 중인 곡에 추가되었습니다.");
              this.$router.push("/bands/" + this.bandname);
            }
          },
          (error) => {
            error =
              (error.res && error.res.data) ||
              error.message ||
              error.toString();
            alert(error);
          }
        );
        this.selected = null;
      }
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
