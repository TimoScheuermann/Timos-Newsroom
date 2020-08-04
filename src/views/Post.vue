<template>
  <div class="post-news" content>
    <h1>{{ news._id ? 'Update' : 'Create' }}</h1>
    <tc-button v-if="news._id" name="new" @click="create" />

    <tl-grid>
      <tc-input v-model="news.title" title="Title" />
      <tc-select v-model="news.project" :values="projects" title="Project" />
      <tc-select v-model="news.type" :values="newsTypes" title="Type" />
      <tc-input v-model="news.thumbnail" title="Thumbnail" />
    </tl-grid>
    <tc-textarea v-model="news.description" title="Description" />
    <h2>Add Links</h2>
    <tl-grid>
      <tl-grid>
        <tc-input v-model="link.title" title="Title" />
        <tc-input v-model="link.href" title="href" />
        <tc-button name="Add" @click="addLink()" />
      </tl-grid>
      <tc-table>
        <tr>
          <th>Title</th>
          <th>href</th>
          <th></th>
        </tr>
        <tr v-for="l in news.links" :key="l.name + l.href">
          <td>{{ l.title }}</td>
          <td>{{ l.href }}</td>
          <td>
            <tc-button
              tccolor="error"
              icon="cross-inverted"
              @click="removeLink(l)"
            />
          </td>
        </tr>
      </tc-table>
    </tl-grid>
    <h1>Post</h1>
    {{ dateString }}
    <tl-flow horizontal="space-between">
      <tc-checkbox v-model="news.hasBackground" title="has background" />
      <tl-flow>
        <tc-input type="number" v-model="news.date" @input="dc" />
        <tc-input type="datetime-local" v-model="dateString" @input="dsc" />
        <tc-checkbox v-model="useLocalhost" title="use localhost" />
        <tc-button
          variant="filled"
          icon="newspaper"
          :name="(news._id ? 'Update ' : 'Post ') + 'news'"
          @click="post(false)"
        />
        <tc-button
          v-if="news._id"
          variant="filled"
          tccolor="error"
          icon="trashcan-alt"
          name="Delete post"
          @click="post(true)"
        />
      </tl-flow>
    </tl-flow>
    <h1>Preview</h1>
    <timos-newsroom--gallery :news="[news, news, news, news, news, news]" />

    <p>{{ news }}</p>
    <tc-modal v-model="modalState" title="Select post to edit">
      <tc-table>
        <tr>
          <th>Title</th>
          <th>Time</th>
          <th>Description</th>
        </tr>
        <tr s v-for="n in allNews" :key="n._id" @click="edit(n)">
          <td>{{ n.title }}</td>
          <td>{{ formatDate(n.date) }}</td>
          <td>{{ n.description }}</td>
        </tr>
      </tc-table>
    </tc-modal>

    <tc-modal v-model="statusModal" :title="statusTitle">
      <div v-if="statusResponse.length === 0">
        <tc-spinner></tc-spinner>
        <b>Pls wait...</b>
      </div>
      <div v-else>
        {{ statusResponse }}
      </div>
    </tc-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { News, NewsLink } from '@/utils/models';
import TimosNewsroomGallery from '@/components/TimosNewsroom-Gallery.vue';
import { axios } from '@/utils/constants';
import { formatDate } from '@/utils/functions';

import { EventBus } from '@/utils/eventbus';

@Component({
  components: {
    'timos-newsroom--gallery': TimosNewsroomGallery
  }
})
export default class Post extends Vue {
  public modalState = false;
  public statusModal = false;
  public statusTitle = '';
  public statusResponse = '';

  public news: News = {
    title: 'Sample title',
    hasBackground: false,
    description: 'Sample Description',
    thumbnail: 'assets/hero.jpg',
    type: 'update',
    project: "Timo's Icons",
    date: 0,
    links: []
  };
  public useLocalhost = true;
  public dateString = '';
  public link: NewsLink = { href: '', title: '' };
  public newsTypes = ['update', 'release', 'feature'];
  public projects = [
    'TC Components',
    "Timo's Icons",
    'Portfolio',
    'Investing Collectors',
    'DHBW Richie',
    "Timo's Translator",
    'NHL Stats',
    'AMS Pro'
  ];

  mounted() {
    EventBus.$on('open-list-modal', () => {
      this.modalState = true;
    });
  }

  get allNews(): News[] {
    return this.$store.getters.news;
  }
  public formatDate(date: number): string {
    return formatDate(date);
  }

  public create() {
    this.news._id = undefined;
  }

  public edit(news: News) {
    this.news = { ...news };
    this.modalState = false;
  }

  public dsc() {
    this.news.date = new Date(this.dateString).getTime();
  }
  public dc() {
    this.dateString = new Date(+this.news.date).toLocaleString();
  }

  public addLink() {
    this.news.links.push(this.link);
    this.link = { href: '', title: '' };
  }
  public removeLink(link: NewsLink) {
    this.news.links = this.news.links.filter(
      x => x.href !== link.href && x.title !== link.title
    );
  }
  public async post(isDelete = false) {
    const baseUrl = 'https://api.timos.design/newsroom/';

    let object = {};
    let endpoint = '';

    if (isDelete) {
      endpoint = baseUrl + 'delete';
      object = {
        _id: this.news._id || ''
      };
    } else if (this.news._id) {
      endpoint = baseUrl + 'update';
      object = {
        id: this.news._id || '',
        update: this.news
      };
    } else {
      endpoint = 'post';
      object = this.news;
    }

    this.statusResponse = '';
    this.statusTitle = endpoint;
    this.statusModal = true;
    const { data } = await axios.post(endpoint, object);
    this.news = {
      title: 'Sample title',
      hasBackground: false,
      description: 'Sample Description',
      thumbnail: 'assets/hero.jpg',
      type: 'update',
      project: "Timo's Icons",
      date: 0,
      links: []
    };
    this.statusResponse = data;
  }
}
</script>

<style lang="scss" scoped>
[content] {
  padding-top: 70px;
  tr[s] {
    cursor: pointer;
  }
}
</style>
