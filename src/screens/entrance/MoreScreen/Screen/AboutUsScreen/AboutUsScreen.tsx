import React, {useCallback, useEffect, useState} from 'react';
import CommonHeader from '../../../../../components/layout/CommonHeader';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  UIManager,
  View,
} from 'react-native';
import CacheImage from '../../../../../components/common/CacheImage';
import {ImageProvider} from '../../../../../assets';
import {useTailwind} from 'tailwind-rn';
import Text, {
  TextStringSizeEnum,
} from '../../../../../components/common/Text/BaseText';
import BaseIcon from '../../../../../components/common/icons/Icons/BaseIcon';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AppColors} from '../../../../../constants';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MoreStackPageName} from '../../../../../navigator/PageNames';

const Features: Array<{
  image: {uri: string};
  title: string;
  content: string;
}> = [
  {
    image: ImageProvider.icons_vp_tech,
    title: '智能科技',
    content: '工程師與房產分析師整合資訊\n讓客人一手掌握最新市場數據',
  },
  {
    image: ImageProvider.icons_vp_mkting,
    title: '創新行銷',
    content: '行銷策略專家打造精準的數位廣吿\n讓賣家物件觸及到更多適合的買家',
  },
  {
    image: ImageProvider.icons_vp_agents,
    title: '專業房產顧問',
    content: '運用豐沛平台資源及專業洞察\n依客戶需求提供更高效的服務',
  },
  {
    image: ImageProvider.icons_vp_design,
    title: '美感生活',
    content: '專業設計師提升物件美感體驗\n讓客人更能深刻感受生活美好',
  },
];

const FounderProfile = [
  {
    idx: 1,
    imageURL:
      'https://cdn.funwoo.com.tw/assets/founders/Founder%20Headshot-Nancy-square.png',
    name: '曾意婷 Nancy',
    position: '執行長 CEO',
    key: 'Nancy',
  },
  {
    idx: 2,
    imageURL:
      'https://cdn.funwoo.com.tw/assets/founders/Founder%20Headshot-Julia-square.png',
    name: '鄭明瑜 Julia',
    position: '策略長 CSO',
    key: 'Julia',
  },
  {
    idx: 3,
    imageURL:
      'https://cdn.funwoo.com.tw/assets/founders/Founder%20Headshot-Oliver-square.png',
    name: '蘇奧然 Oliver',
    position: '產品長 CPO',
    key: 'Oliver',
  },
  {
    idx: 4,
    imageURL:
      'https://cdn.funwoo.com.tw/assets/founders/Founder%20Headshot-Huge-square.png',
    name: '黃士旗 ShihChi',
    position: '技術長 CTO',
    key: 'ShihChi',
  },
];

const AboutUsScreen = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [didExpanded, setDidExpanded] = useState<boolean>(false);

  const tailwind = useTailwind();
  const animation = useSharedValue(180);
  const navigation = useNavigation<NavigationProp<MoreScreenParamsList>>();

  const rotation = useDerivedValue(() => {
    return interpolate(animation.value, [0, 360], [0, 360]);
  });

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  useEffect(() => {
    if (didExpanded) {
      animation.value = withTiming(180, {
        duration: 300,
      });
    } else {
      animation.value = withTiming(
        360,
        {
          duration: 300,
        },
        () => {
          animation.value = 0;
        },
      );
    }
  }, [didExpanded]);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const expand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, () => {
      setDidExpanded(prev => !prev);
    });
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <CommonHeader title={'關於我們'} banner={ImageProvider.heroImageAboutUs}>
      <View style={tailwind('py-8 px-4')}>
        <Text
          fontSize={TextStringSizeEnum['3xl']}
          style={tailwind('mb-8 text-center text-brandGold')}>
          FUNWOO 為房產科技公司，旨於透過科技解決房產問問題，簡化房產交易流程，
          成就你的理想生活。
        </Text>
        <SectionTitle>成立故事</SectionTitle>
        <Text
          numberOfLines={isExpanded ? undefined : 8}
          fontSize={TextStringSizeEnum.base}
          style={tailwind('mb-4 text-gray700')}>
          2021 年誕生的
          FUNWOO，將美國新穎行銷模式帶回台灣，以人性化的數位平台，集結眾多領域優秀人才，透過智能科技與創新行銷模式，呈現完整的房產資訊，成就客戶對生活的理想模樣。
          {'\n'}
          {'\n'}
          FUNWOO
          創辦核心團隊為執行長曾意婷、產品長蘇奧然、策略長鄭明瑜、技術長黃士旗。
          創辦人擁有中、台、美等地豐富的房產經驗，整合核心團隊的頂尖行銷、美學及科技長才，
          構建出擁有國際視野的質感平台，導入嶄新的整屋與服務觀點，擴大影響台灣傳統房屋的
          交易生態。FUNWOO
          招募具數字分析能力的各領域人才，透過科技解決房產問題，透明化
          房產交易過程，並給予房產顧問應得收入，藉此交織出更深層的影響網絡，為台灣房產市場
          帶來不同的交易模式，朝眾人的最大價值而努力、佈局未來。
          {'\n'}
          {'\n'}
          FUNWOO
          與傳統房仲的最大差異，是無縫整合了線上與線下服務，節省目前房仲業實體店面的各項成本。就像
          NETFLIX 最後市佔勝過 BLOCKBUSTER， AMAZON 取代 SEARS，美國科技房產公司
          COMPASS 短短幾年成為龍頭，藉由科技提供服務已是世界潮流趨勢。APP
          是當前數位行銷必備工具，在強大科技團隊協助下，FUNWOO 的 APP 在 1
          個月就通過 APPLE 及 ANDROID
          平台審核，展現團隊強大實力；平台的「估價模式」可以主動進行分析預測，依照不同買方的行為模式，主動推薦最適合的物件。
          {'\n'}
          {'\n'}
          席捲全球的大疫情改變產業面貌，FUNWOO
          適合疫情嚴峻的時刻，房產顧問在家工作，就能將物件資訊透過 FUNWOO
          平台發送給有興趣的買家，房產顧問及客戶都能安全防疫，
          買家也可在看物件前了解與研究。
          {'\n'}
          {'\n'}
          「第一印象的建立，在於初次見面的7秒鐘。」 FUNWOO 還會以過去台灣少見的
          OPEN HOUSE 模式，並為現場進行最適合的擺設佈置，讓買家一開門就能發出
          WOW~ 的驚嘆聲，
          同時透過專業攝影，為網路行銷提供高品質素材，買家不再需要憑空發揮想像力，能夠直接
          看見未來家居生活的美好模樣。
          {'\n'}
          {'\n'}
          曾經對走入房仲店面感到壓力嗎？我們堅信房屋交易的程序能是愉快且有效率的。
          如果你是賣家，讓我們來自各個領域的菁英幫你規劃最有利的賣房策略，
          如果你是買家，讓我們最先進的大數據與人工智慧幫你找到最適宜的房子，FUNWOO
          誠信與親切的服務將是你最能信賴的房產交易經紀公司。每一個房屋顧問都是我們的企業夥伴，
          FUNWOO
          作為創新的房產平台，樂見所有出色的房產從業人員加入我們的行列，成功經營自己的理想！我們正在一步步地改變房產交易的繁瑣過程，並希望以此連接成緊密的信任關係。
        </Text>
        <Pressable
          onPress={expand}
          style={tailwind('flex-row items-center justify-center')}>
          <Text
            fontSize={TextStringSizeEnum.base}
            fontFamily={'NotoSansTC-Medium'}
            style={tailwind('text-origin')}>
            閱讀完整故事
          </Text>
          <Animated.View style={animationStyle}>
            <BaseIcon
              type={'FontAwesome5'}
              size={14}
              name={'chevron-down'}
              color={AppColors.brand}
              style={tailwind('w-6 h-6 ml-2')}
            />
          </Animated.View>
        </Pressable>
      </View>
      <View style={tailwind('py-8 bg-gray50')}>
        <SectionTitle>品牌特色</SectionTitle>
        {Features.map(({image, title, content}) => (
          <View key={title} style={tailwind('items-center')}>
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
      <View style={tailwind('py-8')}>
        <SectionTitle>創辦人</SectionTitle>
        <View style={tailwind('px-20')}>
          {FounderProfile.map(
            ({key, imageURL, name, position}, index, array) => (
              <Pressable
                onPress={() =>
                  navigation.navigate(MoreStackPageName.aboutFounder, {
                    key,
                  })
                }
                key={key}
                style={[
                  tailwind(
                    'items-center border border-gray300 overflow-hidden',
                  ),
                  {
                    marginBottom: index !== array.length - 1 ? 32 : 0,
                  },
                ]}>
                <CacheImage
                  source={{uri: imageURL}}
                  style={tailwind('w-[15.875rem] h-[15.875rem]')}
                />
                <View style={tailwind('p-4 w-full')}>
                  <Text
                    fontSize={TextStringSizeEnum['3xl']}
                    style={tailwind('mb-2')}>
                    {name}
                  </Text>
                  <Text
                    fontSize={TextStringSizeEnum.base}
                    style={tailwind('text-gray700')}>
                    {position}
                  </Text>
                </View>
              </Pressable>
            ),
          )}
        </View>
      </View>
    </CommonHeader>
  );
};

export default AboutUsScreen;

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
