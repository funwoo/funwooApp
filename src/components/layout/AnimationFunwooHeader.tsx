import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  AnimateStyle,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import useOnScrollAnimated from '../../hooks/useOnScrollAnimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDimensionsContext} from '../../context/DimensionsContext';
import AnimationText from '../common/Text/AnimationText';
import {BaseTextStyle, CustomTextSize} from '../common/Text/BaseText';
import {ColorsType} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import BaseIcon from '../common/icons/Icons/BaseIcon';
import {PageNames} from '../../navigator/PageNames';
import LogoHeader from './LogoHeader';
import {useTailwind} from 'tailwind-rn';

interface Props {
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
  back?: boolean;
  name?: string;
  type?: 'black' | 'white';
  disableAnimated?: boolean;
}

const AnimationFunwooHeader: React.FC<Props> = ({
  children,
  style = {},
  back,
  name = '',
  type = 'white',
  disableAnimated = false,
}) => {
  const {translationY, onAnimatedScroll} = useOnScrollAnimated();
  const tailwind = useTailwind();

  return (
    <React.Fragment>
      <StatusBar
        translucent
        backgroundColor={'#00000000'}
        barStyle={'default'}
      />
      <View style={tailwind('justify-center w-full flex-1')}>
        <Animated.ScrollView
          onScroll={onAnimatedScroll}
          scrollEventThrottle={16}
          style={StyleSheet.flatten([
            {
              flex: 1,
            },
            style,
          ])}>
          {children}
        </Animated.ScrollView>
      </View>
      {back ? (
        <AnimationDefaultHeader
          scrollY={disableAnimated ? undefined : translationY}
          sticky={true}
          type={type}
          title={name}
          back={true}
        />
      ) : (
        <LogoHeader
          black={type === 'black'}
          name={name}
          scrollY={disableAnimated ? undefined : translationY}
        />
      )}
    </React.Fragment>
  );
};

export default AnimationFunwooHeader;

interface AnimationDefaultHeaderProps {
  back?: boolean;
  title?: string;
  headerRight?: React.ReactNode;
  border?: boolean;
  sticky?: boolean;
  type?: 'black' | 'white';
  scrollY?: Animated.SharedValue<number>;
}

const AnimationDefaultHeader: React.FC<AnimationDefaultHeaderProps> = ({
  border,
  headerRight,
  scrollY,
  sticky,
  title,
  type,
  back,
}) => {
  const {top} = useSafeAreaInsets();
  const {width} = useDimensionsContext();
  const textColorStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        scrollY?.value ?? 0,
        [0, 200],
        type === 'black' ? ['black', 'white'] : ['white', 'black'],
      ),
    };
  });
  const backgroundColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        scrollY?.value ?? 0,
        [0, 200],
        type === 'black' ? ['white', '#00000000'] : ['#00000000', 'white'],
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height: 60 + top,
          position: sticky ? 'absolute' : 'relative',
          top: 0,
          zIndex: 999,
        },
        backgroundColorStyle,
      ]}>
      <View
        style={{
          marginTop: top,
          height: 56,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: border ? 1 : 0,
          borderBottomColor: 'black',
        }}>
        <HeaderLabel title={title ?? ''} scrollY={scrollY} type={type}>
          {back ? <BackButton textColorStyle={textColorStyle} /> : <View />}
          <View style={{position: 'absolute', right: 12}}>{headerRight}</View>
        </HeaderLabel>
      </View>
    </Animated.View>
  );
};

interface HeaderLabelProps {
  title: string;
  style?: StyleProp<Animated.AnimateStyle<BaseTextStyle | undefined>>;
  scrollY?: Animated.SharedValue<number>;
  type?: 'black' | 'white';
}

const HeaderLabel: React.FC<HeaderLabelProps> = ({
  title,
  style = {},
  scrollY,
  type,
}) => {
  const animationStyle = useAnimatedProps(() => {
    return {
      color: interpolateColor(
        scrollY?.value ?? 0,
        [0, 200],
        type === 'black' ? ['black', 'white'] : ['white', 'black'],
      ) as ColorsType,
    };
  });

  return (
    <AnimationText
      animatedProps={animationStyle}
      style={[
        style,
        {
          fontFamily: 'NotoSansTC-Regular',
          fontWeight: '500',
          fontStyle: 'normal',
          letterSpacing: 0.4,
          textAlign: 'left',
          fontSize: CustomTextSize.HeaderTitle,
        },
      ]}>
      {title}
    </AnimationText>
  );
};

const AnimatedFeather = Animated.createAnimatedComponent(BaseIcon);
const BackButton = ({
  textColorStyle,
  backScreen = PageNames.home,
}: {
  textColorStyle: StyleProp<AnimateStyle<StyleProp<TextStyle>>>;
  backScreen?: string;
}) => {
  const navigation = useNavigation<Record<any, any>>();
  return (
    <Pressable
      style={{position: 'absolute', left: 12}}
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate(backScreen);
        }
      }}>
      <AnimatedFeather
        type={'Feather'}
        style={textColorStyle}
        name="arrow-left"
        size={20}
        color={''}
      />
    </Pressable>
  );
};
