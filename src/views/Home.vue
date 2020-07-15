<template>
  <div class="home" content>
    <timos-newsroom--news-tile :news="latestNews" :latest="true" />
    <div class="news-grid news-grid--second-row">
      <timos-newsroom--news-tile
        v-for="n in secondAndThirdNews"
        :key="n.date.getTime()"
        :news="n"
      />
    </div>
    <div class="news-grid">
      <timos-newsroom--news-tile
        v-for="n in otherNews"
        :key="n.date.getTime()"
        :news="n"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { News } from '@/utils/models';
import { news } from '@/utils/constants';
import TimosNewsroomNewsTile from '@/components/TimosNewsroom-NewsTile.vue';

@Component({
  components: {
    'timos-newsroom--news-tile': TimosNewsroomNewsTile
  }
})
export default class Home extends Vue {
  get latestNews(): News {
    return news[0];
  }
  get secondAndThirdNews(): News[] {
    return news.filter((x, i: number) => i > 0 && i < 3);
  }
  get otherNews(): News[] {
    return news.filter((x: News, i: number) => i > 2);
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
