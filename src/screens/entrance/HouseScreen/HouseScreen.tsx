import React, {useMemo, useRef} from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, View} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useAsync} from 'react-use';
import {swaggerHttpClient} from '../../../swagger';
import {useTailwind} from 'tailwind-rn';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useMyFavoriteContext} from '../../../context/MyFavoriteContext';
import openShare from '../../../lib/Share';
import ImageSwiper from '../../../components/feature/Swiper/ImageSwiper';
import {listingImageSorter} from '../../../components/feature/HouseCard';
import {noop} from 'react-use/lib/misc/util';
import {useDimensionsContext} from '../../../context/DimensionsContext';
import {ImageProvider} from '../../../assets';
import ConditionalFragment from '../../../components/common/ConditionalFragment';
import {RecyclerListView, RecyclerListViewProps} from 'recyclerlistview';
import {RecyclerListViewState} from 'recyclerlistview/src/core/RecyclerListView';
import {
  chineseNumeralFormatter,
  isNotEmptyArray,
  isSet,
  labelAreaFormatter,
  patternFormatter,
  totalSizeFormatter,
} from '../../../utils';
import HouseDetail from './components/HouseDetail';
import Icon from 'react-native-vector-icons/FontAwesome5';
import classNames from 'classnames';
import HouseFeature from './components/HouseFeature';
import HouseEnvironment from './components/HouseEnvironment';

const HouseScreen = () => {
  const {
    params: {sid},
  } = useRoute<RouteProp<HouseScreenStackParamsList, 'detail'>>();
  const navigate = useNavigation<NavigationProp<EntranceRootStackParamsList>>();
  const tailwind = useTailwind();
  const {sids, updateFavorite} = useMyFavoriteContext();
  const isFavorite = useMemo(() => sids.includes(sid), [sids, sid]);
  const {width, numColumn, imageAspectRatio} = useDimensionsContext();
  const itemWidth = width / numColumn;
  const itemHeight = itemWidth / imageAspectRatio;
  const imageSwiperScrollViewRef = useRef<RecyclerListView<
    RecyclerListViewProps,
    RecyclerListViewState
  > | null>(null);

  const {value: data} = useAsync(
    async () =>
      await swaggerHttpClient.listingApi
        .findOne(sid)
        .then(response => response.data),
    [sid],
  );

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

  if (!data) {
    return null;
  }

  return (
    <SafeAreaView style={tailwind('bg-white')}>
      <View style={tailwind('flex-row items-center justify-between py-1')}>
        <View style={tailwind('flex-row')}>
          <Pressable
            onPress={() => navigate.goBack()}
            style={tailwind('items-center justify-center w-12 h-12')}>
            <AntDesignIcon size={20} name={'arrowleft'} />
          </Pressable>
          <View style={tailwind('w-12 h-12')} />
        </View>
        <Text
          fontFamily={'NotoSansTC-Medium'}
          fontSize={TextStringSizeEnum['3xl']}>
          {data.title}
        </Text>
        <View style={tailwind('flex-row')}>
          <Pressable
            onPress={() => updateFavorite(sid, !isFavorite)}
            style={tailwind('items-center justify-center w-12 h-12')}>
            <AntDesignIcon size={20} name={isFavorite ? 'heart' : 'hearto'} />
          </Pressable>
          <Pressable
            onPress={() =>
              openShare(
                `https://funwoo.com.tw/buy/${sid}`,
                '你覺得這個物件如何',
                data.title,
              )
            }
            style={tailwind('items-center justify-center w-12 h-12')}>
            <EntypoIcon size={20} name={'share'} />
          </Pressable>
        </View>
      </View>
      <ScrollView>
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
                  style={tailwind(
                    'items-center justify-center w-6 h-6 mr-2.5',
                  )}>
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
            {data.display_address}
          </Text>
        </View>
        <HouseDetail {...data} />
        <Divider />
        <HouseFeature {...data} />
        <Divider />
        <HouseEnvironment {...data} />
        <Divider />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HouseScreen;

const Divider = () => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('py-2 px-4')}>
      <View style={tailwind('w-full h-px bg-gray300')} />
    </View>
  );
};
