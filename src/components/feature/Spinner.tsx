import { View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import classNames from 'classnames';
import { useDimensions } from '@react-native-community/hooks';
// @ts-ignore
import JumpingDots from 'react-native-loading-dots';
import Text, { TextStringSizeEnum } from '../common/Text/BaseText';
import { loadingEventEmitter } from '../../event';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { sleep } from '../../utils';

export interface LoadingStatus {
  show: boolean;
  text?: string;
}
import Lottie from 'lottie-react-native';
const Spinner = () => {
  const animationRef = useRef<Lottie>(null)

  useEffect(() => {
    animationRef.current?.play()
  }, [])

  return (
    <Lottie
      ref={animationRef}
      autoPlay
      source={require('../../assets/lottie/loading-Animation-Black.json')}
    />
  );
};

export default Spinner;
