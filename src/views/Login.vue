<template>
  <div content class="newsroom-login">
    <h1>Login</h1>
    <tc-button name="google" @click="google()" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  mounted() {
    console.log('mounted');
    console.log(document.cookie);
  }
  public async google() {
    document.cookie = 'auth.timos.design-source=http://localhost:8080/login';

    window.open('http://localhost:3000/google');
    // const { data } = await axios.get('http://localhost:3000/google');
    // console.log(data);
  }
}
</script>

<style lang="scss" scoped></style>
