<template>
  <div class="background justify-content-center">
    <div id="search-music" class="container">
      <!-- search input -->
      <div
        class="d-flex align-items-center justify-content-center"
        style="height: 100px;"
      >
        <form
          id="search-input-wrapper"
          class="d-flex align-items-center"
          @submit="searchMusic"
        >
          <input id="search-input" class="flex-grow-1 p-3" v-model="query" />
          <button type="submit" id="search-button" class="flex-grow-1">
            <img
              class="icon"
              src="@/assets/images/icon/search_white.png"
              style="width: 20px; height: 20px;"
            />
          </button>
        </form>
      </div>
      <div class="d-flex justify-content-between flex-grow-1 pt-1 mb-3"></div>

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

      <!-- card -->
      <div class="card mb-5">
        <!-- card header -->
        <div
          class="card-header d-flex align-items-center  justify-content-between py-2 px-4"
        >
          <span>밴드에서 합주해보고 싶은 음악을 선택하고, 추가해보세요!</span>
          <div class="float-right">
            <button class="btn btn-primary" @click="addBandMusic">
              밴드 연습곡에 추가
            </button>
          </div>
        </div>
        <!-- card body -->
        <!-- loading -->
        <div v-if="loading" class="d-flex justify-content-center ">
          <span
            class="m-5 spinner-border spinner-border-sm"
            style="width: 3rem; height: 3rem; border-width: .35em; color: #ccc"
          ></span>
        </div>
        <!-- no result -->
        <div
          v-else-if="musics == null"
          class="no-result d-flex flex-column align-items-center justify-content-center w-100 p-5"
        >
          <img
            class="m-3"
            src="@/assets/images/icon/no_result.png"
            style="width: 40px; height: 40px;"
          />
          <b>녹음이 존재하지 않습니다.</b>
        </div>
        <!-- search results -->
        <BandMusics v-else ref="bandMusics" :musics="musics" />
      </div>

      <!-- row 3: pagination -->
      <!-- <Paging :page="Number(this.page)"/> -->
    </div>
  </div>
</template>

<script>
import BandMusics from "@/components/bandMusic/BandMusics.vue";
// import Paging from "@/components/Paging.vue";
import SearchService from "@/services/search.service";

export default {
  name: "bandMusicAdding",
  data() {
    return {
      loading: true,
      query: "",
      filter_list: [
        { ename: "related", kname: "관련순" },
        { ename: "record", kname: "녹음순" },
        { ename: "latest", kname: "최신순" },
      ],
      sort_type: "related", // 검색 필터 초깃값 설정
      musics: [],
    };
  },
  components: {
    BandMusics,
    // Paging,
  },

  computed: {
    page() {
      return this.$route.query.p || 1;
    },
  },
  methods: {
    // 밴드 음악 추가
    addBandMusic() {
      this.$refs.bandMusics.addBandMusic();
    },
    // 화면 필터 토글
    toggleFilter(type) {
      if (this.sort_type != type) {
        this.setFilter(type); // 필터 설정
        this.getMusics(type); // 데이터 가져오기
        this.changeQuery(type);
      }
    },
    // 검색 버튼 눌렀을 때
    searchMusic(e) {
      e.preventDefault();
      this.getMusics(this.sort_type);
      this.changeQuery(this.sort_type);
    },
    // 필터 설정
    setFilter(type) {
      if (this.sort_type != type) {
        this.sort_type = type;
      }
    },
    // 데이터 가져오기 (axios)
    getMusics(sort_type) {
      this.loading = true;
      SearchService.getMusics(this.query, sort_type).then(
        (res) => {
          if (Object.keys(res.data).length !== 0) {
            this.musics = res.data;
          } else {
            this.musics = null;
          }
          this.loading = false;
        },
        (error) => {
          error =
            (error.res && error.res.data) || error.message || error.toString();
          alert(error);
          this.loading = false;
        }
      );
    },
    // 현재 라우트 경로를 유지하면서, 쿼리스트링만 변경
    changeQuery(type) {
      if (this.query == null) {
        return this.$router.replace({
          name: "bandMusicAdding",
          query: {
            filter: type,
          },
        });
      } else {
        return this.$router.replace({
          name: "bandMusicAdding",
          query: {
            q: this.query,
            filter: type,
          },
        });
      }
    },
  },
  mounted() {
    this.query = this.$route.query.q;
    const sort_type = this.$route.query.filter;

    // query string = "record", "latest"
    if (sort_type === "record" || sort_type === "latest") {
      this.setFilter(sort_type);
      this.getMusics(sort_type);
    }
    // query string = "related", undefined, etc.
    else {
      this.getMusics("related");
    }
    document.getElementById("search-input").focus();
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  margin-right: auto;
  margin-left: auto;
}
.background {
  padding-top: 60px;
  min-height: 100vh;
  background-color: #ffffff;
}
#search-input-wrapper {
  width: 450px;
  height: 50px;
  border: #2080e0 solid 2px;
}
#search-input {
  width: 90%;
  height: 100%;
  border: none;
}
#search-input:focus {
  outline: none;
}
#search-button {
  width: 12%;
  height: 100%;
  border: none;
  background: #2080e0;
}
/* row 2: search result */
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
