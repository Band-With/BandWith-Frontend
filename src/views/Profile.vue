
<style scoped>
#search-input-wrapper {
  width: 420px;
  height: 40px;
  border-radius: 25px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px #aaa;
}
#search-input {
  width: 80%;
  height: 100%;
  margin: 20px;
  border: none;
}
#search-input:focus {
  outline: none;
}
#search-button {
  width: 25px;
  height: 25px;
  border: none;
  cursor: pointer;
  background: no-repeat center/100% url("../assets/images/icon/search_icon.png");
}
.main-container {
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}

#main {
  width: 1320px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
  z-index: -1;
}

#main-image-2{
  height: 370px; 
  width: 370px; 
  border-radius: 5px;
  box-shadow: 0px 8px 18px 8px rgb(0 0 0 / 50%);
}

.hooper-slide.is-current {
  transform: scale(1.3);
}
.hooper-slide.is-current {
  transform: scale(1.3);
}

.images {
  height: 50vh;
  width: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}

.hooper {
  height: 70vh;
}
.font {
  font-family: "Nanum Brush Script", cursive;
  font-size: 30px;
  margin-left: 100px;
  color: #000000;
}
</style>


<template>
  <div class="d-flex position-relative" style="top:60px;">
    <div class="d-flex position-absolute w-100" style="background-color: #81AE9D; height: 500px; z-index: -1">
      <div class="d-flex align-items-center justify-content-center w-100" style="flex: auto">
      </div>
      <div style="margin-left: auto; background-color: #EA9F3E">
        <img style="height: 500px; width: 500px;" src="@/assets/images/home/main_2.png"/>
      </div>
    </div>
    
    <div id="main">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex flex-column justify-content-center" style="height: 500px;">
            <span style="color: #fff; font-size: 48px; font-weight: 900">Band With</span>
            <span class="mb-2" style="color: #fff; font-size: 36px; font-weight: 500">가상 합주 플랫폼</span>
            <span style="color: #fff; font-size: 18px; font-weight: 100">동해물과 백두산이 마르고 닳도록 하느님이</span>
            <span class="mb-4" style="color: #fff; font-size: 18px; font-weight: 100">보우하사 우리나라 만세</span>
            
            <form id="search-input-wrapper" class="d-flex align-items-center">
              <input name="q" id="search-input" placeholder="검색어를 입력하세요." />
              <button @click="submit" id="search-button"></button>
            </form>
        </div>
        <img id="main-image-2" src="@/assets/images/home/main_1.png"/>
      </div>

      <hr width="620" style="margin-top: 100px">

      <div class="d-flex flex-column justify-content-center" style="padding-left: 220px; padding-right: 220px; margin-top: 60px; margin-bottom: 100px">
        <div class="d-flex flex-column" style="margin-bottom: 110px">
          <span class="align-self-center" style="font-size: 36px; font-weight: 700; padding-bottom: 15px">이달의 연주자</span>
          <span class="align-self-center" style="font-size: 14px; font-weight: 300; color: #A1A1A1; margin-bottom: 50px">이번달에 HOT했던 연주자를 구경해보세요</span>
          <div class="d-flex justify-content-between">
            <img src="../assets/images/band.jpg" style="width:180px; height:180px;" />
            <img src="../assets/images/dongju.jpg" style="width:180px; height:180px;" />
            <img src="../assets/images/suzy.jpg" style="width:180px; height:180px;" />
            <img src="../assets/images/IU.jpg" style="width:180px; height:180px;" />
          </div>
        </div>

        <div class="d-flex flex-column">
          <span class="align-self-center" style="font-size: 36px; font-weight: 700; padding-bottom: 15px">이달의 밴드</span>
          <span class="align-self-center" style="font-size: 14px; font-weight: 300; color: #A1A1A1; margin-bottom: 50px">이번달에 HOT했던 밴드를 구경해보세요</span>
          <div class="d-flex justify-content-between">
            <img src="../assets/images/band.jpg" style="width:180px; height:180px;" />
            <img src="../assets/images/dongju.jpg" style="width:180px; height:180px;" />
            <img src="../assets/images/suzy.jpg" style="width:180px; height:180px;" />
            <img src="../assets/images/IU.jpg" style="width:180px; height:180px;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: {
    msg: String,
  },
  data: function() {
    return {
      content: "",
      searched: "",
    };
  },
  mounted() {},
  methods: {
    submit(e) {
      e.preventDefault();
      this.searched = document.getElementById("search-input").value;
      this.$router.push({
        name: "search-music",
        query: { q: this.searched, filter: "rel" },
      });
    },
  },
  components: {
  },
};
</script>
