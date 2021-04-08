<style scoped>
    .content-area{
        border-radius: 7px;
        background-color: #fff;
        overflow: hidden;
    }
</style>

<template>
    <div class="d-flex content-area" v-if="content === null">
        <img src="../assets/images/record.jpg" style="width:445px; height: 400px" />
        <div class="d-flex flex-column justify-content-center align-items-center w-100">
            <span class="pb-3" style="font-size: 16px; font-weight: lighter">나만의 연주를 지금 바로 공유해 보세요.</span>
            <router-link to="/record" class="btn btn-primary">연주 녹음하기</router-link>
        </div>
    </div>
    <div v-else>
        hi
    </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
    name: 'Practice',
    data: function() {
      return {
          content: null,
          
      }
    },
    mounted() {
        UserService.getMyPageContent(this.user).then(
            response => {
                this.content = response.data;
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
