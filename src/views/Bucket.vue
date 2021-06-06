<style scoped>
.background {
  padding-top: 60px;
  min-height: 100vh;
  /* background-color: #fafafa; */
}
.container {
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  margin-right: auto;
  margin-left: auto;
}
.audio {
  height: 40px;
  width: 100%;
}

.icon {
  width: 15px;
  height: 15px;
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
  width: 100%;
}

#record-result-li {
  background: #ffffff;
  border-bottom: 1px solid #dfdfdf;
}
</style>

<template>
  <div class="background justify-content-center">
    <div id="search-record" class="container">
      <div class="pt-5 ">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center">
            <img
              style="border-radius:20px; width: 70px; height:70px"
              class="mr-4"
              :src="musicInfo.img"
            />
            <div>
              <h4>{{ musicInfo.title }} - {{ musicInfo.singer }}</h4>
            </div>
          </div>

          <div class="form-inline">
            <div class="form-group mx-sm-3 mb-2">
              <input type="text" class="form-control" v-model="title" placeholder="합주 제목을 입력해주세요!">
            </div>
            <button @click="send()" class="btn btn-primary mb-2">합치기</button>
          </div>
        </div>
      </div>
        <!-- records -->
        <ul class="search-result-ul mt-5">
          <li
            v-for="record in cart"
            :key="record.record.record_id"
            id="record-result-li"
          >
            <div class="d-flex align-items-center justify-content-center p-3">
              <!-- member profile image -->
              <router-link
                :to="`/${record.member.username}`"
                class="font-weight-bold ml-2"
              >
                <div class="img-wrapper ml-2 mr-4">
                  <img
                    v-if="record.member.profile === null"
                    src="@/assets/images/profile.jpg"
                    class="img-profile"
                  />
                  <img
                    v-else
                    :src="imgPreUrl + record.member.profile"
                    class="img-profile"
                  />
                </div>
              </router-link>
              <!-- contents -->
              <div class="d-flex flex-column flex-grow-1 pr-5">
                <div
                  class="d-flex justify-content-between align-items-center mb-1"
                >
                  <!-- username -->
                  <router-link
                    :to="`/${record.member.username}`"
                    class="font-weight-bold ml-2"
                    >{{ record.record.instrument }} ({{
                      record.member.username
                    }})
                  </router-link>
                </div>
                <audio controls class="audio mb-1">
                  <!-- audio controller -->
                  <source :src="record.record.file_url" type="audio/wav" />
                  Your browser does not support the audio tag.
                </audio>
                <div style="color: #808080; font-size: 0.7rem;">
                  <span class="float-right">{{
                    toDate(record.record.created_at)
                  }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pizzicato/0.6.4/Pizzicato.js"></script>
<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>

<script>
import BookmarkService from "../services/bookmark.service";
import RoundSlider from "vue-round-slider";
import SearchService from "../services/search.service";
import Records from "@/components/search/Records.vue";

export default {
  name: "bucket",
  components: {
    RoundSlider,
    Records,
  },
  computed: {
    cart() {
      return this.$store.state.records.cart;
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  data: function() {
    return {
      is_loaded: false,
      records: null,
      title: "",
      getUser: [],
      getUrl: [],
      musicInfo: "",

      imgPreUrl: "data:image/jpeg;base64,",
    };
  },
  mounted() {
    console.log(this.cart);

    for (let i = 0; i < this.cart.length; i++) {
      this.getUrl.push(this.cart[i].record.file_url);
    }
    for (let i = 0; i < this.cart.length; i++) {
      this.getUser.push(this.cart[i].member.member_id);
    }
    SearchService.getMusic(this.cart[0].record.music_id).then(
      (response) => {
        if (Object.keys(response.data).length !== 0) {
          this.musicInfo = response.data;
        }
      },
      (error) => {
        if (error.response.status === 404) console.log("wow");
      }
    );
  },

  methods: {
    toDate(timestamp) {
      const d = new Date(timestamp);
      let month = "" + (d.getMonth() + 1);
      let date = "" + d.getDate();

      if (month.length < 2) month = "0" + month;
      if (date.length < 2) date = "0" + date;

      return [d.getFullYear(), month, date].join("-");
    },
    send() {
      console.log(this.getUrl);
      
      BookmarkService.uploadBookmark(
        this.user.username,
        this.cart[0].record.music_id,
        this.title,
        this.getUser,
        this.getUrl
      );

    },
  },
};
</script>
