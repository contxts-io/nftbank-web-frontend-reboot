export type TPeriod = {
  name: 'All' | '1Q' | '2Q' | '3Q' | '4Q';
  value: 'q1'|'q2'|'q3'|'q4'|'all',
};
export const PERIOD_LIST: TPeriod[] = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: '1Q',
    value: 'q1',
  },
  {
    name: '2Q',
    value: 'q2',
  },
  {
    name: '3Q',
    value: 'q3',
  },
  {
    name: '4Q',
    value: 'q4',
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