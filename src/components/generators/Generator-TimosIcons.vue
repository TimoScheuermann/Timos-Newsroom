<template>
  <div class="generator-timos-icons">
    <div class="options">
      <tc-select
        :values="versions"
        placeholder="Select Version"
        v-model="selectedVersion"
      />
    </div>
    <div class="container" :style="{ background: background }">
      <img v-if="background.startsWith('http')" :src="background" alt="" />
      <div class="content">
        <div
          class="icon"
          v-for="icon in selectedIcons.filter((x, i) => i < 24)"
          :key="icon"
        >
          <i :class="'ti-' + icon"></i>
        </div>
        <div class="infobox">
          <h1>v{{ selectedVersion }}</h1>
          <p>
            Adding
            {{ selectedIcons.length }}
            new Icons
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
@Component
export default class GeneratorTimosIcons extends Vue {
  @Prop() title!: string;
  @Prop() description!: string;
  @Prop() background!: string;

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
    this.$emit('background', 'https://icons.timos.design/assets/hero.jpg');
  }

  @Watch('selectedVersion')
  versionChanged(): void {
    this.$emit(
      'title',
      "Timo's Icons v" + this.selectedVersion + ' has been released'
    );
  }

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
}
</script>

<style lang="scss" scoped>
.options {
  display: flex;
}
.container {
  margin-top: 20px;
  border: 10px solid red;
  position: relative;
  width: 1300px;
  height: calc(1300px / 9 * 3);
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .content {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;

    display: grid;
    grid-gap: 0;
    grid-template-columns: repeat(9, calc(1300px / 9));
    grid-template-rows: repeat(3, calc(1300px / 9));
    .infobox {
      h1,
      p {
        margin: 0;
      }
      grid-column: 4 / 7;
      grid-row: 2 / 3;
      @include backdrop-blur(#000);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: $border-radius;
      padding: 30px;
      p {
        margin-top: 20px;
        font-weight: bold;
      }
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2.5em;
    }
    color: #fff;
  }
}
</style>
