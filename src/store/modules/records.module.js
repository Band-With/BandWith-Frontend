import SearchService from "@/services/search.service";

const records = {
  namespaced: true,

  state: {
    loading: true,
    records: [
      {
        id: 1,
        username: "2wjdwo97",
        profile: "",
        url:
          "https://bucket-band-with.s3.ap-northeast-2.amazonaws.com/records/dcd1897b-09c7-4836-88c0-b58e2d3b8135-%EB%85%B9%EC%9D%8C.m4a",
        like: 15,
        comment: 5,
      },
      {
        id: 2,
        username: "pkm1015",
        profile: "",
        url:
          "https://bucket-band-with.s3.ap-northeast-2.amazonaws.com/records/dcd1897b-09c7-4836-88c0-b58e2d3b8135-%EB%85%B9%EC%9D%8C.m4a",
        like: 3,
        comment: 2,
      },
      {
        id: 3,
        username: "kdj1026",
        profile: "",
        url:
          "https://bucket-band-with.s3.ap-northeast-2.amazonaws.com/records/dcd1897b-09c7-4836-88c0-b58e2d3b8135-%EB%85%B9%EC%9D%8C.m4a",
        like: 15,
        comment: 5,
      },
    ],
    cart: [],
  },

  mutations: {
    GET_RECORDS(state, payload) {
      state.records = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    ADD_TO_CART(state, payload) {
      if (state.cart.length < 5) {
        const index = state.cart.findIndex((record) => {
          return record.id === payload.id;
        });
        if (index === -1) {
          state.cart.push(payload);
        } else {
          alert("이미 장바구니에 존재하는 녹음입니다.");
        }
      } else {
        alert("장바구니에는 5개까지 담을 수 있습니다.");
      }
    },
    DELETE_FROM_CART(state, id) {
      const index = state.cart.findIndex((record) => {
        return record.id === id;
      });
      state.cart.splice(index, 1);
    },
  },

  actions: {
    getRecords({ commit }, { music_id, filter }) {
      console.log(music_id, "/", filter);
      commit("SET_LOADING", true);

      SearchService.getRecords(music_id, filter).then(
        (response) => {
          if (Object.keys(response.data).length !== 0) {
            commit("GET_RECORDS", response.data);
          } else {
            commit("GET_RECORDS", null);
            commit("SET_LOADING", false);
          }
        },
        (error) => {
          error =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          console.log(error);
          commit("SET_LOADING", false);
        }
      );
    },
  },
};

export default records;
