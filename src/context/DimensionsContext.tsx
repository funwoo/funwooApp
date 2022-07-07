import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import {useDimensions} from '@react-native-community/hooks';
import useDebounce from '../hooks/useDebounce';

type DimensionsContextType = {
  width: number;
  contentWidth: number;
  height: number;
  numColumn: number;
  scale: (size: number) => number;
  imageAspectRatio: number;
};
const DimensionsContext = createContext({} as DimensionsContextType);
const IMAGE_ASPECT_RATIO = 3 / 2;
const DEBOUNCED_TIMER = 1000;

const DimensionsContextProvider = ({children}: {children: ReactNode}) => {
  const {width: dimWidth, height} = useDimensions().window;
  const debouncedWidth = useDebounce(dimWidth, DEBOUNCED_TIMER);
  const debouncedHeight = useDebounce(height, DEBOUNCED_TIMER);
  const debouncedContentWidth = useDebounce(debouncedWidth, DEBOUNCED_TIMER);

  const scale = useCallback(
    (size: number) => {
      return (
        ((debouncedWidth > debouncedHeight ? 390 * 1.1 : debouncedWidth) /
          390) *
        size
      );
    },
    [debouncedWidth, debouncedHeight],
  );

  const contextValue = useMemo(
    () => ({
      width: debouncedWidth,
      contentWidth: debouncedContentWidth,
      height: debouncedHeight,
      // TODO(@huge) fallback to Desktop when it's not Mobile
      // removed once we support Tablet (2-column) layout
      scale: scale,
      numColumn: 1,
      imageAspectRatio: IMAGE_ASPECT_RATIO,
    }),
    [debouncedWidth, debouncedContentWidth, debouncedHeight, scale],
  );

  return (
    <DimensionsContext.Provider value={contextValue}>
      {children}
    </DimensionsContext.Provider>
  );
};
const useDimensionsContext = () => {
  const context = useContext(DimensionsContext);
  return context;
};
export {useDimensionsContext, DimensionsContext};
export default DimensionsContextProvider;
