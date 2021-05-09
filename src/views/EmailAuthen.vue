<template>
    <div id="body" class="d-flex">
        <div class="main d-flex">
            <div class="d-flex flex-column h-100 w-100 align-items-center">
                <img style="width: 160px; height: 160px" src="../assets/images/icon/email.png"/>
                <span class="mt-4" style="font-size: 32px; color: #555">인증 메일이 발송되었습니다.</span>
                <span class="mt-3" style="color: #555">메일함에서( <span style="color: rgb(50, 98, 255)">{{user.email}}</span> ) 인증 메일을 확인바랍니다.</span>
                <span class="mt-2" style="color: #555">이메일 인증 버튼을 누르면 회원가입이 완료됩니다.</span>

                <div id="verification-box" class="mt-5 d-flex flex-column py-4 align-items-center justify-content-between">
                    <span>인증을 위한 코드를 입력하세요.</span>
                    <input style="border:1px solid #dbdbdb; height: 35px; border-radius: 4px" type="text" v-model="key"/>
                    <button id="confirm-button" @click="handleRegister">이메일 인증하기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authService from "../services/auth.service";

export default {
    name: 'Email',
    data() {
        return {
            userinfo: "",
            key: ""
        };
    },
    computed: {
        user(){
            return this.$store.state.signUp.user
        }
    },
    methods: {
        handleRegister() {
            authService.checkCode(this.user.email, this.key).then(
                () => {
                    this.$store.dispatch('auth/register', this.user).then(
                        data => {
                            this.message = data.message;
                            this.successful = true;
                            this.$router.push('login');
                        },
                        error => {  
                            this.message =
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString();
                            this.successful = false;
                        }
                    );
                },
                error => {
                    if(error.response.status === 403)
                        console.log(error.response.status);
                }
            )
        }
    }
};
</script>

<style scoped>
    .main{
        max-width: 1300px;
        width: calc(100% - 40px);
        padding-left: 30px;
        padding-right: 30px;
        margin: 0 auto 30px;
        margin-top: 60px;
    }
    #body{
        background-color: #fafafa;
        height: 100vh;
    }
    #verification-box{
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #f6f6f6;
        width: 430px;
        height: 180px;
    }
    #confirm-button{
        background-color: rgb(50, 98, 255);
        border: none;
        color: #fff;
        font-size: 13px;
        border-radius: 3px;
        width: 120px;
        height: 35px;
    }
    #resend-button{
        background-color: #fff;
        border: 1px solid rgb(91, 129, 255);
        color: rgb(50, 98, 255);
        font-size: 13px;
        border-radius: 3px;
        width: 120px;
        height: 35px;
    }
</style>