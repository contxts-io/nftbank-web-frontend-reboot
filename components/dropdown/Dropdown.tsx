'use client';
import styles from './Dropdown.module.css';
import CaretDown from '@/public/icon/CaretDown';
import { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../buttons/Button';
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
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsPopoverOpen(false);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsPopoverOpen(false);
    }
  };
  useEffect(() => {
    console.log('props?.selected', props?.selected);
  }, [props?.selected]);
  return (
    <div
      className={`${styles.button} ${props.className || ''}`}
      id={props.id}
      onClick={(e) => (e.stopPropagation(), setIsPopoverOpen((prev) => !prev))}
      ref={listRef}
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
              <li key={index}>
                <Button
                  id={`performance_chart_summarized_year_filter_click_${item}`}
                  parameter={item}
                  onClick={() => props.onClick(item)}
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
