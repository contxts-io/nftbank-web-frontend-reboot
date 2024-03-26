import styles from './MenuLIst.module.css';
import Link from 'next/link';
type Props = {
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};
const MenuList = (props: Props) => {
  const handleClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <Link
      className={`${styles.li} ${props.isActive ? styles.active : ''}`}
      href={props.href || ''}
      onClick={handleClick}
    >
      {props.children}
    </Link>
  );
};
export default MenuList;
