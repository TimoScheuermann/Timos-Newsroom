<template>
  <div
    class="news-header"
    :enabled="darken"
    :dark="darkBackground"
    ref="header"
  >
    <tl-flow class="header-wrapper" horizontal="space-between">
      <div @click="goHome()">
        <tl-flow class="logo">
          <img src="pwa/maskIcon.svg" alt="" />
          <div class="title">Newsroom</div>
        </tl-flow>
      </div>
      <div @click.capture="toggleExpand()">
        <tl-flow class="search-wrapper">
          <div class="search">Search</div>
          <i class="ti-chevron-down"></i>
        </tl-flow>
      </div>
    </tl-flow>

    <div class="expand-wrapper" :expanded="expanded">
      <TransitionExpand>
        <div class="expand-container" v-if="expanded">
          <form @submit.prevent="search">
            <label for="query">
              <i class="ti-lens"></i>
            </label>
            <input
              id="query"
              ref="input"
              placeholder="Search Newsroom"
              v-model="query"
              type="text"
            />
          </form>

          <template v-if="projects">
            <h3>Projects</h3>
            <transition appear name="projects">
              <div class="projects">
                <router-link
                  :to="{ name: 'project', params: { project: p.title } }"
                  v-for="p in projects"
                  :key="p.id"
                >
                  {{ p.title }}
                </router-link>
              </div>
            </transition>
          </template>
        </div>
      </TransitionExpand>
    </div>
  </div>
</template>

<script lang="ts">
import { collide } from '@/utils/functions';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import TransitionExpand from './TransitionExpand.vue';

@Component({
  components: {
    TransitionExpand
  }
})
export default class NewsHeader extends Vue {
  @Prop() value!: boolean;

  public darken = this.value;
  public query = '';
  public expanded = false;
  public darkBackground = false;
  public timer = 0;

  mounted() {
    // window.addEventListener('scroll', this.scrollListener);
  }
  beforeDestroy() {
    // window.removeEventListener('scroll', this.scrollListener);
  }

  get projects(): string[] | null {
    return this.$store.getters.projects;
  }

  public scrollListener(e: Event) {
    const header = this.$refs.header as HTMLElement;
    const dark = document.querySelectorAll('[dark]') as NodeListOf<HTMLElement>;
    if (header) {
      this.darkBackground = Array.from(dark).some(x => {
        return collide(x, header);
      });
    }
  }

  @Watch('darken')
  darkenChaned(): void {
    this.$emit('input', this.darken);
  }

  @Watch('value')
  valueChanged(): void {
    this.darken = this.value;
    if (!this.darken) {
      this.expanded = false;
    }
  }

  @Watch('$route', { deep: true })
  routeChanged(): void {
    this.darken = false;
    this.expanded = false;
  }

  public toggleExpand(): void {
    this.darken = !this.darken;
    this.expanded = this.darken;

    setTimeout(() => {
      if (this.expanded) (this.$refs.input as HTMLInputElement).focus();
    }, 100);
  }

  public search(): void {
    if (this.query.length > 0) {
      this.$router.push({ name: 'search', query: { query: this.query } });
    }
  }

  public goHome(): void {
    if (this.$route.name !== 'home') {
      this.$router.push({ name: 'home' });
    }
  }
}
</script>
<style lang="scss" scoped>
.news-header {
  padding: 0 5vw;
  padding-top: env(safe-area-inset-top);
  position: sticky;

  top: 0;
  z-index: 100;

  @include backdrop-blur($paragraph);
  &[dark] {
    @include backdrop-blur($paragraph_dark);
    color: $color_dark;
    .expand-wrapper {
      background: $paragraph_dark;
    }
    form {
      border-color: rgba($color_dark, 0.25);
    }
  }

  transition: 0.2s ease-in-out;
  &[enabled] {
    background: $paragraph;
    &[dark] {
      background: $paragraph_dark;
    }
    .search-wrapper i {
      transform: rotate(180deg);
    }
  }

  .header-wrapper {
    height: 50px;
    max-width: $content-max-width;
    margin: 0 auto;
    flex-wrap: nowrap;
  }

  .logo {
    cursor: pointer;
    img {
      height: 35px;
    }
    .title {
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .search-wrapper {
    cursor: pointer;
    &:hover .search {
      color: $primary;
    }
    .search {
      transition: 0.2s ease-in-out;
      margin-right: 10px;
    }
    i {
      transition: 0.5s ease-in-out;
    }
  }
  .expand-wrapper {
    position: absolute;
    background: $paragraph;
    left: 0;
    right: 0;
    padding: 0px 5vw;
    transition: padding 0.8s ease-in-out;
    &[expanded] {
      padding: 20px 5vw;
    }

    .expand-container {
      max-width: $content-max-width;
      margin: 0 auto;
      position: relative;
    }
  }

  form {
    border-bottom: 1px solid rgba($color, 0.25);
    display: grid;
    grid-template-columns: auto 1fr;
    place-content: center;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 14px;
      }
      padding-right: 10px;
    }
    input {
      background: none;
      border: none;
      color: inherit;
      outline: none;
      font: inherit;
      padding: 5px 0;
    }
  }

  h3 {
    margin-bottom: 7.5px;
  }

  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 5px;
    a {
      color: inherit;
      text-decoration: none;
      opacity: 0.75;
      transition: 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
  }
}

.projects-leave-active,
.projects-enter-active {
  transition: 0.4s ease-in-out;
  transition-delay: 0.4s;
}

.projects-enter,
.projects-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
