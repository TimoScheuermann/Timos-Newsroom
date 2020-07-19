<template>
  <div class="timos-newsroom--gallery">
    <timos-newsroom--news-tile :news="latestNews" :index="0" :latest="true" />
    <div class="news-grid news-grid--second-row">
      <timos-newsroom--news-tile
        v-for="(n, i) in secondAndThirdNews"
        :key="n._id + i + 'a'"
        :news="n"
        :index="i + 1"
      />
    </div>
    <div class="news-grid">
      <timos-newsroom--news-tile
        v-for="(n, i) in otherNews"
        :key="n._id + i + 'b'"
        :news="n"
        :index="i + 3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { News } from '@/utils/models';
import TimosNewsroomNewsTile from '@/components/TimosNewsroom-NewsTile.vue';

@Component({
  components: {
    'timos-newsroom--news-tile': TimosNewsroomNewsTile
  }
})
export default class TimosNewsroomGallery extends Vue {
  @Prop() news!: News[];

  get latestNews(): News {
    return this.news[0];
  }
  get secondAndThirdNews(): News[] {
    return this.news.filter((x, i: number) => i > 0 && i < 3);
  }
  get otherNews(): News[] {
    return this.news.filter((x: News, i: number) => i > 2);
  }
}
</script>

<style lang="scss" scoped>
.news-grid {
  display: grid;
  grid-gap: 40px;
  margin-top: 40px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

  &.news-grid--second-row {
    @media only screen and(min-width: 800px) {
      grid-template-columns: 1fr 1fr;
    }
    @media only screen and(min-width: 950px) {
      grid-template-columns: 6fr 4fr;
    }
  }
}
</style>
