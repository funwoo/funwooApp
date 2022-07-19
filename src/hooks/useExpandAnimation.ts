import {useCallback, useEffect, useState} from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {LayoutAnimation, Platform, UIManager} from 'react-native';

const useExpandAnimation = (expandManually?: boolean) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [didExpanded, setDidExpanded] = useState<boolean>(false);

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

  const resetExpandStatus = useCallback(() => {
    setIsExpanded(false);
    setDidExpanded(false);
  }, []);

  useEffect(() => {
    if (didExpanded || expandManually) {
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
  }, [didExpanded, expandManually]);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const expand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, () => {
      setDidExpanded(prev => !prev);
    });
    setIsExpanded(prev => !prev);
  }, []);

  return {expand, animationStyle, resetExpandStatus, isExpanded, didExpanded};
};

export default useExpandAnimation;
