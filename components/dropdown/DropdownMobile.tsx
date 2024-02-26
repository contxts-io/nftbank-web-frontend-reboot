import CaretDown from '@/public/icon/CaretDown';
import styles from './DropdownMobile.module.css';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  list: { name: string; value: string }[];
  value: string;
  handleClickItem: (item: { name: string; value: string }) => void;
  children?: React.ReactNode;
};
const DropdownMobile = ({
  open,
  setOpen,
  list,
  value,
  handleClickItem,
  children,
}: Props) => {
  return (
    <Dropdown isOpen={open} onClose={() => setOpen(false)}>
      <DropdownTrigger onClick={() => setOpen(!open)}>
        {/* <div className='flex items-center text-[var(--color-text-subtle)] gap-x-2'>
                <p>{selectedPeriod}</p>
                <div className={isPopoverOpen ? 'rotate-180' : ''}>
                  <CaretDown />
                </div>
              </div> */}
        <li
          className={`font-caption-medium text-[var(--color-text-subtle)] ${styles.link}`}
        >
          <p>{value}</p>
          <div className={open ? 'rotate-180' : ''}>
            <CaretDown />
          </div>
        </li>
      </DropdownTrigger>
      <DropdownMenu className={styles.dropdownMenu}>
        {list.map((item, index) => (
          <DropdownItem
            key={index}
            className='min-w-50 h-30 bg-[var(--color-elevation-surface)] px-8'
            onClick={() => handleClickItem(item)}
          >
            <p className='font-caption-medium'>{item.name}</p>
          </DropdownItem>
        ))}
        {/* {(item) => (
                <DropdownItem
                  key={item.value}
                  value={item.value}
                  className='w-50 h-30'
                  onClick={() => handleClickPeriod(item)}
                >
                  {item.name}
                </DropdownItem>
              )} */}
      </DropdownMenu>
    </Dropdown>
  );
};
export default DropdownMobile;
