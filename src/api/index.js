import axios from 'axios';

const prefix = 'http://121.161.237.50:50005/api/';

const userApi = {
    up: `${prefix}user/up`,
    in: `${prefix}user/in`,
};
const calendarApi = {
    list: `${prefix}diary/list`,
    save: `${prefix}diary/save`,
    delete: (diaryNo) => `${prefix}diary/remove/${diaryNo}`,
};
const memoryApi = {
    save: `${prefix}memory/save`,
    list: `${prefix}memory/`,
    detail: (memoryNo) => `${prefix}memory/${memoryNo}`,
    delete: (memoryNo) => `${prefix}memory/${memoryNo}`,
};

const post = (url, parameter, headers) => {
    return axios.request({
        url: url,
        method: 'post',
        data: parameter,
        headers: headers,
    });
};
const patch = (url, parameter) => {
    return axios.request({
        url: url,
        method: 'patch',
        params: parameter,
    });
};
const get = (url, parameter) => {
    return axios.request({
        url: url,
        method: 'get',
        params: parameter,
    });
};
const remove = (url, parameter) => {
    return axios.request({
        url: url,
        method: 'delete',
        params: parameter,
    });
};

// TODO: axios 요청은 axios.request로 통일하기! 파라미터 보내는 형식 헷갈리지 않게!

// 회원 - 회원가입
export async function signUp(parameter = { userId: '', password: '' }) {
    try {
        return await post(userApi.up, parameter);
    } catch (e) {
        console.error(e);
    }
}

// 회원 - 로그인
export async function signIn(userId, password) {
    return get(userApi.in, { userId, password });
}

// 캘린더 - 목록
export async function listCalendar(userNo, year, month) {
    return get(calendarApi.list, {
        userNo,
        year,
        month,
    });
}

// 캘린더 - 등록
// parameter: userNo, content, regDate
export async function saveCalendar(payload) {
    return post(calendarApi.save, {
        userNo: payload.userNo,
        contents: payload.contents,
        regDate: payload.regDate,
        diaryNo: payload.diaryNo,
    });
}

// 캘린더 - 삭제
// parameter:
export async function removeCalendar(diaryNo) {
    return remove(calendarApi.delete(diaryNo));
}

// 추억 - 등록
export async function saveMemory(payload) {
    return post(memoryApi.save, payload, {
        'Content-Type': 'multipart/formed-data',
    });
}

// 추억 - 목록
export async function listMemory({ userNo, page, limit, address, category, startDate, endDate, offset, searchText }) {
    return get(memoryApi.list, {
        userNo,
        page,
        limit,

        address,
        category,
        startDate,
        endDate,
        offset,
        searchText,
    });
}

// 추억 - 상세
export async function getMemory(memoryNo) {
    return get(memoryApi.detail(memoryNo));
}

// 추억 - 삭제
export async function deleteMemory(memoryNo) {
    return remove(memoryApi.delete(memoryNo));
}
