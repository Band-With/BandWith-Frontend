export const pass = {
    namespaced: true,
    state: userId,
    // state: initialState,

    mutations: {
        // loginSuccess(state, user) {
        //     state.status.loggedIn = true;
        //     state.user = user;
        // }
    },

    actions: {
        userId({ commt }, userId){
            
        }
        // login({commit}, user) {
        //     return AuthService.login(user).then(
        //         user => {
        //             commit('loginSuccess', user);
        //             return Promise.resolve(user);
        //         },
        //         error => {
        //             commit('loginFailure');
        //             return Promise.reject(error);
        //         }
        //     );
        // },
        
    },

    getters: {

    }
}