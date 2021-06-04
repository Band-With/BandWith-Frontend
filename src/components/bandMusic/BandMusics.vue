<style scoped>
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
      v-for="item in content"
      :key="item.band_music_id"
      class="item-container d-flex p-4"
      style="border-bottom: 1px solid #DFDFDF;"
    >
      <img
        v-if="item.band.img === null"
        src="@/assets/images/icon/default_music.png"
        class="music-image"
      />
      <img v-else :src="imgPreUrl + item.music.img" class="music-image" />
      <div class="d-flex flex-column w-100 pl-5">
        <section class="d-flex flex-column mb-3">
          <div class="d-flex flex-column">
            <div
              class="music-item d-flex justify-content-between align-items-center"
            >
              <span
                class="mb-1 mr-5"
                style="font-size: 1.1rem; font-weight: bold;"
                >{{ item.band.band_name }}</span
              >
              <audio
                controls
                class="audio flex-grow-1 mb-1"
                style="height: 30px;"
              >
                <!-- audio controller -->
                <source :src="item.file_url" type="audio/wav" />
                Your browser does not support the audio tag.
              </audio>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <span style="font-size: .9rem;"
                >{{ item.music.title }} - {{ item.music.singer }}</span
              >
              <span style="color: #666; font-size: .7rem"
                >2020-10-15 {{ toDate(item.complete_date) }}</span
              >
            </div>
          </div>
        </section>
        <footer class="d-flex justify-content-between align-items-end">
          <div class="d-flex flex-row px-1">
            <div
              v-for="member in item.members"
              :key="member.member_id"
              class="d-flex flex-column align-items-center mr-2"
              style="min-width: 65px; width: 65px; text-overflow: ellipsis"
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
              <span style="color: #696969; font-size: 12px; margin-top: 3px;">{{
                member.username
              }}</span>
            </div>
          </div>
          <div>
            <img
              class="mr-1"
              style="width: 20px; height: 20px"
              src="@/assets/images/icon/like_off.png"
            />
            <span> {{ item.likes }}</span>
            <img
              class="ml-3 mr-1"
              style="width: 20px; height: 20px"
              src="@/assets/images/icon/comment.png"
            />
            <span>{{ item.comments }}</span>
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
    };
  },
  methods: {
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
  computed: {
    bandname() {
      return this.$route.params.bandname;
    },
  },
};
</script>
