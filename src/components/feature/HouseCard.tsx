import React, {useCallback} from 'react';
import {View} from 'react-native';
import {
  ListingDetail,
  ListingImage,
  ListingStatusEnum,
} from '../../swagger/funwoo.api';
import {useDimensionsContext} from '../../context/DimensionsContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import ImageSwiper from './Swiper/ImageSwiper';
import {PageNames} from '../../navigator/PageNames';
import {useTailwind} from 'tailwind-rn';
import AddFavoriteButton from './AddFavoriteButton';
import Text, {TextStringSizeEnum} from '../common/Text/BaseText';
import {
  chineseNumeralFormatter,
  isNotEmptyString,
  patternFormatter,
  totalSizeFormatter,
} from '../../utils';
import ConditionalFragment from '../common/ConditionalFragment';

interface Props {
  data: ListingDetail;
}

const HouseCard: React.FC<Props> = ({data}) => {
  const {width, numColumn, imageAspectRatio} = useDimensionsContext();
  const itemWidth = width / numColumn;
  const itemHeight = itemWidth / imageAspectRatio;
  const navigation =
    useNavigation<NavigationProp<EntranceRootStackParamsList>>();
  const tailwind = useTailwind();

  const onPress = useCallback(() => {
    navigation.navigate(PageNames.house, {
      sid: data.sid,
    });
  }, [data.sid, navigation]);

  const imageUrls = listingImageSorter(data.listing_image).map(
    ({watermark_image}) => watermark_image!,
  );

  return (
    <View style={[tailwind('self-start mb-3')]}>
      <AddFavoriteButton
        theme={'OnCard'}
        sid={data.sid}
        style={tailwind('absolute z-10 right-0 right-0')}
      />
      <ImageSwiper
        imageUrls={imageUrls}
        width={itemWidth - 32}
        height={itemHeight - 24}
        status={data?.status as ListingStatusEnum}
        onItemPress={onPress}
      />
      <View style={tailwind('py-2')}>
        <View
          style={tailwind('flex flex-row items-center justify-between mb-2')}>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-gray900')}>
            {chineseNumeralFormatter(data.price ?? 0)}
          </Text>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-gray900')}>
            {patternFormatter(data)}
          </Text>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-gray900')}>
            {totalSizeFormatter(data)}
          </Text>
        </View>
        <View style={tailwind('flex flex-row items-center')}>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-gray700')}>
            {`${data.title}`}
          </Text>
          <ConditionalFragment
            condition={
              data.display_building_project &&
              isNotEmptyString(data.building_project ?? '')
            }>
            <View style={tailwind('flex justify-center items-center w-4 mx-1')}>
              <View style={tailwind('w-px h-4 bg-gray700')} />
            </View>
            <Text
              fontSize={TextStringSizeEnum.base}
              style={tailwind('text-gray700')}>
              {data.building_project}
            </Text>
          </ConditionalFragment>
        </View>
        <Text
          fontSize={TextStringSizeEnum.base}
          style={tailwind('text-gray700')}>
          {`${data.address}`}
        </Text>
      </View>
    </View>
  );
};

export default HouseCard;

export const listingImageSorter = (
  images?: Array<ListingImage>,
): Array<ListingImage> => {
  if (!images) {
    return [];
  }

  const inOrder = images.slice().sort((a, b) => a.order! - b.order!);
  const withTag: Array<ListingImage> = [];
  const withoutTag: Array<ListingImage> = [];
  inOrder.forEach(image => {
    if (image.tag) {
      withTag.push(image);
    } else {
      withoutTag.push(image);
    }
  });
  return withoutTag.concat(withTag);
};
