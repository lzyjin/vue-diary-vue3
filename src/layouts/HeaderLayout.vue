<script setup>
import { computed } from 'vue';
import { mapGetters } from "vuex";

const menuState = computed({
  ...mapGetters({
    menuState: 'common/menuState',
  }),
});

const openMenu = function () {
  this.$store.dispatch('common/OPEN_MENU');
}

const closeMenu = function () {
  this.$store.dispatch('common/CLOSE_MENU');
}
</script>

<template>
  <div>
    <header>
      <div class="wrap">
        <router-link to="/" class="home">다이어리</router-link>
        <div class="ham" @click="openMenu">
          <i class="xi-bars"></i>
        </div>
      </div>
    </header>

    <div class="menu" v-if="menuState">
      <div class="top">
        <div class="btn-close" @click="closeMenu">
          <i class="xi-close"></i>
        </div>
      </div>
      <nav>
        <router-link to="/calendar" class="link">캘린더</router-link>
        <router-link to="/memoryList" class="link">추억</router-link>
        <router-link to="/signup" class="link">회원가입</router-link>
        <router-link to="/signout" class="link" @click.native="closeMenu">로그아웃</router-link>
      </nav>
    </div>
  </div>
</template>

<style scoped>

</style>
