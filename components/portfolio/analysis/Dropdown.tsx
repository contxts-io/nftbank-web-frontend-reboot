'use client';
import styles from './Dropdown.module.css';
import Button from '@/components/buttons/Button';
import CaretDown from '@/public/icon/CaretDown';
import { useState } from 'react';
type Props = {
  id?: string;
  list: string[];
  selected: string;
  onClick: (value: string) => void;
  className?: string;
};
const Dropdown = (props: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  return (
    <div
      className={`border-1 border-[var(--color-border-bold)] px-12 h-36 relative cursor-pointer w-78 flex items-center ${
        props.className || ''
      }`}
      onClick={(e) => (e.stopPropagation(), setIsPopoverOpen((prev) => !prev))}
    >
      <div className='flex items-center'>
        <p>{props?.selected}</p>
        <div className={`${isPopoverOpen ? 'rotate-180' : 'rotate-0'} ml-4`}>
          <CaretDown />
        </div>
      </div>
      {isPopoverOpen && (
        <ul className={`${styles.dropdown} z-50`}>
          {props.list.map((item, index) => {
            return (
              <li key={index}>
                <Button
                  id={props.id}
                  parameter={item}
                  onClick={() => (props.onClick(item), setIsPopoverOpen(false))}
                  className={`${
                    props.selected === item ? styles.selected : ''
                  }`}
                >
                  {item}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default Dropdown;
