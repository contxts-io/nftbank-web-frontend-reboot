import CaretDown from '@/public/icon/CaretDown';
import styles from './LandingButton.module.css';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const LandingButton = ({
  children,
  ...props
}: {
  children: any;
} & ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${props.className ? props.className : ''}`}
    >
      {children}
      <div className='ml-24 rotate-270'>
        <CaretDown />
      </div>
    </button>
  );
};
export default LandingButton;
