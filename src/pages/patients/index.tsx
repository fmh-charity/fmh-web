import { useLoaderData } from "react-router-dom";
import styles from "./index.module.less";

export const Patients = () => {
  const patients = useLoaderData();
  return (
    <div className={styles.patients}>
      <div>patients</div>
      <div className={styles.con}>
        <pre>{JSON.stringify(patients, null, 2)}</pre>
      </div>
    </div>
  );
};
