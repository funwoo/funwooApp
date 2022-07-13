import numbro from 'numbro';
import {ListingDetail} from '../swagger/funwoo.api';
import {
  isNotEmptyArray,
  isNotEmptyString,
  isNotSet,
  isSet,
  isTrue,
} from './formatChecker';

const potionCategory = [
  '公寓',
  '公寓(5樓含以下無電梯)',
  '大樓',
  '住宅大樓(11層含以上有電梯)',
  '華廈',
  '華廈(10層含以下有電梯)',
  '店面',
  '店面(店鋪)',
  '辦公商業大樓',
  '套房(1房1廳1衛)',
];
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

export const unitAreaFormatter = (country: string): string => {
  return `${countryUnitMap.get(country)?.areaUnit}`;
};
export const labelAreaFormatter = (country: string): string => {
  return `${countryUnitMap.get(country)?.areaLabel}`;
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

export const getFloorInformation = ({
  floor,
  total_floor,
  floor_note,
  detail_floor,
}: ListingDetail) => {
  if (isSet(floor_note)) {
    return floor_note;
  } else if (isSet(floor) && isSet(total_floor)) {
    return `${floor} 樓 / ${total_floor} 層`;
  } else if (detail_floor) {
    return detail_floor;
  } else {
    return '-';
  }
};

export const getBuildingAge = ({
  year_of_building_completion: buildingYear,
  month_of_building_completion: buildingMonth,
}: ListingDetail) => {
  if (!buildingYear || !buildingMonth) {
    return '-';
  }

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;

  if (currentYear - buildingYear == 0 && currentMonth - buildingMonth <= 0) {
    return '預計' + buildingYear + '完工';
  } else if (
    currentYear - buildingYear == 0 &&
    currentMonth - buildingMonth > 0
  ) {
    return `${currentMonth - buildingMonth} 個月`;
  } else if (currentYear - buildingYear < 0) {
    return '預計' + buildingYear + '完工';
  } else {
    return `${currentYear - buildingYear} 年`;
  }
};

export const amenitiesFormatter_special = (id: string): string => {
  if (id === '102437') {
    return '(含車位)';
  }
  return '';
};

export const lotSizeTitleTitleFormatter = (type: string | null) => {
  if (potionCategory.some(category => category === type)) {
    return '土地 (持分) 坪數';
  } else {
    return '土地坪數';
  }
};

export const itemHasOrNotFormatter = (input: boolean | null): string =>
  `${isTrue(input) ? '有' : '無'}`;

export const getParkingDetail = ({
  parking_detail,
  detail_parking,
}: ListingDetail) => {
  const checkedDetail = parking_detail?.filter(
    ({num, parking_space_type}) => num && parking_space_type,
  );
  if (checkedDetail && isNotEmptyArray(checkedDetail)) {
    return checkedDetail.map(
      ({num, parking_space_type}) => `${num} / ${parking_space_type}`,
    );
  } else if (
    detail_parking &&
    isNotEmptyString(detail_parking) &&
    detail_parking !== 'false'
  ) {
    return [detail_parking];
  } else {
    return ['-'];
  }
};

export const splitValueAndUnits = (
  set: string = '',
): {value: number; unit: string} => {
  const regex = /(\d+\.\d+)\s{0,}(.*)?/;
  const [, value, unit] = regex.exec(set) || ['', '', ''];
  return {value: parseFloat(value), unit: unit.toLocaleLowerCase()};
};
