import React from 'react';
import {requireNativeComponent, ViewProps} from 'react-native';
import {StreetViewProps} from './StreetViewType';

const RCTStreetView = requireNativeComponent('StreetView');
const StreetView = (props: StreetViewProps) => {
  return <RCTStreetView {...props} />;
};

export default StreetView;
