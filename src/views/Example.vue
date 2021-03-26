<template>
  <div class="hi">
    안녕하세염!
  </div>
</template>

<script>
import axios from 'axios';

export default ({
  methods: {
    fetchData() {
        axios.get('/api/testAPI', {
          params: { param: 13 },
          timeout: 1000  
        })
        .then(res => {
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

