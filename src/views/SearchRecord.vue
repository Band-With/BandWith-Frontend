<template>
  <div class="background justify-content-center">
    <div id="search-record" class="container">
      <!-- row 1: search info -->
      <div id="search-record-row1" class="mt-5 mb-3">
        <b>'{{ music.singer + " - " + music.title }}'</b>에 대한 결과입니다.
      </div>
      <!-- row 2 -->
      <div id="search-record-row2" class="row">
        <!-- row 2: left -->
        <div id="search-record-left" class="col-sm-8 pr-4">
          <!-- nav filter -->
          <div>
            <ul class="nav nav-tabs">
              <li
                v-for="type in filter_list"
                :key="type.ename"
                class="nav-item"
                :class="{ active: type.ename == sort_type }"
              >
                <a class="nav-link" @click="toggleFilter(type.ename)">{{
                  type.kname
                }}</a>
              </li>
            </ul>
          </div>
          <!-- result records -->
          <Records
            :is_visible="this.is_comment_visible"
            @update-visibility="updateVisibility"
          />
        </div>
        <!-- row 2: right -->
        <div id="search-record-right" class="col-sm-4">
          <Cart :music_title="music.title" />
          <!-- <Comments :is_visible="this.is_comment_visible" /> -->
          <Comment :recordId="temp" :class="{ invisible: !is_comment_visible }" class="mb-5" />
        </div>
      </div>
      <!-- row 3: pagination -->
      <!-- <Paging /> -->
    </div>
  </div>
</template>

<script>
import Records from "@/components/search/Records.vue";
// import Comments from "@/components/search/Comments.vue";
import Comment from "@/components/Comment.vue";
import Cart from "@/components/search/Cart.vue";
// import Paging from "@/components/Paging.vue";
import SearchService from "@/services/search.service";

export default {
  name: "search-record",
  data() {
    return {
      temp: 1,
      music: {},
      filter_list: [
        { ename: "latest", kname: "최신순" },
        { ename: "like", kname: "좋아요순" },
        // { ename: "follow", kname: "팔로우순" },
      ],
      sort_type: "latest", // 검색 필터 초깃값 설정
      is_comment_visible: true, // 댓글창 visibility
      record_id: -1, // 댓글창 선택된 레코드
    };
  },
  components: {
    Records,
    Comment,
    // Comments,
    Cart,
    // Paging,
  },

  methods: {
    // 화면 필터 토글
    toggleFilter(type) {
      if (this.sort_type != type) {
        this.setFilter(type); // 필터 설정
        this.getRecords(type); // 데이터 가져오기

        // 현재 라우트 경로를 유지하면서, 쿼리스트링만 변경
        return this.$router.replace({
          name: "search-record",
          query: {
            filter: type,
          },
        });
      }
    },

    // 필터 설정
    setFilter(type) {
      if (this.sort_type != type) {
        this.sort_type = type;
      }
    },

    // 데이터 가져오기 (axios)
    getRecords(sort_type) {
      sort_type;
      this.$store.dispatch("records/getRecords", {
        music_id: this.music_id,
        filter: sort_type,
      });
    },

    // 댓글창 visibility 전환
    updateVisibility() {
      this.is_comment_visible = !this.is_comment_visible;
    },
  },

  computed: {
    qs_page() {
      return this.$route.query.p || 1;
    },
    music_id() {
      return this.$route.params.id;
    },
    records() {
      return this.$store.state.records.records;
    },
  },

  mounted() {
    SearchService.getMusic(this.music_id).then(
      (res) => {
        if (Object.keys(res.data).length !== 0) {
          this.music = res.data;
        } else {
          // this.$router.push("/musics");
        }
      },
      (error) => {
        error =
          (error.res && error.res.data) || error.message || error.toString();
        alert(error);
        // this.$router.push("/musics");
      }
    );

    const sort_type = this.$route.query.filter;

    // query string = "like", "follow"
    if (
      sort_type === "like"
      //  || sort_type === "follow"
    ) {
      this.setFilter(sort_type);
      this.getRecords(sort_type);
    }
    // query string = "latest", undefined, etc.
    else {
      this.getRecords("latest");
    }
  },
};
</script>

<style scoped>
.background {
  padding-top: 60px;
  min-height: 100vh;
  /* background-color: #fafafa; */
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

/* row 1: record info */
#search-record-row1 b {
  color: #007bff;
}

/* row 2 left: filter */
.nav-item {
  opacity: 0.5;
  font-size: 0.8rem;
  border: none !important;
}

.nav-item a {
  color: black;
}
.nav-item a:hover {
  cursor: pointer;
}

.active {
  opacity: 1 !important;
  color: black;
  font-weight: bold;
  border-bottom: 2px solid #2080e0 !important;
}

/* ################## comment ################## */
::v-deep #comment {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  flex: 1 1 auto;
  min-height: 1px;
  font-size: 0.8rem;
}
::v-deep #comment-title {
  display: initial !important;
}
::v-deep .comment-write-box {
  background-color: #fff;
  border: none;
}
::v-deep .comment-profile-image,
::v-deep #comment-num {
  display: none;
}
::v-deep #comment-area {
  height: auto;
  width: 100%;
  margin: 0 15px 0 0;
  border: none;
}
::v-deep .comment-input {
  height: 100%;
  padding: 0.375rem 0.75rem;
  color: #495057;
  border: 1px solid #ced4da !important;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
::v-deep .comment-write-box {
  height: 100%;
  padding: 13px 18px !important;
}
::v-deep #register-button {
  width: 25%;
  height: auto;
  font-size: 0.9rem;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
::v-deep #comment-contents {
  border-top: none !important;
  /* overflow:initial !important; */
}
::v-deep .comment-item {
  display: block!important;
  width: 100%;
  min-height: 5rem;
  font-size: 0.8rem;
  border: none;
}
::v-deep #comment-user-link {
  align-items: center;
  min-width: 1rem!important;
  width:fit-content;
  padding-bottom: 5px;
}
::v-deep .comment-user-profile {
  width: 2rem !important;
  height: 2rem !important;
}
::v-deep #comment-username:hover {
  color: #007bff !important;
  text-decoration: none !important;
}
::v-deep #comment-username {
  margin: 0 12px !important;
  font-size: 0.8rem !important;
  color: black !important;
}
::v-deep #comment-content{
  margin-bottom: 5px!important;
  font-size: 0.9rem !important;
}
::v-deep #comment-update{
  right: 0px!important;
}
</style>
