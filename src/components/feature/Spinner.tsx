import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import classNames from 'classnames';
import {useDimensions} from '@react-native-community/hooks';
// @ts-ignore
import JumpingDots from 'react-native-loading-dots';
import Text, {TextStringSizeEnum} from '../common/Text/BaseText';
import {loadingEventEmitter} from '../../event';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {sleep} from '../../utils';

export interface LoadingStatus {
  show: boolean;
  text?: string;
}

const Spinner = () => {
  const [loading, setLoading] = useState<LoadingStatus>({
    show: false,
  });
  const [close, setClose] = useState<boolean>(true);

  const tailwind = useTailwind();
  const {width, height} = useDimensions().window;

  const animation = useSharedValue(180);

  const opacity = useDerivedValue(() => {
    return interpolate(animation.value, [0, 1], [0, 1]);
  });

  const animationStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    loadingEventEmitter.on(setLoading);

    return () => {
      loadingEventEmitter.off(setLoading);
    };
  }, []);

  useEffect(() => {
    if (loading.show) {
      setClose(false);
      animation.value = withTiming(1, {duration: 300});
    } else {
      animation.value = withTiming(0, {duration: 2000}, () => {
        sleep(2300).then(() => {
          setClose(true);
        });
      });
    }
  }, [loading.show]);

  if (close) {
    return null;
  }

  return (
    <Animated.View
      style={[
        animationStyle,
        tailwind(
          classNames(
            'absolute top-0 left-0 z-[99999]',
            'items-center justify-center',
            'bg-white',
          ),
        ),
        {
          width,
          height,
        },
      ]}>
      <View
        style={tailwind(
          classNames('relative', 'items-center justify-center', 'h-[10rem]'),
        )}>
        <View style={tailwind('w-[5rem]')}>
          <JumpingDots
            colors={['black', 'black', 'black', 'black']}
            size={10}
          />
        </View>
        <View style={tailwind('absolute bottom-0')}>
          <Text
            lineBreakMode={'head'}
            numberOfLines={1}
            fontSize={TextStringSizeEnum.md}>
            {loading.text ?? '眼睛休息一下，我們取個資料'}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default Spinner;
