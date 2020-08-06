<template>
  <div class="newsroom-post-news">
    <tc-hero height="120" background="#28292d" tc-dark-container>
      <h1>Post new Article</h1>
    </tc-hero>
    <div content>
      <tc-headline title="Options" />
      <tl-grid>
        <tc-input icon="tiles-plus" title="Title" v-model="news.title" />
        <tc-select
          title="Project"
          icon="book-p"
          v-model="news.project"
          :values="projects"
        />
        <tc-select
          title="Type"
          v-model="news.type"
          :values="['update', 'release', 'feature']"
        />
        <tc-input icon="image" title="Thumbnail" v-model="news.thumbnail" />
        <tc-select
          icon="stop"
          title="solid background"
          v-model="news.hasBackground"
          :values="[true, false]"
        />
        <tc-input
          icon="calendar-alt"
          type="datetime-local"
          title="Date"
          v-model="news.date"
        />
      </tl-grid>
      <tc-textarea title="Description" v-model="news.description" />

      <tc-headline title="Related Links" />
      <tl-grid>
        <div>
          <tl-grid>
            <tc-input placeholder="href" icon="link" v-model="newLink.href" />
            <tc-input placeholder="title" icon="dots" v-model="newLink.title" />
          </tl-grid>
          <tc-button name="add" icon="plus" @click="addLink()" />
        </div>
        <tc-table>
          <tr>
            <th>href</th>
            <th>title</th>
            <th></th>
          </tr>
          <tr v-for="l in news.links" :key="l.href">
            <td>{{ l.href }}</td>
            <td>{{ l.title }}</td>
            <td>
              <tc-button
                tfcolor="error"
                variant="filled"
                icon="cross"
                @click="removeLink(l)"
              />
            </td>
          </tr>
        </tc-table>
      </tl-grid>
      <tc-headline title="Summary" />
      <tl-grid>
        <div>
          <div>
            Status: <b>{{ ok ? 'ok' : 'missing fields' }}</b>
          </div>
          <ul>
            <li v-for="f in missingFields" :key="f">{{ f }}</li>
          </ul>
        </div>
        <div>
          <tc-button
            variant="filled"
            icon="newspaper"
            name="Post news"
            @click="postNews()"
            :disabled="!ok"
          />
          <p>{{ message }}</p>
        </div>
      </tl-grid>
      <tc-headline title="Preview" />

      <timos-newsroom-gallery :news="[news, news, news, news, news, news]" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { News, NewsLink } from '@/utils/models';
import { projects, axios } from '@/utils/constants';
import TimosNewsroomGallery from '@/components/TimosNewsroom-Gallery.vue';

@Component({
  components: {
    'timos-newsroom-gallery': TimosNewsroomGallery
  }
})
export default class NewsroomPostNews extends Vue {
  public message = '';
  public projects: string[] = projects;
  public newLink: NewsLink = { href: '', title: '' };
  public news: News = {
    title: 'Title',
    description: 'Description',
    thumbnail: 'assets/hero.jpg',
    type: 'update',
    project: "Timo's Icons",
    hasBackground: true,
    date: new Date().toISOString().split('.')[0],
    links: [
      {
        href: 'https://accounts.timos.design',
        title: "Timo's Accounts"
      }
    ]
  };

  get ok(): boolean {
    return this.missingFields.length === 0;
  }

  get missingFields(): string[] {
    return Object.entries(this.news)
      .filter(x => ('' + x[1]).length === 0)
      .map(x => x[0]);
  }

  public addLink(): void {
    if (this.newLink.href.length > 0 && this.newLink.title.length > 0) {
      this.news.links.push(this.newLink);
      this.newLink = { href: '', title: '' };
    }
  }
  public removeLink(link: NewsLink): void {
    this.news.links = this.news.links.filter(
      x => x.href !== link.href && x.title !== link.title
    );
  }

  public async postNews(): Promise<void> {
    this.message = 'Posting news...';
    this.news.date = new Date(this.news.date).getTime();
    const { data } = await axios.post('newsroom/post', this.news);
    this.$store.commit('addNews', data);
    this.message = 'News postet!';
  }
}
</script>

<style lang="scss" scoped>
.tc-hero h1 {
  color: #fff;
}
</style>
