import React from 'react';
import {useRef} from 'react';
import {Image, ImageBackground, useWindowDimensions, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {ImageProvider} from '../../../../assets';

const SplitPane = () => {
  const {width} = useWindowDimensions();
  const _touchX = useRef(new Animated.Value(width / 2)).current;
  const _onPanGestureEvent = Animated.event(
    [{nativeEvent: {absoluteX: _touchX}}],
    {
      useNativeDriver: false,
    },
  );

  return (
    <GestureHandlerRootView>
      <ImageBackground
        source={ImageProvider['01-2-Staging-Before']}
        style={{
          width: width,
          height: 400,
        }}>
        <Animated.View
          style={{
            width: Animated.diffClamp(_touchX, 36, width - 36),
            height: 400,
            position: 'absolute',
            overflow: 'hidden',
          }}>
          <FastImage
            source={ImageProvider['01-1-Staging-After']}
            style={{width: width, height: 400}}
          />
        </Animated.View>
        <PanGestureHandler
          activeOffsetX={[0, 0]}
          onGestureEvent={_onPanGestureEvent}>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: Animated.add(
                    Animated.diffClamp(_touchX, 36, width - 36),
                    new Animated.Value(0),
                  ),
                },
              ],
            }}>
            <View
              style={{
                height: 400,
                width: 5,
                top: 0,
                backgroundColor: 'white',
              }}
            />
            <Animated.View
              style={{
                height: 36,
                width: 36,
                position: 'absolute',
                left: -15,
                backgroundColor: 'white',
                top: (400 - 36) / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../../../assets/images/slide.png')}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};
export default SplitPane;
