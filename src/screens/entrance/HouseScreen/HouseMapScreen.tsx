import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import CommonHeader from '../../../components/layout/CommonHeader';
import {
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import {useTailwind} from 'tailwind-rn/dist';
import {RouteProp, useRoute} from '@react-navigation/native';
import ConditionalFragment from '../../../components/common/ConditionalFragment';
import BaseIcon from '../../../components/common/icons/Icons/BaseIcon';
import {useDimensions} from '@react-native-community/hooks';
import {isSet, splitValueAndUnits} from '../../../utils';
import MapView, {Marker, PillMarker} from './components/MapView';
import RNMapView, {Callout, Region} from 'react-native-maps';
import {
  MAP_RADIUS,
  MapViewButton,
  METERS_TO_LATITUDE,
} from './components/HouseEnvironment';
import classNames from 'classnames';
import StreetView from './components/StreetView';

const HouseMapScreen = () => {
  const tailwind = useTailwind();
  const {params} = useRoute<RouteProp<HouseScreenStackParamsList, 'map'>>();
  const {region, type} = params;

  const headerTitle = useMemo(() => {
    return type === 'map' ? '地圖' : '街景圖';
  }, [type]);

  const onNavigatePress = useCallback(() => {
    const appleMapScheme = 'http://maps.apple.com/';
    const googleMapScheme = Platform.select({
      ios: 'comgooglemaps://',
      android: 'google.navigation:',
    })!;
    const routeString = Platform.select({
      android: `q=${region.lat},${region.lng}`,
      ios: `?saddr=&daddr=${region.lat},${region.lng}&directionsmode=driving`,
      web: `${region.lat},${region.lng}`,
    });
    if (Platform.OS === 'ios') {
      Linking.canOpenURL(googleMapScheme + routeString)
        .then(() => {
          Linking.openURL(googleMapScheme + routeString);
        })
        .catch(() => {
          Linking.openURL(appleMapScheme + routeString);
        });
    } else if (Platform.OS === 'android') {
      Linking.openURL(googleMapScheme + routeString);
    } else {
      Linking.openURL('http://www.google.com/maps/place/' + routeString);
    }
  }, [region]);

  return (
    <CommonHeader
      scrollEnabled={false}
      title={headerTitle}
      headerRight={
        <React.Fragment>
          <View style={tailwind('w-12 h-12')} />
          <Pressable
            onPress={onNavigatePress}
            style={tailwind('flex-row absolute right-4 py-1 px-3 bg-black')}>
            <Text
              fontSize={TextStringSizeEnum.base}
              fontFamily={'NotoSansTC-Medium'}
              style={tailwind('flex-1 text-white')}
              numberOfLines={1}
              ellipsizeMode={'clip'}>
              導航
            </Text>
          </Pressable>
        </React.Fragment>
      }>
      <ConditionalFragment condition={type === 'map'}>
        <EnvironmentMap {...params} />
      </ConditionalFragment>
      <ConditionalFragment condition={type === 'street'}>
        <StreetView
          style={tailwind('flex-1 w-full')}
          allGesturesEnabled={true}
          coordinate={{
            radius: 50,
            latitude: region.lat,
            longitude: region.lng,
          }}
          marker={{
            latitude: region.lat,
            longitude: region.lng,
          }}
          pov={{
            tilt: parseFloat('0'),
            bearing: parseFloat('0'),
            zoom: parseInt('1'),
          }}
        />
        <MapViewButton
          style={tailwind('absolute bottom-4 right-4 z-10')}
          {...params}
          type={'map'}
        />
      </ConditionalFragment>
    </CommonHeader>
  );
};

export default HouseMapScreen;

const EnvironmentMap: React.FC<HouseMapScreenParams> = ({
  data,
  region,
  address,
}) => {
  const [scrollPosition, setScrollPosition] = useState<
    'start' | 'middle' | 'end' | null
  >('start');
  const [scrollViewWidth, setScrollViewWidth] = useState<number>(0);
  const [selectedPill, setSelectPill] = useState<keyof HouseMapEnvData>(
    'traffic_env_traffic',
  );
  const [selectedMarker, setSelectedMarker] = useState('');
  const [centerRegion, setCenterRegion] = useState<Region>();
  const tailwind = useTailwind();
  const {width: screenWidth} = useDimensions().screen;

  const scrollViewRef = useRef<ScrollView | null>(null);
  const mapViewRef = useRef<RNMapView | null>(null);

  useEffect(() => {
    if (scrollViewWidth <= screenWidth) {
      setScrollPosition(null);
    } else {
      setScrollPosition('start');
    }
  }, [scrollViewWidth]);

  const onPillsScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const position = event.nativeEvent.contentOffset?.x ?? 0;
      const width = event.nativeEvent.layoutMeasurement.width;
      if (width <= screenWidth) {
        setScrollPosition(null);
      }

      if (position === 0) {
        setScrollPosition('start');
      } else if (position === width) {
        setScrollPosition('end');
      } else {
        setScrollPosition('middle');
      }
    },
    [screenWidth],
  );

  const onScrollToStartPress = useCallback(() => {
    scrollViewRef.current?.scrollTo({x: 0});
  }, []);

  const onScrollToEndPress = useCallback(() => {
    scrollViewRef.current?.scrollToEnd();
  }, []);

  const currentEnvironment = useMemo(
    () => data.find(({key}) => key === selectedPill),
    [data, selectedPill],
  )!;

  const onBackToCenterClick = useCallback(() => {
    setCenterRegion({
      latitude: region.lat,
      longitude: region.lng,
      latitudeDelta: MAP_RADIUS * METERS_TO_LATITUDE,
      longitudeDelta: MAP_RADIUS * METERS_TO_LATITUDE,
    });
  }, [region]);

  return (
    <View style={[tailwind('flex-1')]}>
      <View style={tailwind('flex-row items-center')}>
        <ConditionalFragment
          condition={isSet(scrollPosition) && scrollPosition !== 'start'}>
          <Pressable
            onPress={onScrollToStartPress}
            style={tailwind('absolute left-0 z-10')}>
            <BaseIcon
              type={'FontAwesome'}
              size={16}
              name={'chevron-left'}
              style={tailwind('w-6 h-6')}
            />
          </Pressable>
        </ConditionalFragment>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={width => setScrollViewWidth(width)}
          scrollEnabled={false}
          onScroll={onPillsScroll}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={tailwind('py-2 px-4')}>
          {data.map(({key, label}) => {
            const isSelected = key === selectedPill;
            return (
              <Pressable
                onPress={() => setSelectPill(key)}
                key={key}
                style={tailwind(
                  classNames('border rounded-extreme mr-4', {
                    'border-gray500': !isSelected,
                  }),
                )}>
                <Text
                  fontSize={TextStringSizeEnum.md}
                  style={tailwind(
                    classNames('py-2 px-4', {
                      'text-gray900': isSelected,
                      'text-gray500': !isSelected,
                    }),
                  )}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <ConditionalFragment
          condition={isSet(scrollPosition) && scrollPosition !== 'end'}>
          <Pressable
            onPress={onScrollToEndPress}
            style={tailwind('absolute right-0 z-10')}>
            <BaseIcon
              type={'FontAwesome'}
              size={16}
              name={'chevron-right'}
              style={tailwind('w-6 h-6')}
            />
          </Pressable>
        </ConditionalFragment>
      </View>
      <MapView
        id={Math.random().toString()}
        onPress={() => setSelectedMarker('')}
        provider={'google'}
        customRef={mapViewRef}
        initialRegion={{
          latitude: region.lat,
          longitude: region.lng,
          latitudeDelta: MAP_RADIUS * METERS_TO_LATITUDE,
          longitudeDelta: MAP_RADIUS * METERS_TO_LATITUDE,
        }}
        region={centerRegion}
        onRegionChangeComplete={setCenterRegion}
        center={region}
        style={tailwind('flex-1 w-full')}>
        <Marker
          selected={true}
          type={'home'}
          coordinate={{
            latitude: region.lat,
            longitude: region.lng,
          }}
        />
        {currentEnvironment.env.map((environment, index) => {
          const {name, walkTime, distance} = environment;
          const key = `${name}-${index}`;
          const {value: _walkTime} = splitValueAndUnits(walkTime);
          const {value: _distance} = splitValueAndUnits(distance);

          return (
            <PillMarker
              onPress={event => {
                event.stopPropagation();
                setSelectedMarker(key);
              }}
              calloutAnchor={{
                x: 0.5,
                y: 0.5,
              }}
              key={key}
              index={index}
              pill={environment}
              selectedMarker={selectedMarker}>
              <Callout>
                <View style={tailwind('py-2 px-3')}>
                  <Text fontSize={TextStringSizeEnum.base}>{name}</Text>
                  <View style={tailwind('flex-row items-center')}>
                    <BaseIcon
                      type={'MaterialCommunityIcons'}
                      name="map-marker-distance"
                      size={16}
                      color={'#616161'}
                      style={tailwind('w-6 h-6')}
                    />
                    <Text
                      fontSize={TextStringSizeEnum.base}
                      style={tailwind('text-gray500')}>
                      {_distance} 公里
                    </Text>
                  </View>
                  <View style={tailwind('flex-row items-center')}>
                    <BaseIcon
                      type={'MaterialIcons'}
                      name="directions-walk"
                      size={16}
                      color={'#616161'}
                      style={tailwind('w-6 h-6')}
                    />
                    <Text
                      fontSize={TextStringSizeEnum.base}
                      style={tailwind('text-gray500')}>
                      {_walkTime} 分鐘
                    </Text>
                  </View>
                </View>
              </Callout>
            </PillMarker>
          );
        })}
      </MapView>
      <View style={tailwind('absolute bottom-4 right-4 items-end')}>
        <Pressable onPress={onBackToCenterClick} style={tailwind('mb-4')}>
          <BaseIcon
            type={'MaterialIcons'}
            size={24}
            name={'my-location'}
            style={tailwind('w-10 h-10 bg-white')}
          />
        </Pressable>
        <MapViewButton
          type={'street'}
          data={data}
          region={region}
          address={address}
        />
      </View>
    </View>
  );
};
