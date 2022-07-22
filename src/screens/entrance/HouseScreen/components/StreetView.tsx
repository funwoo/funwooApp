import React from 'react';
import {requireNativeComponent, ViewProps} from 'react-native';

interface StreetViewProps extends ViewProps {
  coordinate: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  pov: {
    tilt: number;
    bearing: number;
    zoom: number;
  };
  allGesturesEnabled?: boolean;
  heading?: number;
  onError?: () => {};
  onSuccess?: () => {};
  marker?: {
    latitude: number;
    longitude: number;
  };
}

const RCTStreetView = requireNativeComponent('StreetView');
const StreetView = (props: StreetViewProps) => {
  return <RCTStreetView {...props} />;
};

export default StreetView;
