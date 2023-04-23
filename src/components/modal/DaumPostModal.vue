<script setup>
import { ref } from 'vue'
import { VueDaumPostcode } from 'vue-daum-postcode'
import EditModal from '@/components/modal/EditModal.vue';

const modal = ref({
    modal: {
        opened: this.opened,
    },
});

defineProps({
    opened: {
        type: Boolean,
        default: false,
    },
    putAddress: {
        type: Function,
        default: () => {},
    },
});

const closeModal = function () {
    this.$emit('closeModal');
};
const onComplete =  function (data) {
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
</script>

<template>
    <div>
        <div class="modal" :class="{ opened: opened }">
            <div class="modal-top">
                <button @click="closeModal('daumPostModalOpened')" style="margin-left: auto">
                    <i class="xi-close"></i>
                </button>
            </div>
            <div class="modal-content">
                <VueDaumPostcode @complete="onComplete" />
            </div>
        </div>
        <div class="dimmed"></div>
    </div>
</template>

<style scoped></style>
