<template>
  <ul class="search-result-ul">
    <li v-for="music in musics" :key="music.id" id="music-result-li">
      <div class="card-body d-flex flex-row">
        <div class="img-wrapper ml-4 mr-5">
          <img class="img-profile" src="../assets/images/default_music.png" />
        </div>
        <div class="txt-wrapper card-text flex-grow-1">
          <a :href="`./musics/${music.id}`" class="card-title font-weight-bold">
            {{ music.title }}</a
          >
          <div class="d-flex mt-2">
            <dt style="width: 10%">가수</dt>
            <dd style="width: 30%">{{ music.singer }}</dd>
            <dt style="width: 10%">작곡가</dt>
            <dd style="width: 40%">{{ music.composer }}</dd>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "music-by-related",
  data() {
    return {
      musics: [
        {
          id: 1,
          title: "라일락",
          composer: "임수호, Dr.JO, 웅킴, N!ko",
          singer: "아이유",
          image: "../assets/images/default_music.png",
        },
        {
          id: 2,
          title: "롤린 (Rollin')",
          composer: "용감한 형제, 투챔프, 차쿤",
          singer: "브레이브걸스",
          image: "../assets/images/default_music.png",
        },
        {
          id: 3,
          title: "오래된 노래",
          composer: "Egg1, Egg2, Egg3",
          singer: "스탠딩 에그",
          image: "../assets/images/default_music.png",
        },
      ]
    };
  },
}
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
  padding-left: 0px;
}

#music-result-li {
  border-bottom: 1px solid #dfdfdf;
}
</style>
