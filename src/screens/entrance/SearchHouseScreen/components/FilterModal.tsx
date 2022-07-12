import classNames from 'classnames';
import {Linking, Pressable, View} from 'react-native';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import Modal from 'react-native-modal';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDimensions} from '@react-native-community/hooks';
import {useHouseFilterContext} from '../../../../context/HouseFilterContext';

interface Props {
  trigger: () => void;
  show: boolean;
  reset: () => void;
  label: string;
}

const FilterModal: React.FC<Props> = ({
  children,
  trigger,
  show,
  reset,
  label,
}) => {
  const tailwind = useTailwind();
  const {bottom} = useSafeAreaInsets();
  const {width, height} = useDimensions().window;
  const {totalCount, search} = useHouseFilterContext();

  return (
    <Modal
      onSwipeComplete={trigger}
      swipeDirection={['down']}
      swipeThreshold={height * 0.6}
      propagateSwipe={true}
      isVisible={show}
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
          <Pressable onPress={trigger}>
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
          {label}
        </Text>
        <View style={tailwind('flex-1 p-4')}>{children}</View>
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
            <Pressable onPress={reset}>
              <Text
                fontFamily={'NotoSansTC-Medium'}
                fontSize={TextStringSizeEnum.base}
                style={tailwind('py-3 underline')}>
                重新設定
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => search()}
            style={tailwind('items-center justify-center flex-1 bg-black')}>
            <Text
              fontFamily={'NotoSansTC-Medium'}
              fontSize={TextStringSizeEnum.base}
              style={tailwind('text-white')}>
              查看 {totalCount} 筆結果
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
