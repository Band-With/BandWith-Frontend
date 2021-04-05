<template>
  <div class="main-container">
    <link rel="stylesheet" href="https://unpkg.com/@trevoreyre/autocomplete-js/dist/style.css"/>
  <autocomplete :search="search" placeholder="Search for a country" aria-label="Search for a country"  style="width:20%; position:absolute; left:40%; margin-top:10px;margin-bottom:10px;"></autocomplete> 
  <br>
  <img src="../assets/e.png" style="width:60%; height:40%; position:absolute; left:20%; top:20%;">
  <div style="border-top:5px solid #A4A4A4; margin-top:500px; margin-bottom:10px">
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
