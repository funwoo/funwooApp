import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import apis from '../../../network/apis';
import {Contact, ContactProps} from '../../../network/entities/contact-enity';
import {CustomFieldsProps} from '../../../network/entities/custom-fields.entity';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {PageNames} from '../../../navigator/PageNames';
const UserContactScreen = ({route}) => {
  const [contact, setContact] = useState<ContactProps>();
  const [customFields, setCustomFields] = useState<CustomFieldsProps>();
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      try {
        const values = await Promise.all([
          apis.getUserContact(route.params.id),
          apis.getCustomFields(),
        ]);
        setContact(values[0].data);
        setCustomFields(values[1].data);
        console.log(contact);
      } catch (error) {}
    })();
  }, []);
  const callNumber = useCallback((phone: string) => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, padding: 8}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 16}}>
            聯絡資訊
          </Text>
          <View style={{flex: 1, padding: 8}}>
            <Text
              style={{
                color: '#616161',
                fontSize: 16,
                marginBottom: 16,
              }}>
              用戶名稱
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#212121',
                marginBottom: 16,
              }}>
              {contact?.contact?.name}
            </Text>
            <Text
              style={{
                color: '#616161',
                fontSize: 16,
                marginBottom: 16,
              }}>
              電話
            </Text>
            <View style={{flexDirection: 'column'}}>
              {Array.isArray(contact?.contact?.phone) &&
                contact?.contact?.phone.map(item => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '70%',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#212121',
                          marginBottom: 12,
                        }}>
                        {item?.phoneNumber}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Pressable
                          onPress={() => {
                            Clipboard.setString(item?.phoneNumber);
                            Toast.show({
                              type: 'success',
                              text1: '已複製',
                              text2: item?.phoneNumber,
                            });
                          }}
                          style={{marginHorizontal: 10}}>
                          <AntDesign size={20} name={'copy1'} />
                        </Pressable>
                        <Pressable
                          onPress={() => callNumber(item?.phoneNumber)}>
                          <AntDesign size={20} name={'phone'} />
                        </Pressable>
                      </View>
                    </View>
                  );
                })}
            </View>

            {customFields?.customFields?.map(item => {
              return (
                <View
                  key={item._id}
                  style={{flexDirection: 'column', marginVertical: 16}}>
                  <Text
                    style={{
                      color: '#616161',
                      fontSize: 16,
                      marginBottom: 16,
                    }}>
                    {item?.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#212121',
                    }}>
                    {contact?.contact?.livechatData?.[item._id] ?? '無'}
                  </Text>
                  {item._id === 'avatar' && (
                    <FastImage
                      source={{uri: contact?.contact?.livechatData?.[item._id]}}
                      style={{width: 60, height: 60}}
                    />
                  )}
                </View>
              );
            })}
            <Text
              style={{
                color: '#616161',
                fontSize: 16,
                marginBottom: 16,
              }}>
              點擊過廣告
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#212121',
              }}>
              無
            </Text>
          </View>
        </View>
      </ScrollView>
      <Pressable
        onPress={() => {
          navigation.navigate(PageNames['agent-select']);
        }}
        style={{
          height: 45,
          width: '80%',
          backgroundColor: 'black',
          marginBottom: 20 + bottom,
          borderRadius: 4,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          轉交客戶
        </Text>
      </Pressable>
    </View>
  );
};
export default UserContactScreen;
