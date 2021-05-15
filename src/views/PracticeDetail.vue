<style scoped>
    #body{
        background-color: #fafafa;
    }

    .history-button{
        font-size: 17px;
        width: 100%;
        height: 60px;

        border-top: 1px solid rgb(218, 220, 224);
        border-bottom: 0;
        border-right: 0;
        border-left: 0;
        background-color: transparent;
    }
    .history-button:last-child{
        border-bottom: 1px solid rgb(218, 220, 224);
    }
    .history-button:hover{
        background-color: rgb(243, 243, 243);
    }

    .button-clicked{
        background-color: rgb(232, 240, 254)!important;
        color: rgb(85, 151, 238);
    }

    .main{
        max-width: 1300px;
        width: calc(100% - 40px);
        padding-left: 30px;
        padding-right: 30px;
        margin: 0 auto 30px;
        margin-top: 60px;
    }

    .music-info{
        flex: 4;
        height: 300px;
        border: 1px solid #ddd;
        background-color: #fff;
    }

    .user-info{
        margin-top: 30px;
        height: 60px;
        font-size: 30px;
        color:cornflowerblue;
    }
    .version-info{
        flex: 1;
        height: 300px;
        background-color: #fff;
        border: 1px solid #ddd;
    }   

    aside{
        border: 1px solid #ccc;
        border-radius: 15px;
        width: 250px;
    }
</style>

<template>  
    <div id="body" class="d-flex">
        <div class="main d-flex">
            <!-- <aside class="mt-5 mr-3 p-3">

            </aside> -->

            <div class="d-flex flex-column w-100">
                <div class="user-info">
                    <a :href="'/' + userParam + '/'"> {{ userParam }}/</a> {{ musicParam }}
                </div>

                <div class="d-flex">
                    <div class="d-flex align-items-center music-info">
                        <img style="border: 1px solid #ddd; width: 300px; height: 300px" :src="imgPreUrl + content.music.img"/>
                        <div class="position-relative d-flex flex-column p-4 w-100">
                            <div v-if="condition" class="position-absolute d-flex flex-column" style="top: 35px; right: 30px">
                                <div class="d-flex flex-row">
                                    <img v-if="record.access === true" class="mr-2" style="width: 20px; height: 20px" src="../assets/images/icon/public.png" />
                                    <img v-else class="mr-2" style="width: 20px; height: 20px" src="../assets/images/icon/private.png" />
                                    <toggle-button :sync="true" :value="Boolean(record.access)" :width="40" @change="accessOnChangeEventHandler"/>
                                </div>
                                <div class="d-flex flex-row">
                                    <img v-if="record.searchable === true" class="mr-2" style="width: 20px; height: 20px" src="../assets/images/icon/searchable.png" />
                                    <img v-else class="mr-2" style="width: 20px; height: 20px" src="../assets/images/icon/not-searchable.png" />
                                    <toggle-button :sync="true" :value="Boolean(record.searchable)" :width="40" @change="searchableOnChangeEventHandler"/>
                                </div>
                            </div>
                            <span class="mb-2" style="font-size: 25px">{{ content.music.title }}</span>
                            <span class="mb-3" style="font-size: 18px; color: rgb(51, 139, 255)">{{ content.music.singer }} {{ content.music.composer }}</span>

                            <span class="mb-1" style="font-size: 14px; color: #666">연습 날짜: {{ toDate(record.createdAt) }}</span>
                            <span class="mb-1" style="font-size: 14px; color: #666">댓글 {{ record.count }}개</span>
                            <span class="mb-4" style="font-size: 14px; color: #666">좋아요 {{ record.likes }}개</span>
                            <audio controls class="w-100">                            <!-- 오디오 컨트롤러 -->
                                <source :src="record.fileUrl" type="audio/mpeg">
                                Your browser does not support the audio tag.
                            </audio>
                        </div>
                    </div>
                    <div class="version-info ml-2 p-3">
                        <span style="font-size: 23px" class="d-flex flex-column mb-4">History</span>

                        <div style="height: 210px; overflow: auto">
                            <button class="history-button position-relative d-flex justify-content-center align-items-center" v-for="(record, index) in content.records" :key="record.records.record_id"  
                                :class="{'button-clicked': index===0}"  @click="[toggleClickedButton($event.currentTarget), updateMusicPanel(record, index), getComments(record)]">
                                <!-- <span> {{ record.records.searchable }} </span> -->
                                <div v-if="condition" class="position-absolute" style="top: 0px; right: 5px">
                                    <img v-if="record.records.access === true" style="width: 16px; height: 16px" src="../assets/images/icon/public.png" />
                                    <img v-else style="width: 16px; height: 16px" src="../assets/images/icon/private.png" />
                                    <img v-if="record.records.searchable === true" class="ml-1" style="width: 16px; height: 16px" src="../assets/images/icon/searchable.png" />
                                    <img v-else class="ml-1" style="width: 16px; height: 16px" src="../assets/images/icon/not-searchable.png" />
                                </div>
                                <span> {{ toDate(record.records.created_at) }} </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <span style="font-size: 18px">댓글</span>
                    <comment ref="comment" class="mt-2" :content="comments" :recordId="recordId" :count="record.count"></comment>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service';
import comment from '@/components/Comment.vue';

export default {
    name: 'PracDetail',
    components: {
        comment
    },
    data: function() {
        return {
            record:{
                id: 0,
                index: 0,
                count: 0,
                likes: 0,
                access: false,
                searchable: false,
                createdAt: null,
                fileUrl: null,
            },
            content: null,
            loading: true,
            imgPreUrl: "data:image/jpeg;base64,",
            comments: "",
            recordId: 0,
        }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },
        userParam() {
            return this.$route.params.username;
        },        
        musicParam() {
            return this.$route.params.music;
        },
        condition() {
            return this.userParam === this.user.username
        },
        pracNum(){
            return this.content.records.length;
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
        toggleClickedButton(clickedButton){
            const buttons = document.querySelectorAll(".history-button");
            for(let button of buttons)
                button.classList.remove('button-clicked');
            clickedButton.classList.add('button-clicked');
        },
        updateMusicPanel(record, index){
            this.recordId = record.records.record_id

            this.record.fileUrl = record.records.file_url;
            this.record.index = index;
            this.record.id = record.records.record_id;  
            this.record.createdAt = record.records.created_at;
            this.record.count = record.commentNum;
            this.record.likes = record.likeNum;

            this.record.access = record.records.access;
            this.record.searchable = record.records.searchable;
        },
        getComments(record){
            this.$refs.comment.getComments(record.records.record_id);
        },
        accessOnChangeEventHandler(){
            if(confirm("공개여부를 변경하시겠습니까?")){
                this.record.access = !this.record.access
                this.content.records[this.record.index].records.access = this.record.access
                if(!this.record.access){
                    this.record.searchable = false
                    this.content.records[this.record.index].records.searchable = false
                }
                UserService.patchRecordAttribute(this.userParam, this.record.id, this.record.access, this.record.searchable)
            }
        },
        searchableOnChangeEventHandler(){
            if(this.record.access){
                if(confirm("검색 가능 여부를 변경하시겠습니까?")){
                    this.record.searchable = !this.record.searchable
                    this.content.records[this.record.index].records.searchable = this.record.searchable
                    UserService.patchRecordAttribute(this.userParam, this.record.id, this.record.access, this.record.searchable)
                }   
            }
            else{
                if(confirm("이 녹음을 검색 가능하게 하려면 공개여부를 '공개'로 바꿔야 합니다.\n공개여부를 공개로 바꾸시겠습니까?")){
                    this.record.access = true
                    this.record.searchable = true
                    this.content.records[this.record.index].records.access = true
                    this.content.records[this.record.index].records.searchable = true
                    UserService.patchRecordAttribute(this.userParam, this.record.id, this.record.access, this.record.searchable)
                }
            }
        }
    },
    mounted() {
        UserService.getPracticeDetail(this.userParam, this.musicParam, this.condition).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.content = response.data;
                    this.updateMusicPanel(response.data.records[0], 0)
                    this.$nextTick(() => {
                        this.getComments(response.data.records[0])
                    })
                }
                console.log(response.data);
                this.loading=false;
            },
            error => {
                if(error.response.status === 404)
                    this.$router.push({ name: '404'});
            }
        );
    }
}
</script>
