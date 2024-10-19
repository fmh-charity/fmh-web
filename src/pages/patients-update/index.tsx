import { useLoaderData } from "react-router-dom";
import type {
  PatientDto,
} from "../../api/model";
import styles from "./index.module.less";
import { Card } from "../../components/card";
import { PatientsFormCreate } from "../../components/patients-form-create";

export const PatientsUpdate = () => {
  const { patient } = useLoaderData() as {
    patient: { body: PatientDto };
  };

  return (
    <section className={styles.root}>
      <Card title="Редактировать пациента">
        <div className={styles.formContainer}>
          <PatientsFormCreate
            intent="EDIT"
            patient={patient.body}
          />
        </div>
      </Card>
    </section>
  );
};
