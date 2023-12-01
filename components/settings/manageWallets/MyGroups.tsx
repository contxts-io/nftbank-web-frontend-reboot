'use client';
import SearchInput from '@/components/searchInput/SearchInput';
import styles from './MyGroups.module.css';
import SubmitButton from '@/components/buttons/SubmitButton';
import GroupListTable from './GroupListTable';
import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import GroupSetting from '@/components/GroupSetting';
import GroupDetail from './GroupDetail';
import { TWalletGroup } from '@/interfaces/inventory';
import AddGroup from '@/components/AddGroup';
const MyGroups = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGroupDetailModal, setShowGroupDetailModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<TWalletGroup | null>(null);
  const handleClickGroup = (group: TWalletGroup) => {
    setSelectedGroup(group);
    // setShowGroupDetailModal(true);
  };
  useEffect(() => {
    selectedGroup && setShowGroupDetailModal(true);
  }, [selectedGroup]);
  return (
    <section className={styles.container}>
      <div className='w-full flex justify-between mt-26 px-24'>
        <div className='w-[320px]'>
          <SearchInput placeholder='Wallet Address, Wallet & Group Name' />
        </div>
        <SubmitButton id='' onClick={() => setShowModal(true)}>
          Add Group
        </SubmitButton>
      </div>
      <GroupListTable handleClickGroup={handleClickGroup} />
      <ReactModal
        isOpen={showGroupDetailModal}
        contentLabel='Group Detail'
        className='w-full max-w-[1036px] absolute top-0 right-0'
        onRequestClose={() => {
          setDrawerOpen(false);
          setTimeout(() => {
            setShowGroupDetailModal(false);
            setSelectedGroup(null);
          }, 200);
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={'overlayBackground'}
        onAfterOpen={() => {
          setDrawerOpen(true);
        }}
      >
        <div className={`${styles.sidebar} ${drawerOpen ? styles.open : ''}`}>
          {selectedGroup && <GroupDetail group={selectedGroup} />}
        </div>
      </ReactModal>
      <ReactModal
        isOpen={showModal}
        contentLabel='Minimal Modal Example'
        className='w-fit absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'
        onRequestClose={() => {
          setShowModal(false);
        }}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        overlayClassName={'overlayBackground'}
      >
        <AddGroup onClose={() => setShowModal(false)} />
        <GroupSetting />
      </ReactModal>
    </section>
  );
};
export default MyGroups;
