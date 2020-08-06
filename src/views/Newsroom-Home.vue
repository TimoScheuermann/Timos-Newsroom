<template>
  <div class="home">
    <tc-hero tc-dark-container background="#f1c40f">
      <img slot="background" src="assets/hero.jpg" alt="" />
      <div class="hero-content">
        <img src="pwa/maskIcon.svg" alt="" />
      </div>
    </tc-hero>
    <tc-scroll-up />
    <div content>
      <timos-newsroom--gallery v-if="news && news.length > 0" :news="news" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { News } from '@/utils/models';
import TimosNewsroomGallery from '@/components/TimosNewsroom-Gallery.vue';

@Component({
  components: {
    'timos-newsroom--gallery': TimosNewsroomGallery
  }
})
export default class Home extends Vue {
  get news(): News[] {
    return this.$store.getters.news;
  }
}
</script>

<style lang="scss" scoped>
.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 120px;
    height: 120px;
  }
  h1 {
    margin: 0;
    color: #fff;
  }
}
.tc-scroll-up {
  z-index: 200;
}
</style>
