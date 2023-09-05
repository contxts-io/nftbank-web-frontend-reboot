import { cookies } from 'next/headers';
import axios from 'axios';
const instance = axios.create({
  baseURL: `/v1`,
  timeout: 50000,
});
// const token = getWithExpiry(process.env.AUTH_JWT_NAME);

/*
    1. 요청 인터셉터
    2개의 콜백 함수를 받습니다.
*/
// const cookieStore = cookies();
instance.interceptors.request.use(
  function (config:any) {
    // 요청 성공 직전 호출됩니다.
    // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
    // console.headers['x-api-key'] = '2022-12-01:v2';
    // const token = cookieStore.get('accessToken');
    const token = '';
    const headers = { headers: { Authorization: `Bearer ${token}` } };

    if (token) {
      config = { ...config, ...headers };
    }
    const result = {
      ...config,
      headers: { ...config.headers, 'x-nftbank-api-key': '2022-12-01:v2' },
    };
    return result;
  },
  function (error) {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  },
);

/*
    2. 응답 인터셉터
    2개의 콜백 함수를 받습니다.
*/
instance.interceptors.response.use(
  function (response) {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다. 
        .then() 으로 이어집니다.
    */
    return response;
  },

  function (error) {
    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.    
    */
    return Promise.reject(error);
  },
);

export default instance;
