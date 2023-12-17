import Image from 'next/image';

const Partners = () => {
  return (
    <section className='flex flex-col items-center mt-160'>
      <p className='font-header02-medium'>
        Partners Powered by NFTBank Price API
      </p>
      <div className='mt-80 w-full flex justify-center'>
        <Image src='/partners/Metamask.svg' width={200} height={80} alt='' />
      </div>
      <div className='mt-30 w-full flex justify-center items-center gap-12'>
        <Image src='/partners/Injective.svg' width={136} height={98} alt='' />
        <Image src='/partners/Frame1.svg' width={136} height={98} alt='' />
        <Image src='/partners/Pine.svg' width={136} height={98} alt='' />
        <Image src='/partners/Goblinsax.svg' width={136} height={98} alt='' />
        <Image src='/partners/NFTfi.svg' width={136} height={98} alt='' />
        <Image src='/partners/Pawnfi.svg' width={136} height={98} alt='' />
        <Image src='/partners/Frame2.svg' width={136} height={98} alt='' />
      </div>
      <div className='mt-30 w-full flex justify-center items-center gap-12'>
        <Image src='/partners/Frame3.svg' width={136} height={98} alt='' />
        <Image src='/partners/Frame4.svg' width={136} height={98} alt='' />
        <Image src='/partners/Arcade.svg' width={136} height={98} alt='' />
        <Image src='/partners/Astaria.svg' width={136} height={98} alt='' />
        <Image src='/partners/Cyan.svg' width={136} height={98} alt='' />
        <Image src='/partners/Pwn.svg' width={136} height={98} alt='' />
        <Image src='/partners/Unlockd.svg' width={136} height={98} alt='' />
      </div>
      <div className='mt-30 w-full flex justify-center items-center gap-12'>
        <Image src='/partners/Starter.svg' width={136} height={98} alt='' />
        <Image src='/partners/Lithium.svg' width={136} height={98} alt='' />
        <Image src='/partners/Spice.svg' width={136} height={98} alt='' />
      </div>
    </section>
  );
};
export default Partners;
