import MagnifyingGlass from '@/public/icon/MagnifyingGlass';
import styles from './InventoryCollectionSettings.module.css';
import Gear from '@/public/icon/Gear';
const InventoryCollectionSettings = () => {
  return (
    <section className={`${styles.container}`}>
      <div className={`${styles.inputContainer}  dark:border-border-main-dark`}>
        <MagnifyingGlass
          className={`${styles.icon} dark:fill-icon-main-dark`}
          width={16}
          height={16}
        />
        <input
          type='text'
          placeholder={'Search collection'}
          className={`${styles.textInput} font-caption-regular placeholder:dark:text-text-subtlest-dark`}
        />
      </div>
      <div className='flex items-center'>
        <div className='flex mr-8'>
          <p className={`${styles.pSetting} dark:text-text-subtle-dark`}>
            Include Gas fee
          </p>
          <button className={styles.toggleButton}>
            <div className={styles.toggleIcon} />
          </button>
        </div>
        <button
          className={`font-button03-medium ${styles.settingButton} dark:border-border-main-dark`}
        >
          <Gear className={`${styles.gearIcon} dark:fill-icon-subtle-dark`} />
          <p className='dark:text-text-subtle-dark'>Spam Settings</p>
        </button>
      </div>
    </section>
  );
};
export default InventoryCollectionSettings;
