import React, {useCallback} from 'react';
import CommonHeader from '../../../../../components/layout/CommonHeader';
import {Pressable, ScrollView, View} from 'react-native';
import {ImageProvider} from '../../../../../assets';
import {useAsync} from 'react-use';
import {swaggerHttpClient} from '../../../../../swagger';
import {Agent} from '../../../../../swagger/funwoo.api';
import CacheImage from '../../../../../components/common/CacheImage';
import {useTailwind} from 'tailwind-rn';
import Text, {
  TextStringSizeEnum,
} from '../../../../../components/common/Text/BaseText';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PageNames} from '../../../../../navigator/PageNames';
import BaseIcon from '../../../../../components/common/icons/Icons/BaseIcon';
import {AppColors} from '../../../../../constants';
import classNames from 'classnames';
import {makePhoneCall} from '../../../../../utils';

const AgentsScreen = () => {
  const tailwind = useTailwind();

  const {value: agents = []} = useAsync(
    async () =>
      await swaggerHttpClient.agentApi
        .findAll()
        .then(response => response.data),
    [],
  );
  return (
    <CommonHeader
      title={'房產顧問'}
      banner={ImageProvider.heroSales}
      bannerWording={'選擇適合你的顧問'}>
      <ScrollView />
      <View style={tailwind('pt-8 px-4')}>
        {agents.map(agent => (
          <AgentCard key={agent.sid} {...agent} />
        ))}
      </View>
    </CommonHeader>
  );
};

export default AgentsScreen;

const AgentCard: React.FC<Agent> = ({
  pictures,
  chinese_name,
  english_name,
  contact_phone,
  license,
  bio,
  sid,
}) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NavigationProp<EntranceRootStackParamsList>>();

  const onMakePhoneCallPress = useCallback(() => {
    makePhoneCall(contact_phone!);
  }, [contact_phone]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(PageNames.agent, {
          sid,
        })
      }
      style={tailwind('mb-8 border border-gray300')}>
      <View style={tailwind('z-10')}>
        <CacheImage
          source={{uri: pictures?.[0] ?? ''}}
          style={[
            tailwind('w-full'),
            {
              aspectRatio: 382 / 286.5,
            },
          ]}
        />
        <Pressable onPress={onMakePhoneCallPress}>
          <View
            style={[
              tailwind(
                classNames(
                  'absolute right-4 -bottom-7',
                  'z-10 w-14 h-14',
                  'items-center justify-center rounded-extreme',
                ),
              ),
              {
                backgroundColor: AppColors.white,
                shadowColor: AppColors.gray500,
                shadowOffset: {
                  width: 4,
                  height: 4,
                },
                shadowRadius: 6,
                shadowOpacity: 0.2,
              },
            ]}>
            <BaseIcon type={'FontAwesome'} size={20} name={'phone'} />
          </View>
        </Pressable>
      </View>
      <View style={tailwind('px-4 py-8')}>
        <Text
          fontSize={TextStringSizeEnum['3xl']}
          fontFamily={'NotoSansTC-Medium'}
          style={tailwind('mb-2')}>
          {chinese_name ?? english_name}
        </Text>
        <View
          style={tailwind('flex-row items-center mb-2 w-full overflow-hidden')}>
          <Text fontSize={TextStringSizeEnum.base} numberOfLines={1}>
            {contact_phone}
          </Text>
          <View
            style={[
              tailwind('items-center justify-center mx-2 h-4'),
              {backgroundColor: 'red'},
            ]}>
            <View style={tailwind('w-px h-4 bg-gray900')} />
          </View>
          <Text
            fontSize={TextStringSizeEnum.base}
            numberOfLines={1}
            style={tailwind('flex-1')}>
            {license}
          </Text>
        </View>
        <Text
          fontSize={TextStringSizeEnum.base}
          style={tailwind('text-gray700')}
          numberOfLines={3}>
          {bio}
        </Text>
        <Text
          fontSize={TextStringSizeEnum.base}
          style={tailwind('text-gray700 underline')}>
          瞭解更多
        </Text>
      </View>
    </Pressable>
  );
};
