<template>
  <div style="height: 30px">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    
    <nav id="nav" style="border-color:#1C1C1C; border-width: 10px;">
      <label for="btn" class="button">
        <img v-if="user.profileImg !== null" class="circle-shape" style="height:30px; width:30px; border: 1px solid #000" :src="imgPreUrl + user.profileImg">
        <img v-else class="circle-shape" style="height:30px; width:30px; border: 1px solid #000" src="../assets/images/profile.jpg">
      </label>
      <input type="checkbox" id="btn">
      <ul class="menu">
        <li><a href="#">메인화면</a></li>
        <li>
          <label for="btn-2" class="first">회원정보 수정
            <span class="fas fa-caret-down"></span>
          </label>
          <input type="checkbox" id="btn-2">
          <ul>
            <li><a href="#">비밀번호 변경</a></li>
          </ul>
        </li>
        <li>
          <label for="btn-3" class="second">둘러보기
            <span class="fas fa-caret-down"></span>
          </label>
          <input type="checkbox" id="btn-3">
          <ul>
            <li><a href="#">밴드 둘러보기</a></li>
            <li><a href="#">노래 둘러보기</a></li>
          </ul>
        </li>
        <li><router-link :to="{ name: 'prac', params: { username: user.username }}">마이페이지</router-link></li>
        <li><button @click="handleLogout">로그아웃</button></li>
      </ul>
    </nav>
  </div>  
</template>

<script>
export default {
  name: 'bandwith-header',
  data() {
    return{
      imgPreUrl: "data:image/jpeg;base64,",
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login');
    }
  },
  computed: {
		user() {
			return JSON.parse(localStorage.getItem('user'));
		}
  },
  mounted(){
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://code.jquery.com/jquery-3.4.1.js')
      document.head.appendChild(recaptchaScript)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
  font-family: 'Poppins', sans-serif;
}
nav{
  position: relative;
}
nav label{
  color: #1b1b1b;
  font-size: 15px;
  font-weight: 500;
  display: block;
  cursor: pointer;
}
.button span{
  float: right;
  line-height: 40px;
  transition: 0.5s;
}
.button span.rotate{
  transform: rotate(-180deg);
}
nav ul{
  position: absolute;
  background: #F2F2F2;
  list-style: none;
  top: 50px;
  left: -145px;
  width: 190px;
  border-radius: 5px;
  display: none;
}
[id^=btn]:checked + ul{
  display: block;
}
nav .menu:before{
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  background: #F2F2F2;
  right: 20px;
  top: -10px;
  transform: rotate(45deg);
  z-index: -1;
}
nav ul li{
  line-height: 40px;
  padding: 8px 20px;
  cursor: pointer;
  border-color: #1b1b1b;
  border-width:3px;
}
nav ul li label{
  font-size: 18px;
}
nav ul li a{
  color: #1b1b1b;
  text-decoration: none;
  font-size: 18px;
  display: block;
}

nav ul li button{
  border: none;
}

nav ul li button:hover,
nav ul li a:hover,
nav ul li label:hover{
  color: cyan;
}
nav ul ul{
  position: static;
}
nav ul ul li{
  line-height: 30px;
  padding-left: 30px;
  border-bottom: none;
}
nav ul ul li a{
  color: #1b1b1b;
  font-size: 17px;
}
nav ul li span{
  font-size: 20px;
  float: right;
  margin-top: 10px;
  padding: 0 10px;
  transition: 0.5s;
}
nav ul li span.rotate{
  transform: rotate(-180deg);
}
input{
  display: none;
}
.circle-shape{
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>