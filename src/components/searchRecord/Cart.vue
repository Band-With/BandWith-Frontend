<template>
  <div v-if="user !== null" id="record-cart" class="card mb-3">
    <div class="card-body">
      <h6 class="card-title">장바구니</h6>
      <div
        v-if="cart.length === 0"
        class="no-result d-flex flex-column align-items-center justify-content-center w-100 p-5"
      >
        <img class="icon mb-3" src="@/assets/images/icon/cart.png" />
        <b style="font-size: 0.8rem">장바구니가 비었습니다.</b>
      </div>
      <div v-else id="cart-contents">
        <ul class="list-group list-group-horizontal d-flex flex-wrap">
          <li
            v-for="record in cart"
            :key="record.record.record_id"
            class="list-group-item d-flex"
          >
            <div class="img-wrapper">
              <img
                v-if="record.member.profile == null"
                src="@/assets/images/icon/default_user.png"
                class="img-profile"
              />
              <img
                v-else
                :src="imgPreUrl + record.member.profile"
                class="img-profile"
              />
            </div>
            <img
              class="icon"
              src="@/assets/images/icon/close_light.png"
              @click="delete_from_cart(record.record.record_id)"
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
      title:this.music_title,
      imgPreUrl: "data:image/jpeg;base64,",
    };
  },
  props:['music_title'],

  computed: {
    cart() {
      return this.$store.state.records.cart;
    },
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },

  methods: {
    delete_from_cart(id) {
      this.$store.commit("records/DELETE_FROM_CART", id);
      alert("삭제되었습니다.");
    },
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
