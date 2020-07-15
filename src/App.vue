<template>
  <div class="timos-newsroom">
    <tc-header title="Timo's Newsroom" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
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
  padding: calc(50px + 5vw + env(safe-area-inset-top)) 5vw
    calc(5vw + env(safe-area-inset-bottom));
  @media #{$isMobile} {
    padding-bottom: calc(50px + 5vw + env(safe-area-inset-bottom));
  }
}
</style>
