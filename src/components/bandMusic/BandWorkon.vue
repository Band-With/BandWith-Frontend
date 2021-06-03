<style scoped>
.music-image{
    height: 190px;
    width: 190px;
    border-radius: 5px;
    transition: box-shadow 0.2s;
}

.music-info{
    transition: color 0.2s, font-weight 0.2s, background-color 0.2s, backdrop-filter 0.2s;
    border-radius: 5px;
}

.item-container{
    cursor: pointer;
}

.margin-right{
    margin-right: 40px;
}

.item-container:hover > .music-image{
    box-shadow: 0px 15px 15px 0px rgb(0 0 0 / 40%);
}

.item-container:hover  .music-info{
    color: #fff;
    font-weight: bold;
    background-color: rgb(40, 40, 40, 0.4);
    backdrop-filter: blur(4px);
}

.music-info{
    padding: 10px;
    font-size: 28px;
    color: transparent;
    overflow: hidden;
}

.animated {
  overflow: hidden;
  width: 11rem;
  white-space: nowrap;
}

.item-container:hover .animated > * {
  display: inline-block;
  position: relative;
  animation: 3s linear 0s infinite alternate move;
}

.animated > * {
  min-width: 100%;
}

@keyframes move {
  0%,
  25% {
    transform: translateX(0%);
    left: 0%;
  }
  75%,
  100% {
    transform: translateX(-100%);
    left: 100%;
  }
}
</style>

<template>
    <div class="d-flex flex-wrap py-5">
        <div v-for="(item, index) in content" :key="item.band_music_id" class="item-container d-flex mb-4">
            <div class="d-flex flex-column music-info position-absolute py-5" style="width: 190px; height: 190px">
                <div class="animated">
                    <span>{{item.music.title}}</span>
                </div>
                <span style="font-size: 16px; font-weight: lighter">{{item.music.singer}}</span>
            </div>
            <img class="music-image" :src="imgPreUrl + item.music.img"/>
            <span class="margin-right" v-if="(index+1)%4 !== 0"/>
        </div>
    </div>
</template>

<script>
import {EventBus} from "@/event-bus"
export default {
    name: 'BandComplete',
    data(){
        return {
            imgPreUrl: "data:image/jpeg;base64,",
            memberOfBand: Boolean
        }
    },
    created(){        
        EventBus.$on("response-member-auth", memberOfBand =>{
            this.memberOfBand = memberOfBand
            console.log(this.memberOfBand)
        })
        EventBus.$emit("request-member-auth")
    },
    methods:{
        toDate(timestamp){
            if (timestamp === null)
                return " ";
            const d = new Date(timestamp);
            let month = '' + (d.getMonth() + 1);
            let date = '' + d.getDate();

            if (month.length < 2)
                month = '0' + month;
            if (date.length < 2)
                date = '0' + date;

            return [d.getFullYear(), month, date].join("-");
        },
        init() {
            const elements = this.$el.querySelectorAll('.music-title-init');
            
            for(let element of elements){
                console.log(element)
                console.log(element.offsetHeight + "//" + element.offsetWidth)
                console.log(element.scrollHeight + "//" + element.scrollWidth)
                
                if (element.offsetHeight !== element.scrollHeight ||element.offsetWidth !== element.scrollWidth){
                    element.classList.add('music-title')
                    element.classList.remove('music-title-init')
                }
            }
        }
    },
    computed: {
        content(){
            let workonMusics = []
            const bandMusics = this.$store.state.bandmusic.bandmusics

            for(let item of bandMusics){
                if(item.complete === false)
                    workonMusics.push(item)
            }
			return workonMusics
		}
    },
    mounted() {
        this.init();
    }
}
</script>
