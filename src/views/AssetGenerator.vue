<template>
  <div content class="asset-generator">
    <tc-headline :title="selected || 'Project'">
      <tc-select v-model="selected" :values="values" placeholder="Project" />
    </tc-headline>
    <p>{{ news }}</p>
    <div class="settings" v-if="selected">
      <tc-input placeholder="Title" v-model="news.title" />
      <tc-input placeholder="Description" v-model="news.description" />
      <tc-input placeholder="Background" v-model="background" />
      <tc-select placeholder="Type" v-model="news.type" :values="types" />
      <tc-input type="datetime-local" placeholder="Date" v-model="date" />
    </div>
    <component
      v-if="selected"
      :is="generators[selected]"
      :title="news.title"
      :description="news.description"
      :background="background"
      @title="updateTile"
      @description="updateDescription"
      @background="updateBackground"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { urls } from '@/utils/constants';
import GeneratorTimosIcons from '@/components/generators/Generator-TimosIcons.vue';
import { Project, News } from '../utils/models';
import { VueConstructor } from 'vue/types/umd';

@Component({
  components: {
    'generator-timos-icon': GeneratorTimosIcons
  }
})
export default class AssetGenerator extends Vue {
  public background = '';
  public types: string[] = ['update', 'change', 'feature'];

  public values: string[] = [];
  public selected: Project = "Timo's Icons";
  public news: News = {
    title: '',
    description: '',
    thumbnail: '',
    type: 'update',
    project: this.selected,
    date: 0
  };
  public date = '';
  public generators: Record<Project, VueConstructor> = {
    "Timo's Icons": GeneratorTimosIcons,
    'TC Components': GeneratorTimosIcons,
    Portfolio: GeneratorTimosIcons,
    'Investing Collectors': GeneratorTimosIcons,
    'DHBW Richie': GeneratorTimosIcons
  };

  @Watch('date')
  public dateChanged() {
    this.news.date = new Date(this.date).getTime();
  }

  mounted() {
    this.values = Object.keys(urls);
  }

  public updateTile(title: string) {
    this.news.title = title;
  }
  public updateDescription(description: string) {
    this.news.description = description;
  }
  public updateBackground(background: string) {
    this.background = background;
  }
}
</script>

<style lang="scss" scoped>
.settings {
  display: flex;
}
</style>
