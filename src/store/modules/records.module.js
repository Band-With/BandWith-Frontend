import SearchService from "@/services/search.service";

const records = {
  namespaced: true,

  state: {
    loading_rcd: true,
    loading_cmt: true,
    records: [],
    cart: [],
    // comment_rcd_id: -1, // 댓글 보기로 선택된 녹음의 ID
    // comments: [],
  },

  mutations: {
    SET_LOADING_RCD(state, payload) {
      state.loading_rcd = payload;
    },
    SET_LOADING_CMT(state, payload) {
      state.loading_cmt = payload;
    },
    SET_RECORDS(state, payload) {
      state.records = payload;
    },
    ADD_TO_CART(state, payload) {
      if (state.cart.length < 5) {
        const index = state.cart.findIndex((record) => {
          return record.record.record_id === payload.record.record_id;
        });
        if (index === -1) {
          state.cart.push(payload);
        } else {
          alert("이미 장바구니에 담겨있습니다.");
        }
      } else {
        alert("장바구니에는 5개까지 담을 수 있습니다.");
      }
    },
    DELETE_FROM_CART(state, id) {
      const index = state.cart.findIndex((record) => {
        return record.record_id === id;
      });
      state.cart.splice(index, 1);
    },
  },

  actions: {
    getRecords({ commit }, { music_id, filter }) {
      commit("SET_LOADING_RCD", true);

      SearchService.getRecords(music_id, filter).then(
        (res) => {
          if (Object.keys(res.data).length !== 0) {
            console.log(res.data);
            commit("SET_RECORDS", res.data);
          } else {
            commit("SET_RECORDS", null);
          }
          commit("SET_LOADING_RCD", false);
        },
        (error) => {
          error =
            (error.res && error.res.data) || error.message || error.toString();
          alert(error);
          commit("SET_LOADING_RCD", false);
        }
      );
    },
  },
};

export default records;
