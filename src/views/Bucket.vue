<style scoped>
.main{
    max-width: 1300px;
    width: calc(100% - 40px);
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto 30px;
    margin-top: 160px;
}
.audio{
    width:400px;
    height:100px;
}

</style>

<template>
    <div class="d-flex">
        <div class="d-flex main justify-content-center align-items-center">
            <div class="d-flex flex-column">
                <div>
                    <div style="text-align: center;">

                      <input type="text" v-model="id"> 
                      <button v-on:click="setInput">북마크의 이름 등록</button> 

                        <div class="align" v-for="index in cart" :key="index">
                            {{index.record.instrument}}
                            <audio class="audio" controls :src="index.record.file_url"/>
                        </div>
                       <button v-on:click="send()"/>
                    </div>
                </div>
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
            console.log('d');

      console.log(this.user);
                  console.log('f');

      console.log(this.cart);

      UserService.uploadBookMark(this.user.username, this.cart[0].record.music_id, this.title, this.getUser, this.getUrl);
      this.$router.push('/' + this.user.username);

    },
    setInput(){
          this.title=this.id;
    }
  }
}
</script>