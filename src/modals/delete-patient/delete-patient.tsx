import { useRevalidator } from "react-router-dom";
import { Button } from "../../components/button";
import { Dialog } from "../../components/dialog";
import styles from "./delete-patient.module.less";
import { useQueryClient } from "@tanstack/react-query";
import * as api from "../../api";

interface DeletePatientProps {
  id: string
  onClose: () => void
}

export const DeletePatient = ({ id, onClose }: DeletePatientProps) => {
  const revalidator = useRevalidator();
  const queryClient = useQueryClient();
 
  const onAcceptClick = async () => {
    await api.patients.patientDeleteQuery(queryClient, id);
    revalidator.revalidate();
    onClose();
  };
  return <Dialog>
    <div className={styles.root}>
      <div className={styles.title}>Вы уверены, что хотите удалить пользователя?</div>
      <div className={styles.btnContainer}>
        <Button className={styles.btn} intent="secondary" onClick={onClose}>Закрыть</Button>
        <Button className={styles.btn} intent="primary" onClick={onAcceptClick}>Удалить</Button>
      </div>
    </div>
  </Dialog>;
};
