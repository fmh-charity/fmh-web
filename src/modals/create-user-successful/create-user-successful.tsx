import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Dialog } from "../../components/dialog";
import styles from "./create-user-successful.module.less";

interface CreateUserSuccessfulProps {
  onClose: () => void
}

export const CreateUserSuccessful = ({ onClose }: CreateUserSuccessfulProps) => {
  const navigate = useNavigate();
  const onAcceptClick = () => {
    navigate("/users");
    onClose();
  };
  return (<Dialog>
    <div className={styles.root}>
      <div className={styles.title}>Пользователь успешно добавлен</div>
      <img src="/images/welcome-pana.png" srcSet="/images/welcome-pana-2x.png 2x" alt="success" />
      <Button intent="primary" onClick={onAcceptClick}>Понятно</Button>
    </div>
  </Dialog>);
};
