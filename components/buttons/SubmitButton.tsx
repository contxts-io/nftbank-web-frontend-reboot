'use client';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import styles from './SubmitButton.module.css';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const SubmitButton = ({
  id,
  children,
  className,
  loading,
  ...props
}: { id: string; loading?: boolean } & ButtonProps) => {
  return (
    <Button {...props} id={id} className={`${styles.button} ${className}`}>
      {children}
    </Button>
  );
};
export default SubmitButton;
