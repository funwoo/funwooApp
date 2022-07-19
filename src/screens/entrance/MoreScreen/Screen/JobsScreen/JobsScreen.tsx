import React from 'react';
import CommonHeader from '../../../../../components/layout/CommonHeader';
import {Pressable, View} from 'react-native';
import {useAsync} from 'react-use';
import {swaggerHttpClient} from '../../../../../swagger';
import CacheImage from '../../../../../components/common/CacheImage';
import {useTailwind} from 'tailwind-rn';
import Text, {
  TextStringSizeEnum,
} from '../../../../../components/common/Text/BaseText';
import BaseIcon from '../../../../../components/common/icons/Icons/BaseIcon';
import classNames from 'classnames';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PageNames} from '../../../../../navigator/PageNames';

const Culture: Array<{
  image: {uri: string};
  title: string;
  content: string;
}> = [
  {
    image: {
      uri: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/icons/icons-entrepreneur.png',
    },
    title: '創業家精神',
    content:
      '我們支持每個夥伴成為獨立的創業家。好奇和行動驅使團隊，讓大家勇於嘗試新的解決方式。',
  },
  {
    image: {
      uri: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/icons/icons-puzzle.png',
    },
    title: '拼圖精神',
    content:
      '我們打造一個開放的溝通平台，讓不同專業背景的夥伴互相分享學習，激發創意，創造更全面價值。',
  },
  {
    image: {
      uri: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/icons/icons-diamond.png',
    },
    title: '匠人精神',
    content:
      '我們相信每位夥伴都有成功的潛質，透過精益求精，豐富專業知識，以提供最高服務品質。',
  },
];

const JobsScreen = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NavigationProp<EntranceRootStackParamsList>>();

  const {value: jobs = []} = useAsync(
    async () =>
      await swaggerHttpClient.jobApi.findAll().then(response => response.data),
    [],
  );
  return (
    <CommonHeader
      title={'房產顧問'}
      banner={{
        uri: 'https://cdn.funwoo.com.tw/assets/mobile/largeImages/hero-img-mobile/hero-careers-mobile.webp',
      }}
      bannerWording={'主導自己的未來'}>
      <View style={tailwind('py-8')}>
        <SectionTitle>品牌特色</SectionTitle>
        {Culture.map(({image, title, content}) => (
          <View key={title} style={tailwind('items-center px-8')}>
            <View style={tailwind('pt-12 pb-2')}>
              <CacheImage
                source={image}
                style={tailwind('w-[3.375rem] h-[3.375rem]')}
              />
            </View>
            <Text
              fontSize={TextStringSizeEnum['3xl']}
              fontFamily={'NotoSansTC-Medium'}
              style={tailwind('py-2 text-center')}>
              {title}
            </Text>
            <Text
              fontSize={TextStringSizeEnum.base}
              style={tailwind('text-gray700 text-center')}>
              {content}
            </Text>
          </View>
        ))}
      </View>
      <View style={tailwind('py-8 px-8 bg-gray50')}>
        <SectionTitle>探索你的下一步</SectionTitle>
        {jobs.map(job => (
          <Pressable
            onPress={() =>
              navigation.navigate(PageNames.job, {
                sid: job.sid,
              })
            }
            key={job.sid}
            style={tailwind(
              classNames(
                'px-4 py-3',
                'flex-row items-center justify-between',
                'border',
              ),
            )}>
            <Text fontSize={TextStringSizeEnum.base}>{job.title}</Text>
            <BaseIcon
              color={'#000000'}
              type={'Feather'}
              name={'arrow-right'}
              style={tailwind('flex justify-center items-center w-5 h-5')}
              size={20}
            />
          </Pressable>
        ))}
      </View>
    </CommonHeader>
  );
};

export default JobsScreen;

const SectionTitle: React.FC = ({children}) => {
  const tailwind = useTailwind();

  return (
    <Text
      fontSize={TextStringSizeEnum['4xl']}
      fontFamily={'NotoSansTC-Medium'}
      style={tailwind('py-8 text-center text-gray700')}>
      {children}
    </Text>
  );
};
