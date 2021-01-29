<template>
  <div class="news-subview">
    <div class="subtitle">{{ subtitle }}</div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class NewsSubview extends Vue {
  @Prop() title!: string;
  @Prop({ default: 'latest news' }) subtitle!: string;
}
</script>
<style lang="scss" scoped>
.news-subview {
  .subtitle {
    font-size: 12px;
    font-weight: bold;
    color: rgba($color, 0.5);
    text-transform: uppercase;
  }
  .title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
  }
}
</style>
