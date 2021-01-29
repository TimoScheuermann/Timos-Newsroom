<template>
  <div class="timos-newsroom">
    <NewsHeader v-model="darken" />
    <div class="router-view" :darken="darken" @click="darken = false">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import NewsHeader from './components/News-Header.vue';
import { backendURL } from './utils/constants';

@Component({
  components: {
    NewsHeader
  }
})
export default class App extends Vue {
  public darken = false;

  mounted() {
    if (!this.$store.getters.news) {
      fetch(`${backendURL}/newsroom?limit=9`)
        .then(res => res.json())
        .then(res => this.$store.commit('setNews', res));
    }
    if (!this.$store.getters.projects) {
      fetch(`${backendURL}/newsroom/projects/relevant`)
        .then(res => res.json())
        .then(res => this.$store.commit('setProjects', res));
    }
    if (!this.$store.getters.olderNews) {
      fetch(`${backendURL}/newsroom?limit=8&skip=9`)
        .then(res => res.json())
        .then(res => this.$store.commit('setOlderNews', res));
    }
    if (!this.$store.getters.featured) {
      fetch(`${backendURL}/newsroom/featured`)
        .then(res => res.json())
        .then(res => this.$store.commit('setFeatured', res));
    }
  }
}
</script>

<style lang="scss">
.router-view {
  transition: 0.2s ease-in-out;
  background: $background;
  &[darken] {
    filter: brightness(80%);
  }
}

html {
  font-family: -apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI,
    Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;
  scroll-behavior: smooth;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

html {
  background: $background;
  color: $color;
}

body {
  min-height: 100vh;
  margin: 0;
}

h1,
h2 {
  margin-top: 0;
}

[center] {
  text-align: center;
}

[error] {
  color: $error;
}

[huge] {
  font-size: 40px;
}

[content] {
  padding: 20px 5vw calc(20px + env(safe-area-inset-bottom));
}

[line-break] {
  white-space: pre-line;
}

[section-wrapper] {
  max-width: $content-max-width;
  margin: 0 auto;
}

img[logo] {
  max-height: 30px;
  margin-right: 10px;
}
</style>
