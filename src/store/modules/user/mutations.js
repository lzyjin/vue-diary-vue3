// vuex 3단계: mutation은 state를 변경하는 곳(mutation: 변이)

export default {
    SIGN_UP(state) {
        state.signUpState = true;
    },

    SIGN_IN(state, userData) {
        // console.log('mutation: ', userData);
        state.userData = userData;
    },

    SIGN_OUT(state) {
        state.userData = {};
    },
}
