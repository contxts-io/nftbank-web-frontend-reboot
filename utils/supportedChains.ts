import { TChain } from "@/interfaces/constants";

export const CHAIN_LIST = [
  {
    chain: 'ethereum',
    name: 'Ethereum',
    symbol: '/logo/ETHLogo.svg',
  },
  {
    chain: 'polygon',
    name: 'Polygon',
    symbol: '/logo/PolygonLogo.svg',
  },
  {
    chain: 'ronin',
    name: 'Ronin',
    symbol: '/logo/Ronin.svg',
  },
  {
    chain: 'base',
    name: 'Base',
    symbol: '/logo/Base.svg',
  },
  {
    chain: 'optimism',
    name: 'Optimism',
    symbol: '/logo/Optimism.svg',
  },
  {
    chain: 'arbitrum_nova',
    name: 'Arbitrum Nova',
    symbol: '/logo/ArbitrumNova.svg',
  },
] as {chain:TChain, name: string, symbol:string}[];