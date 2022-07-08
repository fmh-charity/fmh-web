import React, { useEffect } from "react";
import StatusIcon from "src/assets/icons/status_processing.svg";
import StaffIcon from "src/assets/icons/staff.svg";
import EditIcon from "src/assets/icons/edit_icon.svg";
import AddIcon from "src/assets/icons/add.svg";
import ArrowLeftIcon from "src/assets/icons/arrow_left.svg";
import { Link, useParams } from "react-router-dom";
import {
  useAddWishesCommentsMutation,
  useLazyGetWishesByIdQuery,
} from "src/services/api/wishesApi";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { selectUserInfo } from "src/features/auth/authSlice";
import { useGetPatientByIdFromCache } from "src/hooks/useGetPatientByIdFromCache";
import { useGetUserByIdFromCache } from "src/hooks/useGetUserByIdFromCache";
import styles from "./ViewWishes.module.less";
import { IWishes } from "../../WishesPage";
import WishesComments from "../wishesComments/WishesComments";

const ViewWishes = () => {
  const { id: wishesId } = useParams();
  const [trigger, data] = useLazyGetWishesByIdQuery();
  const [addCommentTrigger] = useAddWishesCommentsMutation();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (wishesId) {
      trigger(wishesId);
    }
  }, []);

  // TODO change on model
  const addComment = () => {
    const comment = prompt("Коменть!");
    if (comment && wishesId) {
      addCommentTrigger({
        id: 0,
        wishesId: parseInt(wishesId, 10),
        createDate: Date.now(),
        creatorId: userInfo.id,
        description: comment,
        creatorName: "",
      });
    }
  };

  return !data.data ? (
    <br />
  ) : (
    <ViewWishesCard wishes={data.data} addComment={addComment} />
  );
};

const ViewWishesCard = ({
  wishes,
  addComment,
}: {
  wishes: IWishes;
  addComment: () => void;
}) => {
  const patient = useGetPatientByIdFromCache(wishes.patientId);
  const executor = useGetUserByIdFromCache(wishes.executorId);

  return (
    <div className={styles.view_wishes__container}>
      <header className={styles.view_wishes__page_header}>
        <div className={styles.view_wishes__header_title}>Заявки</div>
      </header>
      <div className={styles.view_wishes__wrapper}>
        <div className={styles.view_wishes__header}>
          <span>Тема</span>
          <span>{wishes.title}</span>
        </div>
        <div className={styles.view_wishes__wrapper_content}>
          <div className={`${styles.view_wishes__row} ${styles.two_columns}`}>
            <span className={styles.underline}>Исполнитель</span>
            <span>{`${executor?.lastName} ${executor?.firstName} ${executor?.middleName}`}</span>
          </div>
          <div className={`${styles.view_wishes__row} ${styles.two_columns}`}>
            <span className={styles.underline}>Плановая дата</span>
            <span>{format(wishes.planExecuteDate, "dd.MM.yyyy")}</span>
          </div>
          <div className={`${styles.view_wishes__row} ${styles.just_center}`}>
            {wishes.status}
          </div>
          <div className={`${styles.view_wishes__description}`}>
            {wishes.description}
          </div>
          <div className={`${styles.view_wishes__row} ${styles.two_columns}`}>
            <span className={styles.underline}>Пациент</span>
            <span>{`${patient?.lastName} ${patient?.firstName} ${patient?.middleName}`}</span>
          </div>
          <div className={`${styles.view_wishes__row} ${styles.two_columns}`}>
            <span className={styles.underline}>Создана</span>
            <span>{format(wishes.createDate, "dd.MM.yyyy")}</span>
          </div>
          <div className={styles.view_wishes__comments}>
            <WishesComments wishesId={wishes.id} />
          </div>
        </div>
        <div className={styles.view_wishes__icons}>
          <Link to="/wishes">
            <ArrowLeftIcon />
          </Link>
          <StaffIcon />
          <StatusIcon />
          <AddIcon onClick={addComment} />
          <EditIcon />
        </div>
      </div>
    </div>
  );
};

export default ViewWishes;
