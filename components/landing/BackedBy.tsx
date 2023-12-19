import Image from 'next/image';

const BackedBy = () => {
  return (
    <section className='flex flex-col items-center my-160'>
      <p className='font-header02-medium'>Backed by the best</p>
      <div className='mt-80 w-full flex justify-center gap-x-12'>
        <Image src='/backed/Hashed.svg' width={136} height={98} alt='' />
        <Image
          src='/backed/DigitalCurrency.svg'
          width={136}
          height={98}
          alt=''
        />
        <Image src='/backed/1kx.svg' width={206} height={60} alt='' />
        <Image src='/backed/Sequoia.svg' width={206} height={60} alt='' />
        <Image src='/backed/Alameda.svg' width={206} height={60} alt='' />
      </div>
      <div className='mt-80 w-full flex justify-center gap-x-12'>
        <Image src='/backed/Bitkraft.svg' width={206} height={60} alt='' />
        <Image src='/backed/Dapper.svg' width={206} height={60} alt='' />
        <Image src='/backed/Sfermion.svg' width={206} height={60} alt='' />
        <Image src='/backed/Sandbox.svg' width={206} height={60} alt='' />
      </div>
    </section>
  );
};
export default BackedBy;
