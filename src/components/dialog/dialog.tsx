import styles from "./dialog.module.less";

interface DialogProps {
  children?: React.ReactElement|React.ReactElement[]
}

export const Dialog = (props: DialogProps) => {
  return (
    <section className={styles.root}>
      <div className={styles.modal}>{props.children}</div>
    </section>
  );
};
