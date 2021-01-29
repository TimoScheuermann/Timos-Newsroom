<template>
  <div class="news-slider">
    <div class="slide-action" prev />
    <div class="slides" ref="slider">
      <div class="spacer" />
      <slot />
      <div class="spacer" />
    </div>
    <div class="slide-action" next />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class NewsSlider extends Vue {
  @Prop() value!: number;

  @Watch('value')
  valueChanged(to: number, from: number): void {
    if (this.element) {
      let amount = window.innerWidth * 0.8;
      if (from > to) amount *= -1;
      this.element.scrollBy({ left: amount, behavior: 'smooth' });
    }
  }

  get element(): HTMLElement {
    return this.$refs.slider as HTMLElement;
  }
}
</script>

<style lang="scss" scoped>
.news-slider {
  margin-top: 20px;
  .slides {
    width: 100vw;
    margin-left: -5vw;

    display: flex;
    overflow: hidden;
    user-select: none;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }

    .spacer {
      width: calc(100vw - #{$content-max-width}) !important;
      min-width: calc(5vw + 60px) !important;
      flex-shrink: 0;
    }
  }
}
</style>
