import ToastIcon from '@/public/icon/ToastIcon';
import { toast, ToastOptions, ToastPosition } from 'react-toastify';
import styles from './Toastify.module.css';
export const showToastMessage = ({
  message,
  code = 'success',
  toastId,
  className,
  theme = 'light',
  position = toast.POSITION.BOTTOM_RIGHT,
}: {
  message: string;
  code: 'success' | 'error';
  toastId: string;
  className?: string;
  theme?: 'light' | 'dark';
  position?: ToastPosition;
}) => {
  const options: ToastOptions = {
    toastId,
    position: position,
    className: `toast-message ${className}`,
    icon: ({ theme, type }) => <ToastIcon />,
    theme: theme,
  };
  toast[code](message, { ...options });
};
