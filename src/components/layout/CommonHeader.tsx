import React, {useCallback} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import BaseIcon from '../common/icons/Icons/BaseIcon';
import {AppColors} from '../../constants';
import Text, {TextStringSizeEnum} from '../common/Text/BaseText';
import {useNavigation} from '@react-navigation/native';
import ConditionalFragment from '../common/ConditionalFragment';
import {isNotSet, isSet} from '../../utils';
import CacheImage from '../common/CacheImage';

interface Props {
  title: string;
  headerRight?: React.ReactNode;
  banner?: {uri: string};
  bannerWording?: string;
  bannerAspectRatio?: number;
  contentInsetAdjustmentBehavior?: ScrollViewProps['contentInsetAdjustmentBehavior'];
  onGoBackPress?: () => void;
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CommonHeader: React.FC<Props> = ({
  title,
  headerRight,
  children,
  banner,
  bannerWording,
  bannerAspectRatio = 414 / 580,
  contentInsetAdjustmentBehavior,
  onGoBackPress,
  scrollEnabled,
  style,
}) => {
  const tailwind = useTailwind();

  return (
    <SafeAreaView style={tailwind('bg-white flex-1')}>
      <PureCommonHeader
        title={title}
        headerRight={headerRight}
        onGoBackPress={onGoBackPress}
      />
      <ScrollView
        nestedScrollEnabled
        scrollEnabled={scrollEnabled}
        style={[style, tailwind('flex-1')]}
        contentContainerStyle={!scrollEnabled ? tailwind('flex-1') : undefined}
        contentInsetAdjustmentBehavior={contentInsetAdjustmentBehavior}>
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

export const PureCommonHeader: React.FC<
  Pick<Props, 'onGoBackPress' | 'title' | 'headerRight'>
> = ({onGoBackPress, title, headerRight}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    if (onGoBackPress) {
      onGoBackPress();
    } else {
      navigation.goBack();
    }
  }, []);

  return (
    <View style={tailwind('flex-row items-center justify-between w-full')}>
      <Pressable
        onPress={onPress}
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
        fontSize={TextStringSizeEnum['3xl']}
        numberOfLines={1}
        style={tailwind('flex-1 mx-2 text-center')}>
        {title}
      </Text>
      <ConditionalFragment condition={isSet(headerRight)}>
        {headerRight}
      </ConditionalFragment>
      <ConditionalFragment condition={isNotSet(headerRight)}>
        <View style={tailwind('w-12 h-12')} />
      </ConditionalFragment>
    </View>
  );
};
