<style scoped>
    .content-area{
        min-height: 400px;
        border-radius: 7px;
        overflow: hidden;
    }

    #bookmark-title{
        background-color: #fff;
        box-shadow: 0px 4px 8px -2px rgb(0 0 0 / 25%);
        padding-left: 6px;
        margin-bottom: 20px;
        height: 72px; 
        font-size: 14px;
        font-weight: 500; 
        color: #555
    }
    
    .bookmark-item{
        border: 1px solid #E9E9E9;
        background-color: #fff;
        height: 160px;
    }

    .circle-shape{
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
    .fix-title{
        width: 1280px!important;
        position: fixed;  
        top: 60px;
        z-index: 1;
    }
</style>

<template>
    <div class="d-flex content-area">
        <span v-if="loading" class="align-self-center m-auto spinner-border spinner-border-sm"
         style="width: 3rem; height: 3rem; border-width: .35em; color: #ccc"></span>
        <div v-else-if="content === null" class="d-flex flex-column justify-content-center align-items-center w-100">
            <div style="max-width: 380px" class="d-flex flex-column justify-content-center align-items-center">
                <div style="width: 80px; height: 80px; border: 4px solid #000; overflow:hidden" class="circle-shape d-flex justify-content-center align-items-center">
                    <img src="@/assets/images/icon/bookmark.png" style="width: 50px; height: 50px"/>
                </div>
                <div v-if="!condition" class="d-flex flex-column justify-content-center align-items-center">
                    <span class="pt-3 pb-1" style="font-size: 18px; font-weight: bold">북마크가 없어요.</span>
                    <span class="pb-3" style="text-align: center; font-size: 16px; font-weight: lighter">
                        북마크로 등록된 연주가 없어요.
                    </span>
                </div>
                <div v-else class="d-flex flex-column justify-content-center align-items-center">
                    <span class="pt-3 pb-1" style="font-size: 18px; font-weight: bold">북마크, 내가 좋아하는 조합</span>
                    <span class="pb-3" style="text-align: center; font-size: 16px; font-weight: lighter">
                        다시 듣고 싶은 연주들의 조합을 나만의 북마크로 만들어 보세요. 
                        북마크로 등록한 조합은 이곳에서 언제든지 다시 들어볼 수 있어요.
                    </span>
                </div>
            </div>
        </div>    
        <div v-else class="w-100">
            <div id="bookmark-title" class="d-flex align-items-center justify-content-between w-100" :class="{'fix-title': scrollY > 450}">
                <span style="margin-left: 70px; text-align: center;width:110px"> 노래 정보 </span>
                <span style="text-align: center; width: 610px"> 북마크 이름 / 북마크 재생 </span>
                <span style="margin-right: 70px; margin-left: 70px; text-align: center; width: 260px"> 참여한 아티스트 </span>
            </div>
            <div v-if="scrollY > 450" style="height: 92px"></div>
            <div v-for="item in content" :key="item.bookmark_id" class="d-flex bookmark-item">
                <span style="height: 100%; width: 6px; background-color: #74A3FF;"></span>
                <div class="d-flex w-100 h-100 align-items-center">

                    <div class="d-flex flex-column" style="margin-left: 70px; width:110px">                    <!-- 노래 정보 -->
                        <img :src="item.music.img" style="width: 110px; height: 110px; border-radius: 10%"/>
                        <div class="d-flex flex-column">
                            <span style="text-align: center; font-weight: 100; font-size: 14px; color: #999">{{ item.music.title }}</span>
                        </div>
                    </div>

                    <div class="d-flex flex-column" style="margin-left: 70px; width: 610px">                                                                       <!-- 북마크 정보 -->
                        <span style="font-weight: 300; color: #666; font-size: 24px; margin-bottom: 15px">{{ item.title }}</span> 
                        <audio controls style="height: 35px; width: 540px">                            <!-- 오디오 컨트롤러 -->
                            <source :src="item.file_url" type="audio/wav">
                            Your browser does not support the audio tag.
                        </audio>
                    </div>

                    <div class="d-flex flex-row" style="margin-right: 70px; margin-left: 70px; width: 260px">               <!-- 북마크 구성 멤버 -->
                        <div class="d-flex flex-column align-items-center mx-2" style="width: 55px; overflow: hidden" v-for="member in item.members" :key="member.member_id">
                            <img v-if="member.profile === null" src="@/assets/images/profile.jpg" style="width: 50px; height: 50px; border-radius: 50%"/>
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
    created() {
        window.addEventListener("scroll", this.scroll);
    },    
    destroyed() {
        window.removeEventListener("scroll", this.scroll);
    },
    data: function() {
      return {
          content: null,
          loading: true,
          imgPreUrl: "data:image/jpeg;base64,",
          scrollY: Number,
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
        },
        scroll() {
            console.log(window.scrollY)
            return this.scrollY = window.scrollY;
        }
    },
    mounted() {
        UserService.getBookmarkContent(this.userParam, this.condition).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.content = response.data;
                    console.log(this.content);
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
