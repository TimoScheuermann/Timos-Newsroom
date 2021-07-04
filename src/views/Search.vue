<template>
  <div class="view-search">
    <div content section-wrapper>
      <NewsSubview :title="query" />

      <tl-flow flow="column" v-if="!results">
        <tc-spinner size="20" />
        <p>Searching News...</p>
      </tl-flow>
      <tl-flow flow="column" v-else-if="results.length === 0">
        <i huge error class="ti-exclamation-triangle" />
        <p>The results you're looking for can't be found.</p>
      </tl-flow>

      <template v-else>
        <NewsTileSmall v-for="r in results" :key="r.id" :news="r" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import NewsSubview from '@/components/News-Subview.vue';
import NewsTileSmall from '@/components/News-Tile-Small.vue';
import { backendURL } from '@/utils/constants';
import { INewsExtended } from '@/utils/interfaces';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
    NewsSubview,
    NewsTileSmall
  }
})
export default class Search extends Vue {
  public results: INewsExtended[] | null = null;

  mounted() {
    this.search();
  }

  @Watch('$route.query')
  public search(): void {
    if (!this.query || this.query.length === 0) {
      this.$router.push({ name: 'home' });
      return;
    }

    this.results = null;

    fetch(`${backendURL}/newsroom/?query=${encodeURI(this.query)}`)
      .then(res => res.json())
      .then(res => (this.results = res));
  }

  get query(): string | null {
    return this.$route.query.query as string | null;
  }
}
</script>

<style lang="scss" scoped>
.view-search {
  min-height: 100vh;
}
</style>
