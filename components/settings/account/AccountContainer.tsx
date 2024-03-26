'use client';

import BlockiesIcon from '@/components/BlockiesIcon';
import NicknameSetting from '@/components/NicknameSetting';
import { TCurrency } from '@/interfaces/constants';
import CaretDown from '@/public/icon/CaretDown';
import PencilSimple from '@/public/icon/PencilSimple';
import { currencyAtom } from '@/store/currency';
import { useMutationUpdateMe } from '@/utils/hooks/mutations/auth';
import { useMe } from '@/utils/hooks/queries/auth';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

const AccountContainer = () => {
  const queryClient = useQueryClient();
  const { data: me, refetch } = useMe();
  const [currency, setCurrency] = useAtom(currencyAtom);
  const { mutate: updateMe, status: updateMeStatus } = useMutationUpdateMe();
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    me && setCurrency(me.config.currency);
  }, [me]);
  const handleUpdateMe = async (currency: TCurrency) => {
    setCurrency(currency);
    await updateMe({ currency: currency });
    // reactQueryClient.setQueryData(['me', TOKEN.value], user);
  };
  // useEffect(() => {
  //   updateMe({ currency: currency });
  // }, [currency]);

  return (
    isClient && (
      <div className='flex flex-col items-center max-w-[960px] w-full'>
        <div className='w-full flex items-center mb-40'>
          <div className='rounded-full border-1 border-[var(--color-border-main)] overflow-hidden mr-20'>
            {me?.image ? (
              <img src={me?.image} className='w-56 h-56' />
            ) : (
              me?.nickname && (
                <BlockiesIcon walletAddress={me?.nickname} size={56} />
              )
            )}
          </div>
          <p className='font-subtitle01-bold text-[var(--color-text-main)] mr-12'>
            {me?.nickname}
          </p>
          <div
            className='h-20 w-20 flex items-center justify-center cursor-pointer text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)]'
            onClick={() => setShowModal(true)}
          >
            <PencilSimple />
          </div>
        </div>
        <ul className='w-full flex flex-col'>
          <li className='border-b-1 border-[var(--color-border-main)] pb-16'>
            <p className='font-button01-medium text-[var(--color-text-main)] '>
              General
            </p>
          </li>
          <li className='border-b-1 border-[var(--color-border-main)] py-12 flex justify-between items-center'>
            <p className='font-body02-regular text-[var(--color-text-main)] '>
              Nickname
            </p>
            <div className='flex items-center gap-x-8'>
              <p className='text-[var(--color-text-subtle)]'>{me?.nickname}</p>
              <div
                className='h-20 w-20 flex items-center justify-center cursor-pointer text-[var(--color-text-subtle)] hover:text-[var(--color-text-main)]'
                onClick={() => setShowModal(true)}
              >
                <PencilSimple />
              </div>
            </div>
          </li>
          <li className='border-b-1 border-[var(--color-border-main)] py-12 flex justify-between items-center'>
            <p className='font-body02-regular text-[var(--color-text-main)] '>
              Currency
            </p>

            <Dropdown className='!w-fit !min-w-78'>
              <DropdownTrigger className=''>
                <div className='flex items-center gap-x-8'>
                  <p className='text-[var(--color-text-subtle)]'>
                    {currency.toUpperCase()}
                  </p>
                  <CaretDown />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label='Static Actions'
                className='w-74 bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-main)] py-8 px-6'
              >
                <DropdownItem
                  value='eth'
                  className='hover:bg-[var(--color-elevation-sunken)]  h-24 px-6 flex items-center'
                  onClick={() => handleUpdateMe('eth')}
                >
                  ETH
                </DropdownItem>
                <DropdownItem
                  value='usd'
                  className='hover:bg-[var(--color-elevation-sunken)] h-24 px-6 flex items-center'
                  onClick={() => handleUpdateMe('usd')}
                >
                  USD
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          {/* <li className='border-b-1 border-[var(--color-border-main)] py-12'>
            <p className='font-body02-regular text-[var(--color-text-main)] '>
              Theme
            </p>
            <p className='text-[var(--color-text-subtle)]'></p>
          </li> */}
        </ul>
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
          <div className='relative w-full h-full'>
            <NicknameSetting onClose={() => setShowModal(false)} />
          </div>
        </ReactModal>
      </div>
    )
  );
};
export default AccountContainer;
