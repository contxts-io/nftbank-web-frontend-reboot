const Gear = (props: any) => {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M8.00003 5.00003C7.40668 5.00003 6.82666 5.17598 6.33332 5.50562C5.83997 5.83526 5.45545 6.3038 5.22839 6.85198C5.00133 7.40016 4.94192 8.00336 5.05767 8.5853C5.17343 9.16724 5.45915 9.70179 5.87871 10.1213C6.29827 10.5409 6.83281 10.8266 7.41476 10.9424C7.9967 11.0581 8.5999 10.9987 9.14808 10.7717C9.69626 10.5446 10.1648 10.1601 10.4944 9.66674C10.8241 9.17339 11 8.59337 11 8.00003C10.9992 7.20463 10.6829 6.44205 10.1204 5.87962C9.55801 5.31719 8.79542 5.00086 8.00003 5.00003ZM8.00003 10C7.60447 10 7.21779 9.88273 6.88889 9.66297C6.55999 9.4432 6.30364 9.13085 6.15227 8.76539C6.00089 8.39994 5.96129 7.99781 6.03846 7.60985C6.11563 7.22189 6.30611 6.86552 6.58581 6.58581C6.86552 6.30611 7.22189 6.11563 7.60985 6.03846C7.99781 5.96129 8.39994 6.00089 8.76539 6.15227C9.13085 6.30364 9.4432 6.55999 9.66297 6.88889C9.88273 7.21779 10 7.60447 10 8.00003C10 8.53046 9.78931 9.03917 9.41424 9.41424C9.03917 9.78931 8.53046 10 8.00003 10ZM13.5 8.13503C13.5025 8.04503 13.5025 7.95503 13.5 7.86503L14.4325 6.70003C14.4814 6.63886 14.5153 6.56706 14.5313 6.49042C14.5474 6.41378 14.5452 6.33443 14.525 6.25878C14.3722 5.68415 14.1435 5.13243 13.845 4.61815C13.8059 4.55085 13.7517 4.4936 13.6866 4.45096C13.6215 4.40832 13.5473 4.38146 13.47 4.37253L11.9875 4.20753C11.9259 4.14253 11.8634 4.08003 11.8 4.02003L11.625 2.53378C11.616 2.45641 11.5891 2.38222 11.5463 2.31711C11.5036 2.252 11.4462 2.19779 11.3788 2.15878C10.8643 1.86087 10.3126 1.63242 9.73815 1.4794C9.66245 1.45928 9.58308 1.45722 9.50643 1.47339C9.42979 1.48957 9.35802 1.52353 9.2969 1.57253L8.13503 2.50003C8.04503 2.50003 7.95503 2.50003 7.86503 2.50003L6.70003 1.5694C6.63886 1.52051 6.56706 1.48666 6.49042 1.4706C6.41378 1.45453 6.33443 1.45669 6.25878 1.4769C5.68425 1.63005 5.13256 1.85871 4.61815 2.1569C4.55085 2.19598 4.4936 2.25023 4.45096 2.31533C4.40832 2.38044 4.38146 2.45459 4.37253 2.5319L4.20753 4.0169C4.14253 4.07899 4.08003 4.14149 4.02003 4.2044L2.53378 4.37503C2.45641 4.38403 2.38222 4.41098 2.31711 4.45373C2.252 4.49649 2.19779 4.55386 2.15878 4.62128C1.86087 5.13576 1.63242 5.68743 1.4794 6.2619C1.45928 6.33761 1.45722 6.41698 1.47339 6.49362C1.48957 6.57027 1.52353 6.64204 1.57253 6.70315L2.50003 7.86503C2.50003 7.95503 2.50003 8.04503 2.50003 8.13503L1.5694 9.30003C1.52051 9.3612 1.48666 9.43299 1.4706 9.50963C1.45453 9.58628 1.45669 9.66562 1.4769 9.74128C1.62977 10.3159 1.85845 10.8676 2.1569 11.3819C2.19598 11.4492 2.25023 11.5065 2.31533 11.5491C2.38044 11.5917 2.45459 11.6186 2.5319 11.6275L4.0144 11.7925C4.07649 11.8575 4.13899 11.92 4.2019 11.98L4.37503 13.4663C4.38403 13.5436 4.41098 13.6178 4.45373 13.6829C4.49649 13.7481 4.55386 13.8023 4.62128 13.8413C5.13576 14.1392 5.68743 14.3676 6.2619 14.5207C6.33761 14.5408 6.41698 14.5428 6.49362 14.5267C6.57027 14.5105 6.64204 14.4765 6.70315 14.4275L7.86503 13.5C7.95503 13.5025 8.04503 13.5025 8.13503 13.5L9.30003 14.4325C9.3612 14.4814 9.43299 14.5153 9.50963 14.5313C9.58628 14.5474 9.66562 14.5452 9.74128 14.525C10.3159 14.3722 10.8676 14.1435 11.3819 13.845C11.4492 13.8059 11.5065 13.7517 11.5491 13.6866C11.5917 13.6215 11.6186 13.5473 11.6275 13.47L11.7925 11.9875C11.8575 11.9259 11.92 11.8634 11.98 11.8L13.4663 11.625C13.5436 11.616 13.6178 11.5891 13.6829 11.5463C13.7481 11.5036 13.8023 11.4462 13.8413 11.3788C14.1392 10.8643 14.3676 10.3126 14.5207 9.73815C14.5408 9.66245 14.5428 9.58308 14.5267 9.50643C14.5105 9.42979 14.4765 9.35802 14.4275 9.2969L13.5 8.13503ZM12.4938 7.72878C12.5044 7.90946 12.5044 8.0906 12.4938 8.27128C12.4863 8.39498 12.5251 8.51703 12.6025 8.61378L13.4894 9.7219C13.3876 10.0453 13.2573 10.3591 13.1 10.6594L11.6875 10.8194C11.5645 10.8331 11.4509 10.8918 11.3688 10.9844C11.2485 11.1197 11.1203 11.2478 10.985 11.3682C10.8925 11.4503 10.8337 11.5639 10.82 11.6869L10.6632 13.0982C10.3628 13.2555 10.0491 13.3858 9.72565 13.4875L8.6169 12.6007C8.52818 12.5298 8.41797 12.4912 8.3044 12.4913H8.2744C8.09373 12.5019 7.91258 12.5019 7.7319 12.4913C7.6082 12.4838 7.48615 12.5226 7.3894 12.6L6.27815 13.4875C5.95474 13.3858 5.641 13.2555 5.34065 13.0982L5.18065 11.6875C5.167 11.5645 5.10821 11.4509 5.01565 11.3688C4.88035 11.2485 4.75221 11.1203 4.6319 10.985C4.54974 10.8925 4.43616 10.8337 4.31315 10.82L2.9019 10.6625C2.74452 10.3622 2.61422 10.0485 2.51253 9.72503L3.3994 8.61628C3.47684 8.51953 3.5156 8.39748 3.50815 8.27378C3.49753 8.0931 3.49753 7.91196 3.50815 7.73128C3.5156 7.60758 3.47684 7.48552 3.3994 7.38878L2.51253 6.27815C2.61429 5.95474 2.7446 5.641 2.9019 5.34065L4.31253 5.18065C4.43554 5.167 4.54911 5.10821 4.63128 5.01565C4.75158 4.88035 4.87972 4.75221 5.01503 4.6319C5.10795 4.54968 5.16698 4.43585 5.18065 4.31253L5.33753 2.9019C5.63784 2.74452 5.95158 2.61422 6.27503 2.51253L7.38378 3.3994C7.48052 3.47684 7.60258 3.5156 7.72628 3.50815C7.90696 3.49753 8.0881 3.49753 8.26878 3.50815C8.39248 3.5156 8.51453 3.47684 8.61128 3.3994L9.7219 2.51253C10.0453 2.61429 10.3591 2.7446 10.6594 2.9019L10.8194 4.31253C10.8331 4.43554 10.8918 4.54911 10.9844 4.63128C11.1197 4.75158 11.2478 4.87972 11.3682 5.01503C11.4503 5.10758 11.5639 5.16637 11.6869 5.18003L13.0982 5.3369C13.2555 5.63722 13.3858 5.95096 13.4875 6.2744L12.6007 7.38315C12.5225 7.48071 12.4837 7.60403 12.4919 7.72878H12.4938Z'
        fill='currentColor'
        {...props}
      />
    </svg>
  );
};
export default Gear;
