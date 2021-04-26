<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">ID</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <span v-if="submitted &&errors.has('username')">ID를 정상적으로 입력해주세요.</span><br>
          </div>
          <div class="form-group">
            <label for="name">이름</label>
            <input
              v-model="user.name"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="name"
            />
                        <span v-if="submitted &&errors.has('name')">이름을 정상적으로 입력해주세요.</span><br>

          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
              ref="password"
              id="password"
            />
                <span v-if="user.password.length<6">여섯자 이상으로 해주세요.</span><br>
                <span v-if="score === 0">보안에 취약한 비밀번호입니다.</span>
                <span v-else-if="score === 2">좋은 비밀번호입니다.</span>
                <span v-else-if="score === 3">완벽해요! 외울수 있죠?</span>
            <passwordMeter :password="user.password" @score="onScore" />
          </div>
          <div class="form-group">
            <label for="passwordConfirm">Password Confirm</label>
            <input
            v-model="passwordConfirm"
              v-validate="'required|confirmed:password'"
              type="password"
              class="form-control"
              name="passwordConfirm"
            />
            <span v-if="passwordConfirm===user.password">일치합니다!!</span>
            <span v-if="passwordConfirm===null"></span>
            <span v-if="(passwordConfirm!==user.password)&&(passwordConfirm!==null)">일치하지 않습니다.</span>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <span class="mr-2"> 아이디가 있으신가요? </span>
      <router-link to="/login">로그인</router-link>
    </div>
  </div>
</template>

<script>
import User from '../models/user';
import passwordMeter from "vue-simple-password-meter";

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: '',
      score: null,
      passwordConfirm:null
    };
  },
  components:{
    passwordMeter 
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    onScore({ score }) {
      this.score = score;
    },
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.$router.push('login');
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>