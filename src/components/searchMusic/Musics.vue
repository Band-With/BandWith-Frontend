<template>
  <ul class="search-result-ul">
    <li v-for="music in musics" :key="music.id" id="music-result-li">
      <div class="card-body d-flex flex-row align-items-center">
        <div class="img-wrapper ml-4 mr-5">
          <img
            class="img-profile"
            src="@/assets/images/icon/default_music.png"
          />
        </div>
        <div class="txt-wrapper card-text flex-grow-1">
          <router-link
            :to="`./${music.id}/records`"
            class="card-title font-weight-bold"
            >{{ music.title }}</router-link
          >
          <div class="d-flex mt-2">
            <dt style="width: 10%">가수</dt>
            <dd style="width: 30%">{{ music.singer }}</dd>
            <dt style="width: 10%">작곡가</dt>
            <dd style="width: 40%">{{ music.composer }}</dd>
          </div>
        </div>
        <div>
          <router-link :to="`./${music.id}/recording`"
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
    return {};
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
