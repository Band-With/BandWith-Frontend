<style scoped>
    .content-area{
        border-radius: 7px;
        min-height: 400px;
    }
    .playlist-item{
        overflow: hidden;
        min-width: 290px;
        min-height: 290px;
        border: 1px solid #ddd;
        border-radius: 20px;
        transition: box-shadow 0.2s;
    }

    .playlist-item:hover{
        box-shadow: 0px 8px 15px 0px rgb(0 0 0 / 40%);
    }

    .text-area{
        height: 28%;
        bottom: 0;
        border-radius: 0 0 20px 20px;
        /* background-color: rgb(255, 255, 255, 0.15); */
        background-color: rgb(0, 0, 0, 0.1);
        backdrop-filter: blur(5px);
    }
</style>

<template>
    <div class="d-flex content-area">
        <span v-if="loading" class="align-self-center m-auto spinner-border spinner-border-sm"
         style="width: 3rem; height: 3rem; border-width: .35em; color: #ccc"></span>
        <div v-else-if="content === null" class="d-flex w-100">
            <img src="@/assets/images/record.jpg" style="width:445px; height: 400px" />

            <div v-if="condition" class="d-flex flex-column justify-content-center align-items-center w-100">
                <span class="pb-3" style="font-size: 16px; font-weight: lighter">나만의 연주를 지금 바로 공유해 보세요.</span>
                <router-link class="btn btn-primary" :to="{ name: 'search-music', query: { q: '음악을 검색해주세요!' , filter: 'rel'}}">
                    연주 녹음하기
                </router-link>
            </div>

            <div v-else class="d-flex flex-column justify-content-center align-items-center w-100">
                <span class="pb-3" style="font-size: 16px; font-weight: lighter">연습한 연주가 없어요.</span>
            </div>
        </div>
        <div v-else class="justify-contents-center">
            <div class="d-flex py-2 flex-wrap">
                <div v-for="(item, index) in content" :key="item.music_id" class="d-flex">
                    <div class="position-relative d-flex playlist-item mt-4">
                        <img :src="imgPreUrl + item.img" class="w-100 h-100"/>
                        <div class="position-absolute d-flex justify-content-between align-items-center px-4  w-100 text-area">
                            <div class="d-flex flex-column">
                                <span style="color: #fff; font-size: 17px; font-weight: bold">{{ item.title }}</span>
                                <span style="color: #fff; font-size: 12px; font-weight: lighter">{{ item.singer }} {{ item.composer }}</span>
                            </div>
                            <router-link :to="{ name: 'prac-detail', params: { username: userParam, music: item.music_id }}">
                                <img src="@/assets/images/play.png" style="height: 35px; width: 35px align-self-end"/>
                            </router-link>
                        </div>
                    </div>
                    <span style="margin-right: 40px" v-if="(index+1)%4 !== 0"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
    name: 'Practice',
    data: function() {
      return {
          content: null,
          loading: true,
          imgPreUrl: "data:image/jpeg;base64,",
      }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },
        userParam() {
            return this.$route.params.username;
        },
        condition() {
            return this.userParam === this.user.username
        }
    },
    methods:{
    },
    mounted() {
        UserService.getPracticeContent(this.userParam, this.condition).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.content = response.data;
                }
                this.loading=false;
            },
            error => {
                this.content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
        );
    }
}
</script>
