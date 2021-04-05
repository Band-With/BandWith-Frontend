<template>
  <div class="home">
      <div style="width:100%;overflow:auto; border-bottom:5px solid #A4A4A4; margin-bottom:5px; display:table;">
        <div style="position: relative; left:10px; float:left; padding:2px">
          <img src="../assets/logo.png" style="float:left">
        </div>
        <badger-accordion style="position:relative; width:20%; float:right;">
          <badger-accordion-item>
            <template slot="header">로그인 부탁드립니다</template>
            <template slot="content"><div><button>마이페이지</button><br><button>회원정보 수정</button><br><button>로그아웃</button><br></div></template><br>
          </badger-accordion-item>
        </badger-accordion>
        <div style="width:9%;float:right;display:table-cell; vertical-align:middle; padding-top:15px;">
          밴드 둘러보기
        </div>
      </div>
      <div v-if="mode==='login'">
        <Login @callLogin="login" @callSignup="signup"/>
      </div>
      <div v-else-if="mode==='loginsuc'">
        <LoginSuccess msg="" />
      </div>
      <div v-else-if="mode==='signup'">
        <Signup @callLogin="login" @callSignup="signup" msg="" />
      </div>
        <div v-else>
        <Find msg="" />
      </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Login from '@/components/Login.vue'
  import LoginSuccess from '@/components/LoginSuccess.vue'
  import Find from '@/components/Find.vue'
  import Signup from '@/components/Signup.vue'



  import {
    BadgerAccordion,
    BadgerAccordionItem
  } from 'vue-badger-accordion'

  export default {
    name: 'Home',
    data: function() {
    return {
      mode: 'login'
      }
    },
    components: {
      Login,
      BadgerAccordion,
      BadgerAccordionItem,
      Find,
      LoginSuccess,
      Signup
    },
    methods: {
    login(mode) {
        this.mode = mode;
        console.log(mode);
      },
    signup(mode) {
        this.mode = mode;
        console.log(mode);
      }
    }
  }
</script>

<style type="text/css">
  body {}

  img {
    height: 90px;
    border-style: none;
  }
</style>