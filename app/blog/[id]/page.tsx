import TopNav from '@/components/TopNav';
import BlogDetail from '@/components/blog/BlogDetail';

const BlogDetailPage = () => {
  return (
    <section className='w-full flex flex-col items-center'>
      <div className='w-full sticky z-10 top-0'>
        <TopNav />
      </div>
      <div className='w-[800px] flex flex-col items-center'>
        <BlogDetail />
      </div>
    </section>
  );
};
export default BlogDetailPage;
