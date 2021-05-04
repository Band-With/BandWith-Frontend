<template>
  <div id="record-comment" class="card" :class="{ invisible: !is_visible }">
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
        <!-- loading -->
        <div v-if="loading_cmt" class="d-flex justify-content-center">
          <span
            class="m-5 spinner-border spinner-border-sm"
            style="width: 3rem; height: 3rem; border-width: .35em; color: #ccc"
          ></span>
        </div>
        <!-- no result -->
        <div
          v-else-if="comments == null"
          class="no-result d-flex flex-column align-items-center justify-content-center w-100 p-5"
        >
          <b style="font-size: 0.8rem">댓글이 없습니다.</b>
        </div>
        <ul v-else class="list-group">
          <li
            v-for="comment in this.comments"
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
</template>

<script>
export default {
  props: {
    is_visible: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    comments() {
      return this.$store.state.records.comments;
    },
    loading_cmt() {
      return this.$store.state.records.loading_cmt;
    },
  },
};
</script>

<style scoped>
.list-group-item {
  padding: 0.75rem 0.5rem;
  font-size: 0.8rem;
  border: none;
}
</style>
