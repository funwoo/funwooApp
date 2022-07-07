import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputEndEditingEventData,
  TextInputProps,
} from 'react-native';
import {useCallbackOne} from 'use-memo-one';
import dayjs from 'dayjs';

export const MIN_COMPOSER_HEIGHT = Platform.select({
  ios: 33,
  android: 41,
  web: 34,
});
export const MAX_COMPOSER_HEIGHT = 200;
export const DEFAULT_PLACEHOLDER = 'Type a message...';
export const DATE_FORMAT = 'll';
export const TIME_FORMAT = 'LT';
export const TEST_ID = {
  WRAPPER: 'GC_WRAPPER',
  LOADING_WRAPPER: 'GC_LOADING_CONTAINER',
  SEND_TOUCHABLE: 'GC_SEND_TOUCHABLE',
};
const Color = {
  defaultColor: '#b2b2b2',
  backgroundTransparent: 'transparent',
  defaultBlue: '#0084ff',
  leftBubbleBackground: '#f0f0f0',
  black: '#000',
  white: '#fff',
  carrot: '#e67e22',
  emerald: '#2ecc71',
  peterRiver: '#3498db',
  wisteria: '#8e44ad',
  alizarin: '#e74c3c',
  turquoise: '#1abc9c',
  midnightBlue: '#2c3e50',
  optionTintColor: '#007AFF',
  timeTextColor: '#aaa',
};
//# sourceMappingURL=Color.js.map

export const StylePropType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object,
  PropTypes.number,
  PropTypes.bool,
]);

export function isSameDay(
  currentMessage: {createdAt: Date},
  diffMessage: {createdAt: Date},
) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false;
  }
  const currentCreatedAt = dayjs(currentMessage.createdAt);
  const diffCreatedAt = dayjs(diffMessage.createdAt);
  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }
  return currentCreatedAt.isSame(diffCreatedAt, 'day');
}

export function isSameUser(
  currentMessage: {user: {_id: string}},
  diffMessage: {user: {_id: string}},
) {
  return !!(
    diffMessage &&
    diffMessage.user &&
    currentMessage.user &&
    diffMessage.user._id === currentMessage.user._id
  );
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    lineHeight: 16,
    ...Platform.select({
      web: {
        paddingTop: 6,
        paddingLeft: 4,
      },
    }),
    marginTop: Platform.select({
      ios: 6,
      android: 0,
      web: 6,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
      web: 4,
    }),
  },
});

export function Composer({
  composerHeight = MIN_COMPOSER_HEIGHT,
  disableComposer = false,
  keyboardAppearance = 'default',
  multiline = true,
  onInputSizeChanged = () => null,
  onTextChanged = () => null,
  placeholder = DEFAULT_PLACEHOLDER,
  placeholderTextColor = Color.defaultColor,
  text = '',
  textInputAutoFocus = false,
  textInputProps = {},
  textInputStyle,
  onPressIn,
  onEndEditing,
}: {
  composerHeight?: number;
  disableComposer?: boolean;
  keyboardAppearance?: 'default' | 'light' | 'dark' | undefined;
  multiline?: boolean;
  onInputSizeChanged?: (layout: {width: number; height: number}) => void;
  onTextChanged?: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  text?: string;
  textInputAutoFocus?: boolean;
  textInputProps?: TextInputProps;
  textInputStyle?: TextInputProps['style'];
  onPressIn: (e: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onEndEditing: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
}) {
  const layoutRef = useRef<{width: number; height: number}>();
  const handleOnLayout = useCallbackOne<
    (event: {
      nativeEvent: {
        layout: {width: number; height: number};
      };
    }) => void
  >(
    ({nativeEvent: {layout}}) => {
      // Support earlier versions of React Native on Android.
      if (!layout) {
        return;
      }
      if (
        !layoutRef ||
        (layoutRef.current &&
          (layoutRef.current.width !== layoutRef.current.width ||
            layoutRef.current.height !== layoutRef.current.height))
      ) {
        layoutRef.current = layout;
        onInputSizeChanged(layout);
      }
    },
    [onInputSizeChanged],
  );
  return (
    <TextInput
      testID={placeholder}
      accessible
      accessibilityLabel={placeholder}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      multiline={multiline}
      editable={!disableComposer}
      onLayout={handleOnLayout}
      onChangeText={onTextChanged}
      style={[
        styles.textInput,
        textInputStyle,
        {
          height: composerHeight,
          ...Platform.select({
            web: {
              outlineWidth: 0,
              outlineColor: 'transparent',
              outlineOffset: 0,
            },
          }),
        },
      ]}
      autoFocus={textInputAutoFocus}
      value={text}
      enablesReturnKeyAutomatically
      underlineColorAndroid="transparent"
      keyboardAppearance={keyboardAppearance}
      onPressIn={onPressIn}
      {...textInputProps}
      onEndEditing={onEndEditing}
    />
  );
}

Composer.propTypes = {
  composerHeight: PropTypes.number,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  textInputProps: PropTypes.object,
  onTextChanged: PropTypes.func,
  onInputSizeChanged: PropTypes.func,
  multiline: PropTypes.bool,
  disableComposer: PropTypes.bool,
  textInputStyle: StylePropType,
  textInputAutoFocus: PropTypes.bool,
  keyboardAppearance: PropTypes.string,
};
//# sourceMappingURL=Composer.js.map
