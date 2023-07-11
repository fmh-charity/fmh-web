import { NOTIFICATION_ADD } from "./constants";

class NotificationsEmitter extends EventTarget {
  addNotification(data: { label: string; text?: string }) {
    this.dispatchEvent(new CustomEvent(NOTIFICATION_ADD, { detail: data }));
  }
}

export const notification = new NotificationsEmitter();
