import React from 'react';
import CommonHeader from '../../../../../components/layout/CommonHeader';
import {useTailwind} from 'tailwind-rn';
import {ImageProvider} from '../../../../../assets';
import {Pressable, StyleProp, View, ViewStyle} from 'react-native';
import Text, {
  TextStringSizeEnum,
} from '../../../../../components/common/Text/BaseText';
import BaseIcon from '../../../../../components/common/icons/Icons/BaseIcon';
import Animated from 'react-native-reanimated';
import useExpandAnimation from '../../../../../hooks/useExpandAnimation';
import ConditionalFragment from '../../../../../components/common/ConditionalFragment';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MoreStackPageName} from '../../../../../navigator/PageNames';

const Description = [
  {
    title: '買屋 / 租屋',
    detail:
      '想了解返台海外家庭租屋建議？或買屋規劃？ FUNWOO 由來自美國 Top1% 華盛頓州房產顧問所創辦的台灣頂尖團隊，為你提供台灣房屋市場分析。',
  },
  {
    title: '房屋貸款',
    detail:
      '在台灣沒有收入證明，但有海外所得可以辦理台灣的房貸嗎？ FUNWOO 合作的資深房貸顧問，依照你的條件給予建議。',
  },
  {
    title: '學區選擇',
    detail:
      '如何為返台學子申請適合的學校？該如何準備文件及面試？又該如何接受中文的挑戰？合作的專業教育顧問提供的第一手就學情資。',
  },
  {
    title: '稅費諮詢',
    detail:
      '台灣購屋稅費和海外有什麼不一樣？我們合作的稅務顧問擁有台灣會計師執照及多年國內海外稅費經驗，為你詳細說明相關問題。',
  },
];

const OverseaScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<MoreScreenParamsList>>();

  return (
    <React.Fragment>
      <CommonHeader
        title={'海歸專案'}
        banner={ImageProvider.campaignBackground}>
        <View style={tailwind('px-4 pt-8')}>
          <Text
            fontSize={TextStringSizeEnum['3xl']}
            style={tailwind('py-3 text-gold text-center')}>
            讓 FUNWOO
            專業團隊協助你一起解決回台子女就學、申請房貸和買屋租屋等問題
          </Text>
          <View style={tailwind('pt-3 pb-16')}>
            {Description.map(({title, detail}) => (
              <View key={title} style={tailwind('pt-7 pb-4')}>
                <Text
                  fontSize={TextStringSizeEnum['3xl']}
                  fontFamily={'NotoSansTC-Medium'}
                  style={tailwind('py-3 text-center')}>
                  {title}
                </Text>
                <Text
                  fontSize={TextStringSizeEnum.base}
                  style={tailwind('text-gray700 text-center')}>
                  {detail}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={tailwind('py-16 px-4 bg-gray50')}>
          <Text
            fontSize={TextStringSizeEnum['4xl']}
            fontFamily={'NotoSansTC-Medium'}
            style={tailwind('mb-8 py-3 text-center')}>
            常見問題
          </Text>
          <Question
            question={'因疫情考量，可以（海外）網路看房嗎？'}
            style={tailwind('mb-4')}>
            {
              '可以！目前我們多半服務海外即將歸台或正在隔離的客戶。專業房產顧問推出線上帶看房的體驗，讓你不需要親聆現場，也能清楚了解房屋狀況。'
            }
          </Question>
          <Question
            question={'FUNWOO 和其他房仲差異？'}
            style={tailwind('mb-4')}>
            {
              "'值得信任的專業度：團隊非常了解台灣法規規定，且謹慎為客戶處理每個交易細節。\\n\\n開心的體驗：我們的宗旨是幫助客人找到滿意的房屋，更注重每個顧客的需求，希望結合科技、設計和專業房產顧問團隊，創造賓至如歸的房地產交易過程。\\n\\n節省時間：我們尊重每個顧客的時間，避免不必要的買賣交易流程，讓你把時間留給更重要的家人、朋友和自己。'"
            }
          </Question>
          <Question question={'如何在台灣順利取得房屋貸款？'}>
            {
              '資深房貸顧問建議，首要提供海外薪資所得及報稅文件供銀行審查，後續再選擇合適自己的房貸產品。\n\n房貸產品百百種，想知道哪種最適合自己？'
            }
          </Question>
        </View>
        <View style={tailwind('h-12')} />
      </CommonHeader>
      <View style={[tailwind('absolute bottom-0 p-4 w-full')]}>
        <Pressable
          onPress={() => navigation.navigate(MoreStackPageName.contactUs)}
          style={tailwind(
            'flex-row items-center justify-center bg-gray900 w-full py-3',
          )}>
          <BaseIcon
            type={'FontAwesome'}
            size={16}
            name={'send'}
            color={'#FFFFFF'}
            style={[tailwind('mr-2')]}
          />
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-white')}>
            訊息聯絡我們
          </Text>
        </Pressable>
      </View>
    </React.Fragment>
  );
};

export default OverseaScreen;

const Question: React.FC<{question: string; style?: StyleProp<ViewStyle>}> = ({
  question,
  style,
  children,
}) => {
  const tailwind = useTailwind();
  const {animationStyle, isExpanded, expand} = useExpandAnimation();

  return (
    <Pressable onPress={expand} style={[tailwind('px-3 py-4 border'), style]}>
      <View style={tailwind('flex-row items-start justify-between')}>
        <Text fontSize={TextStringSizeEnum.base}>{question}</Text>
        <Animated.View style={[animationStyle, tailwind('ml-2')]}>
          <BaseIcon
            type={'FontAwesome5'}
            size={16}
            name={'chevron-down'}
            color={'#212121'}
            style={[tailwind('w-6 h-6')]}
          />
        </Animated.View>
      </View>
      <ConditionalFragment condition={isExpanded}>
        <Text
          fontSize={TextStringSizeEnum.base}
          style={tailwind('mt-2 text-gray800')}>
          {children}
        </Text>
      </ConditionalFragment>
    </Pressable>
  );
};
