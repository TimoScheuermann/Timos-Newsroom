<template>
  <div class="timos-newsroom">
    <tc-header title="Timo's Newsroom" :autoBackground="true">
      <tc-button
        v-if="$route.name === 'post'"
        @click="openList"
        name="Edit post"
        icon="newspaper"
      />
      <tc-button icon="login" name="Sign in" :to="{ name: 'login' }" />
    </tc-header>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { axios } from '@/utils/constants';
import { EventBus } from '@/utils/eventbus';

@Component
export default class App extends Vue {
  async mounted() {
    const { data } = await axios.get('http://api.timos.design/newsroom');
    this.$store.commit('setNews', data);
  }

  public openList(): void {
    EventBus.$emit('open-list-modal');
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
</style>
