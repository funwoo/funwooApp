import React, {useCallback} from 'react';
import classNames from 'classnames';
import {Alert, Linking, Platform, Pressable, View} from 'react-native';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import Modal from 'react-native-modal';
import {useTailwind} from 'tailwind-rn';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Agent} from '../../../../swagger/funwoo.api';

const HousePhoneCallModal: React.FC<{
  show: boolean;
  triggerPhoneCallModal: () => void;
  agent: Agent | undefined | null;
}> = ({triggerPhoneCallModal, agent, show}) => {
  const tailwind = useTailwind();
  const {bottom} = useSafeAreaInsets();

  const onMakePhoneCallPress = useCallback(() => {
    const url = `${Platform.OS === 'ios' ? 'telprompt://' : 'tel://'}${
      agent?.contact_phone
    }`;
    Linking.canOpenURL(url)
      .then(res => {
        if (res) {
          Linking.openURL(url);
        }
      })
      .catch(err => {
        Alert.alert('發生錯誤', '請稍後再試');
        console.log(err);
      })
      .finally(triggerPhoneCallModal);
  }, [agent]);

  return (
    <Modal
      isVisible={show}
      onBackdropPress={triggerPhoneCallModal}
      style={tailwind(classNames('justify-end', 'm-0'))}>
      <View
        style={[tailwind('p-4 w-full bg-white'), {paddingBottom: bottom + 16}]}>
        <Text
          fontSize={TextStringSizeEnum['3xl']}
          fontFamily={'NotoSansTC-Medium'}
          style={tailwind('mb-4')}>
          撥給{agent?.chinese_name ?? agent?.english_name}
        </Text>
        <Pressable
          onPress={triggerPhoneCallModal}
          style={tailwind('w-full mb-4 py-3 border border-gray900')}>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-center')}>
            取消
          </Text>
        </Pressable>
        <Pressable
          onPress={onMakePhoneCallPress}
          style={tailwind('w-full py-3 bg-gray900')}>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-white text-center')}>
            確定
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default HousePhoneCallModal;
