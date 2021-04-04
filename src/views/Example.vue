<template>
  <div class="hi">
    <h1>Hello Capstone!</h1>
    <input type="text" v-model="param"/> <br/><br/>
    <button @click="fetchData()">Call API</button> <br/><br/>
    result: {{ num }}
  </div>
</template>

<script>
import axios from 'axios';

export default ({
  data(){
    return{
      param: 0,
      num: ""
    }
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
    }
  },
  created() {
    this.fetchData();
  }
})
</script>

