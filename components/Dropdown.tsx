import styles from './Dropdown.module.css';
type Props = {
  open: boolean;
  children: React.ReactNode;
  list: React.ReactNode;
};
const Dropdown = ({ open, list, children }: Props) => {
  return (
    <div>
      <div className={styles.dropdownWrapper}>{children}</div>
      {open && <div className='absolute'>{list}</div>}
    </div>
  );
};

export default Dropdown;
