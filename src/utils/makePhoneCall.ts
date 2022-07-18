import {Alert, Linking, Platform} from 'react-native';

export const makePhoneCall = (phone: string) => {
  const url = `${Platform.OS === 'ios' ? 'telprompt://' : 'tel://'}${phone}`;
  return Linking.canOpenURL(url)
    .then(res => {
      if (res) {
        Linking.openURL(url);
      }
    })
    .catch(err => {
      Alert.alert('發生錯誤', '請稍後再試');
      console.log(err);
    });
};
