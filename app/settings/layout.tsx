import AsideMenu from '@/components/settings/AsideMenu';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='w-full flex flex-1'>
      <AsideMenu />
      {children}
    </section>
  );
};
export default SettingsLayout;
