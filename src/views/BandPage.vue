<style scoped>
#body{
    background-color: #fafafa;
}
#band-info{
    width: 265px;
}

.main{
    max-width: 1300px;
    width: calc(100% - 40px);
    padding-left: 30px;
    padding-right: 30px;
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
    width: 950px!important;
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
    width: 170px; 
    height: 170px; 
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
 
::v-deep div.vhl-item[data-v-8b923bbc]{
    width: 290px!important;
}

</style>

<template>  
    <div id="body" class="d-flex">
        <div class="main d-flex" style="min-height: calc(100vh - 60px)">
            <div id="band-info" class="d-flex flex-column position-fixed align-items-center py-5" :class="{ 'band-info-1' : this.windowWidth < 1300}"> <!-- aside -->
                <div class="d-flex flex-column mb-1">
                    <span style="background-color: #EFEFEF; height: 265px; width: 265px; border-radius: 10px" class="d-flex justify-content-center align-items-center">     <!-- band info -->
                        <img v-if="content.band.img !== null" id="band-profile-image" :src="imgPreUrl + band.img"/>
                        <img v-else id="band-profile-image" src="../assets/images/icon/default_band_profile2.jpg"/>
                    </span>
                    <span style="font-size: 24px; font-weight: bold" class="mt-4 mb-3">{{ content.band.band_name }}</span>
                    <span style="font-size: 16px; color: #136BF5">좋아요 {{ content.totalLikes }}개</span>
                </div>
                <div class="align-self-start mt-5 w-100" :class="{'display-none': this.windowWidth < 1300}">    <!-- member info -->
                    <div class="d-flex justify-content-between mb-4">
                        <span style="font-weight: bold; color: #666">구성 멤버</span>
                        <span class="align-self-center" style="font-size: 13px">초대하기</span>
                    </div>
                    <div v-for="member in content.members" :key="member.member_id" class="d-flex justify-content-between mt-3">
                        <div>
                            <router-link :to="{ name: 'prac', params: { username: member.username}}">
                                <img v-if="member.img !== null" :src="imgPreUrl + member.img" style="width: 32px; height: 32px; border-radius: 50%"/>
                                <img v-else src="../assets/images/profile.jpg" style="width: 32px; height: 32px; border-radius: 50%"/>
                                <span style="color: #444; font-size: 15px; margin-left: 10px">{{ member.username }}</span>
                            </router-link>
                        </div>
                        <button style="height: 28px; border: none; border-radius: 4px; background-color: #136BF5; color: #fff; font-size: 14px;">
                            <span style="font-size: 13px; color: #fff; cursor: pointer" @click="follow(member.member_id)">방문하기</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="d-flex py-5 px-4 flex-column w-100" :class="{ 'music-info-1' : this.windowWidth > 1300, 'margin-top': this.windowWidth < 1300}"> <!-- music info -->
                <div class="mb-5">
                    <section class="d-flex flex-column mb-4">
                        <span class="mb-3" style="font-size: 40px; color: #000; font-weight: bold">
                            <span v-if="complete">{{ content.band.band_name }}가 완성한 곡</span>
                            <span v-else>{{ content.band.band_name }}가 진행 중인 곡</span>
                        </span>
                        <span class="px-2" style="font-size: 18px; color: #888"> 
                            <span v-if="complete">밴드가 완성한 곡을 감상해보세요</span>
                            <span v-else>밴드에서 진행하고 있는 곡을 구경해보세요</span>
                        </span>
                    </section>
                    <ul class="nav nav-tabs">
                        <li class="nav-item pr-2">
                            <router-link :to="{ name: 'complete' }" class="nav-link">
                                <span style="font-size: 16px; font-weight: bold">완성한 곡</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'workon' }" class="nav-link">
                                <span style="font-size: 16px; font-weight: bold">진행 중인 곡</span>
                            </router-link>
                        </li>
                    </ul>
                    <router-view></router-view>

                    <!-- <vue-horizontal-list :items="content.band_musics" :options="options">
                        <template v-slot:default="{ item }">
                            <div class="d-flex flex-column align-items-center">
                                <router-link to="/" class="item">
                                    <section  class="px-2 p-1 text-area">
                                        <span style="font-size: 13px; color: #444">{{ item.music.title }}</span>
                                    </section>
                                    <section class="position-relative" style="overflow: hidden; max-height: 230px">
                                        <img style="border: 1px solid #cacaca; width: 250px; height: 250px" :src="imgPreUrl + item.music.img"/>                                
                                    </section>
                                    <section class="d-flex justify-content-end p-2">
                                        <img class="mr-1" style="width: 20px; height: 20px" src="../assets/images/icon/like.png"/>
                                        {{ item.likes }}
                                        <img class="ml-3 mr-1" style="width: 20px; height: 20px" src="../assets/images/icon/comment.png"/>
                                        {{ item.comments }}
                                    </section>
                                </router-link>
                            </div>
                        </template>
                    </vue-horizontal-list>
                </div>
                <div>
                    <span style="font-size: 24px; color: #666">진행 중인 곡</span>
                    <vue-horizontal-list :items="content.band_musics" :options="options">
                        <template v-slot:default="{ item }">
                            <div class="d-flex flex-column align-items-center">
                                <router-link :to="{name:'processing-music', params: { bandname: content.band.band_name, music:item.music.title}}" class="item">
                                    <section  class="px-2 p-1 text-area">
                                        <span style="font-size: 13px; color: #444">{{ item.music.title }}</span>
                                    </section>
                                    <section class="position-relative" style="overflow: hidden; max-height: 230px">
                                        <img style="border: 1px solid #cacaca; width: 300px; height: 300px" :src="imgPreUrl + item.music.img"/>                                
                                    </section>
                                    <section class="d-flex justify-content-end p-2">
                                        <img class="mr-1" style="width: 20px; height: 20px" src="../assets/images/icon/like.png"/>
                                        {{ item.likes }}
                                        <img class="ml-3 mr-1" style="width: 20px; height: 20px" src="../assets/images/icon/comment.png"/>
                                        {{ item.comments }}
                                    </section>
                                </router-link>
                            </div>
                        </template>
                    </vue-horizontal-list> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import VueHorizontalList from "vue-horizontal-list";

export default {
    name: 'BandPage',
    // components: {
    //   VueHorizontalList
    // },
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
            dummy: {
                "band": {
                    "band_id": 0,
                    "band_name": "말달리자",
                    "created_at": 1577920210,
                    "img": null
                },
                "members": [
                    {
                        "member_id": 0,
                        "username": "member0",
                        "img": null
                    },
                    {
                        "member_id": 1,
                        "username": "bongbong",
                        "img": null
                    },
                    {
                        "member_id": 2,
                        "username": "member2",
                        "img": null
                    }
                ],
                "totalLikes": 50
            },
        }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },
        complete() {
            return this.$route.name === 'complete'
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
        follow(memberId){
            console.log("follow~" + memberId);
        },
        resize(){
            this.windowWidth = window.innerWidth
        }
    },
    mounted() {
        this.content = this.dummy
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
