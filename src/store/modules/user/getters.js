export default {
    getSignedInUserData(state) {
        if (!state.userData?.userNo) {
            state.userData = JSON.parse(localStorage.getItem('userData'));
        }

        return state.userData;
    },
}
