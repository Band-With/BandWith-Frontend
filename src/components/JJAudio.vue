<style scoped>

.progress {
  width: 1px;
  height: 3px;
  transition: width .1s linear;
  border-radius: 2px;
}

.volume{
    width: 20px;
    height: 20px;
    background-image: url("../assets/images/icon/volume.png");
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
}

#volume-control{
    width:0px;    
    transition: width .15s ease-in-out;
    margin-bottom: 14px;
}

#volume-control-div{
    width: 0px;
    margin-left: 20px;
    transition: width .15s ease-in-out;
}

.volume-container:hover  #volume-control-div{
    width: 70px;
    margin-right: 5px
 }

.volume-container:hover  #volume-control{
    width: 70px;
}

.togglePlay {
    font:0/0 a;
    background: transparent;
    color:transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: none;
    cursor: pointer;
    transition: transform 150ms ease-out;
}
.togglePlay:after {
    box-sizing: border-box;
    display: block;
    content: '';
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-top-width: 6px;
    border-bottom-width: 6px;
    border-left-width: 12px;
    border-left-color: rgba(0, 0, 0,0.9);
}

.white:after{
    border-left-color: rgba(255, 255, 255, 0.9);
}
  
.togglePlay:hover {
    transform: scale(1.05);
}
.togglePlay.active:after{
    width: 10px;
    height: 12px;
    margin-right: 5px;
    border-width:0 3px;
    border-color: rgba(0, 0, 0 ,0.9);
}
.white.active:after{
    border-color: rgba(255, 255, 255, 0.9)
}

.white-icon{
    -webkit-filter: invert(100%);
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
    input[type=range]{
        -webkit-appearance: none;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 300px;
        height: 5px;
        background: #ddd;
        border: none;
        border-radius: 3px;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        height: 16px;
        width: 16px;
        border: 1px solid #aaa;
        border-radius: 50%;
        background: #fff;
        margin-top: -5px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    }

    input[type=range]:focus {
        outline: none;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #ccc;
    }
}

</style>

<template>
    <div class="d-flex flex-row align-items-center">
        <audio id="audio" ref="audio" @timeupdate="[updateCurrentTime(), playing($event)]"
                        @pause="pause" @loadedmetadata="updateFullTime" preload="metadata"
            :src="src"></audio>
        <button class="togglePlay" :class="{'white': iconColor==='#fff'}" @click="togglePlay">Play/Pause</button>
        
        <span class="text-center" style="max-width: 90px; min-width: 90px;font-size: 11px">{{currentTime}} / {{fullTime}}</span>
        <div class="d-flex" style="width: 350px; height: 4px; border-radius: 2px; background-color: #9E9E9E">
            <div class="progress" id="progress"></div>
        </div>
        <div class="d-flex flex-row align-items-center volume-container">
            <div id="volume-control-div" style="overflow: hidden">
                <input type="range" id="volume-control" @change="volumeChange">
            </div>
            <div class="position-relative volume" :class="{'white-icon': iconColor === '#fff'}"/>
        </div>
    </div>
</template>

<script>
export default{
    name: 'JJAudio',
    created(){
    },
    data: function() {
        return {
            isPlaying: false,
            currentTime: "00:00",
            fullTime: "00:00",
            timer: 0,
            percent: 0,
            progress: null,
            audio: null,
            audioDiv: null
        }
    },
    props:{
        src: {
            type: String,
            required: true,
            default: null
        },
        progressColor: {
            type: String,
            required: false,
            default: "#0075FF"
        },
        iconColor: {
            type: String,
            required: false,
            default: "#000"
        }
    },
    methods:{
        updateCurrentTime(){
            const date = new Date(0);
            date.setSeconds(this.audio.currentTime);
            const timeString = date.toISOString().substr(14, 5);
            this.currentTime = timeString
        },
        togglePlay (e) {
            e.target.style.after
            this.audioDiv = e.target.closest("div")
            this.audio = this.audioDiv.firstChild

            e = e || window.event;
            var btn = e.target;
            if (!this.audio.paused) {
                btn.classList.remove('active');
                this.audio.pause();
                this.isPlaying = false;
            } else {
                btn.classList.add('active');
                this.audio.play();
                this.isPlaying = true;
            }
        },
        playing(e){
            const duration = e.target.duration;
            this.advance(duration);
        },
        pause(){
            clearTimeout(this.timer);
        },
        advance(duration){
            let increment;
            this.percent = 0;
            this.progress = this.audioDiv.querySelector("#progress");
            this.progress.style.backgroundColor = this.progressColor;
            increment = 10/duration
            this.percent = Math.min(increment * this.audio.currentTime * 10, 100);
            this.progress.style.width = this.percent+'%'
        },
        updateFullTime(){
            this.audio = this.$refs.audio
            const date = new Date(0);
            date.setSeconds(this.audio.duration);
            const timeString = date.toISOString().substr(14, 5);
            this.fullTime = timeString
        },
        volumeChange(e){
            this.audio.volume = e.currentTarget.value / 100;
        }
    }

}
</script>
