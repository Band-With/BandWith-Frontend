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


  data : function(){     
    return {
      is_loaded:false,
      newconfig:{},
      config: {
        "tracks":[
            {
                "title":"Bass",
                "url":"https://api.soundcloud.com/tracks/841840237/stream?client_id=ae1dadcc70f054f451de8c6358bcf396",
                "pan":-30,
                "gain":0.5,
                "muted":false,
                "hidden":false
            },
            {
                "title":"Flutes",
                "url":"https://api.soundcloud.com/tracks/841840234/stream?client_id=ae1dadcc70f054f451de8c6358bcf396",
                "pan":81,
                "gain":1.08,
                "muted":false,
                "hidden":false
            },
            {
                "title":"Perc",
                "url":"https://api.soundcloud.com/tracks/841840222/stream?client_id=ae1dadcc70f054f451de8c6358bcf396",
                "pan":-49,
                "gain":0.85,
                "muted":false,
                "hidden":false
            },
            {
                "title":"Piano",
                "url":"https://api.soundcloud.com/tracks/841840216/stream?client_id=ae1dadcc70f054f451de8c6358bcf396",
                "pan":-60,
                "gain":0.6,
                "muted":false,
                "hidden":false
            },
            {
                "title":"Strings",
                "url":"https://api.soundcloud.com/tracks/841840174/stream?client_id=ae1dadcc70f054f451de8c6358bcf396",
                "pan":-49,
                "gain":0.85,
                "muted":false,
                "hidden":false
            },
            {
                "title":"Bass",
                "url":"https://api.soundcloud.com/tracks/841840237/stream?client_id=ae1dadcc70f054f451de8c6358bcf396",
                "pan":-30,
                "gain":0.5,
                "muted":false,
                "hidden":false
            }
        ],
        "master":{
            "pan":0,
            "gain":1,
            "muted":false
        }
      }
    }  
  },
  created(){

    this.newConfig = this.config;

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
    }

  }
}
</script>