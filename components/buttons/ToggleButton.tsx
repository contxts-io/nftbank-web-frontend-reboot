import Button from './Button';
import styles from './ToggleButton.module.css';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
type Props = {
  onClick: () => void;
  checked: boolean;
  label?: string;
  id: string;
} & ButtonProps;

const ToggleButton = ({ onClick, checked, label, ...props }: Props) => {
  return (
    <div className={styles.toggleButtonWrapper}>
      <Button
        onClick={onClick}
        className={`${styles.toggleButton} ${checked && styles.checked}`}
        {...props}
        parameter={!checked ? 'on' : 'off'}
      >
        <div className={styles.circle} />
      </Button>
    </div>
  );
};
export default ToggleButton;
