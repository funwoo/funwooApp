import React, {useMemo, useRef} from 'react';
import {useTailwind} from 'tailwind-rn';
import ImageSwiper from '../../../../components/feature/Swiper/ImageSwiper';
import {noop} from 'react-use/lib/misc/util';
import ConditionalFragment from '../../../../components/common/ConditionalFragment';
import {Image, Pressable, View} from 'react-native';
import classNames from 'classnames';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import {ImageProvider} from '../../../../assets';
import {
  chineseNumeralFormatter,
  isNotEmptyArray,
  isSet,
  labelAreaFormatter,
  patternFormatter,
  totalSizeFormatter,
} from '../../../../utils';
import {useDimensionsContext} from '../../../../context/DimensionsContext';
import {RecyclerListView, RecyclerListViewProps} from 'recyclerlistview';
import {RecyclerListViewState} from 'recyclerlistview/src/core/RecyclerListView';
import {listingImageSorter} from '../../../../components/feature/HouseCard';
import {ListingDetail} from '../../../../swagger/funwoo.api';

const HouseInformation: React.FC<{data: ListingDetail}> = ({data}) => {
  const tailwind = useTailwind();
  const {width, numColumn, imageAspectRatio} = useDimensionsContext();
  const itemWidth = width / numColumn;
  const itemHeight = itemWidth / imageAspectRatio;

  const sortedImages = useMemo(
    () =>
      Array.isArray(data?.listing_image)
        ? listingImageSorter(data!.listing_image)
        : [],
    [data],
  );

  const imageUrls = useMemo(
    () => sortedImages.map(({watermark_image}) => watermark_image!),
    [sortedImages],
  );

  const videoUrls = useMemo(() => {
    const result =
      data?.listing_video?.map(video => video.video_url) ??
      data?.youtube_video_ids?.map(
        id => `https://www.youtube.com/watch?v=${id}`,
      ) ??
      [];
    return result.filter(isSet);
  }, [data]);

  const firstLayoutImageIndex = useMemo(() => {
    return sortedImages.findIndex(image => image.tag === 'layout');
  }, [sortedImages]);

  const hasLayoutImage = firstLayoutImageIndex >= 0;
  const hasVideo = isNotEmptyArray(videoUrls);

  const imageSwiperScrollViewRef = useRef<RecyclerListView<
    RecyclerListViewProps,
    RecyclerListViewState
  > | null>(null);

  return (
    <React.Fragment>
      <ImageSwiper
        width={itemWidth}
        height={itemHeight}
        imageUrls={imageUrls}
        videoUrls={videoUrls}
        onItemPress={noop}
        status={data.status!}
        customRef={imageSwiperScrollViewRef}
      />
      <ConditionalFragment condition={hasLayoutImage || hasVideo}>
        <View
          style={tailwind('flex-row items-center justify-center pt-4 pb-2')}>
          <ConditionalFragment condition={hasVideo}>
            <Pressable
              onPress={() => {
                imageSwiperScrollViewRef.current?.scrollToIndex(
                  imageUrls.length,
                );
              }}
              style={tailwind(
                classNames(
                  'flex-row items-center py-1 px-4 border rounded-extreme',
                  {
                    'mr-4': hasLayoutImage,
                  },
                ),
              )}>
              <View
                style={tailwind('items-center justify-center w-6 h-6 mr-2.5')}>
                <Icon name={'play'} />
              </View>
              <Text
                fontFamily={'NotoSansTC-Medium'}
                fontSize={TextStringSizeEnum.md}>
                影片
              </Text>
            </Pressable>
          </ConditionalFragment>
          <ConditionalFragment condition={hasLayoutImage}>
            <Pressable
              onPress={() => {
                imageSwiperScrollViewRef.current?.scrollToIndex(
                  firstLayoutImageIndex,
                );
              }}
              style={tailwind(
                'flex-row items-center py-1 px-4 border rounded-extreme',
              )}>
              <Image
                source={ImageProvider.layout_icon}
                style={tailwind('w-6 h-6 mr-2.5')}
              />
              <Text
                fontFamily={'NotoSansTC-Medium'}
                fontSize={TextStringSizeEnum.md}>
                格局圖
              </Text>
            </Pressable>
          </ConditionalFragment>
        </View>
      </ConditionalFragment>
      <View style={tailwind('px-4')}>
        <View style={tailwind('mb-2 py-2 flex-row justify-between')}>
          <View>
            <Text fontSize={TextStringSizeEnum.base}>
              {chineseNumeralFormatter(data.price ?? 0)}
            </Text>
            <Text
              fontSize={TextStringSizeEnum.md}
              style={tailwind('text-gray700')}>
              總價位
            </Text>
          </View>
          <View>
            <Text
              fontSize={TextStringSizeEnum.base}
              style={tailwind('text-center')}>
              {patternFormatter(data)}
            </Text>
            <Text
              fontSize={TextStringSizeEnum.md}
              style={tailwind('text-gray700 text-center')}>
              格局
            </Text>
          </View>
          <View>
            <Text
              fontSize={TextStringSizeEnum.base}
              style={tailwind('text-right')}>
              {totalSizeFormatter(data)}
            </Text>
            <Text
              fontSize={TextStringSizeEnum.md}
              style={tailwind('text-gray700 text-right')}>
              {labelAreaFormatter(data.country!)}
            </Text>
          </View>
        </View>
        <View style={tailwind('flex-row items-center')}>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-gray700')}>
            {data.title}
          </Text>
          <ConditionalFragment condition={data.display_building_project}>
            <View style={tailwind('mx-2.5 w-px h-4 bg-gray700')} />
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
          {data?.display_address}
        </Text>
      </View>
    </React.Fragment>
  );
};

export default HouseInformation;
