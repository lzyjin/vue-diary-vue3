<template>
    <div>
        <div class="calendar-wrap">
            <div class="month-wrap">
                <button class="btn-prev-month" @click="renderPrevMonth">&lt;</button>
                <p class="curr-month">{{ currentYear }}년 {{ currentMonth + 1 }}월</p>
                <button class="btn-next-month" @click="renderNextMonth">&gt;</button>
            </div>
            <div class="calendar">
                <div class="cal-header">
                    <div class="day">월</div>
                    <div class="day">화</div>
                    <div class="day">수</div>
                    <div class="day">목</div>
                    <div class="day">금</div>
                    <div class="day">토</div>
                    <div class="day">일</div>
                </div>
                <div class="cal-content">
                    <div
                        v-for="(item, index) in calendarData"
                        :key="index"
                        class="date"
                        :class="{
                            disable: item.disable,
                            today:
                                currentYear === today.year && currentMonth === today.month && item.date === today.date,
                        }"
                        @click="openListModal(item)"
                    >
                        <span>{{ item.date }}</span>
                        <em v-if="item?.data && item?.data?.length > 0" class="mark">💜</em>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="modal.listModalOpened">
            <div class="modal" :class="{ opened: modal.listModalOpened }">
                <div class="modal-top">
                    <p class="date">{{ modal.date }}일 {{ modal.day }}요일</p>
                    <button>
                        <i class="xi-close" @click="closeListModal"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <p class="m-count">총 {{ modal.scheduleList.length }}개</p>
                    <ul>
                        <li
                            v-for="(schedule, index) in modal.scheduleList"
                            :key="index"
                            @click="openViewModal(schedule)"
                        >
                            <p>{{ schedule.contents }}</p>
                        </li>

                        <li
                            class="m-content"
                            @click="
                                openViewModal({
                                    contents: '',
                                    diaryNo: 0,
                                    regDate: '',
                                    userNo: 0,
                                })
                            "
                        >
                            <p><i class="xi-plus"></i> 일정 추가하기</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="dimmed"></div>
        </div>
        <div v-if="modal.viewModalOpened">
            <div class="modal" :class="{ opened: modal.viewModalOpened }">
                <div class="modal-top">
                    <p class="date">{{ modal.date }}일 {{ modal.day }}요일</p>
                    <button @click="closeViewModal">
                        <i class="xi-close"></i>
                    </button>
                </div>
                <div class="modal-content">
                    <textarea class="content-wrap" v-model="calContent"></textarea>
                    <div class="btn-wrap">
                        <button class="btn-delete" v-if="diaryNo !== ''" @click="removeCalendar(diaryNo)">
                            <i class="xi-trash"></i>
                        </button>
                        <!-- TODO: 등록하면 날짜 안맞게 등록됌 -->
                        <!-- TODO: 등록인데 수정으로 뜸, 수정해야함 -->
                        <button class="btn-save" @click="saveCalendar()">{{ diaryNo === '' ? '저장' : '수정' }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CalendarList',

    computed: {
        ...mapGetters({
            calendarList: 'calendar/calendarList',
            getSignedInUserData: 'user/getSignedInUserData',
        }),
    },

    components: {},

    data() {
        return {
            today: {
                year: '',
                month: '',
                date: '',
                day: '',
            },

            lastMonthLastDate: 0,
            lastMonthLastDay: 0,
            thisMonthLastDate: 0,
            thisMonthLastDay: 0,

            currentYear: 0,
            currentMonth: 0,
            currentDate: 0,

            calendarData: [],

            modal: {
                listModalOpened: false,
                viewModalOpened: false,
                date: '',
                day: '',
                scheduleList: [],
            },

            calContent: '',
            diaryNo: '',
        };
    },

    methods: {
        renderCalendar(thisMonthDate) {
            // month 는 0이 1월, 1이 2월 ... 11이 12월
            // day는 0이 일요일, 1이 월요일 ... 6이 토요일
            this.currentYear = thisMonthDate.getFullYear();
            this.currentMonth = thisMonthDate.getMonth();
            this.currentDate = thisMonthDate.getDate();

            // Date 객체를 만들 때 날짜를 0으로 지정하면 지난 달의 마지막 날짜를 가진 Date 객체가 반환된다.

            // 지난 달의 마지막 날의 날짜와 요일
            const lastMonthLastD = new Date(this.currentYear, this.currentMonth, 0);
            this.lastMonthLastDate = lastMonthLastD.getDate();
            this.lastMonthLastDay = lastMonthLastD.getDay();

            // 이번 달의 마지막 날의 날짜와 요일
            const thisMonthLastD = new Date(this.currentYear, this.currentMonth + 1, 0);
            this.thisMonthLastDate = thisMonthLastD.getDate();
            this.thisMonthLastDay = thisMonthLastD.getDay();

            let calendarData = [];

            // 지난달 렌더링
            for (let i = this.lastMonthLastDate - this.lastMonthLastDay + 1; i <= this.lastMonthLastDate; i++) {
                calendarData.push({
                    date: i,
                    disable: true,
                });
            }

            // 이번달 렌더링
            for (let i = 1; i < this.thisMonthLastDate + 1; i++) {
                calendarData.push({
                    date: i,
                    disable: false,
                    data: [],
                });

                // 이번달의 날짜에 해당하는 일정을 calendarDate.data 배열에 push
                this.calendarList.filter((v) => {
                    if (i === new Date(v.regDate).getDate()) {
                        calendarData[i + 1].data.push(v);
                    }
                });
            }

            // 다음달 렌더링
            for (let i = 1; i <= (this.thisMonthLastDay === 0 ? 0 : 7 - this.thisMonthLastDay); i++) {
                calendarData.push({
                    date: i,
                    disable: true,
                });
            }

            this.calendarData = calendarData;
        },

        fetchCalendar() {
            const userNo = this.getSignedInUserData.userNo;
            this.$store
                .dispatch('calendar/CALENDAR_LIST', {
                    userNo,
                    year: this.currentYear,
                    month: this.currentMonth + 1,
                })
                .then(() => {
                    this.renderCalendar(new Date(this.currentYear, this.currentMonth, this.currentDate));
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        renderPrevMonth() {
            this.currentMonth = this.currentMonth - 1;
            this.fetchCalendar();
        },

        renderNextMonth() {
            this.currentMonth = this.currentMonth + 1;
            this.fetchCalendar();
        },

        openListModal(item) {
            this.modal.listModalOpened = true;
            this.modal.scheduleList = item.data;
            this.modal.date = item.date;
            let day = new Date(this.currentYear, this.currentMonth, item.date).getDay();
            switch (day) {
                case 1:
                    day = '월';
                    break;
                case 2:
                    day = '화';
                    break;
                case 3:
                    day = '수';
                    break;
                case 4:
                    day = '목';
                    break;
                case 5:
                    day = '금';
                    break;
                case 6:
                    day = '토';
                    break;
                case 0:
                    day = '일';
                    break;
            }
            this.modal.day = day;
        },

        closeListModal() {
            this.modal.listModalOpened = false;
        },

        openViewModal(schedule) {
            this.modal.viewModalOpened = true;
            this.calContent = schedule?.contents;
            this.diaryNo = schedule?.diaryNo;
        },

        closeViewModal() {
            this.calContent = '';
            this.modal.viewModalOpened = false;
        },

        saveCalendar() {
            // 참고 블로그: https://gurtn.tistory.com/65
            const TIME_ZONE = 3240 * 10000; // 9시간
            const userNo = this.getSignedInUserData.userNo;
            const diaryNo = this.diaryNo;
            const contents = this.calContent;
            const date = new Date(this.currentYear, this.currentMonth, this.modal.date);
            // 한국시간으로 안맞는듯 -> 날짜 안맞음 & 컨텐츠 안불러와짐 -> toISOString() 메서드가 UTC기준이라고 함
            const regDate = new Date(+date + TIME_ZONE).toISOString().split('T')[0];

            // console.log(userNo, contents, regDate);

            if (confirm(diaryNo === '' ? '저장하시겠습니까?' : '수정하시겠습니까?')) {
                this.$store
                    .dispatch('calendar/CALENDAR_SAVE', {
                        userNo,
                        contents,
                        regDate,
                        diaryNo,
                    })
                    .then((response) => {
                        if (confirm(diaryNo === '' ? '저장되었습니다.' : '수정되었습니다.')) {
                            this.fetchCalendar();
                            this.closeViewModal();
                            this.closeListModal();
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },

        removeCalendar(diaryNo) {
            if (confirm('삭제하시겠습니까?')) {
                this.$store
                    .dispatch('calendar/CALENDAR_REMOVE', diaryNo)
                    .then((response) => {
                        if (confirm('삭제되었습니다.')) {
                            this.fetchCalendar();
                            this.closeViewModal();
                            this.closeListModal();
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
    },

    mounted() {
        // 참고 블로그: https://songsong.dev/11
        // API: 121.161.237.50:50005/swagger-ui/index.html

        const today = new Date();
        this.today.year = today.getFullYear();
        this.today.month = today.getMonth();
        this.today.date = today.getDate();
        this.today.day = today.getDay();

        // 달력에서 표기하는 년, 월, 일
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();
        this.currentDate = today.getDate();

        this.fetchCalendar();
    },
};
</script>

<style scoped></style>
