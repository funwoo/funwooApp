import numbro from 'numbro';
import {ListingDetail} from '../swagger/funwoo.api';
import {isNotEmptyArray, isNotSet} from './formatChecker';

const WAN = 1e4;
const YI = 1e8;
export const countryUnitMap: Map<
  string,
  {
    areaUnit: string;
    areaLabel: string;
    dollar: string;
    dollarLabel: string;
  }
> = new Map([
  [
    'US',
    {
      areaUnit: '平方英呎',
      areaLabel: '總面積',
      dollar: '美金',
      dollarLabel: '總價位 (美金)',
    },
  ],
  [
    'CA',
    {
      areaUnit: '平方英呎',
      areaLabel: '總面積',
      dollar: '加幣',
      dollarLabel: '總價位 (加幣)',
    },
  ],
  [
    'TW',
    {
      areaUnit: '坪',
      areaLabel: '總坪數',
      dollar: '',
      dollarLabel: '總價位',
    },
  ],
]);

export const formatter = {
  format: (n: number) => {
    return numbro(n).format({thousandSeparated: true});
  },
};

export const chineseNumeralFormatter = (n: number): string => {
  if (n < YI) {
    return `$${formatter.format(n / WAN)} 萬`;
  } else {
    return `$${formatter.format(n / YI)} 億`;
  }
};

export const houseDollarLabel = (country: string) => {
  return `${countryUnitMap.get(country)?.dollarLabel}`;
};

export const patternFormatter = ({
  room,
  common_space,
  bath,
}: ListingDetail): string => {
  let result = [];
  if (room) {
    result.push(`${room} 房`);
  }
  if (common_space) {
    result.push(`${common_space} 廳`);
  }
  if (bath) {
    result.push(`${bath} 衛`);
  }

  if (isNotEmptyArray(result)) {
    return result.join(' ');
  } else {
    return '-';
  }
};

export const areaFormatter = (
  input: string | null,
  {omit = [], country = 'TW'}: {omit?: Array<string | null>; country: string},
): string | null | number => {
  if (isNotSet(input)) {
    return null;
  }

  let result = parseFloat(input);
  omit.forEach(value => {
    if (isNotSet(value)) {
      return;
    }
    let omitValue = parseFloat(value);
    result = result - omitValue;
  });

  if (country === 'TW') {
    return `${result.toFixed(2)}`;
  } else {
    return `${result}`;
  }
};
export const squareFeetTranslator = (sqft: string): string => {
  const sqftNumber = parseInt(sqft, 10);

  return Number(sqftNumber * 0.02810314980103).toFixed(2);
};

export const totalSizeFormatter = (
  {detail_total_area_size, country}: ListingDetail,
  simple?: boolean,
): string => {
  let displaySize: string;
  if (detail_total_area_size) {
    displaySize = String(
      areaFormatter(detail_total_area_size, {country: country ?? 'TW'}),
    );
    if (country === 'US') {
      if (simple) {
        displaySize = `${squareFeetTranslator(displaySize)} 坪*`;
      } else {
        displaySize = `${squareFeetTranslator(
          displaySize,
        )} 坪*\n${displaySize} 平方英呎`;
      }
    } else {
      displaySize = `${displaySize} 坪`;
    }
  } else {
    displaySize = '-';
  }

  return displaySize;
};
