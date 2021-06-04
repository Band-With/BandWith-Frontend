<style scoped>
    #body{
        background-color: #fafafa;
    }

    .history-button{
        font-size: 17px;
        width: 100%;
        height: 60px;

        border-top: 1px solid rgb(218, 220, 224);
        border-bottom: 0;
        border-right: 0;
        border-left: 0;
        background-color: transparent;
    }
    .history-button:last-child{
        border-bottom: 1px solid rgb(218, 220, 224);
    }
    .history-button:hover{
        background-color: rgb(243, 243, 243);
    }

    .button-clicked{
        background-color: rgb(232, 240, 254)!important;
        color: rgb(85, 151, 238);
    }

    .main{
        max-width: 1320px;
        width: calc(100% - 40px);
        padding-left: 20px;
        padding-right: 20px;
        margin: 0 auto 30px;
        margin-top: 60px;
    }

    .music-info{
        height: 290px;
    }

    .user-info{
        margin-top: 30px;
        height: 60px;
        font-size: 30px;
        color:cornflowerblue;
    }
    .version-info{
        flex: 1;
        height: 300px;
        background-color: #fff;
        border: 1px solid #ddd;
    }   

    aside{
        border: 1px solid #ccc;
        border-radius: 15px;
        width: 250px;
    }
</style>

<template>  
    <div id="body" class="d-flex">
        <div class="main d-flex">
            <!-- <aside class="mt-5 mr-3 p-3">

            </aside> -->

            <div class="d-flex flex-column w-100">
                <div class="user-info">
                    <router-link :to="{ name: 'bandPage', params: { bandname: bandnameParam }}">
                        {{ bandnameParam }}/
                    </router-link> {{ content.music.title }}
                </div>

                <div class="d-flex align-items-center position-relative music-info w-100">
                    <img style="border: 1px solid #ddd; width: 290px; height: 290px" :src="imgPreUrl + content.music.img"/>
                    <div class="position-relative d-flex flex-column h-100 w-100" style="padding-left: 40px">
                        <span class="my-2" style="font-size: 12px; font-weight: 300; color: #777">완성한 날짜: {{ toDate(content.createdAt) }}</span>
                        <span class="mt-1 mb-2" style="font-size: 36px; font-weight: 700">{{ content.music.title }}</span>
                        <span class="mb-4" style="font-size: 14px; font-weight: 100">{{ content.music.singer }} {{ content.music.composer }}</span>

                        <div class="d-flex flex-row mt-2 mb-4">
                            <div v-for="member in content.members" :key="member.member_id" class="mr-3">
                                <img v-if="member.profile !== null" :src="imgPreUrl + member.profile" style="width: 45px; height: 45px; border-radius: 50%"/>
                                <img v-else src="@/assets/images/profile.jpg" style="width: 45px; height: 45px; border-radius: 50%;"/>
                            </div>
                        </div>

                        <audio controls style="width: 600px">                            <!-- 오디오 컨트롤러 -->
                            <source :src="content.fileUrl" type="audio/wav">
                            Your browser does not support the audio tag.
                        </audio>

                        <div class="position-absolute" style="bottom: 20px; right: 20px">
                            <img class="mr-1" style="width: 20px; height: 20px" src="@/assets/images/icon/like_off.png"/>
                            {{ content.likes }}
                            <img class="ml-3 mr-1" style="width: 20px; height: 20px" src="@/assets/images/icon/comment.png"/>
                            {{ content.comments }}
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <span style="font-size: 18px">댓글</span>
                    <comment ref="comment" class="mt-2" :bandMusicId="content.bandMusicId"></comment>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import BandService from '../services/band.service';
import comment from '@/components/Comment.vue';

export default {
    name: 'BandMusicDetail',
    components: {
        comment
    },
    data: function() {
        return {
            content: null,
            loading: true,
            imgPreUrl: "data:image/jpeg;base64,",
            comments: "",
            recordId: 0,
        }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },   
        bandnameParam() {
            return this.$route.params.bandname;
        },    
        bandMusicIdParam() {
            return this.$route.params.musicid;
        },
        condition() {
            return this.userParam === this.user.username
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
        },
        getComments(bandMusicId){
            this.$refs.comment.loadComments(bandMusicId);
        }
    },
    mounted() {
        BandService.getBandMusicInfo(this.bandnameParam, this.bandMusicIdParam).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.content = response.data;
                }
                this.loading=false;
            },
            error => {
                if(error.response.status === 404)
                    this.$router.push({ name: '404'});
            }
        );
    }
}
</script>
