import React, {useCallback, useState} from 'react';
import {LayoutRectangle, Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '@react-navigation/core/src/types';
import {PageNames} from '../../../../navigator/PageNames';

import {ImageProvider} from '../../../../assets';
import {useDimensionsContext} from '../../../../context/DimensionsContext';

import Text from '../../../../components/common/Text/BaseText';
import BaseIcon from '../../../../components/common/icons/Icons/BaseIcon';
import CacheImage from '../../../../components/common/CacheImage';
import {useTailwind} from 'tailwind-rn';

const HomeScreenBanner = () => {
  const [layout, setLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const {width} = useDimensionsContext();
  const tailwind = useTailwind();

  const navigation = useNavigation<NavigationProp<EntranceTabParamsList>>();
  const handlePress = useCallback(
    () => navigation.navigate(PageNames.searchHouse),
    [navigation],
  );
  return (
    <CacheImage
      animation={'none'}
      resizeMode={'cover'}
      source={ImageProvider.homePageBg}
      style={{width: '100%', aspectRatio: 1242 / 1740, alignItems: 'center'}}>
      <View
        onLayout={event => setLayout(event.nativeEvent.layout)}
        style={{
          height: '100%',
          alignItems: 'center',
          paddingTop: layout.height * 0.5,
        }}>
        <Text
          style={tailwind('text-3xl text-white font-sans')}
          accessibilityRole="header">
          成就你的理想生活
        </Text>
        <Pressable
          onPress={handlePress}
          style={{
            width: width - 32,
            maxWidth: 250,
            ...tailwind(
              'py-2 bg-white justify-center items-center flex-row mt-4',
            ),
          }}>
          <Text
            style={{
              fontFamily: 'NotoSansTC-Regular',
              ...tailwind('text-base text-left text-gray900 pl-5 mx-2'),
            }}>
            開始找屋
          </Text>
          <BaseIcon
            color={'#000000'}
            type={'Feather'}
            name={'arrow-right'}
            style={tailwind('flex justify-center items-center w-5 h-5')}
            size={20}
          />
        </Pressable>
      </View>
    </CacheImage>
  );
};
export default HomeScreenBanner;
