import {Image, Pressable, View} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import {Agent} from '../../../../swagger/funwoo.api';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PageNames} from '../../../../navigator/PageNames';

const HouseAgentSection: React.FC<{agent: Agent | null | undefined}> = ({
  agent,
}) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NavigationProp<EntranceRootStackParamsList>>();

  return (
    <View style={tailwind('py-8 px-4')}>
      <Text
        fontSize={TextStringSizeEnum.xl}
        fontFamily={'NotoSansTC-Medium'}
        style={tailwind('py-2')}>
        房產顧問
      </Text>
      <View style={tailwind('py-4 flex-row items-center')}>
        <Image
          source={{uri: agent?.pictures?.[0] ?? ''}}
          style={tailwind('mr-3 w-[5.625rem] h-[5.625rem] rounded-extreme')}
        />
        <View style={tailwind('flex-1')}>
          <Text
            fontSize={TextStringSizeEnum.base}
            fontFamily={'NotoSansTC-Medium'}
            style={tailwind('mb-1')}>
            {agent?.chinese_name || agent?.english_name}
          </Text>
          <Text fontSize={TextStringSizeEnum.base}>房產顧問</Text>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate(PageNames.agent, {
              sid: agent?.sid!,
            })
          }
          style={tailwind('px-3 py-1 border border-gray900')}>
          <Text
            fontSize={TextStringSizeEnum.base}
            fontFamily={'NotoSansTC-Medium'}>
            瞭解更多
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HouseAgentSection;
