<style scoped>
.icon {
  width: 15px;
  height: 15px;
}

.music-image {
  height: 130px;
  width: 130px;
  border-radius: 15px;
  transition: box-shadow 0.2s;
}

.music-item {
  transition: color 0.2s, font-weight 0.2s;
}

.item-container:hover .music-image {
  box-shadow: 0px 4px 8px 0px rgb(0 0 0 / 40%);
}

.item-container:hover .music-item {
  color: #136bf5 !important;
  font-weight: bold;
}
</style>

<template>
  <div class="d-flex flex-column">
    <div
      v-for="(item, idx) in content"
      :key="item.band_music_id"
      class="item-container d-flex p-4"
      style="border-bottom: 1px solid #DFDFDF;"
    >
      <router-link
        :to="{
          name: 'bandPage',
          params: {
            bandname: item.band.band_name,
          },
        }"
      >
        <img
          v-if="item.band.img === null"
          src="@/assets/images/icon/default_band_profile.png"
          class="music-image"
        />
        <img v-else :src="imgPreUrl + item.music.img" class="music-image" />
      </router-link>
      <div class="d-flex flex-column w-100 pl-5">
        <section class="d-flex mb-3">
          <div class="d-flex flex-column">
            <router-link
              class="mb-1 mr-5 music-item"
              style="font-size: 1.1rem; font-weight: bold; color: black;"
              :to="{
                name: 'bandPage',
                params: {
                  bandname: item.band.band_name,
                },
              }"
            >
              {{ item.band.band_name }}
            </router-link>
            <span style="font-size: .9rem;"
              >{{ item.music.title }} - {{ item.music.singer }}</span
            >
          </div>
          <div class="d-flex flex-column flex-grow-1 text-right">
            <audio controls class="audio w-100 mb-1" style="height: 30px;">
              <!-- audio controller -->
              <source :src="item.file_url" type="audio/wav" />
              Your browser does not support the audio tag.
            </audio>
            <span style="color: #666; font-size: .7rem;"
              >2020-10-15 {{ toDate(item.complete_date) }}</span
            >
          </div>
          <router-link
            class="btn btn-primary ml-5 d-flex align-items-center"
            :to="{
              name: 'bandMusicDetail',
              params: {
                bandname: item.band.band_name,
                musicid: item.band_music_id,
              },
            }"
          >
            <span>자세히 보기</span>
          </router-link>
        </section>
        <footer class="d-flex justify-content-between align-items-end">
          <div class="d-flex flex-row px-1">
            <div
              v-for="member in item.members"
              :key="member.member_id"
              class="d-flex flex-column align-items-center mr-2"
              style="min-width: 65px; width: 65px; text-overflow: ellipsis"
            >
              <router-link
                :to="{
                  name: 'myPage',
                  params: {
                    username: member.username,
                  },
                }"
              >
                <img
                  v-if="member.profile !== null"
                  :src="imgPreUrl + member.profile"
                  style="width: 50px; height: 50px; border-radius: 50%"
                />
                <img
                  v-else
                  src="@/assets/images/profile.jpg"
                  style="width: 50px; height: 50px; border-radius: 50%;"
                />
                <span
                  style="color: #696969; font-size: 12px; margin-top: 3px;"
                  >{{ member.username }}</span
                >
              </router-link>
            </div>
          </div>
          <div class="d-flex">
            <!-- like -->
            <button
              class="btn d-flex align-items-center"
              @click="likeToggle(idx)"
            >
              <img
                v-if="isLikeList[idx]"
                class="icon"
                src="@/assets/images/icon/like_on.png"
              />
              <img
                v-if="!isLikeList[idx]"
                class="icon"
                src="@/assets/images/icon/like_off.png"
              />
              <span class="ml-2">{{ item.likes }}</span>
            </button>
            <!-- comment -->
            <router-link
            class="btn d-flex align-items-center ml-3"
            :to="{
              name: 'bandMusicDetail',
              params: {
                bandname: item.band.band_name,
                musicid: item.band_music_id,
              },
            }">
              <img class="icon" src="@/assets/images/icon/comment.png" />
              <span class="ml-2">{{ item.comments }}</span>
            </router-link>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bandMusics",
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      imgPreUrl: "data:image/jpeg;base64,",
      isLikeList: [],
    };
  },
  methods: {
    likeToggle(index) {
      if (this.isLikeList[index]) this.content[index].likes--;
      else this.content[index].likes++;
      this.isLikeList[index] = !this.isLikeList[index];
    },
    toDate(timestamp) {
      if (timestamp === null) return " ";
      const d = new Date(timestamp);
      let month = "" + (d.getMonth() + 1);
      let date = "" + d.getDate();

      if (month.length < 2) month = "0" + month;
      if (date.length < 2) date = "0" + date;

      return [d.getFullYear(), month, date].join("-");
    },
  },
  mounted() {
    this.isLikeList = Array.from({ length: this.content.length }, () => false);
  },
};
</script>
