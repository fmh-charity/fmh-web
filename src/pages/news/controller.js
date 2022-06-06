import { request } from '../request-service';
import { RepositoryService } from '../repository-service/adapter';
import { filterNews } from './domain';
import fromUnixTime from 'date-fns/fromUnixTime'

const newsController = {
  repo: new RepositoryService(),

  async getNews(authData) {
    try {
      const { data } = await request('GET', '/news');

      this.repo.actions.set('list', data);
    } catch (error) {
      console.error('Error: ', error);
      this.repo.actions.set('error', 'Smth happeened');
    }
  },
  async filterNews() {
    const { data } = await request('GET', '/news');

    this.repo.actions.set(
      'list', 
      filterNews(
        data,
        this.repo.actions.get('filter')
      )
    );
    this.repo.actions.set('filter', null);
  },
  sortNews(status) {
    console.log('sorted');

    const sortedList = this.repo.actions.get('list').sort((a, b) => {
      return fromUnixTime(b.publishDate) - fromUnixTime(a.publishDate);
    });

    console.log(sortedList);
    this.repo.actions.set(
      'list',
      sortedList
    );
  },
  async removeRecord(id) {
    try {
      await request('DELETE', `/news/${id}`);

      this.repo.actions.set(
        'list', 
        this.repo.actions.get('list').filter(item => id !== item.id)
      );
    } catch (error) {
      console.error('error', error);
      this.repo.actions.set('error', 'Smth happeened');
    }
  },
  editFilter(filter) {
    this.repo.actions.set('filter', {
      ...this.repo.actions.get('filter'),
      ...filter
    });
  },
  openFilter() {
    this.repo.actions.set('filter', {});
  },
  closeFilter() {
    this.repo.actions.set('filter', null);
  },
}

export default newsController;
