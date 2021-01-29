<template>
  <div class="view-home">
    <tl-flow v-if="!news && !olderNews" flow="column">
      <tc-spinner size="20" />
      <p>Loading news...</p>
    </tl-flow>

    <section content v-if="news">
      <div section-wrapper>
        <h1>Latest News</h1>
        <div class="news-tiles">
          <NewsTile v-for="n in news" :key="n._id" :news="n" />
        </div>
      </div>
    </section>

    <section content dark v-if="featured && featured.length > 0">
      <h1 section-wrapper>Featured News</h1>
      <NewsSlider v-model="currentSlide">
        <NewsTileFeatured
          v-for="(f, i) in featured"
          :key="f._id + i"
          :news="f"
          :id="'featured-' + i"
          :focused="i === currentSlide"
          @focus="currentSlide = i"
        />
      </NewsSlider>

      <tl-flow horizontal="space-between" section-wrapper>
        <div class="indicator">
          <span
            v-for="(a, i) in Array(slideAmount)"
            :key="i"
            :active="i === currentSlide"
            @click="currentSlide = i"
          />
        </div>
        <div class="buttons">
          <a @click="prevSlide()" :disabled="currentSlide === 0">
            <i class="ti-chevron-left" />
          </a>
          <a @click="nextSlide()" :disabled="currentSlide === slideAmount - 1">
            <i class="ti-chevron-right" />
          </a>
        </div>
      </tl-flow>
    </section>

    <section content v-if="olderNews">
      <div section-wrapper>
        <h1>Older News</h1>
        <div class="news-tiles-small">
          <NewsTileSmall v-for="n in olderNews" :key="n._id" :news="n" />
        </div>
        <tc-link routeName="archive">
          View more <i class="ti-chevron-right" />
        </tc-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import NewsSlider from '@/components/News-Slider.vue';
import NewsTileFeatured from '@/components/News-Tile-Featured.vue';
import NewsTileSmall from '@/components/News-Tile-Small.vue';
import NewsTile from '@/components/News-Tile.vue';
import { INewsExtended } from '@/utils/interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    NewsTile,
    NewsTileSmall,
    NewsTileFeatured,
    NewsSlider
  }
})
export default class Home extends Vue {
  public currentSlide = 0;

  get news(): INewsExtended[] | null {
    return this.$store.getters.news;
  }

  get olderNews(): INewsExtended[] | null {
    return this.$store.getters.olderNews;
  }

  get featured(): INewsExtended[] | null {
    return this.$store.getters.featured;
  }

  get slideAmount(): number {
    if (!this.featured) return 0;
    return this.featured.length;
  }

  public nextSlide(): void {
    this.currentSlide = Math.min(this.slideAmount - 1, ++this.currentSlide);
  }

  public prevSlide(): void {
    this.currentSlide = Math.max(0, --this.currentSlide);
  }
}
</script>

<style lang="scss" scoped>
.view-home {
  [dark] {
    background: $background_dark;
    color: $color_dark;
    margin: 20px 0;
    padding: 30px 5vw;
  }

  .news-tiles {
    display: grid;
    grid-gap: 30px;

    @media only screen and (min-width: 1000px) {
      grid-template-columns: repeat(6, 1fr);
      .news-tile {
        &:nth-child(1) {
          grid-column: 1 / -1;
        }
        &:nth-child(2),
        &:nth-child(3) {
          grid-column: span 3;
        }
        &:nth-child(n + 4) {
          grid-column: span 2;
        }
      }
    }

    @media only screen and (min-width: 500px) and (max-width: 999px) {
      grid-template-columns: repeat(2, 1fr);
      .news-tile {
        &:nth-child(1) {
          grid-column: 1 / -1;
        }
      }
    }

    @media only screen and (max-width: 499px) {
      grid-template-columns: 1fr;
    }
  }

  .news-tiles-small {
    display: grid;
    grid-gap: 0 30px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    border: 1px solid rgba($color, 0.25);
    border-left: none;
    border-right: none;
    margin-bottom: 30px;

    .news-tile-small {
      @media only screen and(min-width: 719px) {
        &:nth-child(7) {
          border-bottom: none;
        }
      }
    }
  }

  .tc-link {
    display: block;
    width: fit-content;
    margin: 0 auto;
    i {
      font-size: 12px;
    }
    margin-bottom: calc(30px + env(safe-area-inset-bottom));
  }

  .tl-flow {
    margin-top: 20px;
    .indicator {
      span {
        display: inline-block;
        $scale: 12px;
        font-size: 30px;
        background: #fff;
        width: $scale;
        height: $scale;
        border-radius: $scale;
        margin-right: 10px;
        opacity: 0.5;
        cursor: pointer;

        &:hover {
          opacity: 0.75;
        }
        &[active] {
          opacity: 1;
        }
      }
    }
    .buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      a {
        $scale: 40px;
        height: $scale;
        width: $scale;
        border-radius: $scale;
        border: 2.3px solid #fff;
        display: grid;
        place-content: center;
        box-sizing: border-box;
        transition: 0.2s ease-in-out;

        &[disabled] {
          opacity: 0.5;
        }
        &:not([disabled]) {
          cursor: pointer;
          &:hover {
            border-width: #{$scale / 2};
            color: $paragraph_dark;
          }
        }
        i {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
