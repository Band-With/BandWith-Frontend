import SearchService from "@/services/search.service";

const records = {
  namespaced: true,

  state: {
    loading: true,
    records: null,
  },

  mutations: {
    GET_RECORDS(state, payload) {
      state.records = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },

  actions: {
    getRecords({ commit }, { music_id, filter }) {
      console.log(music_id, '/', filter);
      commit("SET_LOADING", true);
      
      SearchService.getRecords(music_id, filter).then(
        (response) => {
          if (Object.keys(response.data).length !== 0) {
            commit("GET_RECORDS", response.data);
          } else {
            commit("GET_RECORDS", null);
          }
          commit("SET_LOADING", false);
        },
        (error) => {
          error =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          commit("SET_LOADING", false);
          console.log(error);
        }
      );
    },
  },
};

export default records;
