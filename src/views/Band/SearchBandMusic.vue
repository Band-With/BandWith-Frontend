<template>
  <div class="background justify-content-center">
    <div id="search-music" class="container">
      <!-- search input -->
      <div
        class="d-flex align-items-center justify-content-center"
        style="height: 100px;"
      >
        <b-dropdown
          :text="dropdown_text"
          variant="outline-primary"
          class="mr-3"
        >
          <b-dropdown-item
            v-for="subject in subject_list"
            :key="subject.ename"
            @click="changeSubject(subject)"
            >{{ subject.kname }}</b-dropdown-item
          >
        </b-dropdown>
        <form
          id="search-input-wrapper"
          class="d-flex align-items-center"
          @submit="searchMusic"
        >
          <input
            id="search-input"
            class="flex-grow-1 py-0 px-3"
            v-model="query"
          />
          <button type="submit" id="search-button" class="py-0">
            <img
              class="icon"
              src="@/assets/images/icon/search_white.png"
              style="width: 20px; height: 20px;"
            />
          </button>
        </form>
      </div>
      <!-- <div class="d-flex justify-content-between flex-grow-1 pt-1 mb-3"></div> -->

      <!-- nav filter -->
      <div>
        <ul class="nav nav-tabs">
          <li
            v-for="type in filter_list"
            :key="type.ename"
            class="nav-item"
            :class="{ active: type.ename == filter_type }"
          >
            <a class="nav-link" @click="changeFilter(type.ename)">{{
              type.kname
            }}</a>
          </li>
        </ul>
      </div>

      <!-- card -->
      <div class="card mb-5">
        <!-- card header -->
        <div class="card-header d-flex align-items-center py-2 px-4">
          <span>다른 밴드의 연주를 들어보고, 의견을 남겨보세요!</span>
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
          v-else-if="bandmusics == null"
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
        <BandMusics v-else ref="bandMusics" :content="bandmusics" />
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
  name: "searchBandMusic",
  data() {
    return {
      loading: true,
      query: "",
      filter_list: [
        { ename: "related", kname: "관련순" },
        { ename: "like", kname: "좋아요순" },
      ],
      filter_type: "related", // 검색 필터 초깃값 설정
      subject_list: [
        { ename: "band", kname: "밴드 검색" },
        { ename: "music", kname: "음악 검색" },
      ],
      dropdown_text: "밴드 검색",
      subject_type: "band",
      bandmusics: [
        {
          band_music_id: 9,
          band: {
            band_id: 3,
            band_name: "말달리자",
            img: null,
          },
          music: {
            title: "BAND",
            singer: "창모",
            composer: "작곡가",
            img: null,
          },
          members: [
            {
              member_id: 33,
              username: "pkm1015",
              profile: null,
            },
            {
              member_id: 35,
              username: "2wjdwo97",
              profile: null,
            },
          ],
          file_url: null,
          complete_date: null,
          is_like: true,
          likes: 10,
          comments: 20,
        },
        {
          band_music_id: 2,
          band: {
            band_id: 4,
            band_name: "정재밴드",
            img: null,
          },
          music: {
            title: "Celebrity",
            singer: "아이유",
            composer: "작곡가",
            img: null,
          },
          members: [
            {
              member_id: 34,
              username: "kdj1026",
              profile: null,
            },
            {
              member_id: 35,
              username: "2wjdwo97",
              profile: null,
            },
          ],
          file_url: "",
          complete_date: null,
          is_like: false,
          likes: 5,
          comments: 10,
        },
      ],
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
    // 검색 대상 변경
    changeSubject(subject) {
      if (this.subject_type != subject.ename) {
        this.setSubject(subject);
        this.getBandMusics(subject.ename, this.filter_type); // 데이터 가져오기
        this.changeQuery(subject.ename, this.filter_type);
      }
    },
    // 필터 변경
    changeFilter(filter) {
      if (this.filter_type != filter) {
        this.setFilter(filter);
        this.getBandMusics(this.subject_type, filter); // 데이터 가져오기
        this.changeQuery(this.subject_type, filter);
      }
    },
    // 검색 대상 설정
    setSubject(subject) {
      if (this.subject_type != subject.ename) {
        this.dropdown_text = subject.kname;
        this.subject_type = subject.ename;
      }
    },
    // 필터 설정
    setFilter(type) {
      if (this.filter_type != type) {
        this.filter_type = type;
      }
    },
    // 검색 버튼 눌렀을 때
    searchMusic(e) {
      e.preventDefault();
      this.getBandMusics(this.subject_type, this.filter_type);
      this.changeQuery(this.subject_type, this.filter_type);
    },
    // 데이터 가져오기 (axios)
    getBandMusics(subject_type, filter_type) {
      this.loading = true;
        SearchService.getBandMusics(this.query, subject_type, filter_type).then(
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
    changeQuery(subject, filter) {
      if (this.query == null) {
        return this.$router.replace({
          name: "searchBandMusic",
          query: {
            subject: subject,
            filter: filter,
          },
        });
      } else {
        return this.$router.replace({
          name: "searchBandMusic",
          query: {
            q: this.query,
            subject: subject,
            filter: filter,
          },
        });
      }
    },
  },
  mounted() {
    this.query = this.$route.query.q;
    
    const subject_type = this.$route.query.subject;
    
    function isSubject(el) {
      if (el.ename === subject_type) {
        return true;
      }
    }
    
    var subject = this.subject_list.find(isSubject);
    var filter = this.$route.query.filter;
    
    if (subject != null && subject.ename === "music")
      this.setSubject(subject);
    else
      subject = this.subject_type;

    if (filter === "like")
      this.setFilter(filter);
    else
      filter = this.filter_type;
    
    this.getBandMusics(subject, filter);
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
.b-dropdown li {
  font-size: 0.9rem;
}
/* row 1: search input */
#search-input-wrapper {
  width: 400px;
  height: 45%;
  border: none;
}
#search-input {
  width: 88%;
  height: 100%;
  border: #2080e0 solid 2px;
}
#search-input:focus {
  outline: none;
}
#search-button {
  width: 12%;
  height: 100%;
  border: #2080e0 solid 2px;
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
.card {
  border: none;
}
</style>
