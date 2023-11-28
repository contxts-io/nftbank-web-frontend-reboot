import ResetPassword from '@/components/auth/ResetPassword';
import { useSearchParams } from 'next/navigation';

const ResetPasswordPage = async (props: any) => {
  // const searchParams = useSearchParams();
  // const oobCode = searchParams.get('oobcode') || undefined;
  console.log('oobCode: ', props?.searchParams?.oobCode);
  const oobCode = (await props?.searchParams?.oobCode) || undefined;
  return <ResetPassword oobCode={oobCode} />;
};
export default ResetPasswordPage;
