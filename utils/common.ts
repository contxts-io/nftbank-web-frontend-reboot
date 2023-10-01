export function formatDate(date:  Date): string  {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
  const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 포맷팅
  return `${year}/${month}/${day}`;
}
export function formatCurrency(amount: string | null, currency: 'usd' | 'eth'): string {
  console.log('currency', currency);
  if (!amount) return '';
  return parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: currency }).replace('ETH', 'Ξ');
}
export function formatPercent(amount: number | null): string {
  if (!amount) return '-';
  return amount.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 });
}
export function formatEth(amount: string | null): string {
  if (!amount) return '';
  return parseFloat(amount).toLocaleString('en-US', { style: 'currency', currency: 'ETH' });
}
export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}