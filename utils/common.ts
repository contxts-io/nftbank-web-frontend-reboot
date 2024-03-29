import { TValuation } from "@/interfaces/collection";
import { TCurrency } from "@/interfaces/constants";
import jwt from 'jsonwebtoken';
import { ARTICLE_CATEGORY } from "./articlesCategory";
import { SyntheticEvent } from "react";
import { BasicParam } from "@/interfaces/request";

export function formatDate(date:  Date): string  {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
  const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 포맷팅
  return `${year}/${month}/${day}`;
}
export function formatCurrency(amount: string | null, currency: TCurrency): string {
  if (!amount) return '-';
  if (amount === '-') return '-';
  if (amount === 'infinity')
    return '-';
  // return '∞';
  if (isNaN(parseFloat(amount))) {
    return '-';
  }
  if (currency === 'usd') {
    // return _formatFiat(parseFloat(amount),currency).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return _formatFiat(parseFloat(amount), currency).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  }
  if (currency === 'eth') {
    // return _formatEth(parseFloat(amount)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return _formatEth(parseFloat(amount)).replace('Ξ-','-Ξ').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").replace('.000', '').replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.$/, '');

  }
  return '';
}
export function formatCurrencyOriginal(amount: string | null, currency: TCurrency): string {
  if (!amount) return '-';
  if (amount === 'infinity')
    return '-';
    // return '∞';
  if (currency === 'usd') {
    return `$${parseFloat(amount).toLocaleString('en-US',{maximumFractionDigits: 10})}`;
  }
  if (currency === 'eth') {
    return `Ξ${parseFloat(amount).toLocaleString('en-US',{maximumFractionDigits: 10})}`;
  }
  return '';
}
// export function shortFormatCurrency(amount: string | null, currency: TCurrency): string {
//   if (!amount) return '';
//   if (amount === 'infinity')
//     return '-';
//     // return '∞';
//   if (currency === 'usd') {
//     return _formatFiat(parseFloat(amount), currency).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
//   }
//   if (currency === 'eth') {
//     return _formatEth(parseFloat(amount)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
//   }
//   return '';
// }
function formatNumber(number:number): string {
  const suffixes = ["", "K", "M", "B", "T", "Q"];
  const suffixNum = Math.floor(("" + number).length / 3);
  let shortValue = parseFloat((suffixNum !== 0 ? (number / Math.pow(1000, suffixNum)) : number).toPrecision(2));
  if (shortValue % 1 !== 0) {
    shortValue = parseFloat(shortValue.toFixed(1));
  }
  return shortValue + suffixes[suffixNum];
}
function _formatFiat(amount: number, currency: TCurrency): string {
  if (amount !== 0 && Math.abs(amount) <= 0.01) return `< $0.01`;
  return parseFloat(amount.toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: currency }).replace('.00', '');
}
function _formatEth(amount: number): string {
  let _amount = '';
  if (Math.abs(amount) < 1e-7 && Math.abs(amount) > 1e-5) {
    _amount = amount.toExponential(7); // 1e-7보다 작고 1e-5보다 큰 경우
  } else if (Math.abs(amount) < 1e-5) {
    _amount = amount.toPrecision(7); // 1e-5보다 작은 경우, 소수점 일곱째 자리까지 표기
  } else {
    _amount = amount.toFixed(4); // 그 외의 경우, 기본 표기 방식 사용
  }
  // _amount = formatNumber(parseFloat(_amount));
  // return parseFloat(_amount).toLocaleString('en-US', { style: 'currency', currency: 'ETH' }).replace('ETH', 'Ξ');
  return `Ξ${parseFloat(_amount).toFixed(3)}`;
}

export function isPlus (value: number | string): boolean | '-' {
  if (value === 'infinity' || value === null || value === '0' || value === '-' || value === 0) return '-';
  else if (typeof value === 'string') {
    if(parseFloat(value) === 0) return '-';
    return parseFloat(value) > 0 ? true : false;
  } else if (typeof value === 'number') {
    return value > 0 ? true : false;
  } else {
    return false;
  }
};
export function formatPercent(_percent: string | 'infinity' | 'Infinity' | null, type?:'og'): string {
  if (_percent === null) return '-%';
  if (_percent === 'infinity' || _percent === 'Infinity') return '-%';
  const percent = type && type==='og' ? parseFloat(_percent) * 100 :  parseFloat(_percent);
  if (Math.abs(percent) <= 0.001) return '0%';
  if (Math.abs(percent) < 1 && Math.abs(percent) >= 0.001)
    return (percent / 100).toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 3 });
  
  return (percent/100).toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 1 }).replace('.0', '');
}
export function formatEth(amount: string | null): string {
  if (!amount) return '';
  return parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: 'ETH' });
}
export function difference(diff: string, currency: TCurrency | 'percent') {
  if (currency === 'percent') {
    return formatPercent(diff).replace('+', '').replace('-', '');
  }
  else {
    const mark = parseFloat(diff) > 0 ? '+' : '';
    return `${mark}${formatCurrency(diff,currency).replace('$', '').replace('Ξ', '')}`;
  }
}
export function formatAmount(amount: string | number) {
  if (amount === 'infinity') return '-';
  if (amount === 0 || amount === '0') return '-';
  if (typeof amount === 'string') {
    return parseFloat(amount) > 0 ? `+${amount}` : `${amount}`;
  } else if (typeof amount === 'number') {
    return amount > 0 ? `+${amount}` : `${amount}`;
  }
}
export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
export function customToFixed(number:number, precision:number = 2) {
  if (Number.isNaN(number)) {
    return "NaN";
  }
  
  // 숫자를 문자열로 변환
  const numberStr = number.toString();
  
  // 소수점 이하 2자리 이상인 경우에만 toFixed(2)를 적용
  if (numberStr.includes('.')) {
    const decimalPart = numberStr.split('.')[1];
    if (decimalPart.length >= precision) {
      return number.toFixed(precision);
    }
  }

  // 아니라면 그냥 원래 숫자 반환
  return number;
}
type MappingTable = {
  [key: string]: string;
}
export const mappingConstants = (value: string): string => {
  const mappingTable: MappingTable = {
    'floor_price' : 'Floor',
    'estimated_price' : 'Estimated',
    'TRAIT_FLOOR_PRICE': 'Trait Floor',
    'avg_30_price':'30d Average',
    'avg_90_price': '90d Average',
    // 'PREMIUM_ESTIMATED_PRICE': 'Premium Estimated',
  }
  return mappingTable[value] || value;
}
export const selectedValueType = (
  valuations: TValuation[]
): string => {
  const result =
    valuations.find((val) => val.selected) ||
    valuations.find((val) => val.default);
  return mappingConstants(result?.type || '');
};
export function capitalizeFirstLetter(inputString:string) {
  if (inputString.length > 0) {
    const firstLetter = inputString[0]; // 첫 번째 글자
    const modifiedString = firstLetter.toUpperCase() + inputString.slice(1).toLowerCase();
    console.log('modifiedString', inputString)
    return modifiedString;
  }
  
  return inputString;
}
export function mathSqrt(value: string | number) {
  let _value:number = 0;
  if (typeof value === 'string') {
    _value = parseFloat(value);
  }
  if(typeof value === 'number') {
    _value = value;
  }
  // return _value && _value >= 0 ? Math.log((_value + 1)*10 ) : -(Math.log(Math.abs((_value - 1)*10)));
  return _value ? Math.log((Math.abs(_value) + 1)*10 ) : 0;
}
export function reverseMathSqrt(value: number) {
  // 양수에 대해서만 고려
  if (value >= 0) {
    // 로그 변환을 되돌리는 부분
    const originalValue = Math.exp(value) / 10 - 1;
    return originalValue;
  } else {
    return 0;
  }
}

export function inverseMathSqrt(value: number) {
  // 양수에 대해서만 고려
  if (value >= 0) {
    // 로그 변환을 되돌리는 부분
    const originalValue = Math.exp(value) / 10 - 1;
    return originalValue;
  } else {
    return 0;
  };
}


type WalletData = {walletAddress: `0x${string}`, provider:string, type : 'evm' | 'ethereum'}
export function formatToken (data: WalletData) {
  let walletJwt = '';
  const SECRET = process.env.NEXT_PUBLIC_AUTH_JWT_SECRET || '';
  try {
    let walletJwt = jwt.sign(
      {
        networkName: data.type || 'evm',
        address: data.walletAddress,
        provider: data.provider,
      },SECRET
    );
    console.log('return walletJwt', walletJwt);
    return walletJwt;
  } catch (e) {
    console.log('err', e);
  }
  return walletJwt;
}
export function passwordValidation(password: string) {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{6,}$/;
  return regExp.test(password);
}
export function validationWalletAddress(walletAddress: string): boolean {
  //walletAddress is valid
  const regex =
    // eslint-disable-next-line no-control-regex
    /^0x[a-fA-F0-9]{40}$/i;
  return regex.test(walletAddress);
}
export function validationEmail (email: string): boolean {
  //email is valid
  const regex =
    // eslint-disable-next-line no-control-regex
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return regex.test(email);
};
export function jsonToQueryString(searchParam: any) {
  if(!searchParam) return;
  return Object.keys(searchParam).map((key) => {
    if (Array.isArray(searchParam[key])) {
      if(searchParam[key] === null || searchParam[key] === undefined || searchParam[key] === '' ) return;
      return searchParam[key].map((v: any) => `${key}=${v.toLowerCase()}`).join('&').replace(/^&/, '');
    }
    if (searchParam[key] === null || searchParam[key] === undefined || searchParam[key] === '') return;
    if (typeof searchParam[key] === 'string')
      return `${key}=${searchParam[key]}`;
    else return `${key}=${searchParam[key]}`;
  }).join('&').replace(/^&/, '').replace(/&+/g, '&');
}
export function removeEmptyValues(jsonObj: Record<string, any>): Record<string, any> {
  for (const key in jsonObj) {
    if (jsonObj.hasOwnProperty(key)) {
      if (jsonObj[key] === "" || jsonObj[key] === null || jsonObj[key] === undefined) {
        delete jsonObj[key];
      }
    }
  }
  return jsonObj;
  
}
export const CATEGORY = [
  {
    key: 'nftvaluation',
    value: 'NFT Valuation',
  },
  {
    key: 'productupdate',
    value: 'Product Update',
  },
  {
    key: 'usecases',
    value: 'Use Cases',
  },
];

export const normalizeCategoryName = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ''); // 소문자로 변환하고 특수 문자 및 띄어쓰기 제거
};
export function findCategoryListById(categoryObj: typeof ARTICLE_CATEGORY , targetId: string) {
  const matchingCategories = [];
  // 주어진 categoryObj 객체에서 targetId가 포함된 category 리스트 찾기
  for (const categoryKey in categoryObj) {
    if (categoryObj.hasOwnProperty(categoryKey)) {
      const categoryList = categoryObj[categoryKey as keyof typeof ARTICLE_CATEGORY];
      if (categoryList.includes(targetId)) {
        let key = categoryKey;
        CATEGORY.forEach((item) => {
          if (item.key === categoryKey) {
            key = item.value;
          }
        });
        matchingCategories.push(key);
      }
    }
  }
  return matchingCategories;
}
export const formatGasFee = (gasFee: string | null,currency : 'usd' | 'eth'): string => {
  if (!gasFee || gasFee === null || gasFee === 'infinity') return 'No Gas Fee';
  else if (parseFloatPrice(gasFee) === 0) return 'No Gas Fee';
  else if (parseFloat(gasFee) < 0.001) return 'less than 0.001';
  if (currency === 'usd') {
    return `+${parseFloat(gasFee).toLocaleString('en-US',{maximumFractionDigits: 4})}`;
  }
  if (currency === 'eth') {
    return `+${parseFloat(gasFee).toLocaleString('en-US',{maximumFractionDigits: 4})}`;
  }
  return '-'
}
export const parseFloatPrice = (price: any):number => {
  
  if (!price || price === null || price === 'infinity') return 0;
  const value = typeof price === 'number' ? price : parseFloat(price);
  return typeof value === 'number' && !Number.isNaN(value) ? value : 0;
}
export const formatFloat = (price: any): string => {
  if (!price || price === null || price === 'infinity') return '-';
  const value = typeof price === 'number' ? price : parseFloat(price);
  return typeof value === 'number' && !Number.isNaN(value) ? value.toFixed(3).toString() : '-';
}
export const defaultImg = (e: SyntheticEvent<HTMLImageElement, Event>, size?: number ) => {
  e.currentTarget.src = '/icon/image_square.svg';
  e.currentTarget.classList.remove('w-full', 'h-full');
  e.currentTarget.parentElement?.classList.add('bg-[var(--color-elevation-surface-raised)]');
  e.currentTarget.classList.add(
    `w-${size || 40}`,
    `h-${size || 40}`,
    'fill-[var(--color-background-neutral-bold)]'
  );
};
export function isValidParam(param: BasicParam): boolean {
  return (
    param.nickname !== null && param.nickname !== undefined && param.nickname !== '' ||
    param.walletAddress !== null && param.walletAddress !== undefined && param.walletAddress !== '' ||
    param.walletGroupId !== null && param.walletGroupId !== undefined  && param.walletGroupId !== ''
  );
} 