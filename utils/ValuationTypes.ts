import { TValuation } from "@/interfaces/collection";
import { mappingConstants } from "./common";

export function ValuationTypes(valuations: TValuation[]) {
  let count = 0;
  valuations.map((valuation) => {
    valuation.default === false && valuation.selected === true && count++;
  })
  if (count === 0) {
    return  mappingConstants(valuations.find((valuation) => valuation.default === true)?.type || '');
  } else if (count === 1) {
    return `${mappingConstants(valuations.find((valuation) => valuation.selected === true)?.type || '')}`;
  }else{
    return `${mappingConstants(valuations.find((valuation) => valuation.selected === true)?.type || '')} + ${count}`;
  }
}