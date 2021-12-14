 import { useReducer, useEffect } from 'react';

const createWatcher = (
  controller,
  method,
  { sync } = { sync: undefined }
) => {
  return new Function(
    'action',
    'return function ' + method + '(...args){ return action(...args) };'
  )((...args) => {
    const result = controller[method](...args);
    const { dispatch } = controller;

    if (sync) {
      if (result && typeof result.then === 'function' && result[Symbol.toStringTag] === 'Promise') {
        result.then((data) => {
          dispatch({ type: sync, data });
        });
      } else {
        dispatch({ type: sync, data: result });
      }
    } else {
      return result;
    }
  });
};

const syncRepoWithController = (repo, controller, controllerKeys) => {
  if (controller) {
    const sameFields = Object.keys(repo).reduce((prev, curr) => {
      if (controllerKeys.includes(curr)) {
        return [...prev, curr];
      }
      return prev;
    }, []);

    if (sameFields.length) {
      return sameFields.reduce((prev, field) => {
        if (repo[field] !== undefined) {
          return {
            ...prev,
            [field]: controller[field]
          };
        }

        return prev;
      }, repo);
    }
  }
  return repo;
};

export const generateRepository = (
  repo,
  ...controllerMethods  
) => {
  const syncFieldsSet = new Set(Object.keys(repo));
  const prefetchedMethods = new Set();
  let controllerKeys = [];


  controllerMethods.forEach((item) => {
    if (item[2] && item[2].sync) syncFieldsSet.add(item[2].sync);
    if (item[2] && item[2].prefetch) prefetchedMethods.add(item[1]);
  });
 
  const methods = controllerMethods.reduce((prev, curr, index) => {
    if (index === 0) {
      controllerKeys = Object.keys(curr[0]);
    }

    const method = createWatcher(
      curr[0],
      curr[1],
      curr[2]
    );

    return {
      ...prev,
      [method.name]: method
    };
  }, {});

  const reducer = (state, action) => {
    console.log('setState', state, action);
    if (syncFieldsSet.has(action.type)) {
      return { ...state, [action.type]: action.data };
    }
  };

  return () => {
    const [state, dispatch] = useReducer(reducer, syncRepoWithController(
      repo,
      controllerKeys.length ? controllerMethods[0][0] : null,
      controllerKeys
    ));

    useEffect(() => {
      if (controllerMethods.length) {
        controllerMethods[0][0].dispatch = dispatch
        controllerMethods[0][0].methods = methods;
      }

      prefetchedMethods.forEach((method) => {
        if (method && methods[method]) methods[method](undefined);
      });
    }, []);

    return [state, methods];
  };
};

