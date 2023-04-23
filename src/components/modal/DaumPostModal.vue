<template>
    <div>
        <div class="modal" :class="{ opened: opened }">
            <div class="modal-top">
                <button @click="closeModal('daumPostModalOpened')" style="margin-left: auto">
                    <i class="xi-close"></i>
                </button>
            </div>
            <div class="modal-content">
                <DaumPostcode :on-complete="handleAddress" />
            </div>
        </div>
        <div class="dimmed"></div>
    </div>
</template>

<script>
// import DaumPostcode from 'vuejs-daum-postcode';
import EditModal from '@/components/modal/EditModal.vue';

export default {
    name: 'daumPostModal',
    props: {
        opened: {
            type: Boolean,
            default: false,
        },
        putAddress: {
            type: Function,
            default: () => {},
        },
    },
    components: {
        DaumPostcode,
    },
    data() {
        return {
            modal: {
                opened: this.opened,
            },
        };
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },

        handleAddress: function (data) {
            let fullAddress = data.address;
            let extraAddress = '';
            if (data.addressType === 'R') {
                if (data.bname !== '') {
                    extraAddress += data.bname;
                }
                if (data.buildingName !== '') {
                    extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
                }
                fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
            }

            this.$store.commit('memory/MEMORY_SET_ADDRESS', fullAddress);
            this.closeModal();
            const payload = {
                opened: true,
            };
            this.$store.commit('modal/setModal', {
                component: EditModal,
                data: payload,
            });
        },
    },
};
</script>

<style scoped></style>
