<template>
  <div class="d-flex justify-content-center ">
    <!-- loading -->
    <span
      v-if="loading_rcd"
      class="m-5 spinner-border spinner-border-sm"
      style="width: 3rem; height: 3rem; border-width: .35em; color: #ccc"
    ></span>
    <!-- no result -->
    <div
      v-else-if="records == null"
      class="no-result d-flex flex-column align-items-center justify-content-center w-100 p-5"
    >
      <img
        class="m-3"
        src="@/assets/images/icon/no_result.png"
        style="width: 40px; height: 40px;"
      />
      <b>녹음이 존재하지 않습니다.</b>
    </div>
    <!-- records -->
    <ul v-else class="search-result-ul">
      <li
        v-for="(record, idx) in records"
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
            <div class="d-flex justify-content-between align-items-center mb-1">
              <!-- username -->
              <router-link
                :to="`/${record.member.username}`"
                class="font-weight-bold ml-2"
                >{{ record.record.instrument }} ({{ record.member.username }})
              </router-link>
              <div class="d-flex flex-row align-items-center">
                <!-- like -->
                <button class="btn d-flex align-items-center" @click="likeToggle(idx)">
                  <img class="icon" src="@/assets/images/icon/like_off.png" />
                  <span class="ml-2">{{ record.likeNum }}</span>
                </button>
                <!-- comment -->
                <button
                  class="btn d-flex align-items-center ml-3"
                  @click="getComments(record.record.record_id)"
                >
                  <img class="icon" src="@/assets/images/icon/comment.png" />
                  <span class="ml-2">{{ record.commentNum }}</span>
                </button>
                <!-- add to cart -->
                <button
                  id="add-to-cart"
                  class="btn btn-primary ml-3"
                  @click="addToCart(record)"
                >
                  <img class="icon" src="@/assets/images/icon/add_white.png" />
                </button>
              </div>
            </div>
            <audio controls class="audio mb-1">
              <!-- audio controller -->
              <source
                :src="record.record.file_url"
                type="audio/wav"
              />
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
</template>

<script>
export default {
  props: {
    is_comment_visible: {
      type: Boolean,
      required: true,
    },
    comment_rcd_id: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      imgPreUrl: "data:image/jpeg;base64,",
      likeToggleList: [],
    };
  },

  computed: {
    loading_rcd() {
      return this.$store.state.records.loading_rcd;
    },
    records() {
      return this.$store.state.records.records;
    },
  },

  methods: {
    likeToggle(index){
      index;
    },
    addToCart(record) {
      this.$store.commit("records/ADD_TO_CART", {
        music_id: this.music_id,
        record: record.record,
        member: record.member,
      });
    },
    getComments(record_id) {
      if (!this.is_comment_visible) {
        this.$emit("setCommentRcdId", record_id);
        this.$emit("setCommentVisible", true);
      }
      else {
        if (this.comment_rcd_id == record_id)
          this.$emit("setCommentVisible", false);
        else {
          this.$emit("setCommentRcdId", record_id);
        }
      }
    },
    toDate(timestamp) {
      const d = new Date(timestamp);
      let month = "" + (d.getMonth() + 1);
      let date = "" + d.getDate();

      if (month.length < 2) month = "0" + month;
      if (date.length < 2) date = "0" + date;

      return [d.getFullYear(), month, date].join("-");
    },
  },
};
</script>

<style scoped>
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

#add-to-cart {
  padding: 0px 12px 3px 12px;
  height: fit-content;
}
</style>
