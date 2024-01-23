type Props = {
  value: string;
  className?: string;
};
const CurrencyComponent = (props: Props) => {
  const mark = props.value.substring(0, 1);
  const bigInt = props.value.substring(1).split('.')[0] || '0';
  const smallInt = props.value.substring(1).split('.')[1] || '00';
  return (
    <p className={`flex items-center ${props.className}`}>
      <span className='text-[var(--color-text-subtlest)]'>{mark}</span>
      <span className='text-[var(--color-text-main)]'>{bigInt}</span>
      <span className='text-[var(--color-text-subtlest)]'>{`.${smallInt}`}</span>
    </p>
  );
};
export default CurrencyComponent;
