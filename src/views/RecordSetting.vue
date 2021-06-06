<style scoped>
.container {
  width: 100%;
  padding-right: 5%;
  padding-left: 5%;
  margin-right: auto;
  margin-left: auto;
}
.background {
  padding-top: 100px;
  min-height: 100vh;
  background-color: #F8F8F8;
}
.page {
  padding: 24px;
}
h5 {
  margin-bottom: 36px;
}
::v-deep .wizard__body__actions {
  background-color: #f0f0f0;
}
::v-deep .wizard__body__actions a {
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  color: #fff;
  background-color: #007bff !important;
  border-color: #007bff !important;
  text-align: center;
  vertical-align: middle;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
::v-deep .wizard__body__actions a:hover {
  background-color: #0069d9 !important;
  border-color: #0062cc !important;
}
.instrument {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 24px;
}
.instrument:hover {
  cursor: pointer;
}
::v-deep .wizard__body__step {
  min-height: 40vh;
}
.img-instrument {
  width: 70px;
  height: 70px;
  margin: 24px 0;
}
.img-check {
  width: 30px;
  height: 30px;
  margin-top: 12px;
}
.setting-info {
  margin: 12px 0;
}
</style>

<template>
  <div class="background justify-content-center">
    <div class="container">
      <vue-good-wizard
        :steps="steps"
        :onNext="nextClicked"
        :onBack="backClicked"
      >
        <div slot="page1" class="page">
          <h5>연주 악기 선택</h5>
          <div id="instrument">
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="radioSing"
                name="customRadioInline"
                class="custom-control-input"
                v-model="selectedInstrunment"
                :value="'sing'"
              />
              <label class="custom-control-label" for="radioSing"
                ><div class="instrument">
                  <img
                    class="img-instrument"
                    src="@/assets/images/icon/sing.png"
                  />
                  <span>보컬</span>
                </div>
              </label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="radioElec"
                name="customRadioInline"
                class="custom-control-input"
                v-model="selectedInstrunment"
                :value="'elec'"
              />
              <label class="custom-control-label" for="radioElec"
                ><div class="instrument">
                  <img
                    class="img-instrument"
                    src="@/assets/images/icon/elec.png"
                  />
                  <span>일렉/기타</span>
                </div>
              </label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="radioPiano"
                name="customRadioInline"
                class="custom-control-input"
                v-model="selectedInstrunment"
                :value="'piano'"
              />
              <label class="custom-control-label" for="radioPiano"
                ><div class="instrument">
                  <img
                    class="img-instrument"
                    src="@/assets/images/icon/piano.png"
                  />
                  <span>피아노</span>
                </div>
              </label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="radioBase"
                name="customRadioInline"
                class="custom-control-input"
                v-model="selectedInstrunment"
                :value="'base'"
              />
              <label class="custom-control-label" for="radioBase"
                ><div class="instrument">
                  <img
                    class="img-instrument"
                    src="@/assets/images/icon/base.png"
                  />
                  <span>베이스</span>
                </div>
              </label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="radioDrum"
                name="customRadioInline"
                class="custom-control-input"
                v-model="selectedInstrunment"
                :value="'drum'"
              />
              <label class="custom-control-label" for="radioDrum"
                ><div class="instrument">
                  <img
                    class="img-instrument"
                    src="@/assets/images/icon/drum.png"
                  />
                  <span>베이스</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- 공개여부 -->
        <div slot="page2" class="page d-flex flex-column">
          <h5>공개 범위 설정</h5>
          <div id="visible" class="mb-5">
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="customRadioInline1"
                name="customRadioInline1"
                class="custom-control-input"
                v-model="visible"
                :value="true"
              />
              <label class="custom-control-label" for="customRadioInline1"
                >Public (전체 공개)</label
              >
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="customRadioInline2"
                name="customRadioInline1"
                class="custom-control-input"
                v-model="visible"
                :value="false"
              />
              <label class="custom-control-label" for="customRadioInline2"
                >Private (비공개)</label
              >
            </div>
          </div>

          <h5>검색 여부 설정</h5>
          <div id="searchable">
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="customRadioInline3"
                name="customRadioInline2"
                class="custom-control-input"
                v-model="searchable"
                :value="true"
              />
              <label class="custom-control-label" for="customRadioInline3"
                >검색 공개</label
              >
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="customRadioInline4"
                name="customRadioInline2"
                class="custom-control-input"
                v-model="searchable"
                :value="false"
              />
              <label class="custom-control-label" for="customRadioInline4"
                >검색 비공개</label
              >
            </div>
          </div>
        </div>

        <div slot="page3" class="page">
          <h5>설정 확인</h5>
          <div class="setting-info">
            <span><b>선택한 악기</b> : {{ selectedInstrunment }}</span>
          </div>
          <div class="setting-info">
            <span><b>공개 여부</b> : {{ visible }}</span>
          </div>
          <div class="setting-info">
            <span><b>검색 공개 여부</b> : {{ searchable }}</span>
          </div>
        </div>
      </vue-good-wizard>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueGoodWizard from "vue-good-wizard";

Vue.use(VueGoodWizard);

export default {
  name: "recordsetting",
  data: function() {
    return {
      music_id: "",
      username: "",

      selectedInstrunment: "sing",
      visible: true,
      searchable: true,

      steps: [
        {
          label: "악기 선택",
          slot: "page1",
        },
        {
          label: "공개 및 검색 여부",
          slot: "page2",
        },
        {
          label: "설정 확인",
          slot: "page3",
        },
      ],
    };
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user"));
    },
    musicParam() {
      return this.$route.params.musicId;
    },
  },
  mounted() {},
  methods: {
    selectInstrunment(inst) {
      this.selectedInstrunment = inst;
    },
    nextClicked(currentPage) {
      if (currentPage == 2) {
        this.$router.push({
          name: "recording",
          params: {
            music_id: this.musicParam,
            instrument: this.selectedInstrunment,
            visible: this.visible,
            searchable: this.searchable,
          },
        });
      }
      return true; //return false if you want to prevent moving to next page
    },
    backClicked(currentPage) {
      currentPage;
      return true; //return false if you want to prevent moving to previous page
    },
  },
};
</script>
