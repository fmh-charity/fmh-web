import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Dialog } from "../../components/dialog";
import styles from "./create-patient-successful.module.less";

interface CreatePatientSuccessfulProps {
  onClose: () => void
}

export const CreatePatientSuccessful = ({ onClose }: CreatePatientSuccessfulProps) => {
  const navigate = useNavigate();
  const onAcceptClick = () => {
    navigate("/patients");
    onClose();
  };
  return (<Dialog>
    <div className={styles.root}>
      <div className={styles.title}>Пациент успешно добавлен</div>
      <img src="/images/welcome-pana.png" srcSet="/images/welcome-pana-2x.png 2x" alt="success" />
      <Button intent="primary" onClick={onAcceptClick}>Понятно</Button>
    </div>
  </Dialog>);
};
