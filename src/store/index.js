import { createStore } from 'vuex'
import user from './modules/user/index';
import calendar from './modules/calendar/index';
import memory from './modules/memory/index';
import common from "@/store/modules/common";
import modal from "@/store/modules/modal";

export const store = createStore({
    modules:{
        common,
        user,
        calendar,
        memory,
        modal
    }
});
