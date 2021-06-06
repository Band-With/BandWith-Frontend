<style scoped>
#body{
    background-color: #f0f2f5;
}

#audio-control-button{
    width: 50px;
    height: 50px;
    background-image: url("../../assets/images/icon/play-button.png");
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    outline: none;
    cursor: pointer;
}
#audio-control-button:hover {
    transform: scale(1.05);
}

#audio-upload-area{
    width: 510px;
    height: 660px;

    padding-left: 15px;
    padding-right: 15px;

    background: rgba(255, 255, 255, 0.9);
    border-radius: 2px;
}

#audio-container{
    height: 110px;
    padding-left: 30px;
    padding-right: 30px
}

#record-list{
    width: 480px;
    height: 450px;

    overflow-x: hidden;
    overflow-y: auto;

    background: #F5F5F5;
    border: 1px solid #ddd;
    border-radius: 1px;
}

#submit-button{
    width: 110px;
    height: 45px;
    background-color: #0071F7;
    color: #fff;
    border-radius: 5px;
    border: none;
}

.odd-item{
    background: rgba(255, 255, 255, 0.75)!important;
}
.record-item{
    width: 480px;
    height: 65px;

    padding-left: 30px;
    padding-right: 30px;

    background: rgba(220, 220, 220, 0.85);
    transition: background .4s;
}
.selected-item{
    color: #fff;
    background: #4297ff!important;
}
.selected-item .icon{
    -webkit-filter: invert(100%);
}

.even-item{
    background: #F8F8F8!important
}

.main{
    max-width: 1320px;
    width: calc(100% - 40px);
    padding-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
    margin: 0 auto;
    margin-top: 60px;
}

.active{
    background-image: url("../../assets/images/icon/pause-button.png")!important;
}

#confirm-button{
    width: 72px;
    height: 28px;

    background: #E8B608;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    color: #fff;
    border: none;
}


</style>

<template>  
    <div id="body" class="d-flex">
        <div class="main d-flex flex-column" style="min-height: calc(100vh - 60px)">
            <span style="font-size: 14px; font-weight: 300">{{ bandnameParam }}</span>
            <div class="d-flex align-items-center">
                <span style="font-size: 36px; font-weight: 700">진행 중인 곡 편집</span>
                <button id="confirm-button" class="ml-3" @click="completeMusic">마감하기</button>
            </div>            
            <div class="mt-3 d-flex flex-row justify-content-between h-100">
                <div class="d-flex flex-column h-100" style="width: 620px"> <!--왼쪽-->
                    <div class="d-flex flex-row"> <!--왼쪽 위-->
                        <img style="height: 220px; width: 220px; border-raduis: 10px" :src="mixDetail.music.img"/>
                        <div class="d-flex flex-row justify-content-between align-items-center w-100 px-4">
                            <div class="d-flex flex-column">
                                <span class="mb-2" style="font-size: 24px; font-weight: 700">{{mixDetail.music.title}}</span>
                                <span style="font-size: 14px; font-weight: 300">{{mixDetail.music.singer}}</span>
                            </div>
                            <div id="audio-control-button" @click="toggleAudio($event)"/>
                        </div>
                    </div> <!--왼쪽 위-->
                    
                    <span style="margin-top: 70px; margin-bottom: 10px; font-size: 24px; font-weight: 700">멤버들이 올린 연주 목록</span>
                    <div style="height: 320px; overflow: auto"> <!--왼쪽 아래-->
                        <div class="d-flex flex-column text-gray" style="overflow: auto">
                            <div v-for="(item, index) in mixDetail.records" :class="{'even-item': index%2===1}" class="d-flex align-items-center mt-2 mb-1 px-4" style="height: 70px; background: #DBDBDB; border-radius: 6px;" :key="item.member.member_id">
                                <img v-if="item.member.profile === null"
                                    id="profile-img"
                                    src="@/assets/images/profile.jpg"
                                    style="max-width: 40px; max-height: 40px; min-width: 40px; min-height: 40px; border-radius: 50%; border: 1px solid #444"/>
                                <img v-else
                                    id="profile-img"
                                    :src="imgPreUrl + item.member.profile"
                                    style="max-width: 40px; max-height: 40px; min-width: 40px; min-height: 40px; border-radius: 50%; border: 1px solid #444"/>
                                <span class="ml-3 mr-3" style="font-weight: 300; font-size: 12px; width: 80px">{{ item.member.username }}</span>
                                <JJAudio style="width: 320px" :src="item.fileUrl" progressColor="#48FF91" iconColor="#000"></JJAudio>
                                <button v-if="item.member.username === user.username" @click="deleteRecord(item.recordId)" style="margin-left: 25px; font-size: 14px; background-color: #4297ff; border-radius: 5px; color: white; border: none">지우기</button>
                            </div>
                        </div>
                    </div> <!--왼쪽 아래-->
                </div> <!--왼쪽-->
                
                <div class="d-flex flex-column position-relative" style="width: 510px"> <!--오른쪽-->
                    <span class="position-absolute" style="font-size: 24px; font-weight:700; top: -50px">내 연주 등록하기</span>
                    <div id="audio-upload-area"  class="position-relative">
                        <div id="audio-container" class="d-flex flex-column">
                            <div class="d-flex flex-row align-items-end mt-4 mb-2">
                                <span style="font-size: 14px; margin-right: 15px">녹음한 날짜</span>
                                <span style="font-size: 13px">{{createdAt}}</span>
                            </div>
                            <JJAudio :src="selectedAudio"></JJAudio>
                        </div>
                        <div id="record-list">
                            <div class="innershadow"></div>
                            <div v-for="(item, index) in records.records" :key="item.record_id" @click="updateAudio(index)" class="record-item position-relative d-flex flex-row align-items-center" :class="{'odd-item': index%2==0, 'selected-item': index === selectedIndex}">
                                <img v-if="item.records.instrument === 'drum'" src="@/assets/images/icon/drum.png" style="height: 35px; width: 35px"/>
                                <img v-else-if="item.records.instrument === 'piano'" src="@/assets/images/icon/piano.png" style="height: 35px; width: 35px"/>
                                <img v-else-if="item.records.instrument === 'base'" src="@/assets/images/icon/base.png" style="height: 35px; width: 35px"/>
                                <img v-else-if="item.records.instrument === 'elec'" src="@/assets/images/icon/elec.png" style="height: 35px; width: 35px"/>
                                <img v-else-if="item.records.instrument === 'sing'" src="@/assets/images/icon/sing.png" style="height: 35px; width: 35px"/>

                                <div class="d-flex flex-column" style="margin-left: 30px">
                                    <span style="font-size:13px; font-weight: 300;">연주 날짜</span>
                                    <span style="font-size:18px; font-weight: 700;">{{toDate(item.records.created_at)}}</span>
                                </div>

                                <div class="d-flex flex-row align-items-center position-absolute" style="bottom: 10px; right: 30px">
                                    <img class="icon" style="height: 15px; width: 15px;" src="@/assets/images/icon/like_off.png"/>
                                    <span class="ml-1 mr-3">{{item.likeNum}}</span>
                                    <img class="icon" style="height: 15px; width: 15px;" src="@/assets/images/icon/comment.png"/>
                                    <span class="ml-1">{{item.commentNum}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end align-items-center px-1" style="height: 100px">
                            <button id="submit-button" @click="submitRecord(records.records[selectedIndex].records.record_id)">녹음 올리기</button>
                        </div>
                    </div>

                </div> <!--오른쪽-->
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/user.service"
import BandService from "@/services/band.service"
import JJAudio from "@/components/JJAudio.vue"

export default {
    name: 'BandMixing',
    components:{
        JJAudio
    },
    created() {
    },
    data: function() {
        return {
            content: null,
            records: "",
            mixDetail: "",
            imgPreUrl: "data:image/jpeg;base64,",
            selectedAudio: "",
            selectedIndex: 0,
            playing: false,
            audioList: [],
            createdAt: ""
        }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },
        bandnameParam() {
            return this.$route.params.bandname;
        },
        musicIdParam() {
            return this.$route.params.musicid;
        },
        bandMusicIdParam() {
            return this.$route.params.bandmusicid;
        }
    },
    methods:{
        async submitRecord(recordId){
            await BandService.addRecord(this.bandMusicIdParam, recordId, this.bandnameParam)
            BandService.getBandMusicRecords(this.bandnameParam, this.bandMusicIdParam).then(
                response => {
                    if(Object.keys(response.data).length !== 0){
                        this.mixDetail = response.data;
                    }
            })
        },
        async completeMusic(){
            if(this.mixDetail.records.length < 2)
                alert("두 개 이상의 녹음을 등록해주세요")
            else{
                await BandService.completeBandMusic(this.bandnameParam, this.bandMusicIdParam)
                this.$router.push({ name: 'bandPage', params: {bandname: this.bandnameParam} })
            }
        },
        async deleteRecord(recordId){
            await BandService.deleteBandMusicRecord(this.bandnameParam, this.bandMusicIdParam, recordId)
            BandService.getBandMusicRecords(this.bandnameParam, this.bandMusicIdParam).then(
                response => {
                    if(Object.keys(response.data).length !== 0){
                        this.mixDetail = response.data;
                    }
            })
        },
        toggleAudio(e){
            if(this.playing){
                for(let audio of this.audioList)
                    audio.pause()
                this.playing = false
                e.target.classList.remove("active")
            }
            else{
                this.audioList = []
                for(let item of this.mixDetail.records){
                    this.audioList.push(new Audio(item.fileUrl))
                }
                
                for(let audio of this.audioList){
                    audio.play()
                }
                this.playing = true
                e.target.classList.add("active")
            }
        },
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
        updateAudio(index){
            this.selectedAudio = this.records.records[index].records.file_url
            this.selectedIndex = index;
            this.createdAt = this.toDate(this.records.records[index].records.created_at)
        }
    },
    mounted() {
        UserService.getPracticeDetail(this.user.username, this.musicIdParam, true).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.records = response.data;
                    this.updateAudio(0)

                    this.selectedAudio = this.records.records[0].records.file_url
                }
            }
        )
        BandService.getBandMusicRecords(this.bandnameParam, this.bandMusicIdParam).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.mixDetail = response.data;
                }
            }
        )
    }
}
</script>
