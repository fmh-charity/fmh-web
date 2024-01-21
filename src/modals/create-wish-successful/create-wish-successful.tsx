import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Dialog } from "../../components/dialog";
import styles from "./create-wish-successful.module.less";

interface CreateWishSuccessfulProps {
  onClose: () => void
}

export const CreateWishSuccessful = ({ onClose }: CreateWishSuccessfulProps) => {
  const navigate = useNavigate();
  const onAcceptClick = () => {
    navigate("/wishes");
    onClose();
  };
  return <Dialog>
    <div className={styles.root}>
      <div className={styles.title}>Просьба успешно добавилась</div>
      <img src="/images/welcome-pana.png" srcSet="/images/welcome-pana-2x.png 2x" alt="success" />
      <Button intent="primary" onClick={onAcceptClick}>Понятно</Button>
    </div>
  </Dialog>;
};
