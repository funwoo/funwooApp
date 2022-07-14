import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {LayoutChangeEvent, Pressable, ScrollView} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useTailwind} from 'tailwind-rn';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';

export interface TabData {
  key: string;
  label: string;
  yAxis: number;
  tabWidth: number;
  tabXOffset: number;
}

const HouseTabs: React.FC<{
  activeTabIndex: number;
  yPosition: number;
  tabs: Array<TabData>;
  scrollViewRef: MutableRefObject<ScrollView | null>;
  registryTabItem: (index: number) => (event: LayoutChangeEvent) => void;
}> = ({tabs, registryTabItem, activeTabIndex, scrollViewRef, yPosition}) => {
  const [height, setHeight] = useState<number>(-100);

  const tailwind = useTailwind();
  const tabsScrollViewRef = useRef<Animated.ScrollView | null>(null);

  const tabWidthAnimation = useSharedValue(0);
  const tabXOffsetAnimation = useSharedValue(0);
  const tabsTransformAnimation = useSharedValue(0);

  const tabsTransform = useDerivedValue(() =>
    withSpring(
      interpolate(
        tabsTransformAnimation.value,
        [height, 0],
        [0, 48],
        Extrapolate.CLAMP,
      ),
    ),
  );

  const tabAnimationStyle = useAnimatedStyle(() => ({
    width: tabWidthAnimation.value,
    left: tabXOffsetAnimation.value,
  }));
  const tabsAnimationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: -tabsTransform.value,
      },
    ],
  }));

  const activeTab = useMemo(() => tabs[activeTabIndex], [activeTabIndex]);

  useEffect(() => {
    tabWidthAnimation.value = withTiming(activeTab.tabWidth, {
      duration: 300,
    });
    tabXOffsetAnimation.value = withTiming(activeTab.tabXOffset, {
      duration: 300,
    });
    tabsScrollViewRef.current?.scrollTo({x: activeTab.tabXOffset});
  }, [activeTab]);

  useEffect(() => {
    tabsTransformAnimation.value = withTiming(yPosition, {
      duration: 300,
    });
  }, [yPosition]);

  return (
    <Animated.ScrollView
      ref={tabsScrollViewRef}
      onLayout={event => setHeight(event.nativeEvent.layout.height)}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={[
        tailwind('absolute top-0 w-full z-10 bg-white'),
        tabsAnimationStyle,
      ]}>
      {tabs.map((tab, index) => (
        <Pressable
          key={tab.key}
          onLayout={registryTabItem(index)}
          onPress={() => scrollViewRef.current?.scrollTo({y: tab.yAxis})}>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('py-2 px-4')}>
            {tab.label}
          </Text>
        </Pressable>
      ))}
      <Animated.View
        style={[
          {
            // ...tabAnimationStyle,
            position: 'absolute',
            bottom: 0,
            height: 3,
            backgroundColor: 'black',
            width: 100,
          },
          tabAnimationStyle,
        ]}
      />
    </Animated.ScrollView>
  );
};

export default HouseTabs;
