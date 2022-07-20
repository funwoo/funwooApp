import React, {useCallback, useEffect, useState} from 'react';
import CommonHeader from '../../../../../components/layout/CommonHeader';
import {useTailwind} from 'tailwind-rn';
import {Image, Pressable, View} from 'react-native';
import Text, {
  TextStringSizeEnum,
} from '../../../../../components/common/Text/BaseText';
import CacheImage from '../../../../../components/common/CacheImage';
import Pdf from 'react-native-pdf';
import Modal from 'react-native-modal';
import {isSet} from '../../../../../utils';
import ConditionalFragment from '../../../../../components/common/ConditionalFragment';
import BaseIcon from '../../../../../components/common/icons/Icons/BaseIcon';
import classNames from 'classnames';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppColors} from '../../../../../constants';

const Licenses = [
  {
    name: '01_附件一_德載國際不動產台北市地政局經營許可核准公文1091230.pdf',
    image:
      'https://storage.googleapis.com/funwoo-assets/assets/mobile/largeImages/01_%E9%99%84%E4%BB%B6%E4%B8%80_%E5%BE%B7%E8%BC%89%E5%9C%8B%E9%9A%9B%E4%B8%8D%E5%8B%95%E7%94%A2%E5%8F%B0%E5%8C%97%E5%B8%82%E5%9C%B0%E6%94%BF%E5%B1%80%E7%B6%93%E7%87%9F%E8%A8%B1%E5%8F%AF%E6%A0%B8%E5%87%86%E5%85%AC%E6%96%871091230.png',
    file: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/01_%E9%99%84%E4%BB%B6%E4%B8%80_%E5%BE%B7%E8%BC%89%E5%9C%8B%E9%9A%9B%E4%B8%8D%E5%8B%95%E7%94%A2%E5%8F%B0%E5%8C%97%E5%B8%82%E5%9C%B0%E6%94%BF%E5%B1%80%E7%B6%93%E7%87%9F%E8%A8%B1%E5%8F%AF%E6%A0%B8%E5%87%86%E5%85%AC%E6%96%871091230.pdf',
  },
  {
    name: '02_附件二_德載國際不動產公會會員證書.jpg',
    image:
      'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/02_%E9%99%84%E4%BB%B6%E4%BA%8C_%E5%BE%B7%E8%BC%89%E5%9C%8B%E9%9A%9B%E4%B8%8D%E5%8B%95%E7%94%A2%E5%85%AC%E6%9C%83%E6%9C%83%E5%93%A1%E8%AD%89%E6%9B%B8.jpg',
    file: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/02_%E9%99%84%E4%BB%B6%E4%BA%8C_%E5%BE%B7%E8%BC%89%E5%9C%8B%E9%9A%9B%E4%B8%8D%E5%8B%95%E7%94%A2%E5%85%AC%E6%9C%83%E6%9C%83%E5%93%A1%E8%AD%89%E6%9B%B8.jpg',
  },
  {
    name: '03_附件三_不動產經紀人證書.pdf',
    image:
      'https://storage.googleapis.com/funwoo-assets/assets/mobile/largeImages/03_%E9%99%84%E4%BB%B6%E4%B8%89_%E4%B8%8D%E5%8B%95%E7%94%A2%E7%B6%93%E7%B4%80%E4%BA%BA%E8%AD%89%E6%9B%B8.png',
    file: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/03_%E9%99%84%E4%BB%B6%E4%B8%89_%E4%B8%8D%E5%8B%95%E7%94%A2%E7%B6%93%E7%B4%80%E4%BA%BA%E8%AD%89%E6%9B%B8.pdf',
  },
  {
    name: '04_附件四_報酬標準及收取方式.jpg',
    image:
      'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/04_%E9%99%84%E4%BB%B6%E5%9B%9B_%E5%A0%B1%E9%85%AC%E6%A8%99%E6%BA%96%E5%8F%8A%E6%94%B6%E5%8F%96%E6%96%B9%E5%BC%8F.jpg',
    file: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/04_%E9%99%84%E4%BB%B6%E5%9B%9B_%E5%A0%B1%E9%85%AC%E6%A8%99%E6%BA%96%E5%8F%8A%E6%94%B6%E5%8F%96%E6%96%B9%E5%BC%8F.jpg',
  },
  {
    name: '05_附件五_合法仲介經紀業識別標誌.jpg',
    image:
      'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/05_%E9%99%84%E4%BB%B6%E4%BA%94_%E5%90%88%E6%B3%95%E4%BB%B2%E4%BB%8B%E7%B6%93%E7%B4%80%E6%A5%AD%E8%AD%98%E5%88%A5%E6%A8%99%E8%AA%8C.jpg',
    file: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/05_%E9%99%84%E4%BB%B6%E4%BA%94_%E5%90%88%E6%B3%95%E4%BB%B2%E4%BB%8B%E7%B6%93%E7%B4%80%E6%A5%AD%E8%AD%98%E5%88%A5%E6%A8%99%E8%AA%8C.jpg',
  },
  {
    name: '06_附件六_繳存保證金交易有保障.jpg',
    image:
      'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/06_%E9%99%84%E4%BB%B6%E5%85%AD_%E7%B9%B3%E5%AD%98%E4%BF%9D%E8%AD%89%E9%87%91%E4%BA%A4%E6%98%93%E6%9C%89%E4%BF%9D%E9%9A%9C.jpg',
    file: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/06_%E9%99%84%E4%BB%B6%E5%85%AD_%E7%B9%B3%E5%AD%98%E4%BF%9D%E8%AD%89%E9%87%91%E4%BA%A4%E6%98%93%E6%9C%89%E4%BF%9D%E9%9A%9C.jpg',
  },
  {
    name: '07_地政局備查許可函_新增不動產代銷經紀.jpg',
    image:
      'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/07_%E5%9C%B0%E6%94%BF%E5%B1%80%E5%82%99%E6%9F%A5%E8%A8%B1%E5%8F%AF%E5%87%BD_%E6%96%B0%E5%A2%9E%E4%B8%8D%E5%8B%95%E7%94%A2%E4%BB%A3%E9%8A%B7%E7%B6%93%E7%B4%80.jpg',
    file: 'https://storage.googleapis.com/funwoo-assets/assets/mobile/pdfs/07_%E5%9C%B0%E6%94%BF%E5%B1%80%E5%82%99%E6%9F%A5%E8%A8%B1%E5%8F%AF%E5%87%BD_%E6%96%B0%E5%A2%9E%E4%B8%8D%E5%8B%95%E7%94%A2%E4%BB%A3%E9%8A%B7%E7%B6%93%E7%B4%80.jpg',
  },
];

interface Source {
  type: 'pdf' | 'image';
  uri: string;
  name: string;
}

const LicenseScreen = () => {
  const [source, setSource] = useState<Source | null>(null);
  const tailwind = useTailwind();

  const closeModal = useCallback(() => setSource(null), []);

  return (
    <React.Fragment>
      <ModalDispatcher source={source} closeModal={closeModal} />
      <CommonHeader
        contentInsetAdjustmentBehavior={'automatic'}
        title={'不動產經紀業許可'}>
        <View style={tailwind('py-6 px-4')}>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('mb-6 text-gray800')}>
            {`FUNWOO 已正式加入台北市不動產仲介經紀商業同業公會，會員編號為1100207。
            \n如下為工會會員證明文件：`}
          </Text>
          <View style={tailwind('px-12 -mb-4')}>
            {Licenses.map(license => (
              <Pressable
                onPress={() => {
                  const fileUri = license.file;
                  if (fileUri.endsWith('.pdf')) {
                    setSource({
                      type: 'pdf',
                      uri: fileUri,
                      name: license.name,
                    });
                  } else if (
                    ['.png', '.jpg', '.jpeg'].some(extension =>
                      fileUri.endsWith(extension),
                    )
                  ) {
                    setSource({
                      type: 'image',
                      uri: fileUri,
                      name: license.name,
                    });
                  }
                }}
                key={license.name}
                style={tailwind('mb-4 w-full border border-gray300')}>
                <CacheImage
                  source={{uri: license.image}}
                  style={[tailwind('w-full'), {aspectRatio: 310 / 308}]}
                />
                <Text
                  fontSize={TextStringSizeEnum.base}
                  style={tailwind('p-4')}>
                  {license.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </CommonHeader>
    </React.Fragment>
  );
};

export default LicenseScreen;

const PDF: React.FC<{source: Source | null}> = ({source}) => {
  const tailwind = useTailwind();
  if (!source) {
    return null;
  }

  return <Pdf source={source} style={[tailwind('w-full h-full')]} />;
};

const ModalDispatcher: React.FC<{
  source: Source | null;
  closeModal: () => void;
}> = ({source, closeModal}) => {
  const [imageLayout, setImageLayout] = useState<{
    width: number;
    height: number;
  }>({
    width: 1,
    height: 1,
  });
  const tailwind = useTailwind();
  const {top} = useSafeAreaInsets();

  useEffect(() => {
    if (source?.type === 'image') {
      Image.getSize(source.uri, (width, height) =>
        setImageLayout({width, height}),
      );
    }
  }, [source]);

  return (
    <Modal
      isVisible={isSet(source)}
      style={tailwind('p-0 m-0')}
      animationIn={'bounceInRight'}
      animationOut={'bounceOutLeft'}>
      <Pressable
        onPress={closeModal}
        style={[
          {top: top + 16},
          tailwind(
            classNames('absolute right-4 z-10', 'items-center justify-center'),
          ),
        ]}>
        <BaseIcon
          type={'FontAwesome'}
          size={48}
          color={AppColors.gray500}
          name={'times-circle-o'}
        />
      </Pressable>
      <ConditionalFragment condition={source?.type === 'pdf'}>
        <PDF source={source} />
      </ConditionalFragment>
      <ConditionalFragment condition={source?.type === 'image'}>
        <CacheImage
          source={source!}
          style={[
            tailwind('w-full px-4'),
            {
              aspectRatio: imageLayout.width / imageLayout.height,
            },
          ]}
        />
      </ConditionalFragment>
    </Modal>
  );
};
