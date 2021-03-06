import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {ListingDetail, TrafficEnvEntity} from '../../../../swagger/funwoo.api';
import {useTailwind} from 'tailwind-rn';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useDimensionsContext} from '../../../../context/DimensionsContext';
import MapView, {Marker, PillMarker} from './MapView';
import RNMapView from 'react-native-maps';
import BaseIcon, {
  BaseIconProps,
} from '../../../../components/common/icons/Icons/BaseIcon';
import {ImageProvider} from '../../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HouseStackPageName} from '../../../../navigator/PageNames';
import classNames from 'classnames';
import {isNotEmptyArray, splitValueAndUnits} from '../../../../utils';
import ConditionalFragment from '../../../../components/common/ConditionalFragment';
import Animated from 'react-native-reanimated';
import useExpandAnimation from '../../../../hooks/useExpandAnimation';

export const MAP_RADIUS = 500;
export const METERS_TO_LATITUDE = 0.00000904371732957115;

const HouseEnvironment: React.FC<ListingDetail> = ({
  location_latitude,
  location_longitude,
  address,
  traffic_env_corporate,
  traffic_env_hospital,
  traffic_env_recreation,
  traffic_env_school,
  traffic_env_supermarket,
  traffic_env_traffic,
}) => {
  const [mapReady, setMapReady] = useState(false);
  const [selectedPill, setSelectPill] = useState<keyof HouseMapEnvData>(
    'traffic_env_traffic',
  );
  const [selectedMarker, setSelectedMarker] = useState('');
  const [directions, setDirections] = useState<
    Array<HouseAddAddressCallbackParams>
  >([]);

  const tailwind = useTailwind();
  const {width} = useDimensionsContext();
  const navigation =
    useNavigation<NavigationProp<HouseScreenStackParamsList>>();

  const MapViewRef = useRef<RNMapView | null>(null);

  const setCenter = useCallback((coord: {lat: number; lng: number}) => {
    MapViewRef?.current?.animateCamera({
      center: {
        latitude: coord.lat,
        longitude: coord.lng,
      },
    });
  }, []);

  const region = useMemo(
    () => ({
      lat: parseFloat(location_latitude ?? '0'),
      lng: parseFloat(location_longitude ?? '0'),
    }),
    [],
  );

  const environments = useMemo<Array<HouseEnvData>>(() => {
    return [
      {
        key: 'traffic_env_traffic',
        label: '??????',
        env: traffic_env_traffic ?? [],
      },
      {
        key: 'traffic_env_school',
        label: '??????',
        env: traffic_env_school ?? [],
      },
      {
        key: 'traffic_env_supermarket',
        label: '??????',
        env: traffic_env_supermarket ?? [],
      },
      {
        key: 'traffic_env_recreation',
        label: '??????',
        env: traffic_env_recreation ?? [],
      },
      {
        key: 'traffic_env_hospital',
        label: '??????',
        env: traffic_env_hospital ?? [],
      },
      {
        key: 'traffic_env_corporate',
        label: '??????',
        env: traffic_env_corporate ?? [],
      },
    ].filter(environment =>
      isNotEmptyArray(environment.env),
    ) as Array<HouseEnvData>;
  }, [
    traffic_env_corporate,
    traffic_env_hospital,
    traffic_env_recreation,
    traffic_env_school,
    traffic_env_supermarket,
    traffic_env_traffic,
  ]);

  const currentEnvironment = useMemo(
    () => environments.find(({key}) => key === selectedPill),
    [environments, selectedPill],
  )!;

  const addAddressCallback = useCallback(
    (params: HouseAddAddressCallbackParams) => {
      setDirections(prev => prev.concat(params));
    },
    [],
  );

  const onAddAddressPress = useCallback(() => {
    navigation.navigate(HouseStackPageName.addAddress, {
      region,
      callback: addAddressCallback,
    });
  }, []);

  return (
    <View style={tailwind('py-8')}>
      <View style={tailwind('px-4')}>
        <Text
          fontSize={TextStringSizeEnum.xl}
          fontFamily={'NotoSansTC-Medium'}
          style={tailwind('py-2 mb-2')}>
          ????????????
        </Text>
        {directions.map((direction, index) => (
          <DirectionItem key={`${direction.name}-${index}`} {...direction} />
        ))}
        <Pressable
          onPress={onAddAddressPress}
          style={tailwind('flex-row items-center py-4')}>
          <View style={tailwind('items-center justify-center w-6 h-6')}>
            <EntypoIcon name={'plus'} size={20} />
          </View>
          <Text
            fontSize={TextStringSizeEnum.base}
            fontFamily={'NotoSansTC-Medium'}>
            ????????????????????????
          </Text>
        </Pressable>
      </View>
      <TouchableWithoutFeedback>
        <View>
          <MapView
            id={Math.random().toString()}
            customRef={MapViewRef}
            onMapReady={() => {
              setMapReady(true);
            }}
            pointerEvents={'none'}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            provider={'google'}
            initialRegion={{
              latitude: region?.lat,
              longitude: region?.lng,
              latitudeDelta: MAP_RADIUS * METERS_TO_LATITUDE,
              longitudeDelta: MAP_RADIUS * METERS_TO_LATITUDE,
            }}
            style={{
              width: width,
              height: (width / 414) * 276,
            }}>
            <Marker
              type={'home'}
              selected={true}
              coordinate={{latitude: region.lat, longitude: region.lng}}
            />
            {currentEnvironment.env.map((environment, index) => (
              <PillMarker
                key={`${environment.name}-${index}`}
                index={index}
                pill={environment}
                selectedMarker={selectedMarker}
              />
            ))}
          </MapView>
          <MapViewButton
            data={environments}
            region={region}
            address={address ?? ''}
            style={tailwind('absolute bottom-4 right-4')}
            type={'street'}
          />
          <ZoomInButton
            region={region}
            address={address!}
            data={environments}
          />
        </View>
      </TouchableWithoutFeedback>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={[tailwind('w-full px-4 py-3')]}
        horizontal={true}>
        {environments.map(({label, key}) => (
          <Pressable
            key={key}
            onPress={() => setSelectPill(key)}
            style={tailwind(
              classNames('mr-4 py-1 px-4 border rounded-extreme', {
                'border-gray900': key === selectedPill,
                'border-gray500': key !== selectedPill,
              }),
            )}>
            <Text
              fontSize={TextStringSizeEnum.md}
              style={tailwind(
                classNames({
                  'text-gray500': key !== selectedPill,
                }),
              )}>
              {label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <ConditionalFragment condition={mapReady}>
        <EnvironmentSection
          data={currentEnvironment.env}
          setSelectedMarker={setSelectedMarker}
          setCenter={setCenter}
        />
      </ConditionalFragment>
    </View>
  );
};

export default HouseEnvironment;

export const MapViewButton: React.FC<
  {style?: StyleProp<ViewStyle>} & HouseMapScreenParams
> = ({data, region, address, style, type}) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NavigationProp<HouseScreenStackParamsList>>();

  const backgroundImage = useMemo(() => {
    return type === 'street'
      ? ImageProvider.streetIconBackground
      : ImageProvider.mapIconBackground;
  }, [type]);
  const IconProps = useMemo<Pick<BaseIconProps, 'type' | 'name'>>(() => {
    if (type === 'street') {
      return {
        type: 'MaterialIcons',
        name: '360',
      };
    } else {
      return {
        type: 'Entypo',
        name: 'map',
      };
    }
  }, [type]);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(HouseStackPageName.map, {
          region,
          data,
          address,
          type,
        });
      }}>
      <ImageBackground
        style={[
          style,
          tailwind('items-center justify-center rounded-md'),
          {
            width: 120,
            height: 90,
          },
        ]}
        source={backgroundImage}>
        <BaseIcon
          {...IconProps}
          style={{marginBottom: 10}}
          size={20}
          color="white"
        />
        <Text
          fontSize={TextStringSizeEnum.md}
          fontFamily={'NotoSansTC-Medium'}
          style={tailwind('text-white')}>
          <ConditionalFragment condition={type === 'map'}>
            ??????
          </ConditionalFragment>
          <ConditionalFragment condition={type === 'street'}>
            ?????????
          </ConditionalFragment>
        </Text>
      </ImageBackground>
    </Pressable>
  );
};

const ZoomInButton: React.FC<{
  data: Array<HouseEnvData>;
  region: EnvRegion;
  address: string;
}> = ({region, data, address}) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NavigationProp<HouseScreenStackParamsList>>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(HouseStackPageName.map, {
          type: 'map',
          region,
          address,
          data,
        })
      }
      style={[
        tailwind('absolute top-4 right-4 flex-row items-center p-3 bg-white'),
      ]}>
      <Text
        fontSize={TextStringSizeEnum.md}
        style={{
          marginRight: 10,
        }}>
        ??????
      </Text>
      <BaseIcon
        type={'MaterialIcons'}
        color={'#6D6D6D'}
        size={23}
        name={'fullscreen'}
      />
    </Pressable>
  );
};

const EnvironmentSection: React.FC<{
  data: Array<TrafficEnvEntity>;
  setSelectedMarker: (markerName: string) => void;
  setCenter: (coord: {lat: number; lng: number}) => void;
}> = ({data, setSelectedMarker, setCenter}) => {
  const tailwind = useTailwind();
  const {expand, animationStyle, resetExpandStatus, isExpanded} =
    useExpandAnimation();

  useEffect(() => {
    resetExpandStatus();
  }, [data]);

  const onMarkerPress = useCallback(
    (location: TrafficEnvEntity['location'], markerKey: string) => {
      if (location?.lat && location?.lng) {
        setCenter({lat: location?.lat, lng: location.lng});
        setSelectedMarker(markerKey);
      }
    },
    [],
  );

  return (
    <View>
      {data.slice(0, 3).map((environment, index) => (
        <EnvironmentItem
          index={index}
          {...environment}
          key={`${environment.name}-${index}`}
          onMarkerPress={onMarkerPress}
        />
      ))}
      <ConditionalFragment condition={data.length > 3 && isExpanded}>
        {data.slice(3).map((environment, index) => (
          <EnvironmentItem
            index={index}
            {...environment}
            key={`${environment.name}-${index}`}
            onMarkerPress={onMarkerPress}
          />
        ))}
      </ConditionalFragment>
      <ConditionalFragment condition={data.length > 3}>
        <Pressable
          onPress={expand}
          style={tailwind('flex-row items-center justify-center py-3')}>
          <Text
            fontSize={TextStringSizeEnum.base}
            fontFamily={'NotoSansTC-Medium'}>
            ??????????????????
          </Text>
          <Animated.View style={[animationStyle, tailwind('ml-2')]}>
            <BaseIcon
              type={'FontAwesome5'}
              size={16}
              name={'chevron-down'}
              color={'#212121'}
              style={tailwind('w-6 h-6')}
            />
          </Animated.View>
        </Pressable>
      </ConditionalFragment>
    </View>
  );
};

const EnvironmentItem: React.FC<
  TrafficEnvEntity & {
    onMarkerPress: (
      location: TrafficEnvEntity['location'],
      markerKey: string,
    ) => void;
    index: number;
  }
> = ({name, distance, walkTime, location, onMarkerPress, index}) => {
  const tailwind = useTailwind();

  const {value: _walkTime} = splitValueAndUnits(walkTime);
  const {value: _distance} = splitValueAndUnits(distance);

  return (
    <Pressable
      onPress={() => {
        onMarkerPress(location, `${name}-${index}`);
      }}
      style={tailwind('flex-row items-center py-3 px-4')}>
      <Text fontSize={TextStringSizeEnum.base} style={tailwind('flex-[1.5]')}>
        {name}
      </Text>
      <Text
        fontSize={TextStringSizeEnum.base}
        style={tailwind('flex-1 text-right')}>
        {_distance}??????
      </Text>
      <View style={tailwind('flex-row flex-[1.3] items-center justify-end')}>
        <BaseIcon
          type={'MaterialIcons'}
          name="directions-walk"
          size={24}
          color={'#616161'}
          style={tailwind('w-6 h-6')}
        />
        <Text
          fontSize={TextStringSizeEnum.base}
          style={tailwind('text-right leading-[1.5rem] text-gray700')}>
          {_walkTime}??????
        </Text>
      </View>
    </Pressable>
  );
};

const DirectionItem: React.FC<HouseAddAddressCallbackParams> = ({
  type,
  name,
  time,
}) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('flex-row items-center bg-gray100')}>
      <BaseIcon
        type={'MaterialIcons'}
        size={24}
        name={type}
        color={'#616161'}
        style={tailwind('w-12 h-12')}
      />
      <View style={tailwind('w-px h-5 bg-gray700 mr-3')} />
      <Text
        style={tailwind('flex-1')}
        fontSize={TextStringSizeEnum.base}
        fontFamily={'NotoSansTC-Medium'}>
        ??? <Text fontSize={TextStringSizeEnum.base}>{name}</Text> ??? {time}
      </Text>
    </View>
  );
};
