<style scoped>
    #register-button{
        height: 80px;
        width: 80px;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        background-color: #fafafa;
    }

    #comment-area{
        height: 80px;
        width: 85%;
        margin-right: 15px;
        margin-left: 15px;
        background-color: #fff;
        border: 1px solid #f1f1f1;
    }
    
    .comment-write-box{
        border: 1px solid #d1d1d1;
        background-color: #f5f5f5;
        height: 142px;
    }

    .comment-input{
        border: none;
        overflow-wrap: break-word;
        resize: none;
    }
    .comment-input:focus{
        outline: none;
    }

    .comment-item{
        min-height: 120px;
        border-bottom: 1px solid #ddd;
    }
</style>

<template>
    <div>
        <div class="d-flex justify-content-between py-4 px-4 comment-write-box"> <!-- 댓글 작성 -->
            <img v-if="user.profileImg === null" style="min-width: 57px; width: 57px; height: 57px; border-radius: 50%; border: 1px solid #ddd;" src="../assets/images/profile.jpg"/>
            <img v-else style="min-width: 57px; width: 57px; height: 57px; border-radius: 50%; border: 1px solid #ddd;" :src="imgPreUrl + user.profileImg"/>

            <div id="comment-area">
                <textarea class="comment-input w-100" placeholder="댓글을 입력하세요..."/>
            </div>
        
            <button id="register-button">등록</button>
        </div>
        <div class="mt-4 mb-2" style="font-size: 14px">총 <span style="color: rgb(51, 139, 255)">{{count}}</span>개</div>
        <div style="border-top: 1px solid #bdbdbd; overflow:hidden"> <!-- 작성된 댓글 -->
            <div class="d-flex comment-item px-4 py-3" v-for="item in content" :key="item.comment.comment_id"> 
                <router-link style="flex: 2; min-width: 190px" class="d-flex" :to="{ name: 'prac', params: { username: item.member.username }}"> <!-- 작성자 정보 -->
                    <img v-if="item.member.profile !== null" :src="imgPreUrl + item.member.profile" style="width: 50px; height: 50px; border: 1px solid #ddd; border-radius: 50%"/>
                    <img v-else src="../assets/images/profile.jpg" style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid #ddd;"/>
                    <div class="ml-4" style="color: #616161; font-size: 15px">
                        {{ item.member.username }}
                    </div>
                </router-link>
                <div style="flex: 9" class="d-flex flex-column"> <!-- 댓글 정보 -->
                    <span class="mb-3">{{ item.comment.content }}</span>
                    <div class="d-flex flex-row" style="font-size: 13px; color: #8f8f8f">
                        <span class="mr-2">{{ toDate(item.comment.created_at) }}</span>
                        <span>{{ toTime(item.comment.created_at) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'comment',
  data(){
      return {
          imgPreUrl: "data:image/jpeg;base64,",
      }
  },
  props: {
    content: Array,
    count: Number,
  },
    computed: { 
    user() {
        return JSON.parse(localStorage.getItem('user'));
    }
  },
  methods: {
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

<style scoped>

</style>