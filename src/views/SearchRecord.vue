<template>
  <div class="background justify-content-center">
    <form name="fileUpload" method="post" action="/members/1/records" enctype="multipart/form-data">
        <label>파일 업로드 테스트</label> <br><br>
        <input type="file" name="file"/>
        <input type="submit" name="submit" value="업로드"/>
    </form>
    <br>
    <form name="fileDelete" method="post" action="/members/1/records/22">
        <input type="hidden" name="_method" value="delete" />
        <label>파일 삭제 테스트</label>
        <input type="submit" name="submit" value="삭제"/>
    </form>
    <br>
    <button @click="getFile(23)">파일 다운로드</button>
    <br>
    <br>
    <form name="fileUrl" method="post" action="/records/1/url">
        <input type="text" name="memberId">
        <input type="text" name="musicId">
        <input type="text" name="instrument">
        <input type="text" name="searchable">
        <input type="text" name="access">
        <input type="text" name="fileName">
        <label>파일 URL 이동 테스트</label>
    </form>
    <img v-if="content === null" src="../assets/images/icon/band_profile_default.png">
    <img v-else :src="imgPreUrl + content">
  </div>
</template>

<script>
// import axios from 'axios'
import S3Service from '../services/s3.service';

export default {
  name: "search-music",
  data() {
    return {
        content: null,
        imgPreUrl: "data:image/jpg;base64,",
    };
  },

  methods: {
      getFile(id){
          S3Service.getFile(id).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.content = response.data;
                }
                this.loading=false;
            },
            error => {
                this.content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
        );
      }
  },
};
</script>

<style scoped>
.background {
  padding-top: 60px;
  width: 100%;
  background-color: #fafafa;
}
</style>
