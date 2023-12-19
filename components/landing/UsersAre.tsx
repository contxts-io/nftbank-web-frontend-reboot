import { UserComment, UserReviews } from '@/utils/userComments';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import styles from './UsersAre.module.css';
const ReviewCard = ({ data }: { data: UserComment }) => {
  return (
    <article className={styles.reviewArticle}>
      <div className='flex items-center gap-x-10'>
        <Image
          src={`https://storage.googleapis.com/nftbank-public/images/landing/${data.id}.png`}
          width={48}
          height={48}
          className='rounded-full'
          alt=''
        />
        <div>
          <p className='font-body01-regular text-[var(--color-text-main)]'>
            {data.nickname}
          </p>
          <p className='font-body01-regular text-[var(--color-text-subtle)]'>
            {data.id}
          </p>
        </div>
      </div>
      <p
        className={styles.reviewMessage}
        dangerouslySetInnerHTML={{ __html: data.message }}
      />
    </article>
  );
};
const UsersAre = () => {
  return (
    <section className='w-full flex flex-col items-center mt-120'>
      <p className={`font-header02-medium text-[#F6F8FA]`}>
        Many users are NFTBank
      </p>
      <div className={styles.marqueeWrapper}>
        <Marquee loop={0} autoFill={true}>
          {UserReviews.map((data, i) => {
            return i % 2 === 0 && <ReviewCard data={data} key={i} />;
          })}
        </Marquee>
        <div className='ml-[-260px] mt-12'>
          <Marquee loop={0} autoFill={true}>
            {UserReviews.map((data, i) => {
              return i % 2 === 1 && <ReviewCard data={data} key={i} />;
            })}
          </Marquee>
        </div>

        {/* <Marquee velocity={23.5}>
          {UserReviews.map((data, i) => (
            <ReviewCard data={data} key={i} />
          ))}
        </Marquee> */}
      </div>
    </section>
  );
};
export default UsersAre;
