import AsideMenu from '@/components/settings/AsideMenu';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='w-full h-full flex'>
      <AsideMenu />
      {children}
    </section>
  );
};
export default SettingsLayout;
