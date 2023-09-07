type TProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};
const Pagination = (props: TProps) => {
  return (
    <div className='pagination'>
      <button>prev</button>
      <div className='pagination__item'>
        <button className='pagination__button'>1</button>
      </div>
      <div className='pagination__item'>
        <button className='pagination__button'>2</button>
      </div>
      <div className='pagination__item'>
        <button className='pagination__button'>3</button>
      </div>
      <button>next</button>
    </div>
  );
};
export default Pagination;
