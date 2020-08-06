<template>
  <div class="timos-newsroom">
    <tc-navbar :autoBackground="true">
      <tl-flow pointer slot="logo">
        <img logo src="pwa/maskIcon.svg" alt="" @click="goHome()" />
        <b @click="goHome()">Newsroom</b>
      </tl-flow>
      <template slot="actions">
        <tc-button
          v-if="!$store.getters.valid"
          @click="login"
          name="Login"
          icon="login"
        />
        <tc-button v-else @click="logout" name="Logout" icon="logout" />
      </template>
      <template
        v-if="$store.getters.valid && $store.getters.user.group === 'Admin'"
      >
        <tc-navbar-item icon="add" name="Post News" routeName="post" />
        <tc-navbar-item icon="newspaper" name="Edit News" routeName="edit" />
      </template>
    </tc-navbar>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { axios } from '@/utils/constants';
import { EventBus } from '@/utils/eventbus';
import {
  signOutTAUser,
  verfiyTAUser,
  signInTAUser,
  getTAUser,
  persistLogin
} from 'timos-accounts';

@Component
export default class App extends Vue {
  async mounted() {
    const { data } = await axios.get('https://api.timos.design/newsroom');
    this.$store.commit('setNews', data);

    const possibleToken = this.$route.query.taToken as string;
    if (possibleToken) persistLogin(possibleToken);

    if (await verfiyTAUser()) {
      this.$store.commit('validate', getTAUser());
    }
  }

  public async login() {
    if (!(await verfiyTAUser())) {
      signInTAUser(
        process.env.VUE_APP_REDIRECT || 'https://newsroom.timos.design'
      );
    } else {
      this.$store.commit('validate', getTAUser());
    }
  }

  public logout() {
    signOutTAUser();
  }

  public openList(): void {
    EventBus.$emit('open-list-modal');
  }

  public goHome(): void {
    if (this.$route.name !== 'home') {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI,
    Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
  scroll-behavior: smooth;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

body {
  background: $background;
  color: $color;
  margin: 0;
}

[content] {
  padding: calc(50px + env(safe-area-inset-top)) 5vw
    calc(5vw + env(safe-area-inset-bottom));
}
[pointer] {
  cursor: pointer;
}
img[logo] {
  max-height: 40px;
  margin-right: 10px;
}
</style>
