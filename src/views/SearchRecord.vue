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
              <li class="nav-item">
                <router-link
                  :to="{ name: 'record-by-latest', query: {} }"
                  :class="{ 'nav-link': true, active: false }"
                >
                  <!-- <img id="latest" src="../assets/images/icon/clock.png" /> -->
                  <span>최신순</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'record-by-like', query: {} }"
                  :class="{ 'nav-link': true, active: false }"
                >
                  <!-- <img id="like" src="@/assets/images/icon/like_off.png" /> -->
                  <span>좋아요순</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'record-by-follow', query: {} }"
                  :class="{ 'nav-link': true, active: false }"
                >
                  <!-- <img id="follow" src="../assets/images/icon/follower.png" /> -->
                  <span>팔로우순</span>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- result records -->
          <div>
            <router-view></router-view>
          </div>
        </div>
        <!-- row 2: right -->
        <div id="search-record-right" class="col-sm-4">
          <!-- cart -->
          <div id="record-cart" class="card mb-3">
            <div class="card-body">
              <h6 class="card-title">장바구니</h6>
              <div>
                <ul class="list-group list-group-horizontal d-flex flex-wrap">
                  <li
                    v-for="record in cart"
                    :key="record.id"
                    class="list-group-item d-flex"
                  >
                    <div class="img-wrapper">
                      <img class="img-profile" src="@/assets/images/suzy.jpg" />
                    </div>
                    <img
                      class="icon"
                      src="@/assets/images/icon/close.png"
                      @click="alert('삭제되었습니다.')"
                      style="cursor: pointer"
                    />
                  </li>
                </ul>
              </div>
              <div class="text-right">
                <a href="#" class="btn btn-primary">합주 생성</a>
              </div>
            </div>
          </div>
          <!-- comment -->
          <div id="record-comment" :class="{ card: true, invisible: false }">
            <div class="card-body">
              <h6 class="card-title">댓글</h6>
              <!-- leave a comment -->
              <form class="d-flex">
                <div class="form-group mr-3 mb-2 flex-grow-1">
                  <input
                    type="text"
                    class="form-control  flex-grow-1"
                    id="inputPassword2"
                    placeholder="댓글을 입력하세요."
                  />
                </div>
                <button type="submit" class="btn btn-primary mb-2">
                  등록
                </button>
              </form>
              <!-- comment contents -->
              <div>
                <ul class="list-group">
                  <li
                    v-for="comment in comments"
                    :key="comment.id"
                    class="list-group-item"
                  >
                    <b class="card-title">{{ comment.username }}</b>
                    <p class="card-text">
                      {{ comment.p }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- row 3: pagination -->
      <div
        id="search-reocrd-row3"
        class="d-flex justify-content-center pt-3 pb-5"
      >
        <nav>
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-music",
  data() {
    return {
      music_title: "아이유 - 하루끝",
      cart: [
        {
          id: 1,
          image: "@/assets/images/suzy.jpg",
        },
        {
          id: 2,
          image: "@/assets/images/dongju.jpg",
        },
        {
          id: 3,
          image: "@/assets/images/dongju.jpg",
        },
        {
          id: 4,
          image: "@/assets/images/dongju.jpg",
        },
      ],
      comments: [
        {
          id: 1,
          username: "pkm1015",
          p: "I like your guitar playing!",
        },
        {
          id: 2,
          username: "2wjdwo97",
          p: "I love playing!",
        },
      ],
    };
  },

  methods: {
    alert(msg) {
      alert(msg);
    },
  },
  create() {},
};
</script>

<style scoped>
.background {
  padding-top: 60px;
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
.nav-item a {
  opacity: 0.5;
  font-size: 0.8rem;
  border: none !important;
  color: black;
}

.nav-item a.router-link-exact-active {
  opacity: 1 !important;
  color: black;
  font-weight: bold;
  border-bottom: 2px solid #2080e0 !important;
}

/* row 2 right */
#search-record-right {
  min-width: max-content;
  font-size: 0.8rem;
}

#record-cart {
  max-width: fit-content;
}

.list-group-item {
  padding: 0.75rem 0.5rem;
  border: none;
}
</style>
