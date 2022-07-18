import {Image, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Platform, SectionList, View} from 'react-native';
import {ListItem} from './components/ListItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../../../assets/colors/AppColors';
import React from 'react';
import {MoreStackPageName, PageNames} from '../../../navigator/PageNames';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import AnimationFunwooHeader from '../../../components/layout/AnimationFunwooHeader';
import {useTailwind} from 'tailwind-rn';

interface Section {
  title: string;
  data: Array<Item>;
}

interface Item {
  title: string;
  screen: keyof MoreScreenParamsList | keyof EntranceRootStackParamsList;
}

const items: Array<Section> = [
  {
    title: '關於團隊',
    data: [
      {
        title: '公司簡介',
        screen: MoreStackPageName.aboutUs,
      },
      {
        title: '房產顧問',
        screen: MoreStackPageName.agents,
      },
      {
        title: '工作機會',
        screen: MoreStackPageName.jobs,
      },
      {
        title: '聯絡我們',
        screen: MoreStackPageName.contactUs,
      },
    ],
  },
  {
    title: '專屬活動',
    data: [
      {
        title: '海歸專案',
        screen: MoreStackPageName.overseas,
      },
      {
        title: '登入',
        screen: PageNames.signIn,
      },
    ],
  },
  {
    title: '法律',
    data: [
      {
        title: '服務條款',
        screen: MoreStackPageName.serviceTerms,
      },
      {
        title: '隱私權政策',
        screen: MoreStackPageName.privatePolicy,
      },
      {
        title: 'Cookie使用者條款',
        screen: MoreStackPageName.userCookieTerms,
      },
      {
        title: '不動產經紀業許可',
        screen: MoreStackPageName.license,
      },
    ],
  },
];

const MoreScreen = () => {
  const navigation =
    useNavigation<NavigationProp<EntranceRootStackParamsList>>();
  const tailwind = useTailwind();

  return (
    <AnimationFunwooHeader
      scrollEnabled={false}
      disableAnimated
      type={'black'}
      headerRight={
        <Text fontSize={TextStringSizeEnum['3xl']} style={tailwind('ml-4')}>
          更多
        </Text>
      }
      style={tailwind('flex-1 bg-white')}>
      <SectionList
        // ListFooterComponent={() => {
        //   return (
        //     <Text
        //       style={{
        //         textAlign: 'center',
        //         marginTop: 20,
        //         marginBottom: 24,
        //         color: 'gray700',
        //       }}
        //     />
        //   );
        // }}
        sections={items}
        renderSectionHeader={({section: {title}}) => (
          <View
            style={{
              height: 56,
              justifyContent: 'center',
              paddingLeft: 12,
              backgroundColor: AppColors.gray50,
            }}>
            <Text
              fontSize={TextStringSizeEnum.md}
              style={{
                color: 'gray700',
              }}>
              {title}
            </Text>
          </View>
        )}
        renderItem={({item}) => {
          return (
            <ListItem
              onPress={() => {
                const screen = item.screen;
                if (screen) {
                  if (screen in MoreStackPageName) {
                    navigation.navigate(PageNames.more, {
                      screen: item.screen as keyof MoreScreenParamsList,
                    });
                  } else if (screen in PageNames) {
                    navigation.navigate(
                      screen as keyof EntranceRootStackParamsList,
                    );
                  }
                }
              }}
              title={item.title}
              headerRight={
                Platform.OS === 'android' ? null : (
                  <FontAwesome
                    color={AppColors.gray500}
                    name="angle-right"
                    size={24}
                  />
                )
              }
            />
          );
        }}
      />
    </AnimationFunwooHeader>
  );
};
export default MoreScreen;
