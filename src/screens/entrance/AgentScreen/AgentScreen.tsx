import React, {useCallback, useState} from 'react';
import CommonHeader from '../../../components/layout/CommonHeader';
import {Linking, Pressable, View} from 'react-native';
import {useAsync} from 'react-use';
import {swaggerHttpClient} from '../../../swagger';
import {useTailwind} from 'tailwind-rn';
import {RouteProp, useRoute} from '@react-navigation/native';
import openShare from '../../../lib/Share';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BaseIcon from '../../../components/common/icons/Icons/BaseIcon';
import CacheImage from '../../../components/common/CacheImage';
import {ImageProvider} from '../../../assets';
import HousePhoneCallModal from '../../../components/feature/HousePhoneCallModal';

const AgentScreen = () => {
  const [showPhoneCallModal, setShowPhoneCallModal] = useState<boolean>(false);
  const tailwind = useTailwind();
  const route = useRoute<RouteProp<EntranceRootStackParamsList, 'agent'>>();
  const {bottom} = useSafeAreaInsets();

  const {value: agent} = useAsync(
    async () =>
      await swaggerHttpClient.agentApi
        .findOne(route.params.sid)
        .then(response => response.data),
    [route.params.sid],
  );

  const triggerPhoneCallModal = useCallback(
    () => setShowPhoneCallModal(prev => !prev),
    [],
  );

  if (!agent) {
    return null;
  }

  const {
    chinese_name,
    english_name,
    sid,
    pictures,
    license,
    contact_phone,
    email,
    bio,
    contact_line,
  } = agent;

  return (
    <React.Fragment>
      <HousePhoneCallModal
        show={showPhoneCallModal}
        triggerPhoneCallModal={triggerPhoneCallModal}
        agent={agent}
      />
      <CommonHeader
        title={chinese_name ?? english_name ?? ''}
        headerRight={
          <Pressable
            onPress={() =>
              openShare(
                `https://funwoo.com.tw/agent/${sid}`,
                '',
                `認識FUNWOO 房產顧問！『${chinese_name ?? english_name}』`,
              )
            }
            style={tailwind('items-center justify-center w-12 h-12')}>
            <EntypoIcon size={20} name={'share'} />
          </Pressable>
        }
        banner={{uri: pictures?.[0] ?? ''}}
        bannerAspectRatio={1 / 1}>
        <View style={tailwind('p-4')}>
          <Text
            fontSize={TextStringSizeEnum['4xl']}
            fontFamily={'NotoSansTC-Medium'}
            style={tailwind('pb-1.5')}>
            {chinese_name ?? english_name}
          </Text>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('pb-1.5 text-gray700')}>
            {license}
          </Text>
          <Text fontSize={TextStringSizeEnum.base} style={tailwind('pb-1.5')}>
            {contact_phone}
          </Text>
          <Text fontSize={TextStringSizeEnum.base} style={tailwind('pb-2.5')}>
            {email}
          </Text>
        </View>
        <View style={tailwind('p-4')}>
          <Text
            fontSize={TextStringSizeEnum.xl}
            fontFamily={'NotoSansTC-Medium'}
            style={tailwind('mb-2')}>
            關於
          </Text>
          <Text fontSize={TextStringSizeEnum.base}>{bio}</Text>
        </View>
        <View style={tailwind('h-16')} />
      </CommonHeader>
      <View style={[tailwind('absolute flex-row px-4 w-full z-50'), {bottom}]}>
        <Pressable
          onPress={triggerPhoneCallModal}
          style={tailwind(
            'flex-1 flex-row items-center justify-center mr-4 py-3 bg-gray900',
          )}>
          <BaseIcon
            size={20}
            color={'#FFF'}
            name={'phone'}
            type={'FontAwesome'}
            style={tailwind('mr-2')}
          />
          <Text
            fontSize={TextStringSizeEnum.base}
            fontFamily={'NotoSansTC-Medium'}
            style={tailwind('text-white')}>
            來電諮詢
          </Text>
        </Pressable>
        <Pressable
          style={tailwind(
            'flex-1 flex-row items-center justify-center py-3 bg-gray900',
          )}
          onPress={() => {
            Linking.openURL(`${contact_line}`);
          }}>
          <CacheImage
            style={[{width: 22, height: 22}, tailwind('mr-2')]}
            source={ImageProvider.lineIconWhite}
          />
          <Text
            fontSize={TextStringSizeEnum.base}
            fontFamily={'NotoSansTC-Medium'}
            style={tailwind('text-white')}>
            加Line 聯絡
          </Text>
        </Pressable>
      </View>
    </React.Fragment>
  );
};

export default AgentScreen;
