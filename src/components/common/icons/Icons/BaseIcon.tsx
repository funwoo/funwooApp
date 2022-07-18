import React from 'react';
import {TextProps, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {DimensionsContext} from '../../../../context/DimensionsContext';

const Icons = {
  FontAwesome: FontAwesome,
  FontAwesome5: FontAwesome5,
  Feather: Feather,
  Fontisto: Fontisto,
  Foundation: Foundation,
  MaterialCommunityIcons: MaterialCommunityIcons,
  MaterialIcons: MaterialIcons,
  Zocial: Zocial,
  AntDesign: AntDesign,
  Entypo: Entypo,
  EvilIcons: EvilIcons,
  Octicons: Octicons,
};

interface BaseIconProps extends TextProps {
  type:
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Fontisto'
    | 'Foundation'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Zocial'
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Octicons';
  size: number;
  name: string;
  color?: string;
}

//
// const Logo = createIconSetFromIcoMoon(
//   require('../../../../assets/fonts/LogoSelection.json'),
//   'Logo',
//   'Logo.ttf',
// );
//
// const LogoIcon = Animated.createAnimatedComponent(Logo);

class BaseIcon extends React.Component<BaseIconProps> {
  scale = (fontSize: number) => {
    const {width, height} = this.context;
    if (width > height) {
      return 1.3 * fontSize;
    } else {
      return (width / 390) * fontSize;
    }
  };

  render() {
    const {color, size, type, name, style, ...props} = this.props;
    const Icon = Icons[type];
    return (
      <View style={[style, {justifyContent: 'center', alignItems: 'center'}]}>
        <Icon color={color} {...props} name={name} size={this.scale(size)} />
      </View>
    );
  }
}

BaseIcon.contextType = DimensionsContext;
// export {LogoIcon};
export default BaseIcon;
