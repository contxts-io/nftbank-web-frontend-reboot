const TwitterLogo = (props: any) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <mask
        id='mask0_3892_5689'
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='16'
        height='16'
        {...props}
      >
        <path d='M15.5 0.5H0.5V15.5H15.5V0.5Z' fill='white' />
      </mask>
      <g mask='url(#mask0_3892_5689)'>
        <path
          d='M9.42704 6.84821L15.0111 0.5H13.6879L8.83921 6.01206L4.9666 0.5H0.5L6.35615 8.83523L0.5 15.4923H1.82333L6.94364 9.67138L11.0334 15.4923H15.5L9.42704 6.84821ZM7.61456 8.90865L7.02121 8.07865L2.30014 1.47426H4.33269L8.14265 6.80421L8.736 7.63421L13.6885 14.5624H11.656L7.61456 8.90865Z'
          fill='currentColor'
          {...props}
        />
      </g>
    </svg>
  );
};
export default TwitterLogo;
