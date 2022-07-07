import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const useOnScrollAnimated = () => {
  const translationY = useSharedValue(0);
  const onAnimatedScroll = useAnimatedScrollHandler(e => {
    translationY.value = e.contentOffset.y;
  });
  return {translationY, onAnimatedScroll};
};
export default useOnScrollAnimated;
