import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, useWindowDimensions, Text, View, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import {useTailwind} from 'tailwind-rn/dist';
import {ImageProvider} from '../../../assets';
import AnimationFunwooHeader from '../../../components/layout/AnimationFunwooHeader';
import {PageNames} from '../../../navigator/PageNames';
import SplitPane from './components/SplitPane';
const SellScreen = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  return (
    <AnimationFunwooHeader
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <FastImage
        source={ImageProvider['sell-house-title-img']}
        style={[
          tailwind('w-full bg-bray justify-center items-center'),
          {
            height: (width / 1600) * 1061,
          },
        ]}
      />
      <View style={tailwind(`items-center`)}>
        <View style={tailwind('w-full')}>
          <Text
            style={[
              tailwind('font-sans text-center text-gray900 ml-3 text-3xl'),
              {
                marginTop: 12,
              },
            ]}>
            為你量⾝打造賣房策略
          </Text>
          <Text
            style={[tailwind(`font-sans text-center  text-xl m-3  text-gold`)]}>
            結合最新科技和創新行銷，精準推廣你的房屋，創造最大價值。
          </Text>
          <Text style={tailwind(`font-sans text-center text-gray700 text-xl`)}>
            想要找出最適合你的賣房策略 ?
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate(PageNames['contact-us']);
            }}
            style={[
              tailwind(
                ' mx-6 h-10 bg-black self-center justify-center items-center mt-8',
              ),
              {width: width - 24},
            ]}>
            <Text
              style={{
                fontFamily: 'NotoSansTC-Regular',
                fontSize: 16,
                fontWeight: 'bold',
                fontStyle: 'normal',
                lineHeight: 24,
                letterSpacing: 0.5,
                textAlign: 'center',
                color: '#ffffff',
              }}>
              立即聯絡 FUNWOO
            </Text>
          </Pressable>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignContent: 'center',
              paddingVertical: 0,
              marginTop: 0,
              marginHorizontal: 0,
            }}>
            <View
              style={{
                width: width,
                justifyContent: 'center',
                paddingLeft: 0,
              }}>
              <Text
                style={{
                  fontFamily: 'NotoSansTC-Regular',
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'center',
                  color: '#1c1e21',
                  marginLeft: 12,
                  marginTop: 76,
                  fontSize: 24,
                }}>
                提升房屋吸引力
              </Text>
              <Text
                style={{
                  fontFamily: 'NotoSansTC-Regular',
                  fontWeight: 'normal',
                  fontStyle: 'normal',

                  letterSpacing: 0.15,
                  textAlign: 'left',
                  color: '#6d6d6d',
                  margin: 12,
                  fontSize: 16,
                }}>
                FUNWOO Staging
                專業團隊精心佈置及擺設傢俱，激發買家第一時刻產生更直接的連結，幫助雙方更短時間達成交易。買家評估房屋時，也同時在尋找代表⾃⼰未來的⽣活空間。
              </Text>
            </View>
            <SplitPane />
          </View>
          <Text
            style={{
              fontFamily: 'NotoSansTC-Regular',
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.15,
              textAlign: 'center',
              color: '#1c1e21',
              marginHorizontal: 12,
              marginTop: 16,
              fontSize: 16,
            }}>
            「 感謝FUNWOO
            專業團隊用心佈置我的房屋，讓我的房屋比預期快找到合適的買家。」
          </Text>

          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 60,
            }}>
            <Text
              style={{
                fontFamily: 'NotoSansTC-Regular',
                fontSize: 16,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 24,
                letterSpacing: 0.5,
                textAlign: 'left',
                color: '#6d6d6d',
              }}>
              杜先生
            </Text>
            <View
              style={{
                width: 0.4,
                height: 20,
                backgroundColor: '#0b0b0b',
                marginHorizontal: 8.8,
              }}
            />
            <Text
              style={{
                fontFamily: 'NotoSansTC-Regular',
                fontSize: 16,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 24,
                letterSpacing: 0.5,
                textAlign: 'left',
                color: '#6d6d6d',
              }}>
              台北市文山區
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginBottom: 76,
              paddingVertical: 0,
            }}>
            <View style={{width: width, justifyContent: 'center'}}>
              <Text
                style={{
                  fontFamily: 'NotoSansTC-Regular',
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'center',
                  color: '#1c1e21',
                  marginLeft: 12,
                  marginTop: 76,
                  fontSize: 24,
                }}>
                讓房屋脫穎而出
              </Text>
              <Text
                style={{
                  fontFamily: 'NotoSansTC-Regular',
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0.15,
                  textAlign: 'center',
                  color: '#6d6d6d',
                  margin: 12,
                  marginBottom: 16,
                  fontSize: 16,
                }}>
                FUNWOO
                專業攝影師捕捉房屋最好的角度和畫面，讓照片比文字更有故事性。
              </Text>
            </View>
            <Image
              source={ImageProvider['02-Photography']}
              style={{
                width: width,
                height: (width / 2996) * 1986,
                backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',

                marginRight: 0,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignContent: 'center',
              paddingVertical: 0,
            }}>
            <View
              style={{
                width: width,
                justifyContent: 'center',
                paddingLeft: 0,
              }}>
              <Text
                style={{
                  fontFamily: 'NotoSansTC-Regular',
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'center',
                  color: '#1c1e21',
                  marginLeft: 12,
                  marginTop: 76,
                  fontSize: 24,
                }}>
                找到對的買家
              </Text>
              <Text
                style={{
                  fontFamily: 'NotoSansTC-Regular',
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0.15,
                  textAlign: 'center',
                  color: '#6d6d6d',
                  margin: 12,
                  marginBottom: 16,
                  fontSize: 16,
                }}>
                FUNWOO 運用 Facebook、Instagram 、Youtube、LINE
                四大社群平台，即時追蹤觸及⼈數，優化投放受眾，將你的房屋在對的時間，用對的方式呈現給對的買家。
              </Text>
            </View>
            <Image
              source={ImageProvider['03-Marketing']}
              style={{
                width: width,
                height: (width / 2121) * 1414,
                backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 76,
                marginLeft: 0,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              marginBottom: 76,
              paddingVertical: 0,
              marginHorizontal: 0,
            }}>
            <View style={{width: width, justifyContent: 'center'}}>
              <Text
                style={{
                  fontFamily: 'NotoSansTC-Regular',
                  fontWeight: 'bold',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'center',
                  color: '#1c1e21',
                  marginLeft: 12,
                  marginTop: 76,
                  fontSize: 24,
                }}>
                提升賣屋效率
              </Text>

              <Text
                style={{
                  fontFamily: 'NotoSansTC-Regular',
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0.15,
                  textAlign: 'center',
                  color: '#6d6d6d',
                  margin: 12,
                  marginBottom: 16,
                  fontSize: 16,
                }}>
                FUNWOO 引進國外Open
                House，舉辦茶會讓買家親臨現場體驗房屋價值。專業房產顧問詳細導覽物件特色，一次解決買家疑問。
              </Text>
            </View>
            <Image
              source={ImageProvider['04-OpenHouse']}
              style={{
                width: width,
                height: (width / 2121) * 1414,
                backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 76,
              }}
            />
          </View>
        </View>
      </View>
    </AnimationFunwooHeader>
  );
};
export default SellScreen;
