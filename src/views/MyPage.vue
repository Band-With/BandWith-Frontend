<style scoped>
#body{
    background-color: #fafafa;
}

#mic {
    width: 40px;
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
    flex-grow: 1;
}

#instrument {
    flex-grow: 1;
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
    height: 150px;
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

</style>

<template>
    <div id="body" class="d-flex flex-column align-items-center">
        <div class="main">
            <div class="pb-4 px-5">
                <div class="d-flex pt-5 pb-4"> <!-- 프로필 공간 -->
                    <div style="flex-grow: 1"> <!-- 프로필 사진 -->
                        <img
                            id="profile-img"
                            src="../assets/images/profile.jpg"
                            class="profile-img-card circle-shape"
                            style="width: 150px; height: 150px"
                        />
                    </div>
                    <div class="pt-2 px-5" style="flex-grow: 3; width: 550px"> <!-- 이름 팔로우 -->
                        <div class="pb-2 h1"> {{ user.username }} </div>
                        <div> 
                            <span class="mr-4">팔로우 {{ follow }}</span>
                            <span>팔로워 {{ follower }}</span>
                        </div>
                    </div>
                    <div> <!-- mic -->
                        <router-link to="/record"><img id="mic" src="../assets/images/mic.jpg"/></router-link>
                    </div>
                </div>
                <div class="d-flex p-3 px-5 profile-box"> <!-- 악기 연주 정보 공간 -->
                    <div id="band"> 
                        <span>소속 밴드</span>
                        <router-link to="/newBand" class="pl-4" style="font-size: 11px">+ 새 밴드 만들기</router-link>
                        <div class="d-flex pt-4">
                            <div> <!--밴드-->

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
                        <router-link :to="{ name: 'list' }" class="nav-link">
                            <img id="note" src="../assets/images/note.png"/>
                            <span class="pl-2">연습 중인 곡</span>
                        </router-link>
                    </li>
                    <li class="nav-item pl-5">
                        <router-link :to="{ name: 'bookmark' }" class="nav-link">
                            <img id="bookmark" src="../assets/images/bookmark.png"/>
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
export default {
    name: 'MyPage',
    data: function() {
      return {
          content: '',
          follow: 0,
          follower: 0,
          
      }
    },
    components: {
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        }
    },
    methods: {
    }
}
  
</script>
