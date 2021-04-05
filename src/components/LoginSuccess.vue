<template>
  <div class="main-container">
    <link rel="stylesheet" href="https://unpkg.com/@trevoreyre/autocomplete-js/dist/style.css"/>
  <autocomplete :search="search" placeholder="Search for a country" aria-label="Search for a country"  style="width:20%; position:absolute; left:40%; margin-top:10px;margin-bottom:10px;"></autocomplete> 
  <br>
  <img src="../assets/e.png" style="width:60%; height:40%; position:absolute; left:20%; top:20%;">
  <div style="border-top:5px solid #A4A4A4; margin-top:500px;">
  </div>
  
  
   </div>
</template>


<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'

export default {
  name: 'LoginSuccess',
  props: {
    msg: String
  },
 data: function() {
    return {
    }
  },
  components: {
      Autocomplete
  },
  methods:{
  }
}
</script>
