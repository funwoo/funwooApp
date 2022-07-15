import React from 'react';
import {Pressable, SafeAreaView, View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import BaseIcon from '../common/icons/Icons/BaseIcon';
import {AppColors} from '../../constants';
import Text, {TextStringSizeEnum} from '../common/Text/BaseText';
import {useNavigation} from '@react-navigation/native';

const CommonHeader: React.FC<{title: string}> = ({title, children}) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tailwind('bg-white flex-1')}>
      <View style={tailwind('flex-row items-center justify-between w-full')}>
        <Pressable
          onPress={navigation.goBack}
          style={tailwind('w-12 h-12 items-center justify-center')}>
          <BaseIcon
            type={'Feather'}
            size={24}
            name={'arrow-left'}
            color={AppColors.gray900}
          />
        </Pressable>
        <Text
          fontFamily={'NotoSansTC-Medium'}
          fontSize={TextStringSizeEnum['3xl']}>
          {title}
        </Text>
        <View style={tailwind('w-12 h-12')} />
      </View>
      {children}
    </SafeAreaView>
  );
};

export default CommonHeader;
