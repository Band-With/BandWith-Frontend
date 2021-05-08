<template>
  <div class="background justify-content-center">
    <div id="search-record" class="container">
      <!-- row 1: search info -->
      <div id="search-record-row1" class="mt-5 mb-3">
        <b>'{{ music_info }}'</b>에 대한 결과입니다.
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
          <Cart v-bind:music_title="music_title" />
          <Comments :is_visible="this.is_comment_visible" />
        </div>
      </div>
      <!-- row 3: pagination -->
      <!-- <Paging :page="Number(this.page)" /> -->
    </div>
  </div>
</template>

<script>
import Records from "@/components/searchRecord/Records.vue";
import Comments from "@/components/searchRecord/Comments.vue";
import Cart from "@/components/searchRecord/Cart.vue";
// import Paging from "@/components/Paging.vue";
import SearchService from "@/services/search.service";

export default {
  name: "search-record",
  data() {
    return {
      music_info: "",
      filter_list: [
        { ename: "latest", kname: "최신순" },
        { ename: "like", kname: "좋아요순" },
        { ename: "follow", kname: "팔로우순" },
      ],
      sort_type: "latest", // 검색 필터 초깃값 설정
      is_comment_visible: false, // 댓글창 visibility
    };
  },
  components: {
    Records,
    Comments,
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
          path: "",
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
    page() {
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
          this.music_info = res.data.title + " - " + res.data.singer;
        }
      }
    );

    const sort_type = this.$route.query.filter;

    // query string = "like", "follow"
    if (sort_type === "like" || sort_type === "follow") {
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
  background-color: #fafafa;
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
</style>
