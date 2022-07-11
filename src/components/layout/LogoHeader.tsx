import React from 'react';
import {View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDimensionsContext} from '../../context/DimensionsContext';
import ConditionalFragment from '../common/ConditionalFragment';

interface Props {
  scrollY?: Animated.SharedValue<number>;
  name?: string;
  black?: boolean;
  showLoginBtn?: boolean;
  sticky?: boolean;
  headerRight?: React.ReactNode;
}

const LogoHeader: React.FC<Props> = ({scrollY, black, headerRight}) => {
  const {top} = useSafeAreaInsets();
  const {width} = useDimensionsContext();

  const ImgTintColorStyle = useAnimatedStyle(() => {
    return {
      tintColor: interpolateColor(
        scrollY?.value ?? 0,
        [0, 200],
        black ? ['black', 'white'] : ['white', 'black'],
      ),
    };
  }, [black]);

  const backgroundColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY?.value ?? 0,
        [0, 200],
        black ? ['white', '#00000000'] : ['#00000000', 'white'],
      ),
    };
  }, [black]);

  return (
    <React.Fragment>
      <ConditionalFragment condition={!scrollY}>
        <View
          style={{
            paddingTop: top,
            height: 60 + top,
          }}
        />
      </ConditionalFragment>
      <Animated.View
        style={[
          {
            width,
            height: 60 + top,
            position: 'absolute',
            paddingTop: top,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 5,
          },
          backgroundColorStyle,
        ]}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width,
            paddingRight: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Animated.Image
              style={[
                {
                  width: width * 0.33,
                  height: ((width * 0.33) / 6349) * 1024,
                  marginLeft: 10,
                },
                ImgTintColorStyle,
              ]}
              source={{
                uri: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/home/funwoo-logo.webp',
              }}
            />
            {headerRight}
          </View>
        </View>
      </Animated.View>
    </React.Fragment>
  );
};
export default LogoHeader;
