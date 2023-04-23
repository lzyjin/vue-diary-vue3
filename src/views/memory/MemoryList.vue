<template>
    <div>
        <div class="memory-wrap">
            <div class="top">
                <div class="wrap">
                    <input
                        type="text"
                        v-model="searchKeyword"
                        @input="resetMemoryList"
                        placeholder="검색어를 입력해주세요"
                    />
                    <div class="btn-filter" @click="openModal('filterModalOpened')">
                        <span>필터</span>
                    </div>
                </div>
                <div class="wrap">
                    <p class="total">전체 {{ memoryListPageInfo?.totalElement }}개 중 {{ memoryList.length }}개</p>
                    <div class="btn-add" @click="openModal('editModalOpened')">등록</div>
                </div>
                <div class="wrap">
                    <p>
                        <i class="xi-filter"></i> 카테고리: {{ filter.categoryKo }} / 일자: {{ filter.startDate }} ~
                        {{ filter.endDate }} / 주소: {{ filter.address }}
                    </p>
                </div>
            </div>

            <div class="list">
                <div v-for="(v, i) in memoryList" :key="`memory_${i}`" class="item">
                    <router-link :to="{ path: `/memoryView/${v.memoryNo}` }">
                        <div class="img">
                            <img
                                :src="`http://121.161.237.50:9999/origin/${v.firstPhoto.photoUrl}`"
                                alt=""
                                v-if="v.firstPhoto.photoUrl !== null"
                            />
                            <img :src="require(`@/assets/images/noimage.png`)" alt="" v-else />
                        </div>
                        <div class="text">
                            <p class="desc">{{ v.contents }}</p>
                            <p class="date">{{ v.regDate }}</p>
                        </div>
                    </router-link>
                </div>
                <div
                    v-observe-visibility="{
                        callback: visibilityChanged,
                        throttle: 2000,
                        throttleOptions: {
                            leading: 'visible',
                        },
                    }"
                    :key="key"
                ></div>
            </div>
        </div>

        <!-- TODO: Edit 모달 - 등록, 수정 되는지 확인 필요 (CORS 에러 해결해야함) -->
    </div>
</template>

<script>
// import 'vue2-datepicker/index.css';
import { mapGetters } from 'vuex';
// import { debounce } from 'lodash';
import EditModal from '@/components/modal/EditModal.vue';
import FilterModal from '@/components/modal/FilterModal.vue';
import ModalList from '@/components/ModalList.js';

export default {
    name: 'MemoryList',
    components: {
        FilterModal,
        EditModal,
    },
    computed: {
        ...mapGetters({
            memoryList: 'memory/memoryList',
            memoryListPageInfo: 'memory/memoryListPageInfo',
            filter: 'memory/filter',
        }),
    },
    data() {
        return {
            modal: {
                editModalOpened: false,
                filterModalOpened: false,
            },
            searchKeyword: '',

            page: 1,
            limit: 10,
            key: 1,
            isVisible: true,
        };
    },
    methods: {
        // TODO: 뷰페이지 들어갔다가 나오면 클릭한 글 위치에 돌아오도록 하기!!
        visibilityChanged: _.debounce(function (isVisible, entry) {
            this.isVisible = isVisible;

            let payload = {
                userNo: this.$store.getters['user/getSignedInUserData'].userNo,
                page: this.page,
                limit: this.limit,

                address: this.filter.address,
                startDate: this.filter.startDate,
                endDate: this.filter.endDate,
                searchText: this.searchKeyword.trim(),
            };

            if (this.filter.category !== '') {
                payload.category = this.filter.category; // 얘는 카테고리 검색할때만 보내기
            }

            if (this.memoryListPageInfo.hasNext && this.isVisible) {
                this.$store
                    .dispatch('memory/MEMORY_LIST', payload)
                    .then((response) => {
                        console.log(response);
                        this.page += 1;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        }, 300),

        openModal(modalType) {
            if (modalType === 'editModalOpened') {
                const { EditModal } = ModalList;
                const payload = {
                    opened: true,
                    editSuccess: this.editSuccess,
                };
                this.$store.commit('modal/setModal', {
                    component: EditModal,
                    data: payload,
                });
            }

            if (modalType === 'filterModalOpened') {
                const { FilterModal } = ModalList;
                const payload = {
                    opened: true,
                    resetMemoryList: this.resetMemoryList,
                };
                this.$store.commit('modal/setModal', {
                    component: FilterModal,
                    data: payload,
                });
            }
        },

        closeModal(modalType) {
            this.modal[`${modalType}`] = false;
        },

        editSuccess() {
            this.closeModal('editModalOpened');
            this.resetMemoryList();
        },
        resetMemoryList: _.debounce(function () {
            this.$store.commit('memory/MEMORY_LIST_RESET');
            this.$store.commit('memory/MEMORY_LIST_PAGE_RESET');
            this.page = 1;
            this.key += 1;
        }, 300),
    },

    beforeMount() {
        this.resetMemoryList();
    },
};
</script>

<style scoped></style>
