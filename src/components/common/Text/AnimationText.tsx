import React from 'react';
import Animated from 'react-native-reanimated';
import Text, {TextProps} from './BaseText';
import {ColorsType} from '../../../constants';

interface AnimatedTextProps extends TextProps {
  color?: ColorsType;
}

class AnimatedText extends React.Component<AnimatedTextProps> {
  render() {
    const {color} = this.props;
    return (
      <Text {...this.props} style={{...this.props?.style, color: color}}>
        {this.props.children}
      </Text>
    );
  }
}

export default Animated.createAnimatedComponent(AnimatedText);
