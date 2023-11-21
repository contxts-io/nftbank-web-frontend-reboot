const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='w-full h-full flex flex-col items-center pt-80'>
      {children}
      <p className={`font-caption-regular text-[--color-text-subtlest]`}>
        By signing up, you agree to our{' '}
        <span className='underline underline-offset-4 cursor-pointer'>
          Terms of use
        </span>{' '}
        and{' '}
        <span className='underline underline-offset-4 cursor-pointer'>
          Privacy Policy
        </span>
      </p>
    </section>
  );
};
export default AuthLayout;
