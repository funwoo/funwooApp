import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {
  Pressable,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useHouseFilterContext} from '../../../../context/HouseFilterContext';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import ConditionalFragment from '../../../../components/common/ConditionalFragment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FilterModal from './FilterModal';

const BuildingTypeFilter = () => {
  const {
    triggerBuildingTypeFilter,
    showBuildingTypeFilter,
    resetBuildingType,
    buildingTypesData,
  } = useHouseFilterContext();
  const tailwind = useTailwind();

  return (
    <FilterModal
      label={'篩選類型'}
      trigger={triggerBuildingTypeFilter}
      show={showBuildingTypeFilter}
      reset={resetBuildingType}>
      <ScrollView style={tailwind('pt-4 pb-2 flex-1')}>
        <TouchableHighlight>
          <TouchableWithoutFeedback>
            <View>
              {buildingTypesData.map(city => (
                <Checkbox key={city} value={city} label={city} />
              ))}
            </View>
          </TouchableWithoutFeedback>
        </TouchableHighlight>
      </ScrollView>
    </FilterModal>
  );
};

export default BuildingTypeFilter;

const Checkbox: React.FC<{
  value: string;
  label: string;
}> = ({label, value}) => {
  const tailwind = useTailwind();
  const {buildingType, setBuildingType} = useHouseFilterContext();

  return (
    <Pressable
      style={tailwind('flex-row items-center justify-between py-4')}
      onPress={() => setBuildingType(value)}>
      <Text fontSize={TextStringSizeEnum.base}>{label}</Text>
      <View
        style={tailwind(
          'items-center justify-center w-5 h-5 border-[2px] rounded-[4px]',
        )}>
        <ConditionalFragment condition={buildingType.includes(value)}>
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
