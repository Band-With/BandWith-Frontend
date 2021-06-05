<template>
  <div class="background justify-content-center">
    <div id="search-music" class="container">
      <!-- row 1: search input -->
      <div
        id="search-music-row1"
        class="d-flex align-items-center justify-content-center"
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

      <!-- row 2: search results -->
      <div id="search-music-row2" style="min-height: 60vh">
        <!-- nav filter -->
        <div>
          <ul class="nav nav-tabs">
            <li
              v-for="type in filter_list"
              :key="type.ename"
              class="nav-item"
              :class="{ active: type.ename == sort_type }">
              <a class="nav-link" @click="toggleFilter(type.ename)">{{
                type.kname
              }}</a>
            </li>
          </ul>
        </div>
        <!-- loading -->
        <div v-if="loading" class="d-flex justify-content-center ">
          <span
            class="m-5 spinner-border spinner-border-sm"
            style="width: 3rem; height: 3rem; border-width: .35em; color: #ccc"
          ></span>
        </div>
        <!-- no result -->
        <div
          v-else-if="members == null"
          class="no-result d-flex flex-column align-items-center justify-content-center w-100 p-5"
        >
          <img
            class="m-3"
            src="@/assets/images/icon/no_result.png"
            style="width: 40px; height: 40px;"
          />
          <b>멤버가 존재하지 않습니다.</b>
        </div>
        <!-- search results -->
        <div class="d-flex justify-content-between flex-grow-1 pt-1 mb-3">
          <form class="nav-search">
            <input
              type="text"
              class="form-control"
              name="query"
              :value="member_query"
              placeholder="멤버를 검색하세요 ..."
            />
          </form>
          <div class="float-right">
            <button class="btn btn-primary">
              멤버 초대하기
            </button>
          </div>
          {{ member_query }}
        </div>

        <div class="card">
          <div class="card-header d-flex align-items-center p-0">
            <div class="py-2 pl-4 pr-4">
              <input type="checkbox" class="js-bulk-actions-toggle" />
            </div>
            <span>멤버</span>
          </div>

          <ul class="card-body p-0 search-result-ul">
            <li
              v-for="member in members"
              :key="member.member.member_id"
              id="member-result-li"
              class="list-group d-flex flex-row align-items-center pl-0 pr-3 py-3"
            >
              <div class="pl-4 pr-4">
                <input type="checkbox" class="js-bulk-actions-toggle" />
              </div>

              <div class="img-wrapper mr-4">
                <img
                  v-if="member.member.img === null"
                  src="@/assets/images/profile.jpg"
                  class="img-profile"
                />
                <img
                  v-else
                  :src="imgPreUrl + member.member.img"
                  class="img-profile"
                />
              </div>

              <div class="d-flex justify-content-between flex-grow-1">
                <router-link :to="`/${member.member.username}`">
                  <span class="mr-2">{{ member.member.username }}</span>
                  <span style="color: #606060; font-size: 0.8rem;">{{
                    member.member.name
                  }}</span>
                </router-link>
                <div class="d-flex" style="font-size: 0.8rem;">
                  <span class="mr-3">follower</span>
                  <span class="mr-4">{{ member.follower }}</span>
                  <span class="mr-3">following</span>
                  <span>{{ member.following }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- row 3: pagination -->
      <!-- <Paging :page="Number(this.page)"/> -->
    </div>
  </div>
</template>

<script>
import Members from "@/components/search/Members.vue";
// import Paging from "@/components/Paging.vue";
import UserService from "@/services/user.service";

export default {
  name: "bandInvitation",
  data() {
    return {
      loading: true,
      query: "",
      filter_list: [
        { ename: "related", kname: "관련순" },
        { ename: "follow", kname: "팔로우순" },
      ],
      sort_type: "related", // 검색 필터 초깃값 설정
      members: [
        {
          member: {
            member_id: "1",
            username: "pkm1015",
            name: "박경민",
            img: null,
          },
          follower: 2,
          following: 3,
        },
      ],
    };
  },
  components: {
    Members,
    // Paging,
  },

  computed: {
    page() {
      return this.$route.query.p || 1;
    },
  },
  methods: {
    // 화면 필터 토글
    toggleFilter(type) {
      if (this.sort_type != type) {
        this.setFilter(type); // 필터 설정
        this.getMembers(type); // 데이터 가져오기
        this.changeQuery(type);
      }
    },
    // 검색 버튼 눌렀을 때
    searchMusic(e) {
      e.preventDefault();
      this.getMembers(this.sort_type);
      this.changeQuery(this.sort_type);
    },
    // 필터 설정
    setFilter(type) {
      if (this.sort_type != type) {
        this.sort_type = type;
      }
    },
    // 데이터 가져오기 (axios)
    getMembers(sort_type) {
      this.loading = true;
      UserService.getMembers(this.query, sort_type).then(
        (res) => {
          if (Object.keys(res.data).length !== 0) {
            this.members = res.data;
          } else {
            this.members = null;
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
          name: "bandInvitation",
          query: {
            filter: type,
          },
        });
      } else {
        return this.$router.replace({
          name: "bandInvitation",
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

    // query string = "follow"
    if (sort_type === "follow") {
      this.setFilter(sort_type);
      this.getMembers(sort_type);
    }
    // query string = "related", undefined, etc.
    else {
      this.getMembers("related");
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
  /* background-color: #fafafa; */
}
/* row 1: search input */
#search-music-row1,
#search-music-row3 {
  height: 110px;
}
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

.search-result-ul {
  list-style: none;
  font-size: 0.9rem;
  padding-left: 0px;
}
#member-result-li {
  background: #ffffff;
  border-bottom: 1px solid #dfdfdf;
}
</style>
