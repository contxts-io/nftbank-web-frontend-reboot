import Image from 'next/image';
import WalletFilled from '@/public/icon/WalletFilled';
import FolderFilled from '@/public/icon/FolderFilled';
import ShareNetwork from '@/public/icon/ShareNetwork';
import Eye from '@/public/icon/Eye';
const ProfileComponent = () => {
  return (
    <section className='w-full px-24 py-24 flex items-center justify-between'>
      <div className='flex items-center'>
        <Image
          src={'/icon/nftbank_icon.svg'}
          width={56}
          height={56}
          alt='nftbank logo'
          className={`w-56 h-56 mr-20 rounded-full border-1 border-border-main dark:border-border-main-dark overflow-hidden`}
        />
        <div className='my-1 flex flex-col justify-between h-56'>
          <div className='flex items-center'>
            <h2
              className={`font-subtitle01-bold mr-16 text-text-main dark:text-text-main-dark`}
            >
              Cooldaram
            </h2>
            <ShareNetwork className='mr-12 fill-icon-subtle dark:fill-icon-subtle-dark' />
            <Eye className=' fill-icon-subtle dark:fill-icon-subtle-dark' />
          </div>
          <div className='font-caption-regular flex items-center text-text-subtle dark:text-text-subtle-dark'>
            <span className='flex items-center mr-16'>
              <WalletFilled
                className='mr-4 fill-icon-disabled dark:fill-icon-disabled-dark'
                width={14}
                height={14}
              />
              Wallet 12
            </span>
            <span className='flex items-center'>
              <FolderFilled
                className='mr-4 fill-icon-disabled dark:fill-icon-disabled-dark'
                width={14}
                height={14}
              />
              group 2
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-end'>
        <p className='font-caption-medium mb-8 text-text-subtlest dark:text-text-subtlest-dark'>
          Current Balance
        </p>
        <p className='font-header03-bold mb-4 text-text-main dark:text-text-main-dark'>
          $173,398
        </p>
        <div className='font-caption-medium flex'>
          <div className='px-8 py-4 bg-background-danger dark:bg-background-danger-dark'>
            <p className='text-text-danger dark:text-text-danger-dark'>
              -2,117(2.3%)
            </p>
          </div>
          <div className='px-8 py-4 bg-elevation-surface-raised dark:bg-elevation-surface-raised-dark'>
            <p className='text-text-main dark:text-text-main-dark'>24h</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfileComponent;
