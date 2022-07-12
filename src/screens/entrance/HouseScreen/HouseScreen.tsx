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

const HouseScreen = () => {
  const {
    params: {sid},
  } = useRoute<RouteProp<EntranceRootStackParamsList, 'house'>>();
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

  const firstLayoutImageIndex = useMemo(() => {
    return sortedImages.findIndex(image => image.tag === 'layout');
  }, [sortedImages]);

  if (!data) {
    return null;
  }

  return (
    <SafeAreaView>
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
          onItemPress={noop}
          status={data.status!}
          customRef={imageSwiperScrollViewRef}
        />
        <ConditionalFragment condition={firstLayoutImageIndex >= 0}>
          <View
            style={tailwind('flex-row items-center justify-center pt-4 pb-2')}>
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
          </View>
        </ConditionalFragment>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HouseScreen;
