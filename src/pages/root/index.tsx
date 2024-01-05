import { useResize } from "../../common/hooks";
import { RootWrapperMobile } from "../root-wrapper-mobile";
import { RoorWrapper } from "../root-wrapper";
import { OpenModalWrapper } from "../../hooks/useOpenModal";

export const Root: React.FC = () => {
  const isMobile = useResize();
return <OpenModalWrapper>{isMobile ? <RootWrapperMobile /> : <RoorWrapper />}</OpenModalWrapper>;
};
