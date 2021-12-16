import { watcherFactory } from '../watcher-service';

export class RepositoryService {
  actions;
  methods = {};

  initRepository(repo, onUpdate) {
    const withOnUpdate = Object.keys(repo).reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: [repo[curr], onUpdate.bind(this)]
      };
    }, {});
      
    this.actions = watcherFactory(withOnUpdate);
  }

  convertToObject(initRepo) {
    return Object.keys(initRepo).reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: this.actions.get(curr)
      };
    }, {});
  }
}



