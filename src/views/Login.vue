<template>
  <div class="main-container" >
    <img alt="Vue logo" src="../assets/images/logo/logo-with-text.png" class="logo">

   <form name="form" @submit.prevent="handleLogin" class="form">
      <div class="box-container">
        <div class="form-fields"><br>
          <label for="username">ID</label>
          <input id="ID"
            class="form-control"
            name="username"
            type="text"
            v-model="user.username"
            v-validate="'required'" 
            placeholder="ID"/>
            <div v-if="errors.has('username')"
            role="alert">
              ID를 입력해주세요!
            </div>
        </div>
        <br><br>
        <div class="form-fields">
          <div>비밀번호</div>
          <input id="password"
            class="form-control" 
            name="password" 
            type="password"
            v-model="user.password"
            v-validate="'required'"
            placeholder="Password"/>
            <div v-if="errors.has('password')"
            role="alert">
              비밀번호를 입력해주세요!
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
      </div>
    <div class="footer">
       <p>Don't have an account? <a href="/join"> Create one now</a></p>
    </div>
    </form>

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
  color: #5882FA;
}  
.logo{
    width: 30%;
    height: 30%;
    position:relative;
    left:35%;
  }
.main-container{
  background-color:#f7f7f7;
  margin-top: 5%;
  width: 30%;
  left:35%;
  position:relative;
  border-radius: 10px;
}
.form{
  width: 80%;
  left: 10%;
  position:relative;
}
</style>
