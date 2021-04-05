<style>
  .logo{
    width: 550px;
    height: 550px;
  }

  .banner{
    flex: auto;
    height: 600px;
    background-color: #FFF500;
  }

  .main-search{
    height: 110px;
  }

  .search-input-wrapper{
    width: 450px;
    height: 50px;
    border-radius: 30px;
    box-shadow: 0px 3px 7px #aaa;
  }
  .search-input{
    width: 400px;
    height: 45px;
    border: none;
    border-radius: 30px;
    padding-left: 30px;
  }
  .search-input:focus{
    outline: none;
  }
  .search-button{
    width: 22px;
    height: 23px;
    border: none;
    cursor: pointer;
    background: no-repeat center/100% url("../assets/images/srch_ico.png");
  }
  .search-button:focus{
    outline: none;
  }
</style>

<template>
  <div class="home">
    <div class="main-search d-flex align-items-center justify-content-center">
      <div class="search-input-wrapper d-flex align-items-center position-relative">
        <input class="search-input" type="text" v-model="param" @keyup.enter="fetchData()"
        placeholder="You can call test api. Enter any integer number.">
        <button class="search-button" @click="fetchData()"></button>

        <div class="position-absolute ml-3" style="">
          result: {{num}}<br/>
          (input_num * 2 + 2)<br/>
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
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'me',
  components: {
  },
  data() {
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

