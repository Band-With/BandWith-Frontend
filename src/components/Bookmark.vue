<style scoped>
    .content-area{
        min-height: 400px;
        border-radius: 7px;
        background-color: #fff;
        overflow: hidden;
    }

    .circle-shape{
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
</style>

<template>
    <div class="d-flex content-area" v-if="content === null">
        <div class="d-flex flex-column justify-content-center align-items-center w-100">
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
    </div>
    <div v-else>
        bookmark
    </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
    name: 'Bookmark',
    data: function() {
      return {
          content: null,
          
      }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        }
    },
    mounted() {
        UserService.getBookmarkContent(this.user).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.content = response.data;
                }            
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
