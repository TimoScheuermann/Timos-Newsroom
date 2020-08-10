<template>
  <div class="newsroom-edit-news">
    <tc-hero height="120" background="#28292d" tc-dark-container>
      <h1>Edit Article</h1>
    </tc-hero>
    <div content>
      <tc-headline title="Options">
        <tc-button name="select news" icon="newspaper" @click="openModal" />
      </tc-headline>
      <template v-if="news">
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
              <tc-input
                placeholder="title"
                icon="dots"
                v-model="newLink.title"
              />
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
              Status:
              <b>{{
                ok
                  ? 'ok'
                  : missingFields.length === 0
                  ? 'no id'
                  : 'missing fields'
              }}</b>
            </div>
            <ul>
              <li v-for="f in missingFields" :key="f">{{ f }}</li>
            </ul>
          </div>
          <div>
            <tc-button
              variant="filled"
              icon="newspaper"
              name="Update news"
              @click="updateNews()"
              :disabled="!ok"
            />
            <tc-button
              variant="filled"
              tfcolor="error"
              icon="trashcan-alt"
              name="Delete news"
              @click="deleteNews()"
              :disabled="!ok"
            />
            <p>{{ message }}</p>
          </div>
        </tl-grid>
        <tc-headline title="Preview" />

        <timos-newsroom-gallery :news="[news, news, news, news, news, news]" />
      </template>
    </div>
    <tc-modal title="Select news" v-model="modalOpened">
      <tc-table>
        <template slot="head">
          <th>Date</th>
          <th>Title</th>
          <th>Description</th>
        </template>
        <tc-tr v-for="n in $store.getters.news" :key="n._id" @click="select(n)">
          <tc-td>{{ new Date(n.date).toDateString() }}</tc-td>
          <tc-td>{{ n.title }}</tc-td>
          <tc-td>{{ n.description }}</tc-td>
        </tc-tr>
      </tc-table>
    </tc-modal>
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
export default class NewsroomEditNews extends Vue {
  public message = '';
  public modalOpened = !false;
  public projects: string[] = projects;
  public newLink: NewsLink = { href: '', title: '' };
  public news: News | null = null;

  public openModal(): void {
    this.modalOpened = true;
  }

  public select(news: News): void {
    this.news = news;
    this.news.date = new Date(news.date).toISOString().split('.')[0];
    this.modalOpened = false;
  }

  get ok(): boolean {
    return this.missingFields.length === 0 && !!this.news && !!this.news._id;
  }

  get missingFields(): string[] {
    if (this.news)
      return Object.entries(this.news)
        .filter(x => ('' + x[1]).length === 0)
        .map(x => x[0]);
    return [''];
  }

  public addLink(): void {
    if (
      this.newLink.href.length > 0 &&
      this.newLink.title.length > 0 &&
      this.news
    ) {
      this.news.links.push(this.newLink);
      this.newLink = { href: '', title: '' };
    }
  }
  public removeLink(link: NewsLink): void {
    if (this.news) {
      this.news.links = this.news.links.filter(
        x => x.href !== link.href && x.title !== link.title
      );
    }
  }

  public async updateNews(): Promise<void> {
    if (this.news) {
      this.message = 'Updating news...';
      this.news.date = new Date(this.news.date).getTime();
      const { data } = await axios.post('newsroom/update', this.news);
      this.$store.commit('updateNews', data);
      this.message = 'News updated!';
    }
  }

  public async deleteNews(): Promise<void> {
    if (this.news) {
      this.message = 'Deleting news...';
      this.news.date = new Date(this.news.date).getTime();
      await axios.post('newsroom/delete', this.news);
      this.$store.commit('removeNews', this.news);
      this.message = 'News deleted!';
      this.news = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.tc-hero h1 {
  color: #fff;
}
</style>
