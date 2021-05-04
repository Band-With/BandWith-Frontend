import SearchService from "@/services/search.service";

const records = {
  namespaced: true,

  state: {
    loading_rcd: true,
    loading_cmt: true,
    records: [
      // ------ test ------ //
      {
        r_id: 1,
        username: "2wjdwo97",
        profile: "",
        url:
          "https://bucket-band-with.s3.ap-northeast-2.amazonaws.com/records/dcd1897b-09c7-4836-88c0-b58e2d3b8135-%EB%85%B9%EC%9D%8C.m4a",
        like: 15,
        comment: 5,
      },
      {
        r_id: 2,
        username: "pkm1015",
        profile: "",
        url:
          "https://bucket-band-with.s3.ap-northeast-2.amazonaws.com/records/dcd1897b-09c7-4836-88c0-b58e2d3b8135-%EB%85%B9%EC%9D%8C.m4a",
        like: 3,
        comment: 2,
      },
      // ------------------ //
    ],
    cart: [],
    comment_rcd_id: -1, // 댓글 보기로 선택된 녹음의 ID
    comments: [
      // ------ test ------ //
      {
        id: 1,
        username: "pkm1015",
        text: "I like your guitar playing!",
      },
      {
        id: 2,
        username: "2wjdwo97",
        text: "I love playing!",
      },
      // ------------------ //
    ],
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
    SET_COMMENT_RCD_ID(state, payload) {
      state.comment_rcd_id = payload;
    },
    SET_COMMENTS(state, payload) {
      state.comments = payload;
    },
    ADD_TO_CART(state, payload) {
      if (state.cart.length < 5) {
        const index = state.cart.findIndex((record) => {
          return record.r_id === payload.id;
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
        return record.r_id === id;
      });
      state.cart.splice(index, 1);
    },
    ADD_COMMENT(state, payload) {
      state.comments.push(payload);
    },
  },

  actions: {
    getRecords({ commit }, { music_id, filter }) {
      // commit("GET_RECORDS", null);
      commit("SET_LOADING_RCD", true);

      SearchService.getRecords(music_id, filter).then(
        (res) => {
          if (Object.keys(res.data).length !== 0) {
            commit("SET_RECORDS", res.data);
          } else {
            commit("SET_RECORDS", null);
            commit("SET_LOADING_RCD", false);
          }
        },
        (error) => {
          error =
            (error.res && error.res.data) || error.message || error.toString();
          alert(error);
          commit("SET_LOADING_RCD", false);
        }
      );
    },

    getComments({ commit }, record_id) {
      // commit("SET_COMMENTS", null);
      commit("SET_LOADING_CMT", true);

      SearchService.getComments(record_id).then(
        (res) => {
          if (Object.keys(res.data).length !== 0) {
            commit("SET_COMMENTS", res.data);
          } else {
            commit("SET_RECORDS", null);
            commit("SET_LOADING_CMT", false);
          }
        },
        (error) => {
          error =
            (error.res && error.res.data) || error.message || error.toString();
          alert(error);
          commit("SET_LOADING_CMT", false);
        }
      );
    },

    addComment({ commit }, { username, text }) {
      SearchService.addComment(this.comment_rcd_id, username, text).then(
        (res) => {
          if (Object.keys(res.data).length !== 0) {
            commit("ADD_COMMENT", {
              id: res.data,
              username: username,
              text: text,
            });
          }
        },
        (error) => {
          error =
            (error.res && error.res.data) || error.message || error.toString();
          alert(error);
        }
      );

      // ------ test ------ //
      commit("ADD_COMMENT", {
        id: Math.floor(Math.random() * 100) + 1,
        username: username,
        text: text,
      });
      // ------------------ //
    },
  },
};

export default records;
