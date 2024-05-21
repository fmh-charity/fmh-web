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
  placeholder?: string
  value: any
  options: Option[]
  isSearchable?: boolean
  error: string;
  onChange?: (value: any) => void
}

export const Select = ({ label, error, placeholder, ...props }: SelectProps) => {
  return (
    <div className={styles.root}>
      {label && <div className={styles.label}>{label}</div>}
      <ReactSelect 
        {...props} 
        placeholder={placeholder || ""}
        theme={(theme) => ({
          ...theme,
          borderWidth: 1,
          colors: {
            ...theme.colors,
            primary: "#01a5a3",
          },
        })}
        classNames={{
          control: () => styles.select
        }}
      />
      <div className={styles.subtitle}>
        {error && <div className={styles.errorMsg}>
          <Icon.Attention16 /> <span>{error}</span>
        </div>}
      </div>
    </div>
  );
};
