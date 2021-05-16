<template>
  <div class="background justify-content-center">
    <div
      id="search-music"
      class="container d-flex align-items-center justify-content-center"
    >
      <!-- card -->
      <div class="card p-4 d-flex flex-row" style="width: 70%;">
        <div class="card-body">
          <!-- header -->
          <div>
            <img
              src="@/assets/images/logo/logo.png"
              style="width: 50px; height: 50px;"
            />
            <h5 class="card-title mt-2">BAND WITH 밴드 만들기</h5>
          </div>
          <!-- input -->
          <form class="my-4">
            <div class="form-group">
              <label for="band-name">밴드 이름</label>
              <input
                type="text"
                :class="{
                  'form-control': true,
                  'input-invalid-name': !validName,
                }"
                id="band-name"
                v-model="bandName"
                @keyup="typeName"
              />
              <span
                :class="{
                  'valid-name': validName,
                  'invalid-name': !validName,
                }"
                style="font-size: .8rem;"
                >{{ msgName }}</span
              >
            </div>
            <div class="form-group">
              <label for="band-description">밴드 소개</label>
              <textarea
                class="form-control"
                id="band-description"
                rows="3"
              ></textarea>
            </div>
          </form>
          <!-- submit btn -->
          <div class="text-center">
            <a class="btn btn-primary" @click="submit">밴드 생성</a>
          </div>
        </div>
        <!-- band image -->
        <div
          class="d-flex flex-column align-items-center justify-content-center m-5"
        >
          <input ref="imageInput" type="file" hidden @change="onChangeImages" />
          <div v-if="!imageUrl" class="d-flex flex-column align-items-center">
            <button
              id="btn-band-img"
              type="button"
              class="img-wrapper p-0"
              @click="onClickImageUpload"
            >
              <img
                src="@/assets/images/icon/band.png"
                class="img-profile"
                style="width: 70%; height: 70%;"
              />
            </button>
            <a
              style="font-weight: light; color: #2080e0;"
              class="btn"
              @click="onClickImageUpload"
              >밴드 이미지를 등록하세요</a
            >
          </div>
          <div v-else class="d-flex flex-column align-items-center">
            <div class="img-wrapper">
              <img
                id="band-img"
                :src="imgPreUrl + imageUrl"
                class="img-profile"
              />
            </div>
            <a
              style="font-weight: light; color: #2080e0;"
              class="btn"
              @click="onClickImageUpload"
              >이미지 변경</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BandService from "@/services/band.service";

export default {
  name: "newBand",

  data() {
    return {
      imgPreUrl: "data:image/jpeg;base64,",
      imageUrl: null,
      bandName: "",
      validName: true,
      msgName: "문자, 숫자를 조합하여 4자 이상을 사용하세요",
    };
  },

  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },

  methods: {
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      const file = e.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function(e) {
        this.imageUrl = e.target.result.substr(23, e.target.result.length);
      }.bind(this);
      reader.onerror = function(error) {
        alert(error);
      };
    },

    typeName(e) {
      let message = e.target.value;
      let pattern = /[^가-힣a-zA-Z0-9]/gi;
      if (message.length < 4) {
        this.validName = false;
        this.msgName = "밴드 이름은 4자 이상이어야 합니다.";
      } else if (pattern.test(message) === true) {
        this.validName = false;
        this.msgName = "한글, 영어, 숫자를 사용해야 합니다.";
      } else {
        this.validName = true;
        this.msgName = "사용 가능한 이름입니다.";
      }
    },

    submit() {
      let bandName = this.bandName;
      if (this.validName && bandName != "") {
        BandService.createBand(
          this.user.username,
          bandName,
          this.imageUrl
        ).then(
          (res) => {
            if (res.status === 200) {
              alert("밴드가 생성되었습니다.");
              this.$router.push("/bands/" + bandName);
            }
          },
          (error) => {
            error =
              (error.res && error.res.data) || error.message || error.toString();
            alert(error);
          }
        );
      }
      else
        document.getElementById("band-name").focus();
    },
  },
};
</script>

<style scoped>
.background {
  padding-top: 60px;
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  min-height: 90vh;
}
.icon {
  width: 30px;
  height: 30px;
}
.img-wrapper {
  width: 14rem;
  height: 14rem;
  border-radius: 70%;
  border: 1px solid rgba(0, 0, 0, 0.125);
  overflow: hidden;
  background-color: #ffffff;
}
.img-profile {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#btn-band-img {
  background: #ffffff;
}
.valid-name {
  color: #808080;
}
.invalid-name {
  color: red;
}
.input-invalid-name:focus {
  border-color: red;
  box-shadow: 0 0 0 0.2rem rgb(255 0 0 / 25%);
}
</style>
