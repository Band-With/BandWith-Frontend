<style scoped>
    .content-area{
        min-height: 400px;
        border-radius: 7px;
        background-color: #fff;
        overflow: hidden;
    }
    
    .bookmark-item{
        border-bottom: 1px solid #ddd;
        height: 160px;
    }

    .circle-shape{
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
</style>

<template>
    <div class="d-flex content-area">
        <span v-if="loading" class="align-self-center m-auto spinner-border spinner-border-sm"
         style="width: 3rem; height: 3rem; border-width: .35em; color: #ccc"></span>
        <div v-else-if="content === null" class="d-flex flex-column justify-content-center align-items-center w-100">
            <div style="max-width: 380px" class="d-flex flex-column justify-content-center align-items-center">
                <div style="width: 80px; height: 80px; border: 4px solid #000; overflow:hidden" class="circle-shape d-flex justify-content-center align-items-center">
                    <img src="../assets/images/bookmark.png" style="width: 50px; height: 50px"/>
                </div>
                <span class="pt-3 pb-1" style="font-size: 18px; font-weight: bold">북마크, 내가 좋아하는 조합</span>
                <span class="pb-3" style="text-align: center; font-size: 16px; font-weight: lighter">
                    다시 듣고 싶은 연주들의 조합을 나만의 북마크로 만들어 보세요. 
                    북마크로 등록한 조합은 이곳에서 언제든지 다시 들어볼 수 있어요.
                </span>
            </div>
        </div>    
        <div v-else class="w-100">
            <div class="d-flex align-items-center justify-content-between w-100" style="border-bottom: 1px solid #bbb; height: 35px; font-size: 14px; color: #555">
                <span class="px-4" style="text-align: center; flex: 2"> 북마크 이름 </span>
                <span class="px-4" style="text-align: center; flex: 2"> 노래 정보 </span>
                <span class="px-4" style="text-align: center; flex: 4"> 북마크 재생 </span>
                <span class="px-4" style="text-align: center; flex: 3"> 참여한 아티스트 </span>
            </div>
            <div v-for="item in content" :key="item.bookmark_id" class="d-flex flex-column bookmark-item py-3">
                <div class="d-flex w-100 h-100 align-items-center">
                    <span class="px-4" style="text-align: center; flex:2;font-size: 18px">{{ item.title }}</span>                
                     <!-- <div>
                        <span style="font-size: 18px"> {{ item.title }} </span>
                        <span style="font-weight: lighter; font-size: 12px"> 추가 날짜: {{ toDate(item.created_at) }} </span>
                    </div> -->
                    <div class="d-flex flex-row px-4" style="flex:2">                <!-- 즐겨찾기 정보 + 노래 정보 -->
                        <img :src="imgPreUrl + item.music.img" style="width: 70px; height: 70px; border-radius: 20%"/>
                    
                        <div class="d-flex flex-column ml-3 justify-content-center">
                            <span style="font-size: 20px">{{ item.music.title }}</span>
                            <span style="font-weight: lighter">{{ item.music.singer }}   {{ item.music.composer }}</span>
                        </div>
                    </div>
                    <audio controls class="px-4" style="flex:4">                            <!-- 오디오 컨트롤러 -->
                        <source src="https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3" type="audio/mpeg">
                        Your browser does not support the audio tag.
                    </audio>
                    <div class="d-flex flex-row px-4" style="flex:3">               <!-- 북마크 구성 멤버 -->
                        <div class="d-flex flex-column align-items-center mx-2" style="width: 55px; overflow: hidden" v-for="member in item.members" :key="member.member_id">
                            <img v-if="member.profile === null" src="../assets/images/profile.jpg" style="width: 50px; height: 50px; border-radius: 50%"/>
                            <img v-else :src="imgPreUrl + member.profile" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #bbb"/>
                            <span style="font-weight: lighter; font-size:12px; max-width: 55px;">{{member.username}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
    name: 'Bookmark',
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
    methods: {
        toDate(timestamp){
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
    mounted() {
        UserService.getBookmarkContent(this.userParam, this.condition).then(
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
