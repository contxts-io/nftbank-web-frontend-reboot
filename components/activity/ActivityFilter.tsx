'use client';
import styles from './ActivityFilter.module.css';
import Button from '../buttons/Button';
import Dropdown from '../dropdown/Dropdown';
import { TChain } from '@/interfaces/constants';
import { useEffect, useState } from 'react';
import MagnifyingGlass from '@/public/icon/MagnifyingGlass';
import SearchInput from '../searchInput/SearchInput';
import ActivityTree from './ActivityTree';
import ActivityMarketPlaceFilter from './ActivityMarketPlaceFilter';
import ActivityCollection from './ActivityCollection';
import ActivityGame from './ActivityGame';
import ActivityValueFilter from './ActivityValueFilter';
import ToggleButton from '../buttons/ToggleButton';
import Calendar from 'react-calendar';
import CalendarBlank from '@/public/icon/CalendarBlank';
import { capitalizeFirstLetter } from '@/utils/common';
import Cancel from '@/public/icon/Cancel';

const CHAIN: { name: string; key: 'all' | TChain }[] = [
  { name: 'All Chain', key: 'all' },
  { name: 'Ethereum', key: 'ethereum' },
  {
    name: 'Polygon',
    key: 'polygon',
  },
];

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ActivityFilter = () => {
  const [chainList, setChainList] = useState<
    { name: string; key: 'all' | TChain; selected: boolean }[]
  >([...CHAIN.map((item) => ({ ...item, selected: false }))]);
  const [searchText, setSearchText] = useState<string>('');
  const [isEditOnly, setIsEditOnly] = useState<boolean>(false);
  const [isIncludeSpam, setIsIncludeSpam] = useState<boolean>(false);
  const [value, onChange] = useState<Value>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);
  useEffect(() => {
    setChainList((prev) =>
      prev?.map((item) => ({
        ...item,
        selected: item.key === 'all' ? true : false,
      }))
    );
  }, []);
  const handleClickList = (name: string) => {
    setChainList((prev) =>
      prev?.map((item) => ({
        ...item,
        selected: item.name === name ? true : false,
      }))
    );
  };
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchText(value);
  };
  const handleClickToggleEditOnly = () => {
    setIsEditOnly((prev) => !prev);
  };
  const handleClickToggleSpam = () => {
    setIsIncludeSpam((prev) => !prev);
  };
  const openCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };
  const onChangeCalendar = (value: any) => {
    console.log('onChange', value);
    setSelectedDate(value);
  };
  return (
    <div className={styles.container}>
      <Dropdown
        id=''
        className='w-full h-36 flex justify-between items-center mb-12'
        list={chainList.map((item) => item.name)}
        listStyle='w-full'
        selected={chainList.find((item) => item.selected)?.name || 'All Chain'}
        onClick={(name) => handleClickList(name)}
      />
      <div className='relative'>
        <div className={`font-body02-regular ${styles.inputContainer}`}>
          <CalendarBlank />
          <input
            id=''
            placeholder='All'
            className='w-full'
            onClick={() => openCalendar()}
          />
        </div>
        {/* {selectedDate.length === 0 ? (
          <p>All</p>
        ) : (
          <div className='font-caption-medium w-full flex text-[var(--color-text-main)] items-center justify-between'>
            <p>
              {selectedDate[0]?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            -
            <p>
              {selectedDate[1]?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <Cancel className='fill-[var(--color-icon-subtle)]' />
          </div>
        )} */}
        {isCalendarOpen && (
          <div className='absolute top-50 bg-[var(--color-elevation-surface)] z-10 w-full'>
            <Calendar
              onChange={onChangeCalendar}
              value={value}
              className={styles.calendar}
              formatMonthYear={(locale, date) =>
                date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                })
              }
              formatShortWeekday={(locale, date) =>
                capitalizeFirstLetter(
                  date
                    .toLocaleDateString('en-US', {
                      weekday: 'short',
                    })
                    .substring(0, 2)
                )
              }
              formatDay={(locale, date) => date.getDate().toString()}
              onDrillUp={() => console.log('onDrillUp')}
              onDrillDown={() => console.log('onDrillDown')}
              selectRange={true}
              returnValue='range'
              onClickDay={(value, event) => console.log(value)}
            />
          </div>
        )}
      </div>
      <SearchInput
        className={styles.searchInput}
        placeholder='Search by Address, Item'
      />
      <ActivityTree />
      <ActivityMarketPlaceFilter />
      <ActivityCollection />
      <ActivityGame />
      <ActivityValueFilter />
      <div className='font-button03-medium flex justify-between mr-8 my-6'>
        <p className={styles.pToggle}>Edit only</p>
        <ToggleButton
          onClick={handleClickToggleEditOnly}
          checked={isEditOnly}
          id={''}
        />
      </div>
      <div className='font-button03-medium flex justify-between mr-8 my-6'>
        <p className={styles.pToggle}>Include Spam</p>
        <ToggleButton
          onClick={handleClickToggleSpam}
          checked={isIncludeSpam}
          id={''}
        />
      </div>
    </div>
  );
};
export default ActivityFilter;
