export default {
    MEMORY_GET(state, payload) {
        state.currentMemory = payload;
    },

    MEMORY_LIST(state, payload) {
        state.memoryList = [...state.memoryList, ...payload];
    },

    MEMORY_PAGEINFO(state, payload) {
        state.memoryListPageInfo = payload;
    },

    MEMORY_LIST_RESET(state) {
        state.memoryList = [];
    },

    MEMORY_LIST_PAGE_RESET(state) {
        state.memoryListPageInfo.hasNext = true;
    },

    MEMORY_RESET(state) {
        state.currentMemory = {
            memoryNo: 0,
            firstPhoto: {
                photoNo: null,
                photoUrl: null,
            },
            secondPhoto: {
                photoNo: null,
                photoUrl: null,
            },
            thirdPhoto: {
                photoNo: null,
                photoUrl: null,
            },
            contents: '',
            regDate: '',
            address: '',
            category: '',
        };
    },

    MEMORY_SET_ADDRESS(state, payload) {
        state.currentMemory.address = payload;
    },

    MEMORY_SET_FILTER(state, payload) {
        state.filter = payload;
    },
};
