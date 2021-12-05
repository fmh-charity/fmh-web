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
          if (data.value) {
            dispatch({ type: sync, data: data.value });
          } else {
            dispatch({ type: sync, data });
          }
        });
      } else {
        dispatch({ type: sync, data: result });
      }
    } else {
      return result;
    }
  });
};

export const generateRepository = (
  repo,
  ...controllerMethods  
) => {
  const syncFieldsSet = new Set(Object.keys(repo));
  const prefetchedMethods = new Set();

  controllerMethods.forEach((item) => {
    if (item[2] && item[2].sync) syncFieldsSet.add(item[2].sync);
    if (item[2] && item[2].prefetch) prefetchedMethods.add(item[1]);
  });
 
  const methods = controllerMethods.reduce((prev, curr) => {
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
    if (syncFieldsSet.has(action.type)) {
      return { ...state, [action.type]: action.data };
    }
  };

  return () => {
    const [state, dispatch] = useReducer(reducer, repo);

    useEffect(() => {
      if (controllerMethods.length) {
        if (!controllerMethods[0][0].dispatch) {
          controllerMethods[0][0].dispatch = dispatch
          controllerMethods[0][0].methods = methods;
        }
      }

      prefetchedMethods.forEach((method) => {
        if (method && methods[method]) methods[method](undefined);
      });
    }, []);

    return [state, methods];
  };
};

