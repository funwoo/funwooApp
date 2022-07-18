import React from 'react';
import {Pressable, SafeAreaView, ScrollView, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import BaseIcon from '../common/icons/Icons/BaseIcon';
import {AppColors} from '../../constants';
import Text, {TextStringSizeEnum} from '../common/Text/BaseText';
import {useNavigation} from '@react-navigation/native';
import ConditionalFragment from '../common/ConditionalFragment';
import {isNotSet, isSet} from '../../utils';
import CacheImage from '../common/CacheImage';

const CommonHeader: React.FC<{
  title: string;
  headerRight?: React.ReactNode;
  banner?: {uri: string};
  bannerWording?: string;
  bannerAspectRatio?: number;
}> = ({
  title,
  headerRight,
  children,
  banner,
  bannerWording,
  bannerAspectRatio = 414 / 580,
}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tailwind('bg-white flex-1')}>
      <View style={tailwind('flex-row items-center justify-between w-full')}>
        <Pressable
          onPress={navigation.goBack}
          style={tailwind('w-12 h-12 items-center justify-center')}>
          <BaseIcon
            type={'Feather'}
            size={24}
            name={'arrow-left'}
            color={AppColors.gray900}
          />
        </Pressable>
        <Text
          fontFamily={'NotoSansTC-Medium'}
          fontSize={TextStringSizeEnum['3xl']}>
          {title}
        </Text>
        <ConditionalFragment condition={isSet(headerRight)}>
          {headerRight}
        </ConditionalFragment>
        <ConditionalFragment condition={isNotSet(headerRight)}>
          <View style={tailwind('w-12 h-12')} />
        </ConditionalFragment>
      </View>
      <ScrollView nestedScrollEnabled style={tailwind('flex-1')}>
        <ConditionalFragment condition={isSet(banner)}>
          <View style={tailwind('items-center justify-center')}>
            <CacheImage
              source={banner ?? {uri: ''}}
              style={[tailwind('w-full'), {aspectRatio: bannerAspectRatio}]}
            />
            <ConditionalFragment condition={isSet(bannerWording)}>
              <Text
                fontSize={TextStringSizeEnum['5xl']}
                fontFamily={'NotoSansTC-Medium'}
                style={tailwind('absolute z-10 text-white')}>
                {bannerWording}
              </Text>
            </ConditionalFragment>
          </View>
        </ConditionalFragment>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommonHeader;
