<template>
    <div>
        <div class="modal" :class="{ opened: opened }">
            <div class="modal-top">
                <button @click="closeModal" style="margin-left: auto">
                    <i class="xi-close"></i>
                </button>
            </div>
            <div class="modal-content">
                <div class="category">
                    <div class="c-item">
                        <strong>카테고리</strong>
                        <div class="select-wrap">
                            <select name="" id="" required v-model="modal.category">
                                <option value="" disabled hidden>카테고리 선택</option>
                                <option value="">전체</option>
                                <option v-for="item in categories" :value="item.en" :key="`${item.ko}_${item.en}`">
                                    {{ item.ko }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="c-item">
                        <strong>일자</strong>
<!--                        <date-picker-->
<!--                            v-model="modal.regDate"-->
<!--                            valueType="format"-->
<!--                            range-->
<!--                            placeholder="날짜 선택"-->
<!--                        ></date-picker>-->
                    </div>
                    <div class="c-item">
                        <strong>주소</strong>
                        <div class="input-wrap address">
                            <input type="text" name="" id="" v-model="modal.address" placeholder="주소 입력" />
                        </div>
                    </div>
                </div>
                <div class="btn-wrap">
                    <button class="btn-delete" @click="resetFilter">
                        <i class="xi-refresh"></i>
                    </button>
                    <button class="btn-save" @click="setFilter">적용</button>
                </div>
            </div>
        </div>
        <div class="dimmed"></div>
    </div>
</template>

<script>
// import DatePicker from 'vue2-datepicker';
import { MEMORY_CATEGORIES } from '@/config/constant.js';
import { mapGetters } from 'vuex';

export default {
    name: 'FilterModal',
    props: {
        opened: {
            type: Boolean,
            default: false,
        },
        resetMemoryList: {
            type: Function,
            default: () => {},
        },
    },
    components: {
        // DatePicker,
    },
    data() {
        return {
            modal: {
                opened: this.opened,

                // 검색조건
                category: '',
                categoryKo: '',
                address: '',
                regDate: ['', ''], // 배열로 ["2023-04-05", "2023-04-10"] 이런식으로 들어감
            },
        };
    },
    computed: {
        categories() {
            return MEMORY_CATEGORIES;
        },

        ...mapGetters({
            filter: 'memory/filter',
        }),
    },
    methods: {
        openModal(modalType) {
            this.modal[`${modalType}`] = true;
        },

        closeModal() {
            this.$emit('closeModal', 'FilterModal');
        },

        resetFilter() {
            this.modal.category = '';
            this.modal.regDate = [];
            this.modal.address = '';
        },

        setFilter() {
            MEMORY_CATEGORIES.forEach((v, i) => {
                if (this.modal.category === v.en) {
                    this.modal.categoryKo = v.ko;
                }
            });

            this.$store.commit('memory/MEMORY_SET_FILTER', {
                address: this.modal.address,
                category: this.modal.category,
                categoryKo: this.modal.categoryKo,
                startDate: this.modal.regDate[0],
                endDate: this.modal.regDate[1],
            });
            this.closeModal();
            this.resetMemoryList();
        },
    },
    mounted() {
        this.modal.category = this.filter.category;
        this.modal.address = this.filter.address;
        this.modal.regDate = [this.filter.startDate, this.filter.endDate];
    },
};
</script>

<style scoped></style>
