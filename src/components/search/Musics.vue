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
          <img v-else :src="music.img" class="img-profile" />
        </div>
        <div class="txt-wrapper card-text w-75">
          <router-link
            :to="`/musics/${music.music_id}/records`"
            class="card-title font-weight-bold"
            >{{ music.title }}

            <div class="d-flex mt-2" style="color: black">
              <dt style="width: 10%">가수</dt>
              <dd class="mr-4 font-weight-normal" style="width: 30%">
                {{ music.singer }}
              </dd>
              <dt style="width: 10%">작곡가</dt>
              <dd class="mr-4 font-weight-normal" style="width: 40%">
                {{ music.composer }}
              </dd>
            </div></router-link
          >
        </div>
        <div>
          <router-link
            :to="{ name: 'recordsetting', params: { musicId: music.music_id } }"
            ><button class="btn btn-primary">녹음하기</button></router-link
          >
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
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
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
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
