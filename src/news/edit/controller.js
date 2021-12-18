import { request } from '../../request-service';
import { RepositoryService } from '../../repository-service/adapter';
import { getlc } from '../../local-store-service';
import parse from 'date-fns/parse';
import newsController from '../controller';
import getUnixTime from 'date-fns/getUnixTime';

const editController = {
  repo: new RepositoryService(),

  async createRecord() {
    try {
      const user = JSON.parse(getlc('user') || '{}');
      const record = {
        ...this.repo.actions.get('record'),
        creatorId: user.id,
        creatorName: `${user.lastName} ${user.firstName} ${user.middleName}`,
        publishDate: getUnixTime(new Date()),
        publishEnabled: true,
      }

      console.log('record', record);

      const { data } = await request(record.id ? 'PUT' : 'POST', '/news', record);

      console.log(data);

      this.repo.actions.set('record', {
        createDate: null,
        time: '00:00',
        description: "",
        newsCategoryId: 1,
        publishEnabled: true,
        title: ""
      });
      await newsController.getNews();
    } catch (error) {
      console.error('Error: ', error);
    }
  },
  editRecord(data) {
    console.log('EDIT', data);
    if (data.time && data.createDate) {
      const { time, createDate, ...rest } = data;

      this.repo.actions.set('record', {
        ...this.repo.actions.get('record'),
        ...{
          ...rest,
          createDate: getUnixTime(parse(`${createDate} ${time}`, 'yyyy-MM-dd HH:mm', new Date()))
        }
      });

    } else {
      this.repo.actions.set('record', {
        ...this.repo.actions.get('record'),
        ...data
      });
    }

    const isFormValid = Object.keys(this.repo.actions.get('record')).every((key) => {
      console.log('check', this.repo.actions.get('record'), this.repo.actions.get('record')[key]);
      return this.repo.actions.get('record')[key]; 
    });

    console.log('VALID', isFormValid);
    
    if (isFormValid) {
      this.createRecord();
    }
  },
  openModal(record) {
    if (record) {
      console.log('record edit', record);
      this.repo.actions.set('record', {
        ...this.repo.actions.get('record'), 
        ...record
      });
    }
    this.repo.actions.set('openEdit', true);
  },
  closeModal() {
    this.repo.actions.set('openEdit', false);
  }
}

export default editController;

