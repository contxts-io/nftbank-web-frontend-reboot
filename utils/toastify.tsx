import ToastIcon from '@/public/icon/ToastIcon';
import { toast, ToastOptions } from 'react-toastify';
import styles from './Toastify.module.css';
export const showToastMessage = ({
  message,
  code = 'success',
  toastId,
  className,
  theme = 'light',
}: {
  message: string;
  code: 'success' | 'error';
  toastId: string;
  className?: string;
  theme?: 'light' | 'dark';
}) => {
  const options: ToastOptions = {
    toastId,
    position: toast.POSITION.BOTTOM_RIGHT,
    className: `toast-message ${className}`,
    icon: ({ theme, type }) => <ToastIcon />,
    theme: theme,
  };
  toast[code](message, { ...options });
};
