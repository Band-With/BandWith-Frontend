<template>
  <div class="main-container" align="center" style="margin: auto;
  width: 30%; background-color: #E2A9F3;
    border:2px solid #1bf;
  line-height: 1em;
  border-radius:0.5em;
  -moz-border-radius: 0.5em;
  -webkit-border-radius: 0.5em;" >
    <br><br><br>
    <form style="width:300px; background-color: #BF00FF">
      <div class="box-container">
        <div class="form-fields"><br>
          <div>아이디 입력</div>
          <input id="ID" name="email" type="text" placeholder="Email Address">
        </div>
        <br><br>
        <div class="form-fields">
          <div>비밀번호 입력</div>
          <input id="password" name="password" type="text" placeholder="Password">
        </div>
        <br><br>
        <div class="form-fields">
          <router-link to="/login-success" tag="button">SignIn</router-link>
        </div>
        <br><br>
        <div class="login-choice"><span>or Sign In with</span></div>
                <br><br>
        <SocialLogin />
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
import SocialLogin from '@/components/SocialLogin'

export default {
  name: 'Login',
  props: {
    msg: String
  },
  components: {
    SocialLogin
  },
  methods: {

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
