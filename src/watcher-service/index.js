export class Watcher {
  sourceObj;

  handler(handlers) {
    return {
      set(obj, prop, value) {
        obj[prop] = value;

        if (handlers[prop]) handlers[prop](prop, value);
        if (Array.isArray(obj.onUpdate) && prop !== 'onUpdate') {
          obj.onUpdate.forEach((fn) => fn());
          obj.onUpdate = [];
        }

        return true;
      }
    };
  }

  init(obj) {
    if (typeof obj === 'object') {
      this.sourceObj = new Proxy(
        Object.keys(obj).reduce(
          (acc, key) => obj[key][0] !== undefined ? ({ ...acc, [key]: obj[key][0] }) : acc,
          { onUpdate: [] } 
        ),
      this.handler(
        Object.keys(
          obj
        ).reduce(
          (acc, key) => (obj[key][1] !== undefined ? { ...acc, [key]: obj[key][1] } : acc),
          {},
        ),
      ),
      );
    }
  }

  set(propertyName, value) {
    if (this.sourceObj) {
      this.sourceObj[propertyName] = value;
    }
  }
  get(propertyName) {
    if (this.sourceObj) {
      return this.sourceObj[propertyName];
    }
  }

  watch(propertyName) {
    return new Promise((resolve) => {
      this.sourceObj.onUpdate = [...this.sourceObj.onUpdate, () => {
        if (this.sourceObj[propertyName]) {
          resolve(this.sourceObj[propertyName]);
        }
      }];
    });
  }

  watchFor(propertyName, neededValue) {
    return new Promise((resolve) => {
      if (this.sourceObj[propertyName] === neededValue) resolve();
      this.sourceObj.onUpdate = [...this.sourceObj.onUpdate, () => {
        if (this.sourceObj[propertyName] === neededValue) {
          resolve();
        }
      }];
    });
  }
}

export const watcherFactory = (obj) => {
  const watcher = new Watcher();
  
  watcher.init(obj);
  return watcher;
};
