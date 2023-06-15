import type { LinkProps } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles.module.less";

type Props = LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    icon?: React.ReactNode;
  };

export default function NavBarLink({
  children,
  icon,
  ...linkProps
}: Props): React.ReactElement {
  return (
    <li>
      <Link {...linkProps} className={styles.navbarLink}>
        <div>{icon}</div>
        <div>{children}</div>
      </Link>
    </li>
  );
}
