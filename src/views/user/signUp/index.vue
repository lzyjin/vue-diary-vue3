<script setup>
import router from "@/router/index.js";
import {ref} from "vue";

// data
const id = ref('');
const password = ref('');
const alertId = ref('');
const alertPassword = ref('');

// methods
const validateId = () => {
  // 알파벳 대소문자 또는 숫자, 6 ~ 15자리
  const regExp = /^[a-zA-Z0-9]{6,15}$/;
  alertId.value = '';
  if (!regExp.test(this.id)) {
    alertId.value = '아이디는 6~15글자의 영문 대소문자 또는 숫자의 조합이어야 합니다.';
    return false;
  }
  return true;
};

const validatePassword = () => {
  // 최소 8자리 이상 영문 대소문자, 숫자, 특수문자가 각각 1개 이상
  const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  alertPassword.value = '';
  if (!regExp.test(this.password)) {
    alertPassword.value = '비밀번호는 8글자 이상의 영문 대소문자와 숫자, 특수문자의 조합이어야 합니다.';
    return false;
  }
  return true;
};

const signUp = () => {
  if (validateId() && validatePassword()) {
    // console.log(this.id, this.password);

    // vuex 1단계: store.dispatch로 action 실행
    // store.dispatch가 트리거 된 액션 핸들러에 의해 반환된 Promise를 처리 할 수 있으며 Promise를 반환한다.
    this.$store.dispatch('user/SIGN_UP', {
      id: id.value,
      password: password.value,
    })
      .then(() => {
        // console.log(response);

        if (confirm('회원가입 되었습니다. 로그인을 해주세요.')) {
          router.push({
            name: 'SignIn',
          });
        }
      })
      .catch((e) => {
        console.error(e);

        alert(e.response.data.msg);
        id.value = '';
        password.value = '';
      });
  }
};
</script>

<template>
  <div>
    <h1 class="page-title">회원가입</h1>

    <div class="form">
      <form action="">
        <div class="item">
          <p class="label">아이디</p>
          <input type="text" class="data" v-model="id" @input="validateId"/>
          <p class="alert">{{ alertId }}</p>
        </div>
        <div class="item">
          <p class="label">비밀번호</p>
          <input type="password" class="data" v-model="password" @input="validatePassword"/>
          <p class="alert">{{ alertPassword }}</p>
        </div>
        <div class="item">
          <button type="button" @click="signUp" @keyup.enter="signUp">회원가입</button>
          <router-link to="SignIn" class="link">로그인은 여기로</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
