<template>
  <!-- record info -->
  <ul class="search-result-ul">
    <li v-for="record in records" :key="record.id" id="record-result-li">
      <div class="card-body d-flex justify-content-center">
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
            <a
              :href="`./musics/${record.id}`"
              class="font-weight-bold ml-2"
            >
              {{ record.username }}</a
            >
            <div class="d-flex flex-row  align-items-center ">
              <!-- like -->
              <button class="btn d-flex align-items-center">
                <img class="img_like" src="@/assets/images/icon/like_off.png" />
                <span class="ml-2">{{ record.like }}</span>
              </button>
              <!-- comment -->
              <button class="btn d-flex align-items-center ml-3">
                <img
                  class="img_comment"
                  src="@/assets/images/icon/comment.png"
                />
                <span class="ml-2">{{ record.comment }}</span>
              </button>
              <!-- add to cart -->
              <button id="add-to-cart" class="btn btn-primary ml-3">
                <img class="img_cart" src="@/assets/images/icon/add_white.png" />
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
</template>

<script>
export default {
  name: "record-by-latest",
  data() {
    return {
      records: [
        // temp
        {
          id: 1,
          username: "2wjdwo97",
          url:
            "https://bucket-band-with.s3.ap-northeast-2.amazonaws.com/records/dcd1897b-09c7-4836-88c0-b58e2d3b8135-%EB%85%B9%EC%9D%8C.m4a",
          like: 15,
          comment: 5,
        },
        {
          id: 2,
          username: "pkm1015",
          url:
            "https://bucket-band-with.s3.ap-northeast-2.amazonaws.com/records/dcd1897b-09c7-4836-88c0-b58e2d3b8135-%EB%85%B9%EC%9D%8C.m4a",
          like: 21,
          comment: 1,
        },
      ],
    };
  },
  created() {
    console.log("component record");
  },
};
</script>

<style scoped>
.audio {
  height: 40px;
  width: 100%;
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

#record-result-li {
  background: #ffffff;
  border-bottom: 1px solid #dfdfdf;
}

#add-to-cart {
    padding: 0px 12px 3px 12px;
    height: fit-content;
}

.img_like,
.img_comment,
.img_cart {
  width: 15px;
  height: 15px;
}
</style>
