import React from 'react';
import { useTailwind } from 'tailwind-rn';
import {
  Pressable,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  CountryOfAreaFilter,
  useHouseFilterContext,
} from '../../../../context/HouseFilterContext';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import { CountryEnum } from '../../../../swagger/funwoo.api';
import ConditionalFragment from '../../../../components/common/ConditionalFragment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FilterModal from './FilterModal';

export const CountryLabel: Record<CountryOfAreaFilter, string> = {
  TW: '台灣',
  US: '海外',
  ALL: '全部區域',
};

const AreaFilter = () => {
  const { triggerAreaFilter, showAreaFilter, citiesData, resetArea, country, onClose } =
    useHouseFilterContext();
  const tailwind = useTailwind();

  return (
    <FilterModal
      onClose={onClose}
      label={'篩選區域'}
      trigger={triggerAreaFilter}
      show={showAreaFilter}
      reset={resetArea}>
      <View style={tailwind('pb-4 border-b border-gray300')}>
        {['ALL', ...Object.keys(CountryEnum)].map(_country => (
          <Radio
            key={_country}
            value={_country as CountryOfAreaFilter}
            label={CountryLabel[_country as CountryOfAreaFilter]}
          />
        ))}
      </View>
      <ConditionalFragment condition={country === CountryEnum.TW}>
        <ScrollView style={tailwind('pt-4 pb-2 flex-1')}>
          <TouchableHighlight>
            <TouchableWithoutFeedback>
              <View>
                {citiesData.map(city => (
                  <Checkbox key={city} value={city} label={city} />
                ))}
              </View>
            </TouchableWithoutFeedback>
          </TouchableHighlight>
        </ScrollView>
      </ConditionalFragment>
    </FilterModal>
  );
};

export default AreaFilter;

const Radio: React.FC<{
  value: CountryOfAreaFilter;
  label: string;
}> = ({ label, value }) => {
  const tailwind = useTailwind();
  const { country, setCountry } = useHouseFilterContext();

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

const Checkbox: React.FC<{
  value: string;
  label: string;
}> = ({ label, value }) => {
  const tailwind = useTailwind();
  const { cities, setCities } = useHouseFilterContext();

  return (
    <Pressable
      style={tailwind('flex-row items-center justify-between py-4')}
      onPress={() => setCities(value)}>
      <Text fontSize={TextStringSizeEnum.base}>{label}</Text>
      <View
        style={tailwind(
          'items-center justify-center w-5 h-5 border-[2px] rounded-[4px]',
        )}>
        <ConditionalFragment condition={cities.includes(value)}>
          <View
            style={tailwind(
              'justify-center items-center bg-black w-full h-full',
            )}>
            <Icon name={'check'} style={tailwind('text-white')} />
          </View>
        </ConditionalFragment>
      </View>
    </Pressable>
  );
};
