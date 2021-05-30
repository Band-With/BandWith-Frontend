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


</style>


<template>
    <div class="d-flex" style="width:100vw; min-height: 100vh; background-color: #fafafa;">
        <div class="d-flex main justify-content-center" style="width:25vw; border-right: solid 3px blue;">
            <div>
                <div style="text-align: center;">
                    합주의 이름을 정해주세요!
                    <div style="width:30vw; height:150px;">
                    <input type="text" v-model="id"> 
                    <img style="width:50px; height:50px; margin:10px;" id="note" v-on:click="setInput" src="../assets/images/icon/pencil.png"/>                  
                    </div>
                    <div style="width:30vw; height:100px; margin-left:40px;">
                      <div style="float:left; margin:2px;" class="btn btn-primary" v-on:click="send()">현재 설정의 음악 생성</div>
                      <div style="float:left; margin:2px;" class="btn btn-primary" v-on:click="send()">선택된 음악으로 결정</div>
                    </div>
                      <div style="width:40vw; height:200px;" v-for="index in cart" :key="index">
                           <div style="color:#5882FA; font-weight: bold; float:left; margin-left:5px;">Record n</div>
                           <audio style="width:20vw; float:left;" class="audio" controls :src="index.record.file_url"/>
                       </div>
                   

                </div>



                
            </div>
                            
        </div>
        <div style="width:60vw; float:left; margin-top: 100px;">
            <div class="align" style="width:60vw; height:200px;" v-for="index in cart" :key="index">
                <div style="width:100px; color:#5882FA; font-weight: bold; float:left">{{index.record.instrument}}</div>
                     <audio class="audio" controls :src="index.record.file_url"/>





                    
            </div>
        </div>
        


    </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
    name: 'bucket',
    components: {
        
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
      console.log(this.getUrl);
      


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
    

  }
}
</script>