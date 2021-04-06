<template>
  <div>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    
    <nav style="border-color:#1C1C1C; border-width: 10px;">
      <label for="btn" class="button">kimdj1026님<span class="fas fa-caret-down"></span>
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
              <li><a href="#">마이페이지</a></li>
              <li><a href="#">로그아웃</a></li>
              </ul>
              </nav>
    </div>  
</template>

<script>
export default {
  name: 'bandwith-header',
  props: {
    user: Object
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
  position: absolute;
  left: 90%;
  transform: translate(-50%, -50%);
  background: #F2F2F2;
  width: 200px;
  line-height: 40px;
  padding: 8px 25px;
  border-radius: 30px;
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
  top: 75px;
  left: 0;
  width: 100%;
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

</style>