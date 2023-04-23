export default {
    currentMemory: {
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
    },
    memoryList: [],
    totalMemoryList: [],
    memoryListPageInfo: {
        hasNext: true,
    },
    filter: {
        address: '',
        category: '',
        startDate: '',
        endDate: '',
    },
}
