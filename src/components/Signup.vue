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
          <input id="ID" name="email" type="text" placeholder="아이디">
        </div>
        <br><br>
        <div class="form-fields">
          <div>비밀번호 입력</div>
          <input id="password" name="password" type="text" placeholder="Password">
        </div>
        <div class="form-fields">
          <div>개인정보 내놔!</div>
          <input id="password" name="password" type="text" placeholder="Password">
        </div>
        <br><br>
        <div class="form-fields">
          <v-btn @click="parentSignup">회원가입</v-btn>
        </div>
        <div class="form-fields">
          <v-btn @click="sendToParent">SignIn</v-btn>
        </div>
      </div>
    </form>
  </div>
</template>


<script>

export default {
  name: 'Singup',
  props: {
    msg: String
  },
 data: function() {
    return {
      mode: 'signup'
    }
  },
  components: {
    
  },
  methods:{
    sendToParent(){
      console.log("로그인 여기서");
      this.mode="loginsuc"
      this.$emit('callLogin', 'login');
    },
    parentSignup(){
      console.log("회원가입 여기서");
      this.mode="signup"
      this.$emit('callSignup', 'signup');
    }
  }
}
</script>

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
