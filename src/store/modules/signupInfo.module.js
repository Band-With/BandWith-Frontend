import User from "../../models/user"

export const signUp = {
    namespaced: true,
    state: {
        user: new User('', '', '', '')
    },

    mutations: {
        save(state, user){
            state.user = user
        }
    },

    actions: {
        saveUser({commit}, user) {
            commit('save', user)
        }
    },

    getters: {
        
    }
}