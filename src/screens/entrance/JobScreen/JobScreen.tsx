import React from 'react';
import CommonHeader from '../../../components/layout/CommonHeader';
import {Pressable, View} from 'react-native';
import {useAsync} from 'react-use';
import {swaggerHttpClient} from '../../../swagger';
import {useTailwind} from 'tailwind-rn';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import openShare from '../../../lib/Share';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import {MoreStackPageName, PageNames} from '../../../navigator/PageNames';

const JobScreen = () => {
  const tailwind = useTailwind();
  const route = useRoute<RouteProp<EntranceRootStackParamsList, 'agent'>>();
  const navigation =
    useNavigation<NavigationProp<EntranceRootStackParamsList>>();

  const {value: job} = useAsync(
    async () =>
      await swaggerHttpClient.jobApi
        .findOne(route.params.sid)
        .then(response => response.data),
    [route.params.sid],
  );

  if (!job) {
    return null;
  }

  const {sid, title, city, jd, qualification, offer} = job;

  return (
    <CommonHeader
      title={title ?? ''}
      headerRight={
        <Pressable
          onPress={() =>
            openShare(
              `https://funwoo.com.tw/jobs/${sid}`,
              '',
              `加入FUNWOO！『${title}』`,
            )
          }
          style={tailwind('items-center justify-center w-12 h-12')}>
          <EntypoIcon size={20} name={'share'} />
        </Pressable>
      }>
      <Section head={'需求人數'}>{city}</Section>
      <Section head={'職務內容'}>{jd}</Section>
      <Section head={'職務條件'}>{qualification}</Section>
      <Section head={'我們提供'}>{offer}</Section>
      <Section head={'應徵方式'}>
        {
          '請 email 相關履歷資料至下方電子信箱，條件合適者將以E-mail或電話通知並安排面試時間。聯絡方式：\n• career@funwoo.com.tw'
        }
      </Section>
      <View style={tailwind('mt-8 py-8 px-4 bg-gray50')}>
        <Head>關於團隊</Head>
        <Text fontSize={TextStringSizeEnum.base} style={tailwind('mb-4')}>
          我們相信，理智與感性的碰撞，將會引出絢麗火花。人性化的數位科技平台將空間與科技做為基石，集結眾多領域的優秀人才，一同成就客戶對於現代生活的美好模樣。
          FUNWOO
          以人本為樞紐，將熱情與理想向外廣拓，期待以此交織出更深層的影響網絡，朝眾人的最大價值而努力、佈局未來。
        </Text>
        <Pressable
          onPress={() =>
            navigation.navigate(PageNames.more, {
              screen: MoreStackPageName.jobs,
            })
          }>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-brand underline')}>
            查看公司文化
          </Text>
        </Pressable>
      </View>
    </CommonHeader>
  );
};

export default JobScreen;

const Head: React.FC = ({children}) => {
  const tailwind = useTailwind();
  return (
    <Text
      fontSize={TextStringSizeEnum['3xl']}
      style={tailwind('mb-4 font-semibold')}>
      {children}
    </Text>
  );
};

const Section: React.FC<{head: string}> = ({head, children}) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('p-4')}>
      <Head>{head}</Head>
      <Text fontSize={TextStringSizeEnum.base}>{children}</Text>
    </View>
  );
};
