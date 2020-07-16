<template>
  <div class="home">
    <tc-hero tc-dark-container background="#f1c40f">
      <img
        slot="background"
        src="https://images.unsplash.com/photo-1567852384292-ab6358906959?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2132&q=80"
        alt=""
      />
      <div class="hero-content">
        <img src="pwa/maskIcon.svg" alt="" />
        <h1>Timo's Newsroom</h1>
      </div>
    </tc-hero>
    <tc-scroll-up />
    <div content>
      <timos-newsroom--news-tile :news="latestNews" :latest="true" />
      <div class="news-grid news-grid--second-row">
        <timos-newsroom--news-tile
          v-for="n in secondAndThirdNews"
          :key="n.date"
          :news="n"
        />
      </div>
      <div class="news-grid">
        <timos-newsroom--news-tile
          v-for="n in otherNews"
          :key="n.date"
          :news="n"
        />
      </div>
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
</style>
