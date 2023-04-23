import state from '@/store/modules/memory/state';
import actions from '@/store/modules/memory/actions';
import getters from '@/store/modules/memory/getters';
import mutations from '@/store/modules/memory/mutations';

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
