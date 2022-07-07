import React from 'react';
import {StyleSheet, TextProps as RCTTextProps, TextStyle} from 'react-native';
import {Text as RCTText} from 'react-native-magnus';
import {DimensionsContext} from '../../../context/DimensionsContext';
import {ColorsType} from '../../../constants';

export enum TextStringSizeEnum {
  xs = 11,
  sm = 12,
  md = 13,
  lg = 15,
  xl = 17,
  '2xl' = 19,
  '3xl' = 21,
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
  children: string;
  fontFamily?: 'NotoSansTC-Regular' | 'OpenSans-Bold';
}

export enum Colors {
  BROWNISH_GREY = '#616161',
  BLACK = '#000000',
  DARK_GREY = '#1c1e21',
}

class Text extends React.Component<TextProps> {
  scale = (fontSize: number) => (this.context.width / 390) * fontSize;
  getFontSize = () => {
    const {fontSize, style} = this.props;
    if (fontSize) {
      return this.scale(fontSize);
    } else if (style?.fontSize) {
      return this.scale(style?.fontSize);
    } else {
      return this.scale(12);
    }
  };
  getColor = (value: string | ColorsType | undefined) => {
    switch (value) {
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
        return value;
    }
  };

  render() {
    const {style, fontFamily, children} = this.props;

    return (
      <RCTText
        allowFontScaling={false}
        {...this.props}
        style={StyleSheet.flatten([
          style,
          {
            fontSize: this.getFontSize(),
            fontFamily: fontFamily || style?.fontFamily || 'NotoSansTC-Regular',
            lineHeight: style?.lineHeight
              ? this.scale(style?.lineHeight)
              : this.getFontSize() + 4,
            color: this.getColor(style?.color),
          },
        ])}>
        {children}
      </RCTText>
    );
  }
}

Text.contextType = DimensionsContext;
export default Text;
