<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

import HeaderLayout from '@/layouts/HeaderLayout.vue';
import ContentLayout from '@/layouts/contentLayout.vue';

// computed: {
//   modal() {
//     return this.$store.getters['modal/getModal'];
//   },
// },
// methods: {
//   closeModal(modalName) {
//     this.$store.commit('modal/closeModal', modalName);
//   },
// },
</script>

<template>
  <div id="app">
    <div id="container">
      <header-layout />
<!--      <Component v-for="(v, i) in modal"-->
<!--                 :key="`${v.component.name}_${i}`"-->
<!--                 :is="v.component.name"-->
<!--                 v-bind="v.data"-->
<!--                 @closeModal="closeModal(v.component.name)" />-->
      <content-layout />
    </div>
  </div>
</template>

<style scoped>
@import './assets/sass/style.css';
</style>
