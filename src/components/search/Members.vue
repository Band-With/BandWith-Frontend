<template>
  <div>
    <div class="input-group px-3">
      <div id="input-wrapper" class="d-flex flex-grow-1">
        <input
          class="form-control pl-3 py-2"
          placeholder="멤버를 검색하세요"
          @input="keyUp"
          @click="keyUp"
          v-model="query"
          style=" font-size: 0.9rem; width: 530px;"
        />
        <div class="d-flex align-items-center px-2">
          <span v-show="loading" class="spinner-border spinner-border-sm text-primary" role="status" />
        </div>
        <ul
          id="auto-search-results"
          class="list-group"
          :hidden="!isDropboxActive"
        >
          <li v-if="members == null" class="list-group-item py-2">
            일치하는 사용자가 없습니다.
          </li>
          <li
            v-else
            v-for="member in members"
            :key="member.member_id"
            class="list-group-item list-group-item-action py-2"
            @click="setQuery(member.member_id, member.username)"
          >
            <div class=" d-flex flex-row align-items-center">
              <div class="img-wrapper mr-4">
                <img
                  v-if="member.img === null"
                  src="@/assets/images/profile.jpg"
                  class="img-profile"
                />
                <img v-else :src="imgPreUrl + member.img" class="img-profile" />
              </div>
              <div
                class="d-flex justify-content-between flex-grow-1"
                style="font-size: 0.9rem;"
              >
                <div>
                  <span class="mr-2">{{ member.username }}</span>
                  <span>{{ member.name }}</span>
                </div>
                <div>
                  <img
                    src="@/assets/images/icon/add_white.png"
                    style="width:10px; height:10px;"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <button
          class="btn btn-primary"
          :disabled="!isInviteActive"
          @click="invite"
        >
          초대하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BandService from "@/services/band.service";
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      imgPreUrl: "data:image/jpeg;base64,",
      loading: false,
      isDropboxActive: false,
      isInviteActive: false,
      query: "",
      query_id: -1,
      members: [
        {
          member_id: "1",
          username: "pkm1015",
          name: "박경민",
          img: null,
        },
      ],
    };
  },

  computed: {
    bandname() {
      return this.$route.params.bandname;
    },
  },

  methods: {
    keyUp() {
      if (this.query != "") {
        this.isDropboxActive = true;
        this.getMembers();
      }
      this.isInviteActive = false;
    },
    // 검색어 저장
    setQuery(id, username) {
      this.query_id = id;
      this.query = username;
      this.isDropboxActive = false;
      this.isInviteActive = true;
    },
    cleanQuery(){
      this.query = "";
      this.isDropboxActive = false;
    },
    // 멤버 불러오기
    getMembers() {
      this.loading = true;
      UserService.getMembers(this.query).then(
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
          console.log(error);
          this.loading = false;
        }
      );
    },
    // 초대하기
    invite() {
      if (confirm(this.query + "님을 초대하시겠습니까?")) {
        BandService.inviteMember(this.bandname, this.query_id).then(
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
  width: 30px;
  height: 30px;
  border-radius: 70%;
  overflow: hidden;
}

.img-profile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#auto-search-results {
  width: 530px;
  max-height: 300px;
  position: absolute;
  top: calc(1.5em + 0.75rem + 2px);
  border: 1px solid rgba(0, 0, 0, 0.125);
  overflow: auto;
}

.list-group-item {
  border: none;
}

.list-group-item-action:focus,
.list-group-item-action:hover {
  z-index: 1;
  color: #ffffff;
  text-decoration: none;
  background-color: #2080e0;
  cursor: pointer;
}
</style>
