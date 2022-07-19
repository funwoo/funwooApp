import React from 'react';
import CommonHeader from '../../../../../components/layout/CommonHeader';
import {useTailwind} from 'tailwind-rn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ContactUsScreen = () => {
  const tailwind = useTailwind();

  return (
    <CommonHeader title={'聯絡我們'}>
      <KeyboardAwareScrollView />
    </CommonHeader>
  );
};

export default ContactUsScreen;
