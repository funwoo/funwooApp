import React, {useEffect} from 'react';
import AnimationFunwooHeader from '../../../components/layout/AnimationFunwooHeader';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import {useTailwind} from 'tailwind-rn';
import {
  FlatList,
  GestureResponderEvent,
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
import Icon from 'react-native-vector-icons/Ionicons';

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

  if (isEmptyArray(data)) {
    return <EmptyResult />;
  }

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

const EmptyResult = () => {
  const tailwind = useTailwind();
  const {buildingType, setBuildingType, cities, setCities, search} =
    useHouseFilterContext();

  return (
    <View style={tailwind('p-4')}>
      <View style={tailwind('py-8 px-4 bg-[#fafafa]')}>
        <Text
          fontFamily={'NotoSansTC-Medium'}
          fontSize={TextStringSizeEnum.xl}
          style={tailwind('mb-4 text-center')}>
          0 筆結果，可嘗試：
        </Text>
        <View style={tailwind('flex-row items-center mb-2')}>
          <View style={tailwind('items-center justify-center w-5')}>
            <View style={tailwind('w-1 h-1 rounded-extreme bg-[#616161]')} />
          </View>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-[#616161]')}>
            放寬篩選條件：
          </Text>
        </View>
        <View
          style={[tailwind('flex-row flex-wrap self-start px-6 -mr-4 -mb-2')]}>
          {buildingType.map(type => (
            <HighlightLabel
              key={type}
              type={type}
              onPress={async () => {
                setBuildingType(type, true);
                await search(true);
              }}
            />
          ))}
          {cities.map(city => (
            <HighlightLabel
              key={city}
              type={city}
              onPress={async () => {
                setCities(city, true);
                await search(true);
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const HighlightLabel: React.FC<{
  type: string;
  onPress: (event: GestureResponderEvent) => void;
}> = ({type, onPress}) => {
  const tailwind = useTailwind();

  return (
    <Pressable
      onPress={onPress}
      style={tailwind(
        'flex-row items-center px-2 py-2.5 mr-4 mb-2 bg-[#f5f5f5]',
      )}>
      <Text fontSize={TextStringSizeEnum.base} style={tailwind('mr-2')}>
        {type}
      </Text>
      <View style={tailwind('items-center justify-center w-5 h-5')}>
        <Icon name={'close'} size={20} />
      </View>
    </Pressable>
  );
};
