import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {ListingDetail} from '../../../../swagger/funwoo.api';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import {useTailwind} from 'tailwind-rn';
import {formatter} from '../../../../utils';
import BaseIcon from '../../../../components/common/icons/Icons/BaseIcon';
import {TextInput} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';

const PAY_UNIT = 1;

export const HouseLoan: React.FC<ListingDetail> = ({price}) => {
  const [downPayment, setDownPayment] = useState<string>(
    `${(price ?? 0) * PAY_UNIT * 0.2}`,
  );
  const [percent, setPercent] = useState<string>('20');

  const tailwind = useTailwind();

  const monthFee = useMemo(() => {
    if (isNaN(parseInt(downPayment, 10))) {
      return '0';
    }
    const _downPayment = parseInt(downPayment, 10);
    const remainingValue = (price ?? 0) * PAY_UNIT - _downPayment;
    const i = 0.0135 / 12;
    const n = 30 * 12;

    const payment =
      remainingValue * ((i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1));

    return payment.toFixed(2);
  }, [downPayment]);

  return (
    <View style={tailwind('py-8 px-4')}>
      <Text
        fontSize={TextStringSizeEnum.xl}
        fontFamily={'NotoSansTC-Medium'}
        style={tailwind('py-2')}>
        房貸試算
      </Text>
      <Text fontSize={TextStringSizeEnum.base} style={tailwind('mb-4')}>
        寬限期後每月償還本息
      </Text>
      <Text
        fontSize={TextStringSizeEnum.base}
        fontFamily={'NotoSansTC-Medium'}
        style={tailwind('mb-4')}>
        ${formatter.format(parseFloat(monthFee))} 元 / 月
      </Text>
      <Text fontSize={TextStringSizeEnum.base} style={tailwind('mb-4')}>
        30 年貸款總年限，1.3% 銀行利率（參考利率）
      </Text>
      <View style={tailwind('flex-row items-center mb-4')}>
        <Text fontSize={TextStringSizeEnum.base} style={tailwind('pr-3 mr-4')}>
          頭期款
        </Text>
        <View
          style={tailwind(
            'flex-row flex-1 items-center border border-gray700',
          )}>
          <View
            style={tailwind(
              'py-2.5 px-3 flex-1 flex-row items-center border-r border-gray700',
            )}>
            <BaseIcon
              style={tailwind('mr-1')}
              type="FontAwesome5"
              name="dollar-sign"
              size={14}
              color={'#616161'}
            />

            <TextInput
              defaultValue={downPayment}
              value={downPayment}
              autoComplete="cc-number"
              onChangeText={text => {
                const value = isNaN(parseInt(text)) ? 0 : parseInt(text);
                setDownPayment(`${value}`);
                setPercent(
                  `${Math.floor((value / ((price ?? 0) * PAY_UNIT)) * 100)}`,
                );
                // getMonthFee(text);
              }}
              style={tailwind('text-gray700 text-[1rem]')}
              keyboardType="numeric"
            />
          </View>
          <View
            style={tailwind('py-2.5 px-3 flex-row flex-[0.3] items-center')}>
            <TextInput
              style={tailwind('mr-1 text-gray700 text-[1rem]')}
              value={percent}
              autoComplete="cc-number"
              keyboardType="numeric"
              onChangeText={text => {
                const value = isNaN(parseInt(text)) ? 0 : parseInt(text);
                setDownPayment(`${(value * (price ?? 0) * PAY_UNIT) / 100}`);
                setPercent(`${value}`);
              }}
            />
            <BaseIcon
              type="FontAwesome5"
              name="percent"
              size={12}
              color={'#616161'}
            />
          </View>
        </View>
      </View>
      <Slider
        value={parseInt(percent) / 100}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={'#000000'}
        maximumTrackTintColor={'#000000'}
        thumbTintColor={'#aaa'}
        onValueChange={value => {
          setDownPayment((value * (price ?? 0) * PAY_UNIT).toFixed(0));
          setPercent((value * 100).toFixed(0));
        }}
      />
    </View>
  );
};

export default HouseLoan;
