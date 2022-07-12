import React, {useCallback, useMemo, useState} from 'react';
import {ListingDetail} from '../../../../swagger/funwoo.api';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  UIManager,
  View,
} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import {
  amenitiesFormatter_special,
  areaFormatter,
  getBuildingAge,
  getFloorInformation,
  getParkingDetail,
  isNotSet,
  isSet,
  itemHasOrNotFormatter,
  lotSizeTitleTitleFormatter,
  totalSizeFormatter,
  unitAreaFormatter,
} from '../../../../utils';
import classNames from 'classnames';
import ConditionalFragment from '../../../../components/common/ConditionalFragment';

interface MainData {
  key: keyof ListingDetail | string;
  title: string;
  isSubItem?: boolean;
  endWithBorder?: boolean;
  formatter?: (data: ListingDetail) => string | number | null;
  unitFormatter?: (country: string) => string;
  hidden?: boolean;
  collapseData?: Array<MainData>;
}

const getDisplayValueAndUnit = (
  {formatter, key, unitFormatter}: MainData,
  detailData: ListingDetail,
) => {
  let displayValue: string | number | null = null;
  let unit = '';

  if (formatter) {
    displayValue = formatter(detailData);
  } else if (key in detailData) {
    const data = detailData[key as keyof ListingDetail];
    // noinspection SuspiciousTypeOfGuard
    if (typeof data === 'string') {
      displayValue = data;
    } else if (data) {
      displayValue = data.toString();
    }
  }

  if (unitFormatter) {
    unit = unitFormatter(detailData.country!);
  }

  return {displayValue, unit};
};

const HouseDetail: React.FC<ListingDetail> = props => {
  const tailwind = useTailwind();

  const parkingDetail = useMemo<Array<MainData>>(() => {
    const detail = getParkingDetail(props);

    if (detail.length <= 1) {
      return [
        {key: 'parking_detail', title: '車位', formatter: () => detail[0]},
      ];
    } else {
      return detail.map((data, index) => ({
        key: 'parking_detail',
        title: index === 0 ? '車位' : '',
        formatter: () => data,
      }));
    }
  }, [props]);

  const mainData: Array<MainData> = useMemo(() => {
    return [
      {key: 'detail_purpose', title: '登記用途'},
      {key: 'detail_category', title: '類型'},
      {
        key: 'detail_floor',
        title: '樓層 / 樓高',
        formatter: getFloorInformation,
      },
      {key: 'detail_age', title: '屋齡', formatter: getBuildingAge},
      {
        key: 'detail_total_area_size',
        title: '總坪數',
        formatter: () => totalSizeFormatter(props),
      },
      {
        key: 'house_detail_total_area_size',
        title: '房屋權狀坪數',
        isSubItem: true,
        formatter: data =>
          areaFormatter(data.detail_total_area_size, {
            omit: [data.detail_parking_size],
            country: data.country!,
          }),
        unitFormatter: unitAreaFormatter,
        hidden:
          isNotSet(props.detail_main_area_size) &&
          isNotSet(props.detail_other_area_size) &&
          isNotSet(props.detail_amenities_area) &&
          isNotSet(props.detail_parking_size),
        collapseData: [
          {
            key: 'detail_main_area_size',
            title: '主建物',
            isSubItem: true,
            formatter: data =>
              areaFormatter(data.detail_main_area_size, {
                country: data.country!,
              }),
            unitFormatter: unitAreaFormatter,
            hidden: isNotSet(props.detail_main_area_size),
          },
          {
            key: 'detail_other_area_size',
            title: '附屬建物',
            isSubItem: true,
            formatter: data =>
              areaFormatter(data.detail_other_area_size, {
                country: data.country!,
              }),
            unitFormatter: unitAreaFormatter,
            hidden: isNotSet(props.detail_other_area_size),
          },
          {
            key: 'detail_amenities_area',
            title: `公共設施 ${amenitiesFormatter_special(props.sid)}`,
            isSubItem: true,
            formatter: data =>
              areaFormatter(data.detail_amenities_area, {
                country: data.country!,
              }),
            unitFormatter: unitAreaFormatter,
            endWithBorder: isSet(props?.detail_parking_size),
            hidden: isNotSet(props.detail_amenities_area),
          },
        ],
      },
      {
        key: 'detail_parking_size',
        title: '車位',
        isSubItem: true,
        formatter: data =>
          areaFormatter(data.detail_parking_size, {country: data.country!}),
        unitFormatter: unitAreaFormatter,
      },
      {
        key: 'detail_lot_size',
        title: lotSizeTitleTitleFormatter(props.detail_category),
        formatter: data =>
          areaFormatter(data.detail_lot_size, {country: data.country!}),
        unitFormatter: unitAreaFormatter,
      },
      ...parkingDetail,
      {key: 'detail_balcony', title: '陽台'},
      {
        key: 'detail_guard_management',
        title: '警衛管理',
        formatter: data => itemHasOrNotFormatter(data.detail_guard_management),
      },
      {key: 'detail_amenities', title: '公共設施'},
      {key: 'detail_management_fee', title: '管理費'},
      {key: 'detail_land_category', title: '土地使用分區'},
      {key: 'detail_land_purpose', title: '適合用途'},
      {
        key: 'detail_land_size',
        title: '基地面積',
        formatter: data =>
          areaFormatter(data.detail_land_size, {country: data.country!}),
        unitFormatter: unitAreaFormatter,
      },
      {key: 'detail_price_per_ping', title: '每坪單價'},
      {key: 'detail_land_buildings', title: '土地上有無建物'},
    ];
  }, [props, parkingDetail]);

  return (
    <View style={tailwind('pt-4 pb-8')}>
      <Text
        fontSize={TextStringSizeEnum.xl}
        fontFamily={'NotoSansTC-Medium'}
        style={tailwind('py-2 px-4')}>
        詳細資料
      </Text>
      {mainData.map((data, index) => {
        const {displayValue, unit} = getDisplayValueAndUnit(data, props);

        if (!displayValue) {
          return null;
        }

        return (
          <Item
            key={`${data.key}-${index}`}
            title={data.title}
            value={`${displayValue} ${unit}`}
            isSubItem={data.isSubItem}
            endWithBorder={data.endWithBorder}
            collapseData={data.collapseData}
            listing={props}
          />
        );
      })}
      <Text
        fontSize={TextStringSizeEnum.sm}
        style={tailwind('p-4 text-gray500')}>
        本物件照片中之相關裝飾或其他物品，僅係提供買方做為參考之用，並不隨同該物件買賣或贈與。於簽訂相關買賣契約前，請您詳細確認附隨買賣之設備或家飾、贈品。
      </Text>
    </View>
  );
};

export default HouseDetail;

const Item: React.FC<{
  title: string;
  value: string;
  isSubItem: boolean | undefined;
  endWithBorder: boolean | undefined;
  collapseData: Array<MainData> | undefined;
  listing: ListingDetail;
}> = ({title, value, isSubItem, collapseData, listing, endWithBorder}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const expand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(prev => !prev);
  }, []);

  const isCollapsible =
    isSet(collapseData) && collapseData?.some(data => !data.hidden);
  const tailwind = useTailwind();

  return (
    <React.Fragment>
      <View
        style={tailwind(
          classNames('w-full', {
            'px-4': !isSubItem,
            'pl-8 pr-4 bg-gray50': isSubItem,
          }),
        )}>
        <View
          style={tailwind(
            classNames('flex-row items-start justify-between', 'py-2', {
              'border-b border-gray300': endWithBorder,
            }),
          )}>
          <View style={tailwind('flex-1 flex-row')}>
            <Text fontSize={TextStringSizeEnum.base}>{title}</Text>
            <ConditionalFragment condition={isCollapsible}>
              <Pressable onPress={expand}>
                <Text fontSize={TextStringSizeEnum.base}>
                  {' '}
                  (
                  <Text
                    fontSize={TextStringSizeEnum.base}
                    style={tailwind('underline')}>
                    查看細節
                  </Text>
                  )
                </Text>
              </Pressable>
            </ConditionalFragment>
          </View>
          <Text
            style={tailwind('flex-1 text-right')}
            fontSize={TextStringSizeEnum.base}>
            {value}
          </Text>
        </View>
      </View>
      {isExpanded &&
        collapseData?.map((data, index) => {
          const {displayValue, unit} = getDisplayValueAndUnit(data, listing);

          if (!displayValue) {
            return null;
          }

          return (
            <Item
              key={`${data.key}-${index}`}
              title={data.title}
              value={`${displayValue} ${unit}`}
              isSubItem={data.isSubItem}
              collapseData={data.collapseData}
              listing={listing}
              endWithBorder={data.endWithBorder}
            />
          );
        })}
    </React.Fragment>
  );
};
