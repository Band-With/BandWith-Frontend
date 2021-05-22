import BandService from '@/services/band.service'

export const bandmusic = {
    namespaced: true,
    state: {
        bandmusics: Array
    },

    mutations: {
        getBandInfo(state, bandMusics){
            state.bandmusics = bandMusics
        }
    },

    actions: {
        getBandInfo({commit}, bandId) {
            return BandService.getBandInfo(bandId).then(
                response => {
                    commit('getBandInfo', response.data.band_musics);
                    return Promise.resolve(response.data);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        }
    },

    getters: {
        
    }
}