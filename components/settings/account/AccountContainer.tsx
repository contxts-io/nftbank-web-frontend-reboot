'use client';

import BlockiesIcon from '@/components/BlockiesIcon';
import CaretDown from '@/public/icon/CaretDown';
import PencilSimple from '@/public/icon/PencilSimple';
import { useMe } from '@/utils/hooks/queries/auth';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

const AccountContainer = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const { data: me } = useMe();
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
          <PencilSimple className='fill-[var(--color-text-subtle)]' />
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
              <PencilSimple />
            </div>
          </li>
          <li className='border-b-1 border-[var(--color-border-main)] py-12 flex justify-between items-center'>
            <p className='font-body02-regular text-[var(--color-text-main)] '>
              Currency
            </p>

            <Dropdown>
              <DropdownTrigger className=''>
                <div className='flex items-center gap-x-8'>
                  <p className='text-[var(--color-text-subtle)]'>
                    {me?.config.currency.toUpperCase()}
                  </p>
                  <CaretDown />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label='Static Actions'
                className='bg-[var(--color-elevation-surface)] border-1 border-[var(--color-border-main)] py-8 px-6'
              >
                <DropdownItem
                  key='eth'
                  className='hover:bg-[var(--color-elevation-sunken)] w-62 h-24 px-6 flex items-center'
                >
                  ETH
                </DropdownItem>
                <DropdownItem key='usd'>USD</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li className='border-b-1 border-[var(--color-border-main)] py-12'>
            <p className='font-body02-regular text-[var(--color-text-main)] '>
              Theme
            </p>
            <p className='text-[var(--color-text-subtle)]'></p>
          </li>
        </ul>
      </div>
    )
  );
};
export default AccountContainer;
