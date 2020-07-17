<template>
  <div class="generator-timos-icons">
    <div class="options">
      <tc-select
        :values="versions"
        placeholder="Select Version"
        v-model="selectedVersion"
      />
    </div>
    <tc-slider min="10" max="100" v-model="width" />
    <tc-button name="Generate" @click="generate" />
    <div class="wrapper" :style="{ width: width + 'vw' }">
      <div id="icongenerated" class="container" :style="background">
        <i v-for="icon in selectedIcons" :key="icon" :class="'ti-' + icon" />
      </div>
    </div>
    <div id="result"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import html2canvas from 'html2canvas';

@Component
export default class GeneratorTimosIcons extends Vue {
  @Prop() title!: string;
  @Prop() description!: string;
  @Prop() background!: string;

  public width = 80;
  public selectedVersion = '2.12';
  public icons: { name: string; version: string }[] = [];

  mounted() {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://raw.githubusercontent.com/TimoScheuermann/Timos-Icons/master/public/resources/icons.json',
      true
    );
    xhr.send(null);
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        this.icons = JSON.parse(xhr.responseText);
      }
    };
    this.$emit('background', 'color:#fff;');
  }

  @Watch('selectedVersion')
  versionChanged(): void {
    this.$emit(
      'title',
      "Timo's Icons v" + this.selectedVersion + ' has been released'
    );
  }

  public amsIcons = [
    'ams-1',
    'ams-2',
    'ams-3',
    'ams-4',
    'ams-5',
    'ams-6',
    'ams-6-2',
    'ams-7',
    'ams-8',
    'ams-9',
    'ams-10'
  ];

  get selectedIcons(): string[] {
    const icons: string[] = this.icons
      .filter(x => (x.version || '1.0') === this.selectedVersion)
      .map(x => x.name);
    this.$emit(
      'description',
      'This updated brings ' +
        icons.length +
        ' new icons. Featuring ' +
        icons
          .join(', ')
          .split('-')
          .join(' ')
    );
    return icons;
  }

  get versions(): string[] {
    return [...new Set(this.icons.map(x => x.version || '1.0'))];
  }

  public generate(): void {
    // eslint-disable-next-line
    html2canvas(document.getElementById('icongenerated')!, {
      allowTaint: true,
      backgroundColor: null,
      imageTimeout: 0
    }).then(function(canvas) {
      // eslint-disable-next-line
      document.getElementById('result')!.appendChild(canvas);
    });
  }
}
</script>

<style lang="scss" scoped>
.options {
  display: flex;
}
.container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70vw;
  flex-wrap: wrap;
  i {
    margin: 20px;
    font-size: 2.5em;
  }
}
</style>
