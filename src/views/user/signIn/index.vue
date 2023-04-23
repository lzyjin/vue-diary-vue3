<template>
  <div>
    <h1 class="page-title">로그인</h1>

    <div class="form">
      <form action="">
        <div class="item">
          <p class="label">아이디</p>
          <input type="text" class="data" v-model="id"/>
          <p class="alert">{{ alertId }}</p>
        </div>
        <div class="item">
          <p class="label">비밀번호</p>
          <input type="password" class="data" v-model="password"/>
          <p class="alert">{{ alertPassword }}</p>
        </div>
        <div class="item">
          <button type="button" @click="signIn" @keyup.enter="signIn">로그인</button>
          <router-link to="SignUp" class="link">회원가입은 여기로</router-link>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";

export default {
  name: "index",
  data() {
    return {
      id: '',
      password: '',
      alertId: '',
      alertPassword: '',
    }
  },
  methods: {
    async signIn() {
      console.log(this.id, this.password);

      if (this.id === '') {
        this.alertId = '아이디를 입력하세요.';
      }

      if (this.password === '') {
        this.alertPassword = '비밀번호를 입력하세요.';
      }

      if (this.id !== '' && this.password !== '') {
        this.$store.dispatch('user/SIGN_IN', {
          id: this.id,
          password: this.password,
        })
        .then(() => {
          // console.log(response);

          if (confirm('로그인 되었습니다.')) {
            router.push({
              name: 'Calendar',
            });
          }
        })
        .catch(e => {
          console.log(e);
          alert(e.response.data.msg);
          this.id = '';
          this.password = '';
        });
      }
    },
  },
}
</script>

<style scoped>

</style>
