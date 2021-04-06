<template>
  <div class="main-container">
    <link rel="stylesheet" href="https://unpkg.com/@trevoreyre/autocomplete-js/dist/style.css"/>
  <autocomplete :search="search" placeholder="노래 검색" aria-label="Search for a country" class="autocomplete"></autocomplete> 
  <br>
  <img class="main-banner" src="../assets/e.png">
  <div class="main">
  </div>
  <div style="overflow:auto;">
    <div style="width:50%; float:left; text-align:center;">
      <div style="margin-bottom:10px;font-size:20px">이달의 연주자</div>
      <div style="padding=3px;width:33%; float:left;">
        <img src="../assets/suzy.jpg" style="border-radius: 50%; width:40%;object-fit: cover;">
        <div> 수지 </div>
      </div>
      <div style="padding=3px;width:33%; float:left;"><img src="../assets/mingue.jpg" style="border-radius: 50%; width:40%;object-fit: cover;">
              <div> 민규 </div></div>
      <div style="padding=3px;width:33%; float:left;"><img src="../assets/dongju.jpg" style="border-radius: 50%; width:40%;object-fit: cover;">        <div> 동주 </div>
</div>
    </div>
    <div style="width:50%; float:left; text-align:center;">
      <div style="margin-bottom:10px;font-size:20px">이달의 밴드</div>
      <div style="padding=3px;width:33%; float:left;"><img src="../assets/band.jpg" style="border-radius: 50%; width:40%;object-fit: cover;">        <div> 진원밴드 </div>
</div>
      <div style="padding=3px;width:33%; float:left;"><img src="../assets/band.jpg" style="border-radius: 50%; width:40%;object-fit: cover;">        <div> 진원밴드 </div>
</div>
      <div style="padding=3px;width:33%; float:left;"><img src="../assets/band.jpg" style="border-radius: 50%; width:40%;object-fit: cover;">        <div> 진원밴드 </div>
</div>
    </div>
  </div>
</div>
</template>


<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'

export default {
  name: 'Profile',
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

<style scoped>
.autocomplete{
  width:20%;
  position:relative;
  left:40%;
  margin-top:10px;
}

.main-banner{
  width:60%;
  height:40%;
  position:relative;
  left:20%;
}
.main{
  border-top:5px solid #A4A4A4;
  margin-top:10px;
  margin-bottom:10px
}
</style>
