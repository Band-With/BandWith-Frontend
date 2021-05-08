<template>
  <div id="record-cart" class="card mb-3">
    <div class="card-body">
      <h6 class="card-title">장바구니</h6>
      <div id="cart-contents">
        <ul class="list-group list-group-horizontal d-flex flex-wrap">
          <li
            v-for="record in cart"
            :key="record.r_id"
            class="list-group-item d-flex"
          >
            <div class="img-wrapper">
              <img class="img-profile" src="@/assets/images/suzy.jpg" />
            </div>
            <img
              class="icon"
              src="@/assets/images/icon/close_light.png"
              @click="delete_from_cart(record.r_id)"
              style="cursor: pointer"
            />
          </li>
        </ul>
      </div>
      <div class="text-right">
        <router-link :to="{ name: 'bucket', params: { username: user.username, music:title }}" class="btn btn-primary">합주 생성</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title:this.music_title
    };
  },
  props:['music_title'],

  computed: {
    cart() {
      return this.$store.state.records.cart;
    },
    user() {
      return JSON.parse(localStorage.getItem('user'));
    }
  },

  methods: {
    delete_from_cart(id) {
      this.$store.commit("records/DELETE_FROM_CART", id);
      alert("삭제되었습니다.")
    }
  },
};
</script>

<style scoped>
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

.list-group-item {
  padding: 0.75rem 0.5rem;
  font-size: 0.8rem;
  border: none;
}

#cart-contents {
  min-height: 100px;
}
</style>
