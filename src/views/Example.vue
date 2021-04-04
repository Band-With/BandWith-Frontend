<template>
  <div class="hi">
    안녕! {{ num }}
  </div>
</template>

<script>
import axios from 'axios';

export default ({
  data(){
    return{
      num: ""
    }
  },
  methods: {
    fetchData() {
        axios.get('http://3.133.139.224:8080/testAPI', {
          params: { param: 13 },
          timeout: 1000  
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

