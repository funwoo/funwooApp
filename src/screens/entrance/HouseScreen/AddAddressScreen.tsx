import React, {useCallback, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  LayoutRectangle,
  Platform,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Text, {
  BaseTextStyle,
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import useGooglePlace, {API_KEY, Term} from '../../../hooks/useGooglePlace';
import BaseIcon from '../../../components/common/icons/Icons/BaseIcon';
import classNames from 'classnames';
import ConditionalFragment from '../../../components/common/ConditionalFragment';
import {Client, TravelMode} from '@googlemaps/google-maps-services-js';

export enum HouseAddAddressTravelModeEnum {
  driving = 'directions-car',
  walking = 'directions-walk',
  bicycling = 'directions-bike',
  transit = 'directions-transit',
}

const travelModes: Array<TravelMode> = [
  TravelMode.driving,
  TravelMode.walking,
  TravelMode.bicycling,
  TravelMode.transit,
];

const AddAddressScreen = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [mode, setMode] = useState<TravelMode>(TravelMode.driving);
  const [addressesLayout, setAddressesLayout] =
    useState<LayoutRectangle | null>(null);
  const [focusing, setFocusing] = useState<boolean>(false);

  const navigation =
    useNavigation<NavigationProp<HouseScreenStackParamsList>>();
  const {params} =
    useRoute<RouteProp<HouseScreenStackParamsList, 'addAddress'>>();

  const {addresses} = useGooglePlace(inputValue);

  const tailwind = useTailwind();
  const navigate = useNavigation<NavigationProp<EntranceRootStackParamsList>>();
  const InputRef = useRef<TextInput>(null);

  const getDisplayText = useCallback((item: Term[]) => {
    return (
      item
        // .filter((res, index) => index !== item.length - 1)
        .slice(0, item.length - 1)
        .map(result => result.value)
        .reverse()
        .join('')
    );
  }, []);

  const requestDirectionTime = useCallback(async () => {
    Keyboard.dismiss();
    try {
      const client = new Client();
      const {data} = await client.directions({
        params: {
          origin: `${params.region.lat},${params.region.lng}`,
          destination: inputValue,
          key: API_KEY,
          mode,
        },
      });

      params.callback({
        name: inputValue,
        time: data?.routes?.[0]?.legs?.[0]?.duration?.text,
        type: HouseAddAddressTravelModeEnum[mode],
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }, [inputValue]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={tailwind('bg-white flex-1')}>
        <View style={tailwind('flex-row items-center justify-between py-1')}>
          <Pressable
            onPress={() => navigate.goBack()}
            style={tailwind('items-center justify-center w-12 h-12')}>
            <AntDesignIcon size={20} name={'arrowleft'} />
          </Pressable>
          <Text
            fontFamily={'NotoSansTC-Medium'}
            fontSize={TextStringSizeEnum['3xl']}>
            新增通勤地址
          </Text>
          <View style={tailwind('w-12 h-12')} />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={tailwind('px-4 flex-1')}>
          <View style={tailwind('z-10')}>
            <Title style={tailwind('mb-4')} title={'地點'} />
            <TextInput
              onBlur={() => setFocusing(false)}
              onFocus={() => setFocusing(true)}
              ref={InputRef}
              onChangeText={setInputValue}
              style={tailwind('mb-8 border-b border-gray900')}
            />
            <ConditionalFragment condition={focusing}>
              <View
                onLayout={event => setAddressesLayout(event.nativeEvent.layout)}
                style={[
                  tailwind('absolute bottom-0 w-full z-10'),
                  {
                    transform: [{translateY: addressesLayout?.height ?? 0}],
                  },
                ]}>
                {addresses?.predictions?.map((item, index) => {
                  return (
                    <Pressable
                      key={item.description + index}
                      onPress={() => {
                        InputRef.current?.setNativeProps({
                          text: getDisplayText(item.terms),
                        });
                        setInputValue(getDisplayText(item.terms));
                      }}
                      style={{
                        width: '100%',
                        height: 56,
                        backgroundColor:
                          index % 2 === 0 ? '#fafafa' : '#f5f5f5',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          marginLeft: 12,
                          fontFamily: 'NotoSansTC-Regular',
                          fontSize: 16,
                          fontWeight: 'normal',
                          fontStyle: 'normal',
                          letterSpacing: 0.5,
                          textAlign: 'left',
                          color: 'gray900',
                        }}>
                        {getDisplayText(item.terms)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ConditionalFragment>
          </View>
          <Title style={tailwind('mb-2')} title={'通勤方式'} />
          <View style={tailwind('flex-row justify-between -mr-4')}>
            {travelModes.map((res, index) => {
              const isSelected = mode === res;
              return (
                <Pressable
                  key={'mode' + index}
                  onPress={() => {
                    setMode(res);
                  }}
                  style={tailwind(
                    classNames(
                      'flex-1 mr-4 justify-center items-center py-2 border',
                      {
                        'border-gray900 bg-gray900': isSelected,
                        'border-gray300': !isSelected,
                      },
                    ),
                  )}>
                  <BaseIcon
                    type="MaterialIcons"
                    name={HouseAddAddressTravelModeEnum[res]}
                    size={24}
                    color={isSelected ? 'white' : '#1c1e21'}
                  />
                </Pressable>
              );
            })}
          </View>
          <Pressable
            onPress={requestDirectionTime}
            style={[tailwind('p-4 mt-auto bg-[black]')]}>
            <Text
              fontSize={TextStringSizeEnum.base}
              fontFamily={'NotoSansTC-Bold'}
              style={tailwind('text-white text-center')}>
              計算通勤距離
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AddAddressScreen;

const Title = ({title, style}: {title: string; style?: BaseTextStyle}) => {
  return (
    <Text
      fontFamily={'NotoSansTC-Regular'}
      fontSize={TextStringSizeEnum.md}
      style={{
        color: 'gray700',
        ...style,
      }}>
      {title}
    </Text>
  );
};
