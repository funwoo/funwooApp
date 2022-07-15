import React, {useEffect} from 'react';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import AnimationFunwooHeader from '../../../components/layout/AnimationFunwooHeader';
import {useTailwind} from 'tailwind-rn';
import {useAsync} from 'react-use';
import {useMyFavoriteContext} from '../../../context/MyFavoriteContext';
import {swaggerHttpClient} from '../../../swagger';
import ConditionalFragment from '../../../components/common/ConditionalFragment';
import {isEmptyArray} from '../../../utils';
import {FlatList, Pressable, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PageNames} from '../../../navigator/PageNames';
import HouseCard from '../../../components/feature/HouseCard';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const MyFavoriteScreen = () => {
  const tailwind = useTailwind();

  const navigation = useNavigation<NavigationProp<EntranceTabParamsList>>();
  const {sids, reFavorite, deFavoriteSid} = useMyFavoriteContext();
  const transformAnimation = useSharedValue(48);
  const transform = useDerivedValue(() =>
    interpolate(transformAnimation.value, [48, 0], [48, 0]),
  );
  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: transform.value,
      },
    ],
  }));

  useEffect(() => {
    console.log(deFavoriteSid);
    if (deFavoriteSid) {
      transformAnimation.value = withTiming(0, {
        duration: 300,
      });
    } else {
      transformAnimation.value = withTiming(48, {
        duration: 300,
      });
    }
  }, [deFavoriteSid]);

  const {value: data} = useAsync(
    async () =>
      await swaggerHttpClient.listingApi
        .findAllFavorite({sids})
        .then(response => response.data),
    [sids],
  );

  return (
    <AnimationFunwooHeader
      scrollEnabled={false}
      disableAnimated
      type={'black'}
      headerRight={
        <Text fontSize={TextStringSizeEnum['3xl']} style={tailwind('ml-4')}>
          我的收藏
        </Text>
      }
      style={tailwind('flex-1 bg-white')}>
      <ConditionalFragment condition={isEmptyArray(data ?? [])}>
        <View style={tailwind('items-center pt-8 px-4')}>
          <Text
            fontFamily={'NotoSansTC-Medium'}
            fontSize={TextStringSizeEnum.xl}
            style={tailwind('mb-4')}>
            尚無任何收藏的物件喔。
          </Text>
          <Pressable
            style={tailwind('bg-black w-full py-3')}
            onPress={() => navigation.navigate(PageNames.searchHouse)}>
            <Text
              fontSize={TextStringSizeEnum.base}
              style={tailwind('text-center text-white')}>
              開始找屋
            </Text>
          </Pressable>
        </View>
      </ConditionalFragment>
      <FlatList
        contentContainerStyle={tailwind('p-4')}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <HouseCard data={item} />}
      />
      <Animated.View
        style={[
          tailwind(
            'absolute bottom-0 flex-row justify-between items-center h-12 px-4 w-full bg-gray900/[0.8]',
          ),
          transformStyle,
        ]}>
        <Text fontSize={TextStringSizeEnum.base} style={tailwind('text-white')}>
          你已移除此物件
        </Text>
        <Pressable onPress={reFavorite}>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-white')}>
            還原
          </Text>
        </Pressable>
      </Animated.View>
    </AnimationFunwooHeader>
  );
};

export default MyFavoriteScreen;
