export type TPeriod = {
  name: 'All' | '1Q' | '2Q' | '3Q' | '4Q';
  value: string;
};
export const PERIOD_LIST: TPeriod[] = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: '1Q',
    value: '1q',
  },
  {
    name: '2Q',
    value: '2q',
  },
  {
    name: '3Q',
    value: '3q',
  },
  {
    name: '4Q',
    value: '4q',
  },
];
export type TYear = {
  name: string;
  value: number;
};
export type TStatus = {
  name: 'Overall' | 'Realized' | 'Unrealized';
  value: 'overall' | 'realized' | 'unrealized';
}
export const STATUS_LIST: TStatus[] = [
  {
    name: 'Overall',
    value: 'overall'
  },
  {
    name: 'Realized',
    value: 'realized'
  },
  {
    name: 'Unrealized',
    value: 'unrealized'
  },

]