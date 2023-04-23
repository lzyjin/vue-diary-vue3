export default {
    memoryList: (state) => {
        return state.memoryList;
    },

    memoryListPageInfo: (state) => {
        return state.memoryListPageInfo;
    },

    currentMemory: (state) => {
        return state.currentMemory;
    },

    currentMemoryAddress: (state) => {
        return state.currentMemory?.address;
    },

    filter: (state) => {
        return state.filter;
    },
};
