import { TValuation } from "@/interfaces/collection";
import { TCurrency } from "@/interfaces/constants";
import jwt from 'jsonwebtoken';

export function formatDate(date:  Date): string  {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
  const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 포맷팅
  return `${year}/${month}/${day}`;
}
export function formatCurrency(amount: string | null, currency: TCurrency): string {
  if (!amount) return '-';
  if (amount === 'infinity')
    return '-';
    // return '∞';
  if (currency === 'usd') {
    return _formatFiat(parseFloat(amount),currency).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  if (currency === 'eth') {
    return _formatEth(parseFloat(amount)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  return '';
}
export function shortFormatCurrency(amount: string | null, currency: TCurrency): string {
  if (!amount) return '';
  if (amount === 'infinity')
    return '-';
    // return '∞';
  if (currency === 'usd') {
    return _formatFiat(parseFloat(amount), currency).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  if (currency === 'eth') {
    return _formatEth(parseFloat(amount)).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  return '';
}
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
  return `Ξ${parseFloat(_amount)}`;
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
export function formatPercent(_percent: string |'infinity'| null): string {
  if (_percent === null) return '-';
  if (_percent === 'infinity') return '-';
  const percent = parseFloat(_percent);
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
  console.log('diff diff',diff)
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
export function customToFixed(number:number) {
  if (Number.isNaN(number)) {
    return "NaN";
  }
  
  // 숫자를 문자열로 변환
  const numberStr = number.toString();
  
  // 소수점 이하 2자리 이상인 경우에만 toFixed(2)를 적용
  if (numberStr.includes('.')) {
    const decimalPart = numberStr.split('.')[1];
    if (decimalPart.length >= 2) {
      return number.toFixed(2);
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
    'COLLECTION_FLOOR_PRICE' : 'Floor Price',
    'ESTIMATED_PRICE' : 'Estimated',
    'TRAIT_FLOOR_PRICE': 'Trait Floor',
    'AVERAGE_PRICE_30D':'30d Avg.',
    'AVERAGE_PRICE_90D': '90d Avg.',
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
  // return _value && _value >= 0 ? Math.sqrt(_value) : -(Math.sqrt(Math.abs(_value)));
  return _value && _value >= 0 ? Math.log((_value + 1)*10 ) : -(Math.log(Math.abs((_value - 1)*10)));
}
type WalletData = {walletAddress: `0x${string}`, provider:string, type : 'evm'}
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
export function jsonToQueryString (searchParam: any) {
  return Object.keys(searchParam).map((key) => {
    if (Array.isArray(searchParam[key])) {
      return searchParam[key].map((v: any) => `${key}=${v}`).join('&');
    }
    return `${key}=${searchParam[key]}`;
  }).join('&');
}