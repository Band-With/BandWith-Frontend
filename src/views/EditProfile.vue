<template>
  <div class="background justify-content-center">
    <div
      id="search-music"
      class="container d-flex flex-column align-items-center justify-content-center"
    >
      <!-- card -->
      <div class="card d-flex" style="width: 70%; border: none;">
        <div class="card-body">
          <!-- header -->
          <div
            class="d-flex align-items-center pb-2"
            style="border-bottom: 1px solid rgba(0, 0, 0, 0.125);"
          >
            <h5 class="card-title mr-3">프로필 변경</h5>
            <span style="font-size: .8rem;">{{ member.username }}</span>
          </div>

          <!-- input -->
          <div class="d-flex justify-content-center">
            <!-- profile image -->
            <div class="my-4 pr-5">
              <label class="d-flex" for="profile-image">프로필 이미지</label>
              <div
                class="d-flex flex-column align-items-center justify-content-center"
              >
                <input
                  ref="imageInput"
                  type="file"
                  hidden
                  @change="onChangeImages"
                />
                <div
                  v-if="!imageUrl"
                  class="d-flex flex-column align-items-center"
                >
                  <button
                    id="btn-img"
                    type="button"
                    class="img-wrapper p-0"
                    @click="onClickImageUpload"
                  >
                    <img
                      v-if="member.profileImg === null"
                      src="@/assets/images/profile.jpg"
                      class="img-profile"
                    />
                    <img
                      v-else
                      :src="imgPreUrl + member.profileImg"
                      class="img-profile"
                    />
                  </button>
                  <a
                    style="font-weight: light; color: #2080e0;"
                    class="btn"
                    @click="onClickImageUpload"
                    >클릭하여 업로드</a
                  >
                </div>
                <div v-else class="d-flex flex-column align-items-center">
                  <div class="img-wrapper">
                    <img :src="imgPreUrl + imageUrl" class="img-profile" />
                  </div>
                  <a
                    style="font-weight: light; color: #2080e0;"
                    class="btn"
                    @click="onClickImageUpload"
                    >이미지 변경</a
                  >
                </div>
              </div>
            </div>
            <div>
              <form class="my-4">
                <div class="form-group">
                  <label for="inputName">이름</label>
                  <input
                    id="inputName"
                    :class="{
                      'form-control': true,
                      'is-invalid': !isValidName,
                    }"
                    v-model="name"
                    @keyup="checkName"
                    required
                  />
                  <div class="invalid-feedback">이름을 입력하세요</div>
                </div>

                <div class="form-group">
                  <label for="inputEmail">이메일</label>
                  <input
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    v-model="email"
                    disabled
                  />
                  <div class="invalid-feedback">
                    올바르지 않은 이메일 형식입니다.
                  </div>
                </div>
              </form>

              <!-- submit btn -->
              <div class="text-center mt-5">
                <a class="btn btn-primary" @click="submitProfile"
                  >프로필 수정</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- card -->
      <div class="card d-flex flex-row" style="width: 70%; border: none;">
        <div class="card-body">
          <!-- header -->
          <div
            class="d-flex align-items-center pb-2"
            style="border-bottom: 1px solid rgba(0, 0, 0, 0.125);"
          >
            <h5 class="card-title mr-3">비밀번호 변경</h5>
            <span style="font-size: .8rem;">{{ member.username }}</span>
          </div>

          <div class="form-row px-5 py-3">
            <div class="form-group col-md-6">
              <label for="inputPassword">비밀번호</label>
              <input
                type="password"
                id="inputPassword"
                :class="{
                  'form-control': true,
                  'is-invalid': !isValidPw,
                }"
                v-model="pw"
                @keyup="checkPw"
                required
              />
              <div class="invalid-feedback">
                비밀번호는 6자리 이상이어야 합니다.
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="inputPasswordConfirm">비밀번호 확인</label>
              <input
                type="password"
                id="inputPasswordConfirm"
                :class="{
                  'form-control': true,
                  'is-invalid': !isValidPwConfirm,
                }"
                v-model="pwConfirm"
                @keyup="checkPwConfirm"
                required
              />
              <div class="invalid-feedback">
                비밀번호와 일치하지 않습니다.
              </div>
            </div>
          </div>

          <!-- submit btn -->
          <div class="text-center">
            <a class="btn btn-primary" @click="submitPw">비밀번호 수정</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "editProfile",

  data() {
    return {
      member: {},

      isValidName: true,
      isValidPw: true,
      isValidPwConfirm: true,

      name: "",
      email: "",
      pw: "",
      pwConfirm: "",

      imgPreUrl: "data:image/jpeg;base64,",
      imageUrl: null,
    };
  },

  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },

  methods: {
    // 이미지 관리
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      const file = e.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function(e) {
        this.imageUrl = e.target.result.substr(23, e.target.result.length);
      }.bind(this);
      reader.onerror = function(error) {
        alert(error);
      };
    },

    checkName(e) {
      let name = e.target.value;
      if (name.length == 0) this.isValidName = false;
      else this.isValidName = true;
    },

    // checkEmail(e) {
    //   let email = e.target.value;
    //   let reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    //   if (email.length > 0 && !reg.test(email)) this.isValidEmail = false;
    //   else this.isValidEmail = true;
    // },

    checkPw(e) {
      let pw = e.target.value;
      if (pw.length > 0 && pw.length < 6) this.isValidPw = false;
      else this.isValidPw = true;

      this.checkPwConfirm();
    },

    checkPwConfirm() {
      if (this.pw !== this.pwConfirm) this.isValidPwConfirm = false;
      else this.isValidPwConfirm = true;
    },

    submitProfile() {
      let profile = this.imageUrl;

      if (this.member.name == this.name && this.imageUrl == null){
          alert("현재 프로필과 같습니다.");
          return;
      }
      if (this.imageUrl == null) // 프로필 사진을 안바꾼 경우
        profile = this.member.profileImg;

      if (this.isValidName) {
        var answer = confirm("프로필을 변경하시겠습니까?");
        if (!answer) return;
        
        UserService.updateMemberProfile(this.member.id, this.name, profile).then(
          (res) => {
            if (res.status === 200) {
              console.log(profile);
              alert("프로필이 변경되었습니다.");
              this.getMember();
              this.imageUrl = null;
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
      else alert("이름을 입력해주세요.");
    },

    submitPw() {
      if (this.isValidPw && this.isValidPwConfirm && this.pw != "" && this.pwConfirm != "") {
          var answer = confirm("비밀번호를 변경하시겠습니까?");
          if (!answer) return;

          UserService.updateMemberPw(
            this.member.id,
            this.pw
          ).then(
            (res) => {
              if (res.status === 200) {
                alert("비밀번호가 변경되었습니다.");
                this.$router.push("/" + this.user.username);
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
          this.pw = "";
          this.pwConfirm = "";
      }
      else alert("잘못된 비밀번호 입니다.");
    },

    getMember() {
      UserService.getMember(this.user.username).then(
        (res) => {
          if (res.status === 200) {
            this.member = res.data;
            this.name = this.member.name;
            this.email = this.member.email;
            console.log(this.member);
          }
        },
        (error) => {
          error =
            (error.res && error.res.data) || error.message || error.toString();
          alert(error);
        }
      );
    },
  },
  mounted() {
    this.getMember();
  },
};
</script>

<style scoped>
.background {
  padding-top: 60px;
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  min-height: 90vh;
}

.img-wrapper {
  border-radius: 70%;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: inline-block;
  overflow: hidden;
}

.img-profile {
  display: inline-block;
  overflow: hidden;
  object-fit: cover;
  width: 10rem;
  height: 10rem;
}
</style>
