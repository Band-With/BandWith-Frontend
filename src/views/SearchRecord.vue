<template>
  <div class="background justify-content-center">
    <div id="search-record" class="container">
      <!-- row 1: search info -->
      <div id="search-record-row1" class="mt-5 mb-3">
        <b>'{{ music_title }}'</b>에 대한 결과입니다.
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
          <Records :records="records" :loading="loading" />
        </div>
        <!-- row 2: right -->
        <div id="search-record-right" class="col-sm-4">
          <Cart />
          <Comments />
        </div>
      </div>
      <!-- row 3: pagination -->
      <Paging />
    </div>
  </div>
</template>

<script>
import Records from "@/components/searchRecord/Records.vue";
import Comments from "@/components/searchRecord/Comments.vue";
import Cart from "@/components/searchRecord/Cart.vue";
import Paging from "@/components/Paging.vue";
import SearchService from "../services/search.service";

export default {
  name: "search-record",
  data() {
    return {
      loading: true,
      music_title: "아이유 - 하루끝",
      filter_list: [
        { ename: "latest", kname: "최신순" },
        { ename: "like", kname: "좋아요순" },
        { ename: "follow", kname: "팔로우순" },
      ],
      sort_type: "latest", // 검색 필터 초깃값 설정
      records: [
        //   {
        //     id: 1,
        //     username: "2wjdwo97",
        //     url:
        //       "https://bucket-band-with.s3.ap-northeast-2.amazonaws.com/records/dcd1897b-09c7-4836-88c0-b58e2d3b8135-%EB%85%B9%EC%9D%8C.m4a",
        //     like: 15,
        //     comment: 5,
        //   },
      ],
    };
  },

  components: {
    Records,
    Comments,
    Cart,
    Paging,
  },

  methods: {
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

    setFilter(type) {
      if (this.sort_type != type) {
        this.sort_type = type;
      }
    },

    getRecords(filter) {
      SearchService.getRecords(this.music_id, filter).then(
        (response) => {
          if (Object.keys(response.data).length !== 0) {
            this.records = response.data;
          }
          this.loading = false;
        },
        (error) => {
          error =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.loading = false;
          console.log(error);
        }
      );
    },
  },

  computed: {
    qs_page() {
      return this.$route.query.p || 1;
    },
    music_id() {
      return this.$route.params.id;
    },
  },

  mounted() {
    // TODO this.music_id -> title, singer
    this.music_title = this.music_id;

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
