'use client';
import styles from './Dropdown.module.css';
import Button from '@/components/buttons/Button';
import CaretDown from '@/public/icon/CaretDown';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
type Props = {
  id: string;
  list: string[];
  selected: string;
  onClick: (value: string) => void;
  className?: string;
  listStyle?: string;
  children?: React.ReactNode;
};
const Dropdown = (props: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  return (
    <Button
      className={`relative cursor-pointer w-65 ${props.className || ''}`}
      id={props.id}
      onClick={(e) => (e.stopPropagation(), setIsPopoverOpen((prev) => !prev))}
    >
      {props.children || (
        <>
          <p>{props?.selected}</p>
          <div className={`${isPopoverOpen ? 'rotate-180' : 'rotate-0'} ml-4`}>
            <CaretDown />
          </div>
        </>
      )}
      {isPopoverOpen && (
        <ul
          className={twMerge(
            `${styles.dropdown} top-45 ${
              props.listStyle ? props.listStyle : ''
            } z-50`
          )}
        >
          {props.list.map((item, index) => {
            return (
              <li key={index} onClick={() => props.onClick(item)}>
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </Button>
  );
};
export default Dropdown;
