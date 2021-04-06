<template>
  <div class="main-container" align="center" style="margin: auto;
  width: 30%; background-color: #E2A9F3;
    border:2px solid #1bf;
  line-height: 1em;
  border-radius:0.5em;
  -moz-border-radius: 0.5em;
  -webkit-border-radius: 0.5em;" >
    <br><br><br>
    <form name="form" @submit.prevent="handleLogin" style="width:300px; background-color: #BF00FF">
      <div class="box-container">
        <div class="form-fields"><br>
          <label for="username">아이디 입력</label>
          <input id="ID"
            class="form-control"
            name="username"
            type="text"
            v-model="user.username"
            v-validate="'required'" 
            placeholder="Username"/>
            <div v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert">
              Username is required!
            </div>
        </div>
        <br><br>
        <div class="form-fields">
          <div>비밀번호 입력</div>
          <input id="password"
            class="form-control" 
            name="password" 
            type="password"
            v-model="user.password"
            v-validate="'required'"
            placeholder="Password"/>
            <div v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert">
              Password is required!
            </div>
        </div>
        <br><br>
        <div class="form-fields">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>SignIn</span>
          </button>
        </div>
        <div v-if="message" class="alert alert-danger" role="alert">
          {{message}}
        </div>
        <br><br>
        <div class="login-choice"><span>or Sign In with</span></div>
                <br><br>
      </div>
              <br><br>
    </form>
    <div class="footer">
       <p>Don't have an account? <a href="/join"> Create one now</a></p>
    </div>
            <br><br>
  </div>
</template>


<script>
import User from '../models/user';

export default {
  name: 'Login',
  props: {
    msg: String
  },
  data() {
    return {
      user: new User('', '', ''),
      loading: false,
      message: ''
    };
  },
  components: {
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if(this.loggedIn){
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return ;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message = 
                (error.response && error.response.data) ||
                error.messages ||
                error.toString();
            }
          );
        }
      });
    }
  }
}
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
  color: #BF00FF;
}
</style>
