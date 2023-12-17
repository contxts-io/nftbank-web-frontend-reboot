const PuzzlePiece = (props: any) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M17.2097 12.3858C17.1206 12.3296 17.0187 12.2969 16.9136 12.2906C16.8084 12.2843 16.7033 12.3047 16.6082 12.3499C16.37 12.4625 16.1073 12.5131 15.8443 12.497C15.5814 12.4808 15.3268 12.3984 15.1042 12.2575C14.8816 12.1165 14.6983 11.9216 14.5713 11.6908C14.4443 11.46 14.3777 11.2009 14.3777 10.9374C14.3777 10.674 14.4443 10.4148 14.5713 10.184C14.6983 9.95321 14.8816 9.75828 15.1042 9.61734C15.3268 9.4764 15.5814 9.39401 15.8443 9.37785C16.1073 9.3617 16.37 9.41228 16.6082 9.52491C16.7035 9.57013 16.8086 9.5905 16.9139 9.58413C17.0192 9.57776 17.1211 9.54485 17.2103 9.48847C17.2994 9.43209 17.3728 9.35408 17.4237 9.26168C17.4745 9.16929 17.5012 9.06553 17.5011 8.96007V5.62491C17.5011 5.29339 17.3694 4.97545 17.135 4.74103C16.9006 4.50661 16.5827 4.37491 16.2511 4.37491H13.4215C13.4331 4.27115 13.4388 4.16682 13.4386 4.06241C13.4381 3.67829 13.3591 3.29833 13.2064 2.94583C13.0538 2.59332 12.8308 2.27569 12.5511 2.01241C12.1639 1.64867 11.6815 1.40207 11.1598 1.30118C10.6381 1.20028 10.0986 1.24921 9.60359 1.4423C9.1086 1.63539 8.67843 1.96475 8.36289 2.39223C8.04736 2.8197 7.85936 3.32782 7.82067 3.85772C7.80867 4.0301 7.81233 4.2032 7.83161 4.37491H5.00114C4.66962 4.37491 4.35168 4.50661 4.11726 4.74103C3.88284 4.97545 3.75114 5.29339 3.75114 5.62491V8.1421C3.64739 8.13047 3.54305 8.12473 3.43864 8.12491C3.05453 8.12553 2.67458 8.20457 2.32208 8.35717C1.96958 8.50978 1.65195 8.73275 1.38864 9.01241C1.12345 9.29254 0.919244 9.62464 0.788941 9.98772C0.658637 10.3508 0.605066 10.737 0.631613 11.1218C0.6764 11.7994 0.964329 12.4381 1.44245 12.9204C1.92057 13.4027 2.55673 13.6961 3.23396 13.7468C3.40632 13.7592 3.57946 13.7555 3.75114 13.7359V16.2499C3.75114 16.5814 3.88284 16.8994 4.11726 17.1338C4.35168 17.3682 4.66962 17.4999 5.00114 17.4999H16.2511C16.5827 17.4999 16.9006 17.3682 17.135 17.1338C17.3694 16.8994 17.5011 16.5814 17.5011 16.2499V12.9148C17.5012 12.8092 17.4745 12.7053 17.4236 12.6128C17.3726 12.5203 17.299 12.4422 17.2097 12.3858ZM16.2511 16.2499H5.00114V12.9148C5.00118 12.8093 4.97452 12.7055 4.92366 12.6131C4.8728 12.5207 4.79939 12.4427 4.71025 12.3864C4.62112 12.33 4.51917 12.2971 4.4139 12.2907C4.30863 12.2843 4.20346 12.3047 4.10818 12.3499C3.87002 12.4625 3.60726 12.5131 3.34431 12.497C3.08137 12.4808 2.82677 12.3984 2.60421 12.2575C2.38164 12.1165 2.19832 11.9216 2.07129 11.6908C1.94427 11.46 1.87766 11.2009 1.87766 10.9374C1.87766 10.674 1.94427 10.4148 2.07129 10.184C2.19832 9.95321 2.38164 9.75828 2.60421 9.61734C2.82677 9.4764 3.08137 9.39401 3.34431 9.37785C3.60726 9.3617 3.87002 9.41228 4.10818 9.52491C4.20346 9.57013 4.30863 9.5905 4.4139 9.58413C4.51917 9.57776 4.62112 9.54485 4.71025 9.48847C4.79939 9.43209 4.8728 9.35408 4.92366 9.26168C4.97452 9.16929 5.00118 9.06553 5.00114 8.96007V5.62491H8.6488C8.75427 5.62495 8.85802 5.59829 8.95042 5.54743C9.04281 5.49657 9.12082 5.42315 9.1772 5.33402C9.23358 5.24489 9.26649 5.14294 9.27286 5.03767C9.27923 4.9324 9.25886 4.82722 9.21364 4.73194C9.10101 4.49379 9.05043 4.23103 9.06659 3.96808C9.08275 3.70513 9.16513 3.45054 9.30607 3.22797C9.44701 3.00541 9.64195 2.82209 9.87274 2.69506C10.1035 2.56803 10.3627 2.50142 10.6261 2.50142C10.8896 2.50142 11.1488 2.56803 11.3795 2.69506C11.6103 2.82209 11.8053 3.00541 11.9462 3.22797C12.0872 3.45054 12.1695 3.70513 12.1857 3.96808C12.2019 4.23103 12.1513 4.49379 12.0386 4.73194C11.9934 4.82722 11.9731 4.9324 11.9794 5.03767C11.9858 5.14294 12.0187 5.24489 12.0751 5.33402C12.1315 5.42315 12.2095 5.49657 12.3019 5.54743C12.3943 5.59829 12.498 5.62495 12.6035 5.62491H16.2511V8.14288C16.0795 8.12321 15.9063 8.11955 15.734 8.13194C15.0065 8.18345 14.3276 8.51548 13.8403 9.05799C13.353 9.6005 13.0954 10.3111 13.122 11.0398C13.1485 11.7686 13.4571 12.4585 13.9826 12.9641C14.5081 13.4697 15.2094 13.7515 15.9386 13.7499C16.0431 13.7501 16.1474 13.7444 16.2511 13.7327V16.2499Z'
        fill='currentColor'
        {...props}
      />
    </svg>
  );
};
export default PuzzlePiece;
