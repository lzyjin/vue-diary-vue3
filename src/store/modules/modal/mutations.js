export default {
    setModal(state, modal = { component: {}, data: {} }) {
        // state.modal = modal;

        // 조건
        // state.modal에 modal[index].component.name이
        // 파라미터인 modal.component.name과 같으면 이미 열린 모달이므로 추가하지 않음.
        if (state.modal.length === 0) {
            state.modal.push(modal);
        }

        if (state.modal.length > 0) {
            state.modal.forEach((v, i, arr) => {
                if (v.component.name !== modal.component.name) {
                    console.log(`모달 배열에 ${modal.component.name} 없음`);
                    state.modal.push(modal);
                }
            });
        }
    },

    closeModal(state, modalName) {
        state.modal =  state.modal.filter((v, i, arr) => {
            return v.component.name !== modalName;
        });
    },
};
