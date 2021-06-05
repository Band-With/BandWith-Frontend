<template>
  <div class="d-flex flex-column align-items-center">
    <router-link to="/" class="mt-5 mb-3">
      <img
        alt="Vue logo"
        src="@/assets/images/logo/logo-with-text.png"
        class="logo"
      />
    </router-link>
    <div>
      <form name="form" @submit.prevent="handleLogin" class="form mb-4">
        <div class="box-container">
          <div class="form-fields mb-2">
            <label for="username">ID</label>
            <input
              id="ID"
              class="form-control"
              name="username"
              type="text"
              v-model="user.username"
              v-validate="'required'"
              placeholder="ID"
            />
            <div
              v-if="errors.has('username')"
              role="alert"
              style="font-size: .8rem; color: #808080"
            >
              ID를 입력해주세요!
            </div>
          </div>
          <div class="form-fields mb-4">
            <label for="password">비밀번호</label>
            <input
              id="password"
              class="form-control"
              name="password"
              type="password"
              v-model="user.password"
              v-validate="'required'"
              placeholder="Password"
            />
            <div
              v-if="errors.has('password')"
              role="alert"
              style="font-size: .8rem; color: #808080"
            >
              비밀번호를 입력해주세요!
            </div>
          </div>
          <div class="form-fields">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm mr-3"
              ></span>
              <span>로그인</span>
            </button>
          </div>
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
      <div class="signup-section">
        <p>
          계정이 없으신가요?
          <router-link to="/join"> 새 계정 만들기</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "Login",
  props: {
    msg: String,
  },
  data() {
    return {
      user: new User("", "", ""),
      loading: false,
      message: "",
    };
  },
  components: {},
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              console.log("router push");
              this.$router.push("/profile");
            },
            (error) => {
              this.loading = false;
              if (error.response.status == 403) this.message = "로그인에 실패하였습니다.";
              else {
                this.message =
                  (error.response && error.response.data) ||
                  error.messages ||
                  error.toString();
              }
            }
          );
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #5882fa;
}
.logo {
  width: 90px;
  height: 90px;
}
.main-container {
  background-color: #f7f7f7;
  margin-top: 5%;
  width: 30%;
  left: 35%;
  position: relative;
  border-radius: 10px;
}
.form {
  border: 1px solid #eaecef;
  border-radius: 5px;
  background: #f6f8fa;
  top: 5px;
  padding: 20px;
  width: 300px;
  height: fit-content;
  margin: 0 auto;
}
.signup-section {
  padding: 15px 20px;
  width: 300px;
  height: 50px;
  background: white;
  text-align: center;
  border: 1px solid #d1d5da;
  border-radius: 5px;

  top: 30px;
  color: black;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 10.3pt;
}
</style>
