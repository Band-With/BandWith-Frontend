<template>
  <div v-if="user !== null" id="record-cart" class="card mb-3">
    <div class="card-body">
      <h6 class="card-title">저장할 기록</h6>
      <div
        v-if="OnlyMyRecord.length === 0"
        class="no-result d-flex flex-column align-items-center justify-content-center w-100 p-5"
      >
        <img class="icon mb-3" src="@/assets/images/icon/cart.png" />
        <b style="font-size: 0.8rem">추가해주세요.</b>
      </div>
      <div v-else id="cart-contents">
        <ul class="list-group list-group-horizontal d-flex flex-wrap">
          <li
            v-for="record in OnlyMyRecord"
            :key="record.url"
            class="list-group-item d-flex"
          >
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
      title:this.music_title,
      imgPreUrl: "data:image/jpeg;base64,",
    };
  },
  props:['OnlyMyRecord'],

  computed: {

  },

  methods: {
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
