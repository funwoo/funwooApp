import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Platform,
  Pressable,
  SectionList,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ListItem} from './components/ListItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../../../assets/colors/AppColors';
import React from 'react';
import {PageNames} from '../../../navigator/PageNames';
const items = [
  {
    title: '關於團隊',
    data: [
      {
        title: '公司簡介',
        //   screen: routePath.about,
      },
      {
        title: '房產顧問',
        //   screen: routePath.agent,
      },
      {
        title: '工作機會',
        //   screen: routePath.jobs,
      },
      {
        title: '聯絡我們',
        //   screen: routePath.contact_us,
      },
    ],
  },
  {
    title: '專屬活動',
    data: [
      {
        title: '海歸專案',
        //   screen: routePath.overseasCampaign,
      },
    ],
  },
  {
    title: '法律',
    data: [
      {
        title: '服務條款',
        //   screen: routePath['terms-of-service'],
      },
      {
        title: '隱私權政策',
        //   screen: routePath['privacy-policy'],
      },
      {
        title: 'Cookie使用者條款',
        //   screen: routePath.cookies,
      },
      {
        title: '不動產經紀業許可',
        //   screen: routePath['real-estate-brokerage-license'],
      },
    ],
  },
];
const MoreScreen = () => {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <View
            style={{
              paddingTop: top,
              width: '100%',
              flexDirection: 'row',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 60,
                width: '100%',
                backgroundColor: 'white',
                justifyContent: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={[
                    {
                      width: '33%',
                      aspectRatio: 6349 / 1024,
                      marginLeft: 10,
                    },
                  ]}
                  source={{
                    uri: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/home/funwoo-logo.webp',
                  }}
                />
                <Text style={{marginLeft: 3, marginBottom: -5}}>更多</Text>
              </View>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate(PageNames.signIn);
              }}
              style={{
                height: 60,
                alignItems: 'center',
                position: 'absolute',
                right: 24,
                justifyContent: 'center',
                bottom: 0,
              }}>
              <Text style={{fontSize: 16, fontFamily: 'NotoSansTC-Regular'}}>
                登入
              </Text>
            </Pressable>
          </View>
        </View>
        <SectionList
          ListFooterComponent={() => {
            return (
              <>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 20,
                    marginBottom: 24,
                    color: AppColors.gray700,
                  }}></Text>
              </>
            );
          }}
          style={{flex: 1}}
          sections={items}
          renderSectionHeader={({section: {title}}) => (
            <View
              style={{
                height: 56,
                justifyContent: 'center',
                paddingLeft: 12,
                backgroundColor: AppColors['gray50'],
              }}>
              <Text
                style={{
                  color: AppColors.gray700,
                }}>
                {title}
              </Text>
            </View>
          )}
          renderItem={({item}) => {
            return (
              <ListItem
                onPress={() => {
                  if (item?.screen) {
                    navigation.navigate(item.screen, {
                      canGoBack: true,
                    });
                  }
                }}
                title={item.title}
                headerRight={
                  Platform.OS === 'android' ? null : (
                    <FontAwesome
                      color={AppColors['gray500']}
                      name="angle-right"
                      size={24}
                    />
                  )
                }
              />
            );
          }}
        />
      </View>
    </>
  );
};
export default MoreScreen;
