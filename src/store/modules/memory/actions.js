import {
    saveMemory,
    listMemory,
    getMemory,
    deleteMemory,
} from "@/api";

export default {
    MEMORY_SAVE({ commit }, payload) {
        return saveMemory(payload)
        .then(response => {
            // console.log(response);
            return response;
        });
    },

    MEMORY_LIST({ commit }, payload) {
        return listMemory(payload)
        .then(response => {
            commit('MEMORY_LIST', response.data.data.list);
            commit('MEMORY_PAGEINFO', response.data.data.pageInfo);
            // console.log(response);
            return response;
        })
    },

    MEMORY_GET({ commit }, payload) {
        console.log(payload);
        return getMemory(payload)
        .then(response => {
            // console.log(response);
            commit('MEMORY_GET', response.data.data);
            return response;
        })
    },

    MEMORY_DELETE({ commit }, memoryNo) {
        return deleteMemory(memoryNo)
            .then(response => {
                // console.log(response);
                return response;
            });
    },

    MEMORY_RESET({ commit }) {
        commit('MEMORY_RESET');
    },

}
