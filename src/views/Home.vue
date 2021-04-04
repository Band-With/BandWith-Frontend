<template>
  <div class="home">
<<<<<<< HEAD
    <div class="main-search d-flex align-items-center justify-content-center">
      <div class="search-input-wrapper d-flex align-items-center position-relative">
        <input class="search-input" type="text" v-model="param" @keyup.enter="fetchData()"
        placeholder="You can call test api. Enter any integer number.">
        <button class="search-button" @click="fetchData()"></button>

        <div class="position-absolute ml-3" style="">
          result: {{num}}<br/>
          (input_num * 2 + 2)<br/>
          {{ test }}<br/>
          {{ test2 }}
        </div>
      </div>
    </div>
    <div class="banner d-flex align-items-center justify-content-center position-relative">
      <div class="position-relative">
        <div class="position-absolute" style="right: -10px">
          <h1>This is a test page.</h1>
        </div>
        <img alt="Vue logo" src="../assets/images/logo-with-text.png" class="logo">
      </div>
    </div>
    <div>
      <Login msg=""/>
    </div>
=======
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome o Your Vue.js App"/>
>>>>>>> feature/cors-proxy
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'me',
  components: {
    Login
  },
  data(){
    return{
      param: "",
      num: ""
    }
  },
  computed: {
  },
  methods: {
    fetchData() {
        axios.get('http://3.133.139.224:8080/testAPI', {
          params: { param: this.param },
          timeout: 2000  
        })
        .then(res => {
          this.num = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    test(){
      this.$store.dispatch('test');
    }
  },
  created() {
    this.fetchData();
    this.test();
  }
}
</script>

<style type="text/css">
img {
  height:90px;
  border-style: none;
}
</style>

