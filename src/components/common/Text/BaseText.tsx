import React, {useCallback, useMemo} from 'react';
import {TextProps as RCTTextProps, TextStyle} from 'react-native';
import {Text as RCTText} from 'react-native-magnus';
import {useDimensionsContext} from '../../../context/DimensionsContext';
import {ColorsType} from '../../../constants';

export enum TextStringSizeEnum {
  xs = 11,
  sm = 12,
  md = 14,
  lg = 15,
  base = 16,
  xl = 18,
  '2xl' = 19,
  '3xl' = 20,
  '4xl' = 24,
  '5xl' = 27,
  '6xl' = 32,
  '7xl' = 36,
}

export enum CustomTextSize {
  HeaderTitle = 20,
}

export interface BaseTextStyle extends TextStyle {
  color?: ColorsType;
  fontFamily?:
    | 'NotoSansTC-Regular'
    | 'NotoSansTC-Medium'
    | 'NotoSansTC-Bold'
    | 'OpenSans-Bold';
}

export interface TextProps extends RCTTextProps {
  style?: BaseTextStyle;
  fontSize?: TextStringSizeEnum;
  fontFamily?:
    | 'NotoSansTC-Regular'
    | 'NotoSansTC-Medium'
    | 'NotoSansTC-Bold'
    | 'OpenSans-Bold';
}

export enum Colors {
  BROWNISH_GREY = '#616161',
  BLACK = '#000000',
  DARK_GREY = '#1c1e21',
}

const Text: React.FC<TextProps> = ({
  children,
  fontSize,
  style = {},
  fontFamily,
  ...props
}) => {
  const {width} = useDimensionsContext();

  const scale = useCallback((size: number) => (width / 390) * size, [width]);

  const _fontSize = useMemo(() => {
    if (fontSize) {
      return scale(fontSize);
    } else if (style?.fontSize) {
      return scale(style?.fontSize);
    } else {
      return scale(12);
    }
  }, [fontSize, style]);

  const color = useMemo(() => {
    switch (style?.color ?? 'gray900') {
      case 'white':
        return '#ffffff';
      case 'gray50':
        return '#fafafa';
      case 'gray100':
        return '#f5f5f5';
      case 'gray300':
        return '#e0e0e0';
      case 'gray500':
        return '#9e9e9e';
      case 'gray700':
        return '#616161';
      case 'gray800':
        return '#424242';
      case 'gray900':
        return '#212121';
      case 'black':
        return '#000000';
      case 'brand':
        return '#ef7c41';
      case undefined:
        return '#000000';
      default:
        return style?.color;
    }
  }, [style?.color]);

  return (
    <RCTText
      allowFontScaling={false}
      {...props}
      style={{
        ...style,
        fontSize: _fontSize,
        fontFamily: fontFamily || style?.fontFamily || 'NotoSansTC-Regular',
        fontWeight:
          fontFamily === 'NotoSansTC-Medium'
            ? '500'
            : fontFamily === 'NotoSansTC-Bold'
            ? '700'
            : '400',
        lineHeight: style?.lineHeight
          ? scale(style?.lineHeight)
          : _fontSize + 4,
        color,
      }}>
      {children}
    </RCTText>
  );
};

export default Text;
