import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/user/signIn/index.vue';
import SignUp from "@/views/user/signUp/index.vue";
import CalendarList from "@/views/calendar/CalendarList.vue";
import MemoryList from "@/views/memory/MemoryList.vue";
import MemoryView from "@/views/memory/MemoryView.vue";
import { store } from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signIn',
      component: SignIn,
    },
    {
      path: '/signout',
      name:'signOut',
    },
    {
      path: '/signup',
      name:'SignUp',
      component: SignUp,
    },
    {
      path: '/calendar',
      name:'Calendar',
      component: CalendarList,
    },
    {
      path: '/memoryList',
      name: 'MemoryList',
      component: MemoryList,
    },
    {
      path: '/memoryView/:memoryNo',
      name: 'MemoryView',
      component: MemoryView,
    },
  ]
});

router.beforeEach((to, from, next) => {
  store.dispatch('common/CLOSE_MENU');

  if (to.name === 'SignOut') {
    localStorage.removeItem('userData');
    store.dispatch('user/SIGN_OUT')
        .then(() => {
          alert('로그아웃되었습니다. 다시 로그인을 해 주세요.');
          next("/signin");
        });
  } else if (to.name === 'Calendar') {
    if (!store.getters["user/getSignedInUserData"]) {
      alert("로그인이 필요합니다.");
      next("/signin");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
