<template>
  <div class="d-flex justify-content-center ">
    <!-- loading -->
    <span
      v-if="loading"
      class="m-5 spinner-border spinner-border-sm"
      style="width: 3rem; height: 3rem; border-width: .35em; color: #ccc"
    ></span>
    <!-- no result -->
    <div v-else-if="records == null" class="no-result d-flex flex-column align-items-center justify-content-center w-100 p-5">
      <img class="m-3" src="@/assets/images/icon/no_result.png" style="width: 40px; height: 40px;"/>
      <b>녹음이 존재하지 않습니다.</b>
    </div>
    <!-- records -->
    <ul v-else class="search-result-ul">
      <li v-for="record in records" :key="record.id" id="record-result-li">
        <div class="d-flex align-items-center justify-content-center p-3">
          <!-- member profile image -->
          <div class="img-wrapper ml-4 mr-5">
            <img
              class="img-profile"
              src="@/assets/images/icon/default_music.png"
            />
          </div>
          <!-- contents -->
          <div class="d-flex flex-column flex-grow-1 pr-5">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <!-- username -->
              <a :href="`./${record.username}}`" class="font-weight-bold ml-2">
                {{ record.username }}</a
              >
              <div class="d-flex flex-row align-items-center">
                <!-- like -->
                <button class="btn d-flex align-items-center">
                  <img class="icon" src="@/assets/images/icon/like_off.png" />
                  <span class="ml-2">{{ record.like }}</span>
                </button>
                <!-- comment -->
                <button class="btn d-flex align-items-center ml-3">
                  <img class="icon" src="@/assets/images/icon/comment.png" />
                  <span class="ml-2">{{ record.comment }}</span>
                </button>
                <!-- add to cart -->
                <button id="add-to-cart" class="btn btn-primary ml-3" @click="add_to_cart(record)">
                  <img class="icon" src="@/assets/images/icon/add_white.png" />
                </button>
              </div>
            </div>
            <audio controls class="audio">
              <!-- audio controller -->
              <source
                src="https://bucket-band-with.s3.ap-northeast-2.amazonaws.com/records/dcd1897b-09c7-4836-88c0-b58e2d3b8135-%EB%85%B9%EC%9D%8C.m4a"
                type="audio/mpeg"
              />
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    loading() {
      return this.$store.state.records.loading;
    },
    records() {
      return this.$store.state.records.records;
    }
  },

  methods: {
    add_to_cart(record) { 
      this.$store.commit("records/ADD_TO_CART", {
        id: record.id,
        profile: record.profile,
      });
    }
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
