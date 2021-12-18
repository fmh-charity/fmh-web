import { generateRepository } from '../repository-service';
import controller from './controller';

export default generateRepository(
  {
    list: null,
    filter: null,
    error: '',
  },
  controller
);
