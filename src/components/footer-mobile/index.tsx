import { NavLink } from "react-router-dom";
import styles from "./index.module.less";
import { Icon } from "../icon";
import clsx from "clsx";

const FooterButtonLink = ({
  to,
  Icon,
  text,
}: {
  to: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => {
        return (
          <div
            className={clsx({
              [styles.navlink]: true,
              [styles.active]: isActive,
            })}
          >
            <Icon />
            <div>{text}</div>
          </div>
        );
      }}
    </NavLink>
  );
};

export const FooterMobile = () => {
  return (
    <div className={styles.footer}>
      <FooterButtonLink to="/" Icon={Icon.Home24} text="Главная" />
      <FooterButtonLink to="/wishes" Icon={Icon.Heart24} text="Просьбы" />
      <FooterButtonLink to="/patients" Icon={Icon.Patients24} text="Пациенты" />
    </div>
  );
};
