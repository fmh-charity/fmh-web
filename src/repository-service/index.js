import { useReducer, useEffect, useRef } from 'react';
import { RepositoryService } from './adapter';

export function generateRepository(repo, controller) {
  controller.repo = new RepositoryService();

  const mounted = new Map();
  const syncFieldsSet = new Set(Object.keys(repo));

  const onUpdate = (type, data) => {
    for (const [_, watcher] of mounted) {
      watcher({ type, data });
    }
  };

  const methods = Object.keys(controller).reduce((prev, curr) => {
    
    if (typeof controller[curr] === 'function') {
      return { ...prev, [curr]: controller[curr].bind(controller) };
    }
    return prev;
  }, {});

  const reducer = (state, action) => {
    if (syncFieldsSet.has(action.type)) {
      return { ...state, [action.type]: action.data };
    }
    return state;
  };

  controller.repo.initRepository(repo, onUpdate);

  return (
    customReducer,
  ) => {
    const isMounted = useRef(null);
    const [state, dispatch] = useReducer(
      customReducer || reducer,
      controller.repo.convertToObject(repo)
    );

    useEffect(() => {
      isMounted.current = parseInt(String((Math.random() * 10000000)), 10);
      mounted.set(isMounted.current, dispatch);

      return () => { mounted.delete(isMounted.current); };
    }, []);

    return [state, methods];
  };
}

