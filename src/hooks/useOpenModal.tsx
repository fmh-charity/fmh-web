import type {
  ComponentType,
  Dispatch,
  FC,
  ReactNode} from "react";
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type OpenModalAction = <T>(component: ComponentType<T & { onClose: () => void }>, props: T) => void

const OpenModalContext = createContext<Dispatch<JSX.Element | undefined>>(() => undefined);

interface OpenModalWrapperProps {
  children: ReactNode
}

export const OpenModalWrapper: FC<OpenModalWrapperProps> = ({ children }): JSX.Element => {
  const [element, setElement] = useState<JSX.Element>();

  return (
    <OpenModalContext.Provider value={setElement}>
      {children}
      {element}
    </OpenModalContext.Provider>
  );
};

export const useOpenModal = (): OpenModalAction => {
  const setModal = useContext(OpenModalContext);

  useEffect(() => {
    return () => setModal(undefined);
  }, [setModal]);

  return useCallback(
    (Component, props) => {
      const onClose = () => setModal(undefined);

      setModal(
        <Suspense fallback={null}>
          <Component {...props} onClose={onClose} />
        </Suspense>,
      );
    },
    [setModal],
  );
};
