<template>
  <ul class="search-result-ul">
    <li
      v-for="member in members"
      :key="member.member.member_id"
      id="member-result-li"
    >
      <div class="card-body d-flex flex-row align-items-center">
        <div class="img-wrapper ml-4 mr-5">
          <img
            v-if="member.member.img === null"
            src="@/assets/images/icon/default_user.png"
            class="img-profile"
          />
          <img
            v-else
            :src="imgPreUrl + member.member.img"
            class="img-profile"
          />
        </div>
        <div class="txt-wrapper card-text flex-grow-1">
          <router-link :to="`/${member.member.username}`" class="card-title ">
            <b class="mr-2">{{ member.member.username }}</b>
            <span
              class="font-weight-bold"
              style="color: #000000; font-size: 0.8rem;"
              >{{ member.member.name }}</span
            >
          </router-link>
          <div class="d-flex mt-2" style="font-size: 0.8rem;">
            <dd class="mr-3">follower</dd>
            <dd class="mr-4">{{ member.follower }}</dd>
            <dd class="mr-3">following</dd>
            <dd>{{ member.following }}</dd>
          </div>
        </div>
        <div>
          <button
            class="btn btn-primary"
            @click="invite(member.member.member_id)"
          >
            초대하기
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import BandService from "@/services/band.service";

export default {
  props: {
    members: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      imgPreUrl: "data:image/jpeg;base64,",
    };
  },

  computed: {
    bandname() {
      return this.$route.params.bandname;
    },
  },

  methods: {
    invite(member_id) {
      if (confirm("밴드 '" + this.bandname + "'에 초대하시겠습니까?")) {
        BandService.inviteMember(this.bandname, member_id).then(
          (res) => {
            if (Object.keys(res.data).length !== 0) {
              alert("초대 메시지가 전송되었습니다.");
            }
          },
          (error) => {
            error =
              (error.res && error.res.data) ||
              error.message ||
              error.toString();
            alert(error);
          }
        );
      }
    },
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
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

.search-result-ul {
  list-style: none;
  font-size: 0.9rem;
  padding-left: 0px;
  min-width: 700px;
}

#member-result-li {
  background: #ffffff;
  border-bottom: 1px solid #dfdfdf;
}
</style>
