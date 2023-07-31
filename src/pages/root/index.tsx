import { useResize } from "../../common/hooks";
import { RootWrapperMobile } from "../root-wrapper-mobile";
import { RoorWrapper } from "../root-wrapper";

export const Root: React.FC = () => {
  const isMobile = useResize();
  return isMobile ? <RootWrapperMobile /> : <RoorWrapper />;
};
