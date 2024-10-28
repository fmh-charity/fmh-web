import { useRevalidator } from "react-router-dom";
import { Button } from "../../components/button";
import { Dialog } from "../../components/dialog";
import styles from "./cancel-wish.module.less";
import { useQueryClient } from "@tanstack/react-query";
import * as api from "../../api";

interface CancelWishProps {
  id: string
  onClose: () => void
}

export const CancelWish = ({ id, onClose }: CancelWishProps) => {
  const revalidator = useRevalidator();
  const queryClient = useQueryClient();
 
  const onAcceptClick = async () => {
    await api.wishes.wishesCancelQuery(queryClient, id);
    revalidator.revalidate();
    onClose();
  };
  return (<Dialog>
    <div className={styles.root}>
      <div className={styles.title}>Вы уверены, что хотите отменить просьбу?</div>
      <div className={styles.btnContainer}>
        <Button className={styles.btn} intent="secondary" onClick={onClose}>Закрыть</Button>
        <Button className={styles.btn} intent="primary" onClick={onAcceptClick}>Отменить</Button>
      </div>
    </div>
  </Dialog>);
};
