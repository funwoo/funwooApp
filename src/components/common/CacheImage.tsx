import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {Image} from 'react-native-magnus';

interface MagnusStyle {
  h?: number | string;
  w?: number | string;
  minH?: number | string;
  minW?: number | string;
  maxH?: number | string;
  maxW?: number | string;
  flex?: number;
  position?: 'absolute' | 'relative';
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  opacity?: number;
  zIndex?: number;
}

interface AnimationProps {
  animation?: 'none' | 'fade';
  timing?: number;
}

const CacheImage = (props: FastImageProps & MagnusStyle & AnimationProps) => {
  const {
    w,
    h,
    minH,
    minW,
    flex,
    position,
    alignSelf,
    top,
    right,
    bottom,
    left,
    opacity,
    zIndex,
    style,
    animation = 'fade',
    timing = 500,
  } = props;

  const imgOpacity = useRef(new Animated.Value(0)).current;
  const AnimatedRef = useRef(
    Animated.timing(imgOpacity, {
      toValue: 1,
      duration: timing,
      useNativeDriver: true,
    }),
  );

  useEffect(() => {
    const subscription = AnimatedRef.current;
    return () => {
      subscription.stop();
    };
  }, []);

  const startAnimation = () => {
    AnimatedRef.current.start();
  };

  if (typeof props?.source !== 'number') {
    if (animation === 'none') {
      return (
        <FastImage
          {...props}
          style={[
            {
              width: w,
              height: h,
              minHeight: minH,
              minWidth: minW,
              flex,
              position,
              alignSelf,
              top,
              bottom,
              left,
              opacity,
              right,
              zIndex,
            },
            style,
          ]}
        />
      );
    } else if (animation === 'fade') {
      const AnimationFastImage = Animated.createAnimatedComponent(FastImage);
      return (
        <AnimationFastImage
          {...props}
          onLoad={startAnimation}
          style={[
            {
              width: w,
              height: h,
              minHeight: minH,
              minWidth: minW,
              flex,
              position,
              alignSelf,
              top,
              bottom,
              left,
              opacity,
              right,
              zIndex,
            },
            style,
            {
              opacity: imgOpacity,
            },
          ]}
        />
      );
    }
  }
  //@ts-ignore
  return <Image {...props} />;
};
export default CacheImage;
