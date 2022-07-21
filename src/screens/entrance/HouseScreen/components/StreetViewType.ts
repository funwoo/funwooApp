import {ViewProps} from 'react-native';

export interface StreetViewProps extends ViewProps {
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
