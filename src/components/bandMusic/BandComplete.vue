<style scoped>
.music-image{
    height: 180px;
    width: 180px;
    border-radius: 15px;
    transition: box-shadow 0.2s;
}

.music-item{
    transition: color 0.2s, font-weight 0.2s;
}

.item-container{
    margin-bottom: 30px;
    height: 180px;
    cursor: pointer;
}

.item-container:hover .music-image{
    box-shadow: 0px 8px 15px 0px rgb(0 0 0 / 40%);
}

.item-container:hover .music-item{
    color: #136BF5!important;
    font-weight: bold;
}

a {
    text-decoration-line: none;
    color: #000;
}
</style>

<template>
    <div class="d-flex flex-column py-5">
        <div v-for="item in content" :key="item.band_music_id">
            <router-link class="item-container d-flex flex-row" :to="{ name: 'bandMusicDetail', params: { bandname: bandnameParam, musicid: item.band_music_id}}">
                <img class="music-image" :src="item.music.img"/>
                <div class="d-flex flex-column position-relative w-100" style="padding-left: 40px">
                    <section class="d-flex flex-column mb-3">
                        <span class="mb-2" style="font-size: 12px; color: rgb(30, 136, 86); font-weight: 300">
                            완성한 날짜 ㆍ <span style="font-weight: lighter; color: #666; font-size: 12px">{{toDate(item.complete_date)}}</span>
                        </span>
                        <div class="d-flex flex-column music-item">
                            <span class="mb-1" style="font-size: 26px; font-weight: bold;">{{item.music.title}}</span>
                            <span style="font-size: 14px; color: #666">{{item.music.singer}}ㆍ{{item.music.composer}}</span>
                        </div>
                    </section>
                    <footer class="d-flex flex-row align-items-center px-1" style="background-color: transparent; height: 80px; border-radius: 5px; overflow:hidden">
                        <div v-for="member in item.members" :key="member.member_id" class="d-flex flex-column align-items-center mr-2" style="min-width: 65px; width: 65px; text-overflow: ellipsis">
                            <img v-if="member.profile !== null" :src="imgPreUrl + member.profile" style="width: 50px; height: 50px; border-radius: 50%"/>
                            <img v-else src="@/assets/images/profile.jpg" style="width: 50px; height: 50px; border-radius: 50%;"/>
                            <span style="color: #696969; font-size: 12px; margin-top: 3px;">{{ member.username }}</span>
                        </div>
                    </footer>
                    <div class="position-absolute" style="right: 10px; bottom: 10px">
                        <img class="mr-1" style="width: 20px; height: 20px" src="@/assets/images/icon/like_off.png"/>
                        {{ item.likes }}
                        <img class="ml-3 mr-1" style="width: 20px; height: 20px" src="@/assets/images/icon/comment.png"/>
                        {{ item.comments }}
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'BandComplete',
    data(){
        return {
            imgPreUrl: "data:image/jpeg;base64,",
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
            let completeMusics = []
            const bandMusics = this.$store.state.bandmusic.bandmusics

            for(let item of bandMusics){
                if(item.complete === true)
                    completeMusics.push(item)
            }
			return completeMusics
		},
        bandnameParam() {
            return this.$route.params.bandname;
        }, 
    }
}
</script>
