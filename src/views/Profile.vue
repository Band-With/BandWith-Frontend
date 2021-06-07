
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

.card{
  display: flex;
  flex-direction: row;
  height: 300px;
  width: 400px; 
  border-radius: 20px; 
  padding: 100px 50px 100px 50px; 
  font-weight: 700;
  color: #fff;
  font-size: 36px;
}
</style>


<template>
  <div class="d-flex flex-column position-relative" style="top:60px;">
    <div class="d-flex position-absolute w-100" style="background-color: #768EE3; height: 595px; z-index: -1">
    </div>
    
    <div id="main" style="margin-bottom: 175px">
      <div class="d-flex justify-content-between align-items-center" style="margin-left: 110px; margin-right: 110px">
        <div class="d-flex flex-column justify-content-center" style="height: 595px;">
            <span style="color: #fff; font-size: 48px; font-weight: 900">Band With</span>
            <span class="mb-2" style="color: #fff; font-size: 36px; font-weight: 500">가상 합주 플랫폼</span>
            <span style="color: #fff; font-size: 18px; font-weight: 100">자신의 음악을 녹음하고</span>
            <span class="mb-4" style="color: #fff; font-size: 18px; font-weight: 100">밴드를 만들어 즐깁니다</span>
            
            <form id="search-input-wrapper" class="d-flex align-items-center">
              <input name="q" id="search-input" placeholder="검색어를 입력하세요." />
              <button @click="submit" id="search-button"></button>
            </form>
        </div>
        <div>
          <img style="width: 330px; height: 250px" src="@/assets/images/home/main_panel.png"/>
        </div>
      </div>

      <div class="d-flex flex-column justify-content-center" style="padding-left: 110px; padding-right: 110px; margin-top: 110px; margin-bottom: 240px">
        <div class="d-flex flex-column" style="margin-bottom: 80px">
          <span style="font-size: 36px; font-weight: 700; padding-bottom: 13px">이달의 밴드</span>

          <div class="position-relative">   
            <div class="position-absolute d-flex flex-column" style="width: fit-content">
              <span style="font-size: 14px; font-weight: 300; color: #A1A1A1">이번달에 HOT했던 밴드를 구경해보세요</span>
              <span style="font-size: 14px; font-weight: 300; color: #A1A1A1">이달의 밴드는 이번달에 좋아요를 가장 많이 받은 밴드입니다</span>
            </div> 

            <div class="d-flex justify-content-between align-items-end">
              <div class="d-flex flex-column"> 
                <img :src="imgPreUrl + monthlyband[0].img"  style="width:180px; height:180px; box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%);" />
                <span class="text-center py-3" style="font-size: 18px; font-weight:400; color: #444">{{monthlyband[0].bandName}}</span>
              </div>
              <div class="d-flex flex-column">
                <img :src="imgPreUrl + monthlyband[1].img" style="width:180px; height:180px; box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%);" />
                <span class="text-center py-3" style="font-size: 18px; font-weight:300; color: #444">{{monthlyband[1].bandName}}</span>
              </div>
              <div class="d-flex flex-column">
                <img :src="imgPreUrl + monthlyband[2].img" style="width:290px; height:290px; box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%);" />
                <span class="text-center py-3" style="font-size: 18px; font-weight:300; color: #444">{{monthlyband[2].bandName}}</span>
              </div>
              <div class="d-flex flex-column">
                <img :src="imgPreUrl + monthlyband[3].img" style="width:290px; height:290px; box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%);" />
                <span class="text-center py-3" style="font-size: 18px; font-weight:300; color: #333">{{monthlyband[3].bandName}}</span>
              </div>
            </div>

          </div>
        </div>

        <span class="position-relative" style="margin-bottom: 160px"></span>
        <hr class="position-absolute" style="border-top: 1px solid #D1D1D1; width: 70%; right: 0px">
        <hr class="position-absolute" style="border-top: 3px solid #000; width: 220px">

        <div class="d-flex flex-column">
          <span class="align-self-end" style="font-size: 36px; font-weight: 700; padding-bottom: 15px">이달의 연주자</span>
          <div class="d-flex flex-column align-self-end" style="margin-bottom: 70px">
            <span class="text-right" style="font-size: 14px; font-weight: 300; color: #A1A1A1">이번달에 HOT했던 연주자를 구경해보세요</span>
            <span style="font-size: 14px; font-weight: 300; color: #A1A1A1">이달의 연주자는 이번달에 좋아요를 가장 많이 받은 연주자입니다</span>
          </div>

          <div class="d-flex justify-content-between align-items-end">
            <div class="d-flex flex-column">
              <img :src="monthlyMember[0].profile" style="width:180px; height:180px; box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%);" />
              <span class="text-center py-3" style="font-size: 18px; font-weight:400; color: #444">{{this.monthlyMember[0].username}}</span>
            </div>
            <div class="d-flex flex-column">
              <img :src="monthlyMember[1].profile" style="width:180px; height:180px; box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%);" />
              <span class="text-center py-3" style="font-size: 18px; font-weight:300; color: #444">{{this.monthlyMember[1].username}}</span>
            </div>
            <div class="d-flex flex-column">
              <img :src="monthlyMember[2].profile" style="width:180px; height:180px; box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%);" />
              <span class="text-center py-3" style="font-size: 18px; font-weight:300; color: #444">{{this.monthlyMember[2].username}}</span>
            </div>
            <div class="d-flex flex-column">
              <img :src="monthlyMember[3].profile" style="width:180px; height:180px; box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%);" />
              <span class="text-center py-3" style="font-size: 18px; font-weight:300; color: #333">{{this.monthlyMember[3].username}}</span>
            </div>
            <div class="d-flex flex-column">
              <img :src="monthlyMember[4].profile" style="width:180px; height:180px; box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%);" />
              <span class="text-center py-3" style="font-size: 18px; font-weight:300; color: #333">{{this.monthlyMember[4].username}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex flex-column">
        <span style="font-size: 14px; font-weight: 100; color: #323232">About</span>
        <span class="d-flex flex-column" style="font-size: 36px; font-weight: 700; margin-bottom: 15px">
          <span>Band With는</span>
          <span>어떤 플랫폼인가요?</span>
        </span>
        <span class="d-flex flex-column" style="font-size: 18px; font-weight:300; color: #999; margin-bottom: 25px">
          <span>Band with는 누구나 즐길 수 있는 가상 연주 플랫폼입니다.</span>
          <span>대면활동이 힘든 요즘 같은 시기에 부담없이 합주를 즐겨보세요.</span>
          <span>지금 바로 연주를 녹음해보세요!</span>
        </span>
        <span><router-link :to="{ name: 'search-music', query: { q: '' , filter: 'rel'}}">연주 녹음하러 가기→</router-link></span>
      </div>

      <div class="position-relative" style="margin-bottom: 85px"></div>

      <div class="position-absolute d-flex justify-content-between" style="width: 1280px">
        <div class="card" style="background-color: #FAB90E">
          <img style="width: 40px; height: 40px; margin-right: 15px" src="@/assets/images/icon/heart.png"/>
          <span>Enjoy<br> Your Time</span>
        </div>
        <div class="card" style="background-color: #17C893">
          <img style="width: 40px; height: 40px; margin-right: 15px" src="@/assets/images/icon/commu.png"/>
          <span>Communicate With Others</span>
       </div>
        <div class="card" style="background-color: #BB62DA">
          <img style="width: 40px; height: 40px; margin-right: 15px" src="@/assets/images/icon/dream.png"/>
          <span>Beyond<br> Your Dream</span>
        </div>
      </div>
    </div> <!--main-->



    <div class="d-flex justify-content-center" style="margin-bottom: 270px; height: 2350px; background-color: #0D0E14; z-index:-2">     <!--검은 배경-->
      <div style="width: 1320px; padding: 345px 130px 275px">               
        
        <div class="position-relative"  style="color: #FFF">                                         <!--안에 내용물-->
          <div class="d-flex flex-column">                                            <!--text-->
            <span style="font-size: 14px; font-weight: 100">About</span>
            <span class="d-flex flex-column" style="font-size: 36px; font-weight: 700; margin-bottom: 20px">
              <span>Band With에서는</span>
              <span>어떤 일을 할 수 있나요?</span>
            </span>
            <span class="d-flex flex-column" style="font-size: 14px; font-weight:500; margin-bottom: 25px">
              <span>Band with를 이용한다면</span>
              <span>다음과 같은 서비스를 누릴 수 있어요</span>
            </span>
          </div>


          <div class="position-absolute" style="right:0px; top: 25px">
            <img src="@/assets/images/home/main_recording.png"/>
            <span class="position-relative d-flex flex-column" style="right: -10px; top: -45px">
              <span style="font-weight: 700; font-size: 64px">01</span>
              <span style="font-weight: 700; font-size: 36px; margin-bottom: 15px">연주를 녹음하고 공유하세요</span>
              <span style="font-weight: 300; font-size: 18px">
                녹음된 연주는 다른 연주자들이 들어볼 수 있어요<br>
                피드백을 주고 받을 수 있고 연습 내용을 관리할 수 있어요<br>
                원한다면 언제든 비공개로 전환할 수 있어요
              </span>
            </span>
          </div>

          <div class="position-absolute" style="left:0px; top: 400px">
            <img src="@/assets/images/home/main_band.png"/>
            <span class="position-relative d-flex flex-column text-right" style="left: -10px; top: -65px">
              <span style="font-weight: 700; font-size: 64px">02</span>
              <span style="font-weight: 700; font-size: 36px; margin-bottom: 15px">밴드를 만들어보세요</span>
              <span style="font-weight: 300; font-size: 18px">
                녹음된 연주는 다른 연주자들이 들어볼 수 있어요<br>
                원한다면 언제든 비공개로 전환할 수 있어요
              </span>
            </span>
          </div>

          <div class="position-absolute d-flex flex-row-reverse" style="right:0px; top: 740px">
            <img src="@/assets/images/home/main_orchestra.png"/>
            <span class="position-relative d-flex flex-column text-right align-self-end" style="left: 30px">
              <span style="font-weight: 700; font-size: 64px">03</span>
              <span style="font-weight: 700; font-size: 36px; margin-bottom: 15px">남들과 합주해보세요</span>
              <span style="font-weight: 300; font-size: 18px">
                공유된 사용자들의 연주는 합주에 사용할 수 있어요<br>
                사용자들이 공유한 연주에 내 연주를 더해<br>
                나만의 멋진 합주를 완성해보세요
              </span>
            </span>
          </div>

          <div class="position-absolute d-flex" style="left:0px; top: 1370px">
            <img src="@/assets/images/home/main_handshake.png"/>
            <span class="position-relative d-flex flex-column align-self-end" style="left: -10px">
              <span style="font-weight: 700; font-size: 64px">04</span>
              <span style="font-weight: 700; font-size: 36px; margin-bottom: 15px">좋은 인연을 만드세요</span>
              <span style="font-weight: 300; font-size: 18px">
                공유된 사용자들의 연주는 합주에 사용할 수 있어요<br>
                사용자들이 공유한 연주에 내 연주를 더해<br>
                나만의 멋진 합주를 완성해보세요
              </span>
            </span>
          </div>
        </div>
      </div>
    </div> <!--검은 배경-->

    <div class="d-flex flex-column align-items-center">
      <div class="d-flex flex-column mb-5" style="width: 1320px; padding-left: 130px; padding-right: 130px">
        <span class="text-center" style="font-size: 36px; padding-bottom: 96px; font-weight: 700">Band With 개발자</span>
        <span class="d-flex justify-content-between mb-5">
          <div class="d-flex flex-column">
            <img style="height: 290px; width: 290px" src="@/assets/images/dongju.jpg"/>
            <span class="pt-3 pb-1" style="font-size: 24px; font-weight: 500">김동주</span>
            <span style="color: #656565; font-size: 14px; font-weight: 300">dongju@naver.com</span>
          </div>
          <div class="d-flex flex-column">
            <img style="height: 290px; width: 290px" src="@/assets/images/suzy.jpg"/>
            <span class="pt-3 pb-1" style="font-size: 24px; font-weight: 500">박경민</span>
            <span style="color: #656565; font-size: 14px; font-weight: 300">kiio@naver.com</span>
          </div>          
          <div class="d-flex flex-column">
            <img style="height: 290px; width: 290px" src="@/assets/images/jeongjae.jpg"/>
            <span class="pt-3 pb-1" style="font-size: 24px; font-weight: 500">이정재</span>
            <span style="color: #656565; font-size: 14px; font-weight: 300">2wjdwo97@gmail.com</span>
          </div>
        </span>
      </div>
      <footer style="width: 100%; height: 110px; background-color: #efefef">

      </footer>
    </div>
  </div>
</template>

<script>
import MonthService from "@/services/monthly.service";


export default {
  name: "Profile",
  props: {
    msg: String,
  },
  data: function() {
    return {
      content: "",
      searched: "",
      monthlyband:[],
      monthlyMember:[],
      imgPreUrl: "data:image/jpeg;base64,",
    };
  },
  mounted() {
         MonthService.monthlyBand().then(
                response => {
                      this.monthlyband=response.data;
                      console.log(this.monthlyband)
                },
                error => {
                  console.log(error);
                  
                }
            );
         MonthService.monthlyMember().then(
                response => {
                      this.monthlyMember = response.data;
                },
                error => {
                  console.log(error);
                }
            );
 },
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
