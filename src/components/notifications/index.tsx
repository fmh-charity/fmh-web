import { useEffect, useState, useRef } from "react";
import { notification } from "../../common/notifications";
import styles from "./index.module.less";
import { NOTIFICATION_ADD } from "../../common/constants";

type Notification = {
  id: number;
  label: string;
  text: string;
};

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const callback = (e: Event) => {
      const { detail } = e as CustomEvent;
      const currentId = idRef.current;
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          id: currentId,
          label: detail.label,
          text: detail.text,
        },
      ]);

      const timer = setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== currentId)
        );
      }, 10000);

      idRef.current++;
      console.log("Instance fired.", e);
      return () => {
        clearTimeout(timer);
      };
    };
    notification.addEventListener(NOTIFICATION_ADD, callback);
    return () => {
      notification.removeEventListener(NOTIFICATION_ADD, callback);
    };
  }, []);

  return (
    notifications.length > 0 && (
      <div className={styles.notifications}>
        {notifications.map((notification: Notification) => {
          return (
            <div key={notification.id}>
              <div>{notification.label}</div>
              <div>{notification.text}</div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() =>
                  setNotifications((prevNotifications) =>
                    prevNotifications.filter((n) => n.id !== notification.id)
                  )
                }
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    )
  );
};
