<template>
  <div>
    <div class="input-group">
      <div id="input-wrapper" class="d-flex flex-grow-1">
        <input
          class="form-control pl-3 py-2"
          placeholder="음악를 검색하세요"
          @input="keyUp"
          @click="keyUp"
          v-model="query"
          style=" font-size: 0.9rem;"
        />
        <div class="d-flex align-items-center px-2">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm text-primary"
            role="status"
          />
        </div>
        <ul
          id="auto-search-results"
          class="list-group"
          :hidden="!isDropboxActive"
        >
          <li v-if="musics == null" class="list-group-item py-2">
            일치하는 음악이 없습니다.
          </li>
          <li
            v-else
            v-for="music in musics"
            :key="music.music_id"
            class="list-group-item list-group-item-action py-2"
            @click="setQuery(music)"
          >
            <div class=" d-flex flex-row align-items-center">
              <div class="img-wrapper mr-4">
                <img
                  v-if="music.img == null"
                  src="@/assets/images/icon/default_music.png"
                  class="img-profile"
                />
                <img v-else :src="music.img" class="img-profile" />
              </div>
              <div
                class="d-flex justify-content-between flex-grow-1"
                style="font-size: 0.9rem;"
              >
                <div>
                  <span>{{ music.title }} - {{ music.singer }}</span>
                </div>
                <div>
                  <img
                    src="@/assets/images/icon/add_white.png"
                    style="width:10px; height:10px;"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MusicService from "@/services/music.service";

export default {
  data() {
    return {
      imgPreUrl: "data:image/jpeg;base64,",
      loading: false,
      isDropboxActive: false,
      isInviteActive: false,
      query: "",
      query_id: -1,
      musics: [
        {
          music_id: "1",
          title: "아아",
          singer: "아이유",
          img: null,
        },
        {
          music_id: "2",
          title: "아이",
          singer: "아이유",
          img: null,
        },
      ],
    };
  },

  computed: {
    bandname() {
      return this.$route.params.bandname;
    },
  },

  methods: {
    keyUp() {
      if (this.query != "") {
        this.isDropboxActive = true;
        this.getMusics();
      }
      else this.isDropboxActive = false;
      this.isInviteActive = false;
    },
    // 검색어 저장
    setQuery(music) {
      this.query_id = music.music_id;
      this.isDropboxActive = false;
      this.isInviteActive = true;
      this.query = music.title;
      this.$emit('updateBookmark', this.query_id);
    },
    // 음악 불러오기
    getMusics() {
      this.loading = true;
      MusicService.searchMusic(this.query, "related").then(
        (res) => {
          if (Object.keys(res.data).length !== 0) {
            this.musics = res.data;
            console.log(this.musics);
          } else {
            this.musics = null;
          }
          this.loading = false;
        },
        (error) => {
          error =
            (error.res && error.res.data) || error.message || error.toString();
          console.log(error);
          this.loading = false;
        }
      );
    },
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.img-wrapper {
  width: 30px;
  height: 30px;
  border-radius: 70%;
  overflow: hidden;
}

.img-profile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#auto-search-results {
  position: absolute;
  top: calc(1.5em + 0.75rem + 2px);
  border: 1px solid rgba(0, 0, 0, 0.125);
  overflow: auto;
}

.list-group-item {
  width: 100%;
  border: none;
}

.list-group-item-action:focus,
.list-group-item-action:hover {
  z-index: 1;
  color: #ffffff;
  text-decoration: none;
  background-color: #2080e0;
  cursor: pointer;
}
</style>
