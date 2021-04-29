<style scoped>
    #body{
        background-color: #fafafa;
    }

    #history-button{
        width: 100%;
        height: 50px;

        border-bottom: 1px solid #ddd;
        border-top: 0;
        border-right: 0;
        border-left: 0;
        background-color: transparent;
    }

    #history-button:hover{
        background-color: rgb(149, 195, 255); 
        color: #fff;
    }

    .main{
        max-width: 1300px;
        width: calc(100% - 40px);
        padding-left: 30px;
        padding-right: 30px;
        margin: 0 auto 30px;
        margin-top: 60px;
    }

    .music-info{
        flex: 3;
        height: 300px;
        border: 1px solid #ddd;
        background-color: #fff;
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
                    <a :href="'/' + userParam + '/'"> {{ userParam }}/</a> {{ musicParam }}
                </div>

                <div class="d-flex">
                    <div class="d-flex align-items-center music-info">
                        <img style="border: 1px solid #ddd; width: 300px; height: 300px" :src="imgPreUrl + content.musicDto.img"/>
                        <div class="d-flex flex-column p-4">
                            <span style="font-size: 25px">{{ content.musicDto.title }}</span>
                            <span>{{ content.musicDto.singer }}</span>
                            <span>{{ content.musicDto.composer }}</span>
                            <audio controls class="px-4" style="flex:4">                            <!-- 오디오 컨트롤러 -->
                                <source src="https://bucket-band-with.s3.ap-northeast-2.amazonaws.com/records/dcd1897b-09c7-4836-88c0-b58e2d3b8135-%EB%85%B9%EC%9D%8C.m4a" type="audio/mpeg">
                                Your browser does not support the audio tag.
                            </audio>
                        </div>
                    </div>
                    <div class="version-info ml-4 p-3">
                        <span style="font-size: 24px" class="d-flex flex-column mb-3">History</span>

                        <div class="px-3" style="height: 210px; overflow: auto">
                            <button id="history-button" v-for="record in content.records" :key="record.records.record_id" @click="getComments(record.records.record_id, record.commentNum)">
                                <!-- <span> {{ record.records.searchable }} </span>
                                <span> {{ record.records.access }} </span> -->
                                <span> {{ toDate(record.records.created_at) }} </span>
                                <span> {{ record.commentNum }} </span>
                                <span> {{ record.likeNum }} </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <span style="font-size: 18px">댓글</span>
                    <comment  class="mt-2" :content="comments" :count="count"></comment>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';
import CommentService from '../services/comment.service';
import comment from '@/components/Comment.vue';

export default {
    name: 'PracDetail',
    components: {
        comment
    },
    data: function() {
      return {
          count: 0,
          content: null,
          loading: true,
          imgPreUrl: "data:image/jpeg;base64,",
          comments: ""
      }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },
        userParam() {
            return this.$route.params.username;
        },        
        musicParam() {
            return this.$route.params.music;
        },
        condition() {
            return this.userParam === this.user.username
        },
        pracNum(){
            return this.content.records.length;
        }
    },
    methods:{
        toDate(timestamp){
            const d = new Date(timestamp);
            let month = '' + (d.getMonth() + 1);
            let date = '' + d.getDate();

            if (month.length < 2)
                month = '0' + month;
            if (date.length < 2)
                date = '0' + date;

            return [d.getFullYear(), month, date].join("-");
        },
        getComments(record_id, count){
            this.count = count;
            CommentService.getComments(this.userParam, record_id).then(
                response => {
                    this.comments = response.data;
                }
            )
        }
    },
    mounted() {
        UserService.getPracticeDetail(this.userParam, this.musicParam, this.condition).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.content = response.data;
                }
                console.log(response.data);
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
