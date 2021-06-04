<style scoped>
    #register-button {
        height: 80px;
        width: 80px;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        background-color: #fafafa;
    }

    #comment-area {
        height: 80px;
        width: 85%;
        margin-right: 15px;
        margin-left: 15px;
        background-color: #fff;
        border: 1px solid #f1f1f1;
    }

    .comment-write-box {
        border: 1px solid #d1d1d1;
        background-color: #f5f5f5;
        height: 142px;
    }

    .comment-input {
        border: none;
        overflow-wrap: break-word;
        resize: none;
    }

    .comment-input:focus {
        outline: none;
    }

    .comment-item {
        min-height: 120px;
        border-bottom: 1px solid #ddd;
    }

    .comment-button{
        border:none; 
        background: none; 
        font-size: 12px; 
        color: #8f8f8f;
    }

    .comment-button:hover{
        color: #222
    }

    .display-none{
        display:none!important;
    }
</style>

<template>
    <div id="comment">
        <div class="d-flex justify-content-between py-4 px-4 comment-write-box">
            <!-- 댓글 작성 -->
            <img v-if="user.profileImg === null"
                class="comment-profile-image"
                style="min-width: 57px; width: 57px; height: 57px; border-radius: 50%; border: 1px solid #ddd;"
                src="../assets/images/profile.jpg" />
            <img v-else style="min-width: 57px; width: 57px; height: 57px; border-radius: 50%; border: 1px solid #ddd;"
                class="comment-profile-image"
                :src="imgPreUrl + user.profileImg" />

            <div id="comment-area">
                <textarea v-model="comment" class="comment-input w-100" placeholder="댓글을 입력하세요..." />
            </div>
        
            <button id="register-button" @click="submit">등록</button>
        </div>
        <div id="comment-num" class="mt-4 mb-2" style="font-size: 14px">총 <span style="color: rgb(51, 139, 255)">{{count}}</span>개</div>
        <!-- 작성된 댓글 -->
        <div style="border-top: 1px solid #bdbdbd; overflow:hidden">
            <!-- 댓글 0개 -->
            <div
            v-if="content.length === 0"
            class="no-result d-flex flex-column align-items-center justify-content-center w-100 p-5"
            >
            <b style="font-size: 0.8rem">댓글이 없습니다.</b>
            </div>
            <!-- 댓글 1개 이상 -->
            <div v-else class="d-flex comment-item px-4 py-3" v-for="(item, index) in content" :key="item.comment.comment_id"> 
                <router-link style="flex: 2; min-width: 190px" class="d-flex" :to="{ name: 'prac', params: { username: item.member.username }}"> <!-- 작성자 정보 -->
                    <img v-if="item.member.profile !== null" :src="imgPreUrl + item.member.profile" style="width: 50px; height: 50px; border: 1px solid #ddd; border-radius: 50%"/>
                    <img v-else src="../assets/images/profile.jpg" style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid #ddd;"/>
                    <div class="ml-4" style="color: #616161; font-size: 14px">
                        {{ item.member.username }}
                    </div>
                </router-link>

                <div :class="{'display-none': updating[index]}" style="flex: 9" class="position-relative d-flex flex-column"> <!-- 댓글 정보 -->
                    <span class="mb-3" style="font-size: 15px; color:#444">{{ item.comment.content }}</span>
                    <div class="d-flex flex-row" style="font-size: 13px; color: #8f8f8f">
                        <span class="mr-2">{{ toDate(item.comment.created_at) }}</span>
                        <span>
                            {{ toTime(item.comment.created_at) }} 
                            <span v-if="item.comment.updated" class="ml-2">
                                (수정됨)
                            </span>
                        </span>
                    </div>
                    <div v-if="item.member.username === user.username" class="position-absolute" style="right: 15px; bottom: 0px">
                        <button class="comment-button" @click="[toggleCommentState(index, item.comment.content)]">수정</button>
                        <button class="comment-button" @click="deleteComment(item.comment.comment_id)">삭제</button>
                    </div>
                </div>

                <div style="flex: 9; height: 110px" class="position-relative d-flex flex-row" :class="{'display-none': !updating[index]}">
                    <textarea v-model="modifyComment" style="border: 1px solid #888" class="px-2 comment-input w-100"></textarea>
                    <div class="d-flex flex-column justify-content-between ml-3" style="width: 90px;">
                        <button @click="updateComment(item.comment.comment_id)" style="height: 70px; width: 80px; border: none; background-color: #007BFF; border-radius: 3px; color: #fff">수정</button>
                        <button @click="toggleCommentState(index)" style="height: 35px;border: 1px solid #999; background-color: #fff; border-radius: 3px; color: #007BFF">취소</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommentService from '../services/comment.service';

export default {
    name: 'comment',
    data(){
        return {
            updating: [],
            count: 0,
            content: Array,
            modifyComment: "",
            comment: "",
            imgPreUrl: "data:image/jpeg;base64,",
        }
    },
    props: {
        recordId: { 
            type: Number,
            required: false,
            default: null
        },
        bandMusicId: {
            type: Number,
            required: false,
            default: null
        }
    },      
    watch: { 
        recordId: {
            immediate: true, 
            handler (val) {
                this.loadComments(val, this.bandMusicId)
            }
        },
        bandMusicId: {
            immediate: true, 
            handler (val) {
                this.loadComments(this.recordId, val)
            }
        },
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },
        userParam(){
            return this.$route.params.username;
        }
    },
    methods: {
        toggleCommentState(index, modifyComment){
            let updating_ = []
            for(let i of this.updating)
                updating_.push(i)
            updating_[index] = !updating_[index]
            
            let modifingCommentCount = 0
            for(let modifingComment of updating_)
                if(modifingComment)
                    modifingCommentCount ++
            
            if(modifingCommentCount > 1){
                alert("댓글 수정은 한 번에 하나씩 할 수 있습니다. \n현재 수정 중인 댓글을 등록한 후 시도해주세요.")
                return
            }
            
            this.modifyComment = modifyComment
            this.updating = updating_
        },
        loadComments(recordId, bandMusicId){
            CommentService.getComments(this.userParam, recordId, bandMusicId).then(
                response => {
                    this.content = response.data;
                    let array_ = []
                    for(let i = 0; i<response.data.length; i++)
                        array_.push(false)
                    this.updating = array_
                    this.count = response.data.length;
                }
            )
        },
        submit(){
            CommentService.createComment(this.user.username, this.bandMusicId, this.recordId, this.comment).then(
                response => {
                    if(response)
                        this.loadComments(this.recordId, this.bandMusicId)
                }
            );
            this.comment = ""
        },
        deleteComment(commentId){
            if(confirm("이 댓글을 삭제하시겠습니까?"))
                CommentService.deleteComment(this.user.username, commentId).then(
                    response => {
                        if(response){
                            alert("댓글이 삭제되었습니다.");
                            this.loadComments(this.recordId, this.bandMusicId)
                        }
                    }
                );
        },
        updateComment(commentId){
            CommentService.updateComment(this.user.username, commentId, this.modifyComment).then(
                response => {
                    if(response){
                        this.loadComments(this.recordId, this.bandMusicId)
                    }
                }
            );
        },
        toDate(timestamp){
            const d = new Date(timestamp);
            let month = '' + (d.getMonth() + 1);
            let date = '' + d.getDate();

            if (month.length < 2)
                month = '0' + month;
            if (date.length < 2)
                date = '0' + date;

            return [d.getFullYear(), month, date].join(".");
        },
        toTime(timestamp){
            const d = new Date(timestamp);
            let hour = '' + d.getHours();
            let min = '' + d.getMinutes();

            if (hour.length < 2)
                hour = '0' + hour;
            if (min.length < 2)
                min = '0' + min;

            return [hour, min].join(":");
        }
    }
}
</script>