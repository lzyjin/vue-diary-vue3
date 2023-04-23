import { signUp, signIn } from '@/api/index.js';

export default {
    // vuex 2단계: api 호출해서 받은 데이터로 mutation에 commit
    SIGN_UP ({ commit }, payload) {
    // SIGN_UP (payload) {
        signUp(payload.id, payload.password)
        .then(response => {
            commit('SIGN_UP', payload);
            return response;
        })
        .catch(e => {
            console.error(e);
        });
    },

    SIGN_IN({ commit }, payload) {
        return signIn(payload.id, payload.password)
        .then(response => {
            // console.log(response);

            // mutation을 commit
            commit('SIGN_IN', response.data.data.userData);
            localStorage.setItem('userData', JSON.stringify(response.data.data.userData));

            return response;
        });
    },

    SIGN_OUT({ commit }) {
        commit('SIGN_OUT');
    },
}
