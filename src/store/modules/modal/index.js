import getters from '@/store/modules/modal/getters';
import mutations from '@/store/modules/modal/mutations';
const state = {
    // TODO: 모달을 배열로 관리해서, 모달을 여러개 띄울수 있게 해야한다.
    // TODO: array.push X, 새로운 배열로 만들자.
    // TODO: 모달 삭제시 맨뒤를 삭제하는게 아니라 정확히 모달의 인덱스로 찾아내서 삭제하자.
    // modal: {
    //     component: {},
    //     data: {},
    // },
    modal: [],
};
export default {
    namespaced: true,
    state,
    getters,
    mutations,
};
