import React from 'react';
import Modal from 'react-native-modal';
import {useTailwind} from 'tailwind-rn';
import {Linking, Pressable, ScrollView, View} from 'react-native';
import {useDimensions} from '@react-native-community/hooks';
import classNames from 'classnames';
import {
  CountryOfAreaFilter,
  useHouseFilterContext,
} from '../../../../context/HouseFilterContext';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CountryEnum} from '../../../../swagger/funwoo.api';
import ConditionalFragment from '../../../../components/common/ConditionalFragment';
import {useAsync} from 'react-use';
import {swaggerHttpClient} from '../../../../swagger';

const CountryLabel: Record<CountryOfAreaFilter, string> = {
  TW: '台灣',
  US: '海外',
  ALL: '全部區域',
};

const AreaFilter = () => {
  const {triggerAreaFilter, showAreaFilter} = useHouseFilterContext();
  const tailwind = useTailwind();
  const {width, height} = useDimensions().window;
  const {bottom} = useSafeAreaInsets();

  const {value} = useAsync(
    () => swaggerHttpClient.optionApi.getOptionsForBuy().then(res => res.data),
    [],
  );
  console.log(value);
  return (
    <Modal
      onSwipeComplete={triggerAreaFilter}
      swipeDirection={['down']}
      swipeThreshold={height * 0.6}
      propagateSwipe={false}
      isVisible={showAreaFilter}
      style={tailwind(classNames('justify-end', 'm-0'))}>
      <View
        style={[
          tailwind('pt-4 bg-[white]'),
          {
            width,
            height: height * 0.8,
            paddingBottom: bottom,
          },
        ]}>
        <View style={tailwind('justify-center items-center py-1')}>
          <View style={tailwind('h-1 w-9 bg-gray500 rounded-extreme')} />
        </View>
        <View style={tailwind('px-4 py-1 items-end')}>
          <Pressable onPress={triggerAreaFilter}>
            <Text
              fontSize={TextStringSizeEnum.md}
              style={tailwind('text-windowsBlue')}>
              關閉
            </Text>
          </Pressable>
        </View>
        <Text
          fontFamily={'NotoSansTC-Medium'}
          fontSize={TextStringSizeEnum.xl}
          style={tailwind('px-4 py-1')}>
          篩選區域
        </Text>
        <View style={tailwind('flex-1 p-4')}>
          <View style={tailwind('pb-4 border-b border-gray300')}>
            {['ALL', ...Object.keys(CountryEnum)].map(country => (
              <Radio
                key={country}
                value={country as CountryOfAreaFilter}
                label={CountryLabel[country as CountryOfAreaFilter]}
              />
            ))}
          </View>
          <ScrollView style={tailwind('pt-4 pb-2')} />
        </View>
        <Pressable onPress={() => Linking.openURL('tel://0900-289-518')}>
          <Text
            fontSize={TextStringSizeEnum.md}
            style={tailwind('p-4 text-[#616161]')}>
            篩選不到合適物件？撥打{' '}
            <Text
              fontSize={TextStringSizeEnum.md}
              style={tailwind('underline text-[#616161]')}>
              0900-289-518
            </Text>
            ，我們將提供高效專業的買代尋服務。
          </Text>
        </Pressable>
        <View style={tailwind('flex-row px-4 pt-2 border-t border-gray300')}>
          <View style={tailwind('flex-1')}>
            <Pressable>
              <Text
                fontFamily={'NotoSansTC-Medium'}
                fontSize={TextStringSizeEnum.base}
                style={tailwind('py-3 underline')}>
                重新設定
              </Text>
            </Pressable>
          </View>
          <Pressable
            style={tailwind('items-center justify-center flex-1 bg-black')}>
            <Text
              fontFamily={'NotoSansTC-Medium'}
              fontSize={TextStringSizeEnum.base}
              style={tailwind('text-white')}>
              查看 N 筆結果
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AreaFilter;

const Radio: React.FC<{
  value: CountryOfAreaFilter;
  label: string;
}> = ({label, value}) => {
  const tailwind = useTailwind();
  const {country, setCountry} = useHouseFilterContext();

  return (
    <Pressable
      style={tailwind('flex-row items-center justify-between py-4')}
      onPress={() => setCountry(value)}>
      <Text fontSize={TextStringSizeEnum.base}>{label}</Text>
      <View
        style={tailwind(
          'items-center justify-center w-5 h-5 border-[2px] rounded-extreme',
        )}>
        <ConditionalFragment condition={country === value}>
          <View
            style={tailwind(
              'w-[0.625rem] h-[0.625rem] rounded-extreme bg-black',
            )}
          />
        </ConditionalFragment>
      </View>
    </Pressable>
  );
};
