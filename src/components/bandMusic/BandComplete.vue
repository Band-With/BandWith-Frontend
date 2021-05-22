<style scoped>
.music-image{
    height: 200px;
    width: 200px;
    border-radius: 15px;
    transition: box-shadow 0.2s;
}

.music-item{
    transition: color 0.2s, font-weight 0.2s;
}

.item-container{
    cursor: pointer;
}

.item-container:hover > .music-image{
    box-shadow: 0px 8px 15px 0px rgb(0 0 0 / 40%);
}

.item-container:hover > .music-item{
    color: #136BF5;
    font-weight: bold;
}
</style>

<template>
    <div class="d-flex flex-column py-4">
        <div v-for="item in content" :key="item.band_music_id" class="item-container d-flex flex-row mb-4">
            <img class="music-image" :src="imgPreUrl + item.music.img"/>
            <div class="music-item d-flex flex-column position-relative pl-4 w-100">
                <section class="d-flex flex-column mb-3">
                    <div class="position-absolute" style="right: 10px; bottom: 10px">
                        <img class="mr-1" style="width: 20px; height: 20px" src="@/assets/images/icon/like_off.png"/>
                        {{ item.likes }}
                        <img class="ml-3 mr-1" style="width: 20px; height: 20px" src="@/assets/images/icon/comment.png"/>
                        {{ item.comments }}
                    </div>
                    <span class="mb-2" style="font-size: 14px; color: rgb(30, 136, 86); font-weight: bold">
                        완성한 날짜 ㆍ <span style="font-weight: lighter; color: #666; font-size: 12px">{{toDate(item.complete_date)}}</span>
                    </span>
                    <span class="mb-1" style="font-size: 26px; font-weight: bold">{{item.music.title}}</span>
                    <span style="font-size: 16px; color: #666">{{item.music.singer}}ㆍ{{item.music.composer}}</span>
                </section>
                <footer class="d-flex flex-row align-items-center px-1" style="background-color: transparent; height: 90px; border-radius: 5px; overflow:hidden">
                    <div v-for="member in item.members" :key="member.member_id" class="d-flex flex-column align-items-center mr-2" style="min-width: 65px; width: 65px; text-overflow: ellipsis">
                        <img v-if="member.profile !== null" :src="imgPreUrl + member.profile" style="width: 40px; height: 40px; border-radius: 50%"/>
                        <img v-else src="@/assets/images/profile.jpg" style="width: 40px; height: 40px; border-radius: 50%;"/>
                        <span style="color: #444; font-size: 12px; margin-top: 5px; font-weight: bold">{{ member.username }}</span>
                    </div>
                </footer>
            </div>
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
			return this.$store.state.bandmusic.bandmusics
		}
    },
    mounted(){
        console.log(this.content)
    }
}
</script>
