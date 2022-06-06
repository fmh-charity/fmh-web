import { generateRepository } from '../../repository-service';
import controller from './controller';

export default generateRepository(
  {
    openEdit: false,
    record: {
      createDate: null,
      time: '00:00',
      description: "",
      newsCategoryId: 1,
      publishEnabled: true,
      title: ""
    }
  },
  controller
);
