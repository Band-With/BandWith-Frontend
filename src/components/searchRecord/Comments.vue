<template>
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
</template>

<script>
export default {
  data() {
    return {
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
}
</script>

<style scoped>
.list-group-item {
  padding: 0.75rem 0.5rem;
  font-size: 0.8rem;
  border: none;
}
</style>