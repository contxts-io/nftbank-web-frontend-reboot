'use client';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import styles from './SubmitButton.module.css';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const SubmitButton = ({
  id,
  children,
  className,
  isLoading,
  ...props
}: { id: string; isLoading?: boolean } & ButtonProps) => {
  return (
    <Button
      {...props}
      id={id}
      isLoading={isLoading}
      className={`${styles.button} ${className}`}
    >
      {children}
    </Button>
  );
};
export default SubmitButton;
