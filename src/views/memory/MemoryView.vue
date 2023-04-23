<template>
    <div>
        <div class="memory-wrap view">
            <!-- TODO: 수정한 후 리로드할 때 스와이퍼 맨 처음에서 시작하도록 수정하기 -->
            <swiper-container pagination="true" class="swiper-container">
                <swiper-slide class="swiper-slide" v-if="currentMemory?.firstPhoto?.photoUrl == null">
                    <img :src="require(`@/assets/images/noimage.png`)" alt="" />
                </swiper-slide>

                <swiper-slide class="swiper-slide" v-if="currentMemory?.firstPhoto?.photoUrl !== null">
                    <img :src="`${imgPrefix}${currentMemory?.firstPhoto?.photoUrl}`" alt="" />
                </swiper-slide>
                <swiper-slide class="swiper-slide" v-if="currentMemory?.secondPhoto?.photoUrl !== null">
                    <img :src="`${imgPrefix}${currentMemory?.secondPhoto?.photoUrl}`" alt="" />
                </swiper-slide>
                <swiper-slide class="swiper-slide" v-if="currentMemory?.thirdPhoto?.photoUrl !== null">
                    <img :src="`${imgPrefix}${currentMemory?.thirdPhoto?.photoUrl}`" alt="" />
                </swiper-slide>
            </swiper-container>

            <div class="inner">
                <div class="top">
                    <p>
                        <span class="memory-category">{{ categoryKo }}</span>
                        <span class="memory-regDate">{{ currentMemory.regDate }}</span>
                    </p>
                    <p class="memory-address">{{ currentMemory.address }}</p>
                    <div class="btn-modal" @click="openModal('selectModalOpened')">
                        <i class="xi-ellipsis-v"></i>
                    </div>
                </div>
                <p class="memory-content">{{ currentMemory.contents }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EditModal from '@/components/modal/EditModal.vue';
import { MEMORY_CATEGORIES, IMAGE_PREFIX } from '@/config/constant.js';
import ModalList from '@/components/ModalList.js';

export default {
    name: 'MemoryList',
    components: {
        EditModal,
    },
    data() {
        return {
            modal: {
                selectModalOpened: false,
                editModalOpened: false,
                isModify: false,
            },

            imgPrefix: IMAGE_PREFIX,
            categoryKo: '',
        };
    },
    computed: {
        ...mapGetters({
            currentMemory: 'memory/currentMemory',
        }),
    },
    methods: {
        openModal(modalType) {
            const { SelectModal } = ModalList;
            const payload = {
                opened: true,
                modifyMemory: this.modifyMemory, // function is first class citizen right? then you can
                deleteMemory: this.deleteMemory,
            };

            if (modalType === 'selectModalOpened') {
                this.$store.commit('modal/setModal', {
                    component: SelectModal,
                    data: payload,
                });
            }
        },

        modifyMemory() {
            this.modal.editModalOpened = true;
            this.modal.isModify = true;

            const { EditModal } = ModalList;
            const payload = {
                opened: true,
            };
            this.$store.commit('modal/setModal', {
                component: EditModal,
                data: payload,
            });
        },

        deleteMemory() {
            const memoryNo = this.$store.getters['memory/currentMemory'].memoryNo;
            if (confirm('정말 삭제하시겠습니까?')) {
                this.$store
                    .dispatch('memory/MEMORY_DELETE', memoryNo)
                    .then((response) => {
                        console.log(response);
                        alert('삭제되었습니다.');
                        this.$store.dispatch('memory/MEMORY_RESET');
                        this.$router.push('/memoryList');
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },

        renderMemory() {
            const memoryNo = this.$route.params.memoryNo;
            this.$store
                .dispatch('memory/MEMORY_GET', memoryNo)
                .then((response) => {
                    MEMORY_CATEGORIES.forEach((v, i) => {
                        if (this.currentMemory.category === v.en) {
                            this.categoryKo = v.ko;
                        }
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.renderMemory();
    },
};
</script>

<style scoped></style>
