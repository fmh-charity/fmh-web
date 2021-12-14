import { generateRepository } from '../repository-service';
import controller from './controller';

export default generateRepository(
  {
    openCreate: false,
    curDate: new Date(),
    reduxIdNewsEvent: 0,
    checked: false,
    reduxCategoryId: "",
    reduxTitleNews: "",
    record: {
      createDate: null,
      creatorId: null,
      creatorName: "",
      description: "",
      id: null,
      newsCategoryId: null,
      publishDate: null,
      publishEnabled: true,
      title: ""
    }
  },
  [controller, 'createRecord'],
);
