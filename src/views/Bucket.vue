<style scoped>
    .main{
        padding-left: 30px;
        padding-right: 30px;
        margin: 0 auto 30px;
        margin-top: 100px;
        float:left;
    }
    .audio{
        width:300px;
        height:100px;
        float:left;
    }
    input[type="text"] { 
    border: solid 2px #5882FA; border-radius: 2px;
    }

.textInput{
    font-size:11px;
    background-color:#0B173B;
    color:#FFFFFF; 
    display: flex; 
    align-items:center;
    text-align : right;
    width:50px;
    height:70px;
    margin:3px;
}
.timeInput{
    font-size:9px;
    background-color:#0B173B;
    color:#FFFFFF; 
    display: flex; 
    align-items:center;
    text-align : right;
    width:30px;
    height:70px;
    margin:3px;
}
    .img-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 70%;
  overflow: hidden;
  margin:5px;
}

.img-profile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
input[type=range] {
	width: 20px;
	height: 40px;
	-webkit-appearance: slider-vertical;
    background-color: #FE2E64;
    
}

</style>


<template>
    <div style="width:100vw; min-height: 100vh; background-color: #fafafa;">
        <div class='row' style="height:30vh; justify-content:center; ">
            <div class='col-md-1'>
            </div>
            <div class="col-md-2" style="height:50vh;  margin-top:100px; float:left;">
                <div style="position:absolute; width:150px; height:150px; z-index:10; left:-25%;">
                    <div style="float:left;">
                    <img style="border-radius:20px;" :src="musicInfo.img" class="w-100 h-100"/>
                    </div>
                </div>
                <div style="position:absolute; width:250px; height:150px; z-index:10; left:35%;">
                    <span style="color: #000; font-size: 25px; font-weight: bold; z-index:11;">{{ musicInfo.title }}</span><br>
                    <span style="color: #000; font-size: 18px; font-weight: lighter; z-index:11;">   {{ musicInfo.singer }} {{ musicInfo.composer }}</span>
                </div>
            </div>
            <div class='col-md-4' style="height:50vh; float:left;  margin-top:100px;">
                <div v-for="record in cart" v-bind:key="record" style="float:left;">
                    <div class="img-wrapper">
                        <img v-if="record.member.profile == null" src="@/assets/images/icon/default_user.png" class="img-profile"/>
                        <img v-else :src="imgPreUrl + record.member.profile" class="img-profile" />
                    </div>
                </div>
            </div>

            <div class='col-md-4' style="height:50vh; float:left;  margin-top:100px;">
                합주의 이름을 정해주세요!
            <input type="text" v-model="id">
                <div class="row" style="text-align:center; padding:20px; justify-content:center;">      
                <button class="btn btn-success" id="apply" v-on:click="denoising" style="height:50px; margin:10px;">소음 제거 적용</button>
                <button class="btn btn-secondary" id="non" v-on:click="nondenoise" style="height:50px; margin:10px;">소음 제거 미적용</button>
              </div>
            </div>

        </div>
        <div class='row' style="height:30vh; justify-content:center; margin-top:50px;">
            <div class='col-md-10'>
                <div v-for="record in cart" v-bind:key="record">
                    <div class="row" style="border:2px solid #bcbcbc; text-align:center; padding:20px; background-color:#0B173B; height:100px;">      
                        <div class="textInput">{{record.record.instrument}}     {{record.member.username}}</div>
                        <div class="textInput">리버브</div>
                        <round-slider radius="30" handleSize="-10" showTooltip="false" width="30" v-model="record.reverbTime" rangeColor="#81F781" @input="changeval()"/>
                        <div class="textInput">Time</div>
                        <round-slider radius="30" handleSize="-10" showTooltip="false" width="30" v-model="record.reverbDecay" rangeColor="#F3F781" @input="changeval()"/>
                        <div class="textInput">Decay</div>
                        <round-slider radius="30" handleSize="-10" showTooltip="false" width="30"  v-model="record.reberbMix" rangeColor="#BE81F7" @input="changeval()"/>
                        <div class="textInput">Mix</div>
                        <div class="textInput">딜레이</div>
                        <round-slider radius="30" handleSize="-10" showTooltip="false" width="30" v-model="record.delayTime" rangeColor="#FE642E" @input="changeval()"/>
                        <div class="textInput">Time</div>
                        <round-slider radius="30" handleSize="-10" showTooltip="false" width="30" v-model="record.feeback" rangeColor="#BE81F7" @input="changeval()"/>
                        <div class="textInput">Feedback</div>
                        <round-slider radius="30" handleSize="-10" showTooltip="false" width="30"  v-model="record.delayMix" rangeColor="#D0FA58" @input="changeval()"/> 
                        <div class="textInput">Mix</div>
                        <div class="textInput">트레몰로</div>
                        <round-slider radius="30" handleSize="-10" showTooltip="false" width="30" v-model="record.tremoloSpeed" rangeColor="#FE2EF7" @input="changeval()"/>  
                        <div class="textInput">Speed</div>
                        <round-slider radius="30" handleSize="-10" showTooltip="false" width="30" v-model="record.tremoloDepth" rangeColor="#F781D8" @input="changeval()"/>                    
                        <div class="textInput">Depth</div>
                        <round-slider radius="30" handleSize="-10" showTooltip="false" width="30" v-model="record.tremoloMix" rangeColor="#81F7D8" @input="changeval()"/>
                        <div class="textInput">Mix</div>
                        <div style="width:60px;">
                           <div style="width:100%; font-size:9px; width:100%; background-color:#0B173B; color:#FFFFFF; float:left;">
                                <div style="width:60px;">시작 딜레이</div>
                                <div style="width:40px; font-size:9px; background-color:#0B173B; color:#FFFFFF;">
                                    <input style="width:30px;" name=startTime type="int" id="startTime" value="0">
                                </div>
                            </div>
                        </div>
                        <div style="width:60px;">
                           <div style="font-size:9px; width:100%; background-color:#0B173B; color:#FFFFFF; float:left;">
                               <div style="width:60%;">
                                 볼륨
                               </div>
                               <div style="width:60%;">
                                   <input style="width:30px;" name=startTime type="range" id="startTime" value="90" v-model="record.volume"/>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';
import RoundSlider from 'vue-round-slider'
import "vue-custom-range-slider/dist/vue-custom-range-slider.css";
import SearchService from '../services/search.service';
import NoiseService from '../services/search.service';

export default {
    name: 'bucket',
components: {
        RoundSlider
    },
computed:{
    cart() {
        return this.$store.state.records.cart;
    },
    user() {
        return JSON.parse(localStorage.getItem('user'));
    },
    
},
    data : function(){     
            return {
                is_loaded:false,
                title:'dummy',
                getArray:[],
                getUser:[],
                getUrl:[],
                musicInfo:'',
                
        imgPreUrl: "data:image/jpeg;base64,",
        sound:'',
        denoised:'',
        volume:50,
        none: [
            {
                label: "Not at all",
                value: "0"
            }
        ]
            }  
    },
    mounted(){
        this.getArray=this.cart;
        console.log(this.getArray);

        for(let i=0; i<this.getArray.length; i++){
            this.getUrl.push(this.getArray[i].record.file_url);
        }
        for(let i=0; i<this.getArray.length; i++){
            this.getUser.push(this.getArray[i].member.member_id);
        }
        console.log("dd"+this.getArray[0].record.music_id);
        
        SearchService.getMusic(this.getArray[0].record.music_id).then(
            response => {
            if(Object.keys(response.data).length !== 0){
                this.musicInfo= response.data;
            }
        },
           error => {
                if(error.response.status === 404)
                    console.log("wow");
            }
        
        );          

    },
    created(){

        this.newConfig = this.cart;

    },

    beforeDestroy() {
    
    },
    methods:{
        send(){
        UserService.uploadBookMark(this.user.username, this.cart[0].record.music_id, this.title, this.getUser, this.getUrl);
        },
        setInput(){
            this.title=this.id;
        },
        
    nondenoise(){
      document.getElementById("non").style.background = "#5cb85c";
      document.getElementById("apply").style.background = "#292b2c";
    },
      
    denoising(){
      document.getElementById("apply").style.background = "#5cb85c";
      document.getElementById("non").style.background = "#292b2c";

      NoiseService.denoise(this.selectedData).then(
            response => {
              this.denoised = response.data;
            },
            error => {  
              console.log(error)
                        }
        );    
      },

    }
    }
    </script>