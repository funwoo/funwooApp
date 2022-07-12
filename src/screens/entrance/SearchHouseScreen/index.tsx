import React, {useEffect} from 'react';
import AnimationFunwooHeader from '../../../components/layout/AnimationFunwooHeader';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import {useTailwind} from 'tailwind-rn';
import {
  FlatList,
  Image,
  Linking,
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
import AreaFilter, {CountryLabel} from './components/AreaFilter';
import {
  HouseFilterContextProvider,
  useHouseFilterContext,
} from '../../../context/HouseFilterContext';
import BuildingTypeFilter from './components/BuildingTypeFilter';
import HouseCard from '../../../components/feature/HouseCard';
import ConditionalFragment from '../../../components/common/ConditionalFragment';
import {CountryEnum} from '../../../swagger/funwoo.api';
import {isEmptyArray} from '../../../utils';

const SearchHouseScreen = () => {
  const tailwind = useTailwind();
  return (
    <HouseFilterContextProvider>
      <AreaFilter />
      <BuildingTypeFilter />
      <AnimationFunwooHeader
        scrollEnabled={false}
        disableAnimated
        type={'black'}
        headerRight={
          <Text fontSize={TextStringSizeEnum['3xl']} style={tailwind('ml-4')}>
            買屋
          </Text>
        }
        style={tailwind('flex-1 bg-white')}
        stickyAfterHeader={<Filter />}>
        <View style={tailwind('px-4 pt-4')}>
          <Pressable
            style={tailwind('py-2 border')}
            onPress={() => Linking.openURL('tel://0900-289-518')}>
            <Text
              fontFamily={'NotoSansTC-Medium'}
              fontSize={TextStringSizeEnum.base}
              style={tailwind('text-center')}>
              更多優質房源？撥打客服 0900-289-518
            </Text>
          </Pressable>
        </View>
        <Data />
      </AnimationFunwooHeader>
    </HouseFilterContextProvider>
  );
};

export default SearchHouseScreen;

const Filter = () => {
  const tailwind = useTailwind();

  const {
    triggerAreaFilter,
    triggerBuildingTypeFilter,
    showAreaFilter,
    showBuildingTypeFilter,
    country,
    cities,
    buildingType,
  } = useHouseFilterContext();

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
          {CountryLabel[country]}
          <ConditionalFragment condition={country === CountryEnum.TW}>
            ｜{cities.join('、')}
          </ConditionalFragment>
        </PressableButton>
        <PressableButton
          open={showBuildingTypeFilter}
          onPressIn={triggerBuildingTypeFilter}>
          {isEmptyArray(buildingType) ? '全部類型' : buildingType.join('、')}
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
      <Text
        lineBreakMode={'clip'}
        numberOfLines={1}
        fontSize={TextStringSizeEnum.md}
        style={tailwind('flex-1 py-4')}>
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

const Data = () => {
  const {data, turnPage, registryListRef} = useHouseFilterContext();
  const tailwind = useTailwind();

  return (
    <FlatList
      ref={registryListRef}
      contentContainerStyle={tailwind('p-4')}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => <HouseCard data={item} />}
      onEndReached={turnPage}
      onEndReachedThreshold={0.16}
    />
  );
};
