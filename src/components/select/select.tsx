import ReactSelect from "react-select";
import styles from "./select.module.less";
import { Icon } from "../icon";

interface Option {
  value: any
  label: string
}

interface SelectProps {
  label?: string
  name?: string
  value: any
  options: Option[]
  isSearchable?: boolean
  error: string;
  onChange?: (value: any) => void
}

export const Select = ({ label, error, ...props }: SelectProps) => {
  return (
    <div className={styles.root}>
      {label && <div className={styles.label}>{label}</div>}
      <ReactSelect {...props} />
      <div className={styles.subtitle}>
        {error && <div className={styles.errorMsg}>
          <Icon.Attention16 /> <span>{error}</span>
        </div>}
      </div>
    </div>
  );
};
