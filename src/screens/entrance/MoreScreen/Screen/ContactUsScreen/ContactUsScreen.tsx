import React, {useCallback, useState} from 'react';
import CommonHeader from '../../../../../components/layout/CommonHeader';
import {useTailwind} from 'tailwind-rn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Text, {
  TextStringSizeEnum,
} from '../../../../../components/common/Text/BaseText';
import {Linking, Pressable, View} from 'react-native';
import {TextInput} from '../../../../../components/common/Field';
import {SubmitHandler, useForm} from 'react-hook-form';
import {swaggerHttpClient} from '../../../../../swagger';
import {SendEmailContactMailDto} from '../../../../../swagger/funwoo.api';
import {isRequiredString} from '../../../../../utils/form-validator';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MoreStackPageName} from '../../../../../navigator/PageNames';
import ConditionalFragment from '../../../../../components/common/ConditionalFragment';
import classNames from 'classnames';
import CacheImage from '../../../../../components/common/CacheImage';

interface FormValues extends SendEmailContactMailDto {}

const ContactUsScreen = () => {
  const [acceptPolicy, setAcceptPolicy] = useState<boolean>(false);
  const tailwind = useTailwind();
  const navigation = useNavigation<NavigationProp<MoreScreenParamsList>>();

  const {
    handleSubmit,
    control,
    formState: {
      isValid,
      isSubmitting,
      isDirty,
      isSubmitted,
      isSubmitSuccessful,
    },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      type: 'CONTACT',
    },
  });

  const triggerPolicy = useCallback(() => setAcceptPolicy(prev => !prev), []);
  const isFormSubmittable = acceptPolicy && isValid && !isSubmitting && isDirty;

  const onSubmit = useCallback<SubmitHandler<FormValues>>(async formValues => {
    await swaggerHttpClient.mailApi.sendEmail(formValues);
  }, []);

  return (
    <CommonHeader title={'聯絡我們'} scrollEnabled={false}>
      <KeyboardAwareScrollView
        contentContainerStyle={[tailwind('flex-1')]}
        style={[tailwind('pt-2 pb-3 px-4 flex-1')]}
        keyboardDismissMode={'interactive'}>
        <ConditionalFragment condition={isSubmitted && isSubmitSuccessful}>
          <View style={tailwind('items-center')}>
            <Text
              fontSize={TextStringSizeEnum['7xl']}
              fontFamily={'NotoSansTC-Bold'}
              style={tailwind('mb-2 text-center')}>
              謝謝你！
            </Text>
            <Text
              fontSize={TextStringSizeEnum.xl}
              style={tailwind('text-center mb-[4.5rem]')}>
              房產顧問將於 48 小時內與您聯繫！
            </Text>
            <CacheImage
              source={require('../../../../../assets/images/imagesContactMobile.png')}
              style={{
                width: 240,
                height: 280,
              }}
            />
          </View>
        </ConditionalFragment>
        <ConditionalFragment condition={!isSubmitted || !isSubmitSuccessful}>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('mb-6 text-gray700')}>
            請撥打{' '}
            <Pressable
              onPress={() => Linking.openURL('tel://0900-289-518')}
              style={{
                marginBottom: -2,
              }}>
              <Text
                fontSize={TextStringSizeEnum.base}
                style={tailwind('text-brand underline')}>
                0900-289-518
              </Text>
            </Pressable>{' '}
            聯絡客服經理；或留下您的資訊，我們會於 24 小時內和你聯絡。
          </Text>
          <View style={tailwind('mb-2')}>
            <Label>稱呼（希望顧問如何稱呼你）</Label>
            <TextInput
              control={control}
              name={'name'}
              rules={{
                validate: isRequiredString,
              }}
            />
          </View>
          <View style={tailwind('mb-6')}>
            <Label>手機</Label>
            <TextInput
              control={control}
              name={'phone'}
              keyboardType={'phone-pad'}
              rules={{
                validate: isRequiredString,
              }}
            />
          </View>
          <Pressable
            onPress={triggerPolicy}
            style={tailwind('flex-row items-center')}>
            <View
              style={tailwind(
                'mr-2 w-4 h-4 p-0.5 border border-gray900 rounded-extreme',
              )}>
              <ConditionalFragment condition={acceptPolicy}>
                <View
                  style={tailwind('w-full h-full bg-gray900 rounded-extreme')}
                />
              </ConditionalFragment>
            </View>
            <Text fontSize={TextStringSizeEnum.md} style={tailwind('flex-1')}>
              <Text fontSize={TextStringSizeEnum.md} style={tailwind('flex-1')}>
                我已閱讀{' '}
              </Text>
              <Pressable
                onPress={() =>
                  navigation.navigate(MoreStackPageName.serviceTerms)
                }
                style={{
                  marginBottom: -2,
                }}>
                <Text
                  fontSize={TextStringSizeEnum.md}
                  style={tailwind('text-gray700 underline')}>
                  服務條款
                </Text>
              </Pressable>
              與
              <Pressable
                onPress={() =>
                  navigation.navigate(MoreStackPageName.privatePolicy)
                }
                style={{
                  marginBottom: -2,
                }}>
                <Text
                  fontSize={TextStringSizeEnum.md}
                  style={tailwind('text-gray700 underline')}>
                  隱私權聲明
                </Text>
              </Pressable>
              ，並同意 FUNWOO 依照該聲明和該策略使用我的相關資訊。
            </Text>
          </Pressable>
          <Pressable
            disabled={!isFormSubmittable}
            onPress={handleSubmit(onSubmit)}
            style={[tailwind('mt-auto')]}>
            <Text
              fontFamily={'NotoSansTC-Medium'}
              fontSize={TextStringSizeEnum.base}
              style={tailwind(
                classNames('py-3', 'w-full', 'text-center text-white', {
                  'bg-gray900': isFormSubmittable,
                  'bg-gray500': !isFormSubmittable,
                }),
              )}>
              提交
            </Text>
          </Pressable>
        </ConditionalFragment>
      </KeyboardAwareScrollView>
    </CommonHeader>
  );
};

export default ContactUsScreen;

const Label: React.FC = ({children}) => {
  const tailwind = useTailwind();
  return (
    <Text
      fontSize={TextStringSizeEnum.md}
      style={tailwind('mb-1 text-gray700')}>
      {children}
    </Text>
  );
};
