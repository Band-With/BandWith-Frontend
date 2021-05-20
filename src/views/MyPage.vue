<style scoped>
#body{
    background-color: #fafafa;
}

#mic {
    width: 35px;
    height: 35px;
}

#note {
    width: 15px;
    height: 15px;
}

#bookmark {
    width: 15px;
    height: 15px;
}

#band {
    overflow: hidden;
    width: 50%;
}

#instrument {
    width: 50%;
}

.main{
    max-width: 1300px;
    width: calc(100% - 40px);
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto 30px;
    margin-top: 60px;
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    border: 1px solid #ddd;
}

.circle-shape{
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}

.profile-box{
    font-size: 15px;
    font-weight: bold;
    background-color: #fff;
    height: 170px;
    border: 1px solid #eee;
    border-radius: 15px;
}

li a {
    opacity: 0.5;
    font-size: 13px;
    border: none !important;
    color: black;
}

li a.router-link-exact-active{
    opacity: 1!important;
    color: black;
    font-weight: bold;
    border-bottom: 2px solid #2080e0!important;
}

a:hover{
    border: none;
}

.vm2_wrapper[data-v-11fe6c4e]{
    z-index: 999;
}

</style>

<template>
    <div id="body" class="d-flex flex-column align-items-center">
        <div class="main">
            <div class="pb-3 px-5">
                <div class="d-flex pt-5 pb-3"> <!-- 프로필 공간 -->
                    <div style="flex-grow: 1"> <!-- 프로필 사진 -->
                        <img v-if="content.member.profile === null"
                            id="profile-img"
                            src="../assets/images/profile.jpg"
                            class="profile-img-card circle-shape"
                            style="width: 150px; height: 150px"
                        />
                        <img v-else
                            id="profile-img"
                            :src="imgPreUrl + content.member.profile"
                            class="profile-img-card circle-shape"
                            style="width: 150px; height: 150px"
                        />
                    </div>
                    <div class="pt-2 px-5" style="flex-grow: 3; width: 550px"> <!-- 이름 팔로우 -->
                        <div class="mb-2 d-flex flex-row align-items-end">
                            <div style="font-size: 38px"> {{ content.member.username }} </div>
                            <button v-if="!condition && !following" class="mb-2 ml-4 px-3" @click="follow"
                            style="height: 28px; border: none; border-radius: 4px; background-color: #0095F6; color: #fff; font-size: 14px;">팔로우</button>
                            <button v-else-if="following" class="mb-2 ml-4 px-3" @click="unfollow"
                            style="height: 28px; border: 1px solid #666; border-radius: 4px; background-color: #fff; color: #555; font-size: 14px;">언팔로우</button>
                        </div>
                        <div> 
                            <button style="background-color: transparent; border:none" @click="openFollowing">팔로우 {{ content.followingCount }}</button>
                            <vue-modal-2 name="modal-1" @on-close="closeFollowing">
                                <template v-slot:header>
                                    <div class="d-flex justify-content-center pt-2">
                                        <span style="font-size: 15px; font-weight: bold">팔로우</span>
                                    </div>
                                </template>
                                <template v-slot:footer>
                                    <div class="d-flex justify-content-end pb-2 px-3">
                                        <button style="background-color: #0095F6; color: #fff; border:none; border-radius: 3px; width: 80px; height: 40px" @click="closeFollowing">Close</button>
                                    </div>
                                </template>
                                <div style="height: 250px" class="px-4">
                                    <div v-for="following in content.followings" :key="following.member_id" class="d-flex flex-row align-items-center mb-4">
                                        <a :href="'/' + following.username + '/'">
                                            <img v-if="following.profile !== null" :src="imgPreUrl + following.profile" style="width: 55px; height: 55px; border-radius: 50%"/>
                                            <img v-else src="../assets/images/profile.jpg" style="width: 55px; height: 55px; border-radius: 50%"/>  
                                        </a>
                                        <div class="ml-4">
                                            <span>{{ following.username }}</span>
                                        </div>
                                    </div>
                                </div>
                            </vue-modal-2>
                            <button class="ml-2" style="background-color: transparent; border:none" @click="openFollower">팔로워 {{ content.followerCount }}</button>
                            <vue-modal-2 name="modal-2" @on-close="closeFollower">
                                <template v-slot:header>
                                    <div class="d-flex justify-content-center pt-2">
                                        <span style="font-size: 15px; font-weight: bold">팔로워</span>
                                    </div>
                                </template>
                                <template v-slot:footer>
                                    <div class="d-flex justify-content-end pb-2 px-3">
                                        <button style="background-color: #0095F6; color: #fff; border:none; border-radius: 3px; width: 80px; height: 40px" @click="closeFollower">Close</button>
                                    </div>
                                </template>
                                <div style="height: 250px" class="px-4">
                                    <div v-for="follower in content.followers" :key="follower.member_id" class="d-flex flex-row align-items-center mb-4">
                                        <a :href="'/' + follower.username + '/'">
                                            <img v-if="follower.profile !== null" :src="imgPreUrl + follower.profile" style="width: 55px; height: 55px; border-radius: 50%"/>
                                            <img v-else src="../assets/images/profile.jpg" style="width: 55px; height: 55px; border-radius: 50%"/>  
                                        </a>
                                        <div class="ml-4">
                                            <span>{{ follower.username }}</span>
                                        </div>
                                    </div>
                                </div>
                            </vue-modal-2>
                        </div>
                    </div>
                    <div> <!-- mic -->
                        <router-link v-if="condition" :to="{ name: 'search-music', query: { q: '음악을 검색해주세요!', filter: 'rel'}}"  >
                            <button class="btn">
                                <img id="mic" src="../assets/images/icon/mic.png"/>     
                            </button>
                        </router-link>
                   </div>
                </div>
                <div class="d-flex pt-3 px-5 profile-box"> <!-- 악기 연주 정보 공간 -->
                    <div id="band"> 
                        <span>소속 밴드</span>
                        <router-link v-if="condition" to="/newBand" class="pl-4" style="font-size: 11px">+ 새 밴드 만들기</router-link>
                        <div class="d-flex align-items-center" style="overflow: auto; height: calc(100%-20px); width: 100%">
                            <div v-for="band in content.bands" :key="band.band_id">
                                <router-link :to="{ name: 'bandPage', params: { bandname: band.band_name }}" class="d-flex flex-column mr-4 pt-3 text-center">
                                    <img v-if="band.img === null" src="../assets/images/icon/default_band_profile.png" class="circle-shape mb-1" style="border: 1px solid #ddd; width: 75px; height: 75px"/> <!--밴드-->
                                    <img v-else :src="imgPreUrl + band.img" class="circle-shape mb-1" style="border: 1px solid #ddd; width: 75px; height: 75px"/> <!--밴드-->
                                    <span style="font-size: 12px; font-weight: 100">{{ band.band_name }}</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div id="instrument">
                        <span>연주 악기</span>
                    </div>
                </div>
            </div>
            <div> <!-- 하단 탭 -->
                <ul class="nav nav-tabs d-flex justify-content-center">
                    <li class="nav-item pr-5">
                        <router-link :to="{ name: 'prac' }" class="nav-link">
                            <img id="note" src="../assets/images/icon/note.png"/>
                            <span class="pl-2">연습 중인 곡</span>
                        </router-link>
                    </li>
                    <li class="nav-item pl-5">
                        <router-link :to="{ name: 'bookmark' }" class="nav-link">
                            <img id="bookmark" src="../assets/images/icon/bookmark.png"/>
                            <span class="pl-2">북마크</span>
                        </router-link>
                    </li>
                </ul>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
    name: 'myPage',
    data: function() {
        return {
            content: '',
            followCount: 0,
            followerCount: 0,
            imgPreUrl: "data:image/jpg;base64,",
            following: Boolean,
        }
    },
    components: {
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },
        userParam() {
            return this.$route.params.username;
        },
        condition() {
            return this.userParam === this.user.username;
        }
    },
    methods: {
        openFollowing () {
            this.$vm2.open('modal-1')
        },
        closeFollowing () {
            this.$vm2.close('modal-1')
        },        
        openFollower () {
            this.$vm2.open('modal-2')
        },
        closeFollower () {
            this.$vm2.close('modal-2')
        },
        follow(){
            UserService.follow(this.user.username, this.content.member.member_id);
            this.content.followerCount++
            this.following = true
        },
        unfollow(){
            if(confirm("팔로우를 취소하시겠습니까?")){
                UserService.unfollow(this.user.username, this.content.member.member_id);
                this.content.followerCount--
                this.following = false
            }
        },
        init(){
            for(const followers_ of this.content.followers)
                if (followers_.username === this.user.username){
                    this.following = true
                    return
                }
            this.following = false;
        }
    },
    mounted() {
        UserService.getMyPageContent(this.userParam).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.content = response.data;
                    this.init()
                }
            },
            error => {
                if(error.response.status === 404)
                    this.$router.push({ name: '404'});
            }
        );
    }
}
</script>
