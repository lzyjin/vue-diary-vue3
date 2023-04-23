import { listCalendar, saveCalendar, removeCalendar, } from "@/api/index.js";


export default {
    CALENDAR_LIST({ commit }, payload) {
        return listCalendar(payload.userNo, payload.year, payload.month)
            .then(response => {
                commit('CALENDAR_LIST', response.data.data);
                return response;
            });
    },

    CALENDAR_SAVE({ commit }, payload) {
        return saveCalendar(payload)
            .then(response => {
                console.log(response);
                return response;
            });
    },

    CALENDAR_REMOVE({ commit }, diaryNo) {
        return removeCalendar(diaryNo)
            .then(response => {
                console.log(response);
                return response;
            });
    },
}
