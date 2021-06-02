<style scoped>
#body{
    background-color: #fafafa;
}
#band-info{
    width: 290px;
}

.main{
    max-width: 1320px;
    width: calc(100% - 40px);
    padding-left: 20px;
    padding-right: 20px;
    margin: 0 auto;
    margin-top: 60px;
}

.music{
    background-color: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
}

.music-info-1{
    margin-left: auto;
    width: 880px!important;
}

.band-info-1{
    border-bottom: 1px solid #ddd;
    left: 0;
    width: 100%!important;
    z-index:3;
    background-color: #fff;
    flex-direction: row !important;
    padding-bottom: 10px!important;
    padding-top: 15px!important;
    justify-content: center;
}

.display-none{
    display: none;
}
.margin-top{
    margin-top: 270px;
}

.item{
    height: 300px;
    width: 250px;
    border-radius: 5px;
    background-color: rgb(249, 250, 255);
    border: 1px solid #dbdbdb;
    overflow: hidden;
}

a.item{
    text-decoration: none;
}

.item:hover{
    font-weight: bold;
    border: 1px solid #999;
    box-shadow: 0px 5px 15px 0px rgb(130, 130, 130, 0.3)
}

#band-profile-image{
    box-shadow: 0px 5px 10px 0px rgb(0 0 0 / 20%);
    width: 180px; 
    height: 180px; 
    border: 1px solid #ddd; 
    border-radius: 45px;
}

.nav-tabs{
    border-bottom: 3px solid #EFEFEF;
}

li a {
    opacity: 0.5;
    font-size: 13px;
    border: none !important;
    color: black;
}

li a.router-link-exact-active{
    opacity: 1!important;
    color: #136BF5;
    font-weight: bold;
    border-bottom: 3px solid #136BF5!important;
}

li a.nav-link{
    height: 52px;
}

a:hover{
    border: none;
}

#leave-button{
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
}

#leave-button:hover{
    color: rgb(240, 86, 48);
}

#create-button{
    height: 35px; 
    border: none;
    border-radius: 6px;
    color: #fff;
    background-color: #2EA44F;
    transition: background-color 0.1s;
}
#create-button:hover{
    background-color: #259144;
}

#visit-button{
    height: 28px;
    border: none;
    border-radius: 4px;
    background-color: #0095F6;
    color: #fff;
    font-size: 14px;
}
#visit-button:hover{
    background-color: #0072be;
}

::v-deep div.vhl-item[data-v-8b923bbc]{
    width: 290px!important;
}

</style>

<template>  
    <div id="body" class="d-flex">
        <div class="main d-flex" style="min-height: calc(100vh - 60px)">
            <div id="band-info" class="d-flex flex-column position-fixed align-items-center py-5" :class="{ 'band-info-1' : this.windowWidth < 1300}"> <!-- aside -->
                <div class="d-flex flex-column mb-1">
                    <span style="background-color: #EFEFEF; height: 290px; width: 290px; border-radius: 15px" class="d-flex justify-content-center align-items-center">     <!-- band info -->
                        <img v-if="content.band.img !== null" id="band-profile-image" :src="imgPreUrl + content.band.img"/>
                        <img v-else id="band-profile-image" src="../assets/images/icon/default_band_profile2.jpg"/>
                    </span>
                    <div class="mt-4 mb-3 d-flex flex-row justify-content-between align-items-end">
                        <span style="font-size: 24px; font-weight: bold">{{ content.band.band_name }}</span>
                        <span id="leave-button" @click="leave" v-if="memberOfBand">탈퇴하기</span>
                    </div>
                    <span class="mb-4" style="font-size: 14px; font-weight: 300; color: #0095F6">좋아요 {{ content.totalLikes }}개</span>
                    <router-link v-if="memberOfBand" :to="{ name: 'bandMusic', params: { bandname: bandnameParam }}">
                        <button id="create-button" class="w-100">음악 추가하기</button>
                    </router-link>
                </div>
                <div class="align-self-start mt-5 w-100" :class="{'display-none': this.windowWidth < 1300}">    <!-- member info -->
                    <div class="d-flex justify-content-between mb-4">
                        <span style="font-weight: bold; color: #666">구성 멤버</span>
                        <span v-if="memberOfBand" class="align-self-center" style="font-size: 14px">초대하기</span>
                    </div>
                    <div v-for="member in content.members" :key="member.member_id" class="d-flex justify-content-between mt-3">
                        <div>
                            <router-link :to="{ name: 'prac', params: { username: member.username}}">
                                <img v-if="member.profile !== null" :src="imgPreUrl + member.profile" style="width: 32px; height: 32px; border-radius: 50%"/>
                                <img v-else src="../assets/images/profile.jpg" style="width: 32px; height: 32px; border-radius: 50%"/>
                                <span style="color: #444; font-size: 15px; margin-left: 15px">{{ member.username }}</span>
                            </router-link>
                        </div>
                        <router-link :to="{ name: 'prac', params: { username: member.username}}">
                            <button id="visit-button">
                                <span style="font-size: 13px; cursor: pointer">방문하기</span>
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="d-flex py-5 flex-column w-100" :class="{ 'music-info-1' : this.windowWidth > 1300, 'margin-top': this.windowWidth < 1300}"> <!-- music info -->
                <div class="mb-5">
                    <section class="d-flex flex-column mb-4">
                        <span class="mb-3" style="font-size: 48px; color: #000; font-weight: bold">
                            <span v-if="complete">{{ content.band.band_name }}가 완성한 곡</span>
                            <span v-else>{{ content.band.band_name }}가 진행 중인 곡</span>
                        </span>
                        <span class="px-2" style="font-size: 18px; font-weight: 300; color: #888"> 
                            <span v-if="complete">밴드가 완성한 곡을 감상해보세요</span>
                            <span v-else>밴드에서 진행하고 있는 곡을 구경해보세요</span>
                        </span>
                    </section>
                    <ul class="nav nav-tabs">
                        <li class="nav-item pr-2">
                            <router-link :to="{ name: 'complete' }" class="nav-link">
                                <span class="px-3" style="font-size: 18px; font-weight: bold;">완성한 곡</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'workon' }" class="nav-link">
                                <span style="font-size: 18px; font-weight: bold">진행 중인 곡</span>
                            </router-link>
                        </li>
                    </ul>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BandService from "@/services/band.service"
export default {
    name: 'BandPage',
    created() {
        window.addEventListener("resize", this.resize);
        this.resize()
    },
    data: function() {
        return {
            options: {
                responsive: [
                    { end: 576, size: 1 },
                    { start: 576, end: 768, size: 2 },
                    { start: 768, end: 992, size: 3 },
                    { start: 992, end: 1150, size: 4 },
                    { size: 5 }
                ],
            },
            windowWidth: 0,
            content: null,
            loading: true,
            imgPreUrl: "data:image/jpeg;base64,",
            comments: "",
        }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },
        complete() {
            return this.$route.name === 'complete'
        },
        bandnameParam() {
            return this.$route.params.bandname;
        },
        memberOfBand(){
            for(let user_ of this.content.members){
                if(user_.username === this.user.username)
                    return true
            }
            return false
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
        resize(){
            this.windowWidth = window.innerWidth
        },
        leave(){
            if(confirm("'" + this.bandnameParam + "' 밴드에서 나가시겠습니까?"))
            BandService.leaveBand(this.bandnameParam, this.user.username).then(
                this.$store.dispatch('bandmusic/getBandInfo', this.bandnameParam).then(
                    response => {
                        this.content = response
                    }
                )
            )
        }
    },
    mounted() {
        this.$store.dispatch('bandmusic/getBandInfo', this.bandnameParam).then(
            response => {
                this.content = response
            }
        );
        // UserService.getPracticeDetail(this.userParam, this.musicParam, this.condition).then(
        //     response => {
        //         if(Object.keys(response.data).length !== 0){
        //             this.content = response.data;
        //         }
        //         this.loading=false;
        //     },
        //     error => {
        //         if(error.response.status === 404)
        //             this.$router.push({ name: '404'});
        //     }
        // );
    }
}
</script>
