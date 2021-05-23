<style scoped>
.music-image{
    height: 185px;
    width: 185px;
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
}
</style>

<template>
    <div class="d-flex justify-content-between flex-wrap py-4">
        <div v-for="item in content" :key="item.band_music_id" class="item-container d-flex mb-4">
            <div class="d-flex flex-column music-info position-absolute py-5" style="width: 185px; height: 185px">
                <span>{{item.music.title}}</span>
                <span style="font-size: 16px; font-weight: lighter">{{item.music.singer}}</span>
            </div>
            <img class="music-image" :src="imgPreUrl + item.music.img"/>
        </div>
    </div>
</template>

<script>

export default {
    name: 'BandComplete',
    data(){
        return {
            imgPreUrl: "data:image/jpeg;base64,"
        }
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
    }
}
</script>
