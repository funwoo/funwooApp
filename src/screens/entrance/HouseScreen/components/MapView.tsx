import React, {useMemo} from 'react';
import {ImageURISource} from 'react-native';
import RNMapView, {
  Callout,
  Circle,
  MapMarkerProps,
  MapStyleElement,
  MapViewProps,
  Marker as RNMarker,
} from 'react-native-maps';

const customMapStyle: Array<MapStyleElement> = [
  {
    featureType: 'landscape',
    stylers: [{color: '#E0E0E0'}],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'all',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{lightness: 50}],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [{visibility: 'Simplified'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'Geometry',
    stylers: [{color: '#E0E0E0'}],
  },
  {
    featureType: 'road.local',
    elementType: 'all',
    stylers: [{visibility: 'Simplified'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'water',
    elementType: 'Geometry',
    stylers: [{lightness: 50}],
  },
];

export interface CustomMapViewProps extends MapViewProps {
  zoomControl?: boolean;
  mapTypeControl?: boolean;
  scaleControl?: boolean;
  streetViewControl?: boolean;
  rotateControl?: boolean;
  fullscreenControl?: boolean;
  center?: {
    lat: number;
    lng: number;
  };
  id: string;
  customRef?: React.LegacyRef<RNMapView>;
}

export interface CustomMarkerProps extends MapMarkerProps {
  type:
    | 'bus'
    | 'grocery'
    | 'gym'
    | 'home'
    | 'hospital'
    | 'park'
    | 'restaurant'
    | 'school'
    | 'subway'
    | 'corporate'
    | string;
  selected: boolean;
}

const MapView: React.FC<CustomMapViewProps> = ({
  children,
  customRef,
  ...props
}) => {
  return (
    <RNMapView
      provider={__DEV__ ? undefined : 'google'}
      ref={customRef}
      customMapStyle={customMapStyle}
      {...props}>
      {children}
    </RNMapView>
  );
};

export const markerImages: {
  [key: string]: ImageURISource;
} = {
  bus_station_selected: require('../../../../assets/images/marker/markers-bus-selected.png'),
  bus_station_unselected: require('../../../../assets/images/marker/markers-bus-unselected.png'),
  supermarket_selected: require('../../../../assets/images/marker/markers-grocery-selected.png'),
  supermarket_unselected: require('../../../../assets/images/marker/markers-grocery-unselected.png'),
  home_selected: require('../../../../assets/images/marker/markers-home-selected.png'),
  attraction_selected: require('../../../../assets/images/marker/markers-attraction-selected.png'),
  attraction_unselected: require('../../../../assets/images/marker/markers-attraction-unselected.png'),
  artGallery_selected: require('../../../../assets/images/marker/markers-artGallery-selected.png'),
  artGallery_unselected: require('../../../../assets/images/marker/markers-artGallery-unselected.png'),
  movieTheater_selected: require('../../../../assets/images/marker/markers-movieTheater-selected.png'),
  movieTheater_unselected: require('../../../../assets/images/marker/markers-movieTheater-unselected.png'),
  museum_selected: require('../../../../assets/images/marker/markers-museum-selected.png'),
  museum_unselected: require('../../../../assets/images/marker/markers-museum-unselected.png'),
  library_selected: require('../../../../assets/images/marker/markers-library-selected.png'),
  library_unselected: require('../../../../assets/images/marker/markers-library-unselected.png'),
  grocery_selected: require('../../../../assets/images/marker/markers-grocery-selected.png'),
  grocery_unselected: require('../../../../assets/images/marker/markers-grocery-unselected.png'),
  gym_selected: require('../../../../assets/images/marker/markers-gym-selected.png'),
  gym_unselected: require('../../../../assets/images/marker/markers-gym-unselected.png'),
  subway_station_selected: require('../../../../assets/images/marker/markers-subway-selected.png'),
  subway_station_unselected: require('../../../../assets/images/marker/markers-subway-unselected.png'),
  hospital_selected: require('../../../../assets/images/marker/markers-hospital-selected.png'),
  hospital_unselected: require('../../../../assets/images/marker/markers-hospital-unselected.png'),
  park_selected: require('../../../../assets/images/marker/markers-park-selected.png'),
  park_unselected: require('../../../../assets/images/marker/markers-park-unselected.png'),
  restaurant_selected: require('../../../../assets/images/marker/markers-restaurant-selected.png'),
  restaurant_unselected: require('../../../../assets/images/marker/markers-restaurant-unselected.png'),
  school_selected: require('../../../../assets/images/marker/markers-school-selected.png'),
  school_unselected: require('../../../../assets/images/marker/markers-school-unselected.png'),
  corporate_selected: require('../../../../assets/images/marker/markers-company-selected.png'),
  corporate_unselected: require('../../../../assets/images/marker/markers-company-unselected.png'),
};
const Marker: React.FC<CustomMarkerProps> = ({
  type,
  selected,
  children,
  ...props
}) => {
  const markerIconName = useMemo(() => {
    if (type !== 'home') {
      return type + '_' + (selected ? 'selected' : 'unselected');
    } else {
      return 'home_selected';
    }
  }, [type, selected]);

  return (
    <RNMarker image={markerImages?.[markerIconName] ?? undefined} {...props}>
      {children}
    </RNMarker>
  );
};

export {Marker, Callout, Circle};

export default MapView;
