<style scoped>
.main{
    max-width: 1300px;
    width: calc(100% - 40px);
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto 30px;
    margin-top: 160px;
}
</style>

<template>
    <div class="d-flex">
        <div class="d-flex main justify-content-center align-items-center">
            <div class="d-flex flex-column">
                <div>
                    <div style="text-align: center;">
                        <div style="position:relative; display: inline-block; ">
                            <vue-audio-mixer 
                            :config="config" 
                            size="medium" 
                            theme="dark"
                            @loaded="loadedChange"
                            @input="setConfig" 
                            :showPan="true"
                            :showTotalTime="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueAudioMixer from 'vue-audio-mixer';
import 'vue-audio-mixer/dist/vue-audio-mixer.min.css'; 

export default {
    name: 'bucket',
    components: {
    VueAudioMixer
  },
  computed:{
    cart() {
      return this.$store.state.records.cart;
    },
  },
  data : function(){     
    return {
      is_loaded:false,
      getArray:[],
      newConfig:{},
      config: {
        "tracks":[
           
        ],
        "master":{
            "pan":0,
            "gain":1,
            "muted":false
        }
      }
    }  
  },
  mounted(){
      this.getArray=this.cart;
      console.log(this.getArray);
      for(let i=0; i<this.getArray.length; i++){
          this.config.tracks.push({
                "title":this.getArray[i].record.instrument,
                "url":this.getArray[i].record.file_url,
                "pan":-60,
                "gain":0.6,
                "muted":false,
                "hidden":false
                }
         );

      }

      


  },
  created(){

    this.newConfig = this.cart;

  },

  beforeDestroy() {
  
  },
  methods:{

    loadedChange(loaded)
    {
      this.is_loaded = loaded;
      
    },

    setConfig(newVal)
    {
      this.newConfig = newVal;
      console.log(this.getArray[0].member.member_id);
    }

  }
}
</script>