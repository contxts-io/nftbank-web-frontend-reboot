export function formatDate(date:  Date): string  {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
  const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 포맷팅
  return `${year}/${month}/${day}`;
}
export function formatCurrency(amount: string | null, currency: 'usd' | 'eth'): string {
  if (!amount) return '';
  if (amount === 'infinity')
    return 'infinity';
    // return '∞';
  return parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: currency }).replace('ETH', 'Ξ');
}
export function formatPercent(amount: number | null): string {
  if(amount === null) return '-';
  return amount.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 });
}
export function formatEth(amount: string | null): string {
  if (!amount) return '';
  return parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: 'ETH' });
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
  }
  return mappingTable[value] || value;
}