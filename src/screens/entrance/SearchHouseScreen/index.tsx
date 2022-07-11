import React, {useEffect} from 'react';
import AnimationFunwooHeader from '../../../components/layout/AnimationFunwooHeader';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import {useTailwind} from 'tailwind-rn';
import {
  Image,
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {ImageProvider} from '../../../assets';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import classNames from 'classnames';
import AreaFilter from './components/AreaFilter';
import {
  HouseFilterContextProvider,
  useHouseFilterContext,
} from '../../../context/HouseFilterContext';

const SearchHouseScreen = () => {
  const tailwind = useTailwind();
  return (
    <HouseFilterContextProvider>
      <AreaFilter />
      <AnimationFunwooHeader
        disableAnimated
        type={'black'}
        headerRight={
          <Text fontSize={TextStringSizeEnum['3xl']} style={tailwind('ml-4')}>
            買屋
          </Text>
        }
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}
        stickyAfterHeader={<Filter />}
      />
    </HouseFilterContextProvider>
  );
};

export default SearchHouseScreen;

const Filter = () => {
  const tailwind = useTailwind();

  const {triggerAreaFilter, triggerTypeFilter, showAreaFilter, showTypeFilter} =
    useHouseFilterContext();

  return (
    <React.Fragment>
      <View
        style={tailwind(
          classNames(
            // 'absolute',
            'flex-row items-center',
            'h-12 w-full',
            'border-t border-b border-solid border-black',
          ),
        )}>
        <PressableButton
          open={showAreaFilter}
          onPressIn={triggerAreaFilter}
          style={tailwind('border-r border-solid border-black')}>
          全部區域
        </PressableButton>
        <PressableButton open={showTypeFilter} onPressIn={triggerTypeFilter}>
          全部類型
        </PressableButton>
      </View>
    </React.Fragment>
  );
};

const PressableButton: React.FC<
  Omit<PressableProps, 'style'> & {style?: StyleProp<ViewStyle>; open: boolean}
> = ({children, style, open, ...props}) => {
  const tailwind = useTailwind();
  const animation = useSharedValue(180);

  const rotation = useDerivedValue(() => {
    return interpolate(animation.value, [0, 360], [0, 360]);
  });

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  useEffect(() => {
    if (open) {
      animation.value = withTiming(180, {
        duration: 300,
      });
    } else {
      animation.value = withTiming(
        360,
        {
          duration: 300,
        },
        () => {
          animation.value = 0;
        },
      );
    }
  }, [open]);

  return (
    <Pressable
      {...props}
      style={[
        style,
        tailwind('px-[1.125rem] flex-row items-center flex-1 bg-white'),
      ]}>
      <Text fontSize={TextStringSizeEnum.md} style={tailwind('flex-1 py-4')}>
        {children}
      </Text>
      <Animated.View style={[animationStyle]}>
        <Image
          style={tailwind('w-6 h-6')}
          source={ImageProvider.chevron_down_icon}
        />
      </Animated.View>
    </Pressable>
  );
};
