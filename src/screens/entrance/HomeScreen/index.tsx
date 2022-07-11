import React, {useEffect, useMemo, useState} from 'react';
import AnimationFunwooHeader from '../../../components/layout/AnimationFunwooHeader';
import HomeScreenBanner from './components/HomeScreenBanner';
import {useTailwind} from 'tailwind-rn';
import classNames from 'classnames';
import {Image, Pressable, View} from 'react-native';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import {useAsync} from 'react-use';
import {swaggerHttpClient} from '../../../swagger';
import HouseCard from '../../../components/feature/HouseCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PageNames} from '../../../navigator/PageNames';
import {Agent} from '../../../swagger/funwoo.api';
import {ImageProvider} from '../../../assets';
import BaseIcon from '../../../components/common/icons/Icons/BaseIcon';

const HomeScreen = () => {
  const navigation =
    useNavigation<NavigationProp<EntranceRootStackParamsList>>();

  const tailwind = useTailwind();

  const {value} = useAsync(
    async () =>
      await swaggerHttpClient.homepageApi
        .getHomepageInfo()
        .then(response => response.data),
    [],
  );

  const consultant = useMemo(() => value?.agents[0], [value]);

  if (!value) {
    return null;
  }

  return (
    <AnimationFunwooHeader
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <HomeScreenBanner />
      <View style={tailwind('pt-[4.5rem] px-4')}>
        <Text
          style={tailwind('mb-8 py-2 font-sans-m text-2xl w-full text-center')}>
          房屋精選
        </Text>
        <View style={tailwind('pb-[3.25rem]')}>
          {value.listings.map(listing => (
            <HouseCard data={listing} key={listing.sid} />
          ))}
        </View>
      </View>
      <View style={tailwind('mb-16 px-8 py-16 bg-gray50')}>
        <Pressable
          style={tailwind('py-2 bg-black justify-center items-center')}
          onPress={() => {
            navigation.navigate(PageNames.entranceTabs, {
              screen: PageNames.searchHouse,
            });
          }}>
          <Text
            style={tailwind('text-white font-sans-m')}
            fontSize={TextStringSizeEnum.xl}>
            查看更多房屋
          </Text>
        </Pressable>
      </View>
      <View>
        <Text
          style={tailwind('mb-2 py-2 font-sans-m text-2xl w-full text-center')}>
          專業房產顧問團隊
        </Text>
        <Text
          fontSize={TextStringSizeEnum.base}
          style={tailwind('mb-8 text-gray700 text-center')}>
          打造賓至如歸的交易體驗
        </Text>
        <Consultant consultant={consultant} />
      </View>
      <AdMarkingInfo />
      <View style={tailwind('py-16 px-4 bg-gray50')}>
        <Text
          style={tailwind('mb-2 py-2 font-sans-m text-2xl w-full text-center')}>
          加入房屋
        </Text>
        <Text
          fontSize={TextStringSizeEnum.base}
          style={tailwind('mb-8 text-gray700 text-center')}>
          正在招募專業熱誠的你
        </Text>
        {value.jobs?.map((job, index, array) => (
          <Pressable
            key={job.sid}
            style={tailwind(
              classNames(
                'py-4 px-3',
                'flex flex-row items-center justify-between',
                'border border-solid border-gray900',
                {
                  'mb-4': index !== array.length - 1,
                  'mb-0': index === array.length - 1,
                },
              ),
            )}>
            <Text fontSize={TextStringSizeEnum.base}>{job.title}</Text>
            <BaseIcon
              type={'Feather'}
              name={'arrow-right'}
              size={24}
              color="black"
            />
          </Pressable>
        ))}
      </View>
    </AnimationFunwooHeader>
  );
};
export default HomeScreen;

const Consultant: React.FC<{consultant: Agent | undefined}> = ({
  consultant,
}) => {
  const [layout, setLayout] = useState<{width: number; height: number}>({
    width: 1,
    height: 1,
  });

  const tailwind = useTailwind();
  const navigation =
    useNavigation<NavigationProp<EntranceRootStackParamsList>>();

  const uri = useMemo(() => {
    return consultant?.pictures?.[0] ?? '';
  }, [consultant]);

  useEffect(() => {
    Image.getSize(uri, (width, height) => setLayout({width, height}));
  }, [uri]);

  return (
    <View style={tailwind('mb-16')}>
      <Image
        source={{uri}}
        resizeMode={'cover'}
        style={{
          width: '100%',
          // height: layout.height,
          aspectRatio: layout.width / layout.height,
        }}
      />
      <View style={tailwind('-mt-6 mx-8 pt-8 bg-[white]')}>
        <View
          style={tailwind(
            'flex flex-row justify-center items-center mb-2 py-2',
          )}>
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-gray700')}>
            {consultant?.chinese_name || consultant?.english_name}
          </Text>
          <View style={tailwind('mx-2 w-px h-5 bg-gray700')} />
          <Text
            fontSize={TextStringSizeEnum.base}
            style={tailwind('text-gray700')}>
            FUNWOO 房產顧問
          </Text>
        </View>
        <Text
          fontSize={TextStringSizeEnum.base}
          style={tailwind('mb-8 px-3 py-2 text-gray900')}>
          「我很享受為客戶服務的過程，讓買賣雙方都有愉快的交易體驗。」
        </Text>
        <Pressable
          style={tailwind('py-2 bg-black justify-center items-center')}
          onPress={() => {
            navigation.navigate(PageNames.agent);
          }}>
          <Text
            style={tailwind('text-white font-sans-m')}
            fontSize={TextStringSizeEnum.xl}>
            認識更多專業顧問
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const AdMarkingInfo: React.FC = () => {
  const [layout, setLayout] = useState<{width: number; height: number}>({
    width: 0,
    height: 0,
  });

  const tailwind = useTailwind();

  return (
    <View
      style={{
        ...tailwind('flex items-center bg-black pt-16'),
        marginBottom: layout.height * 0.315 + 64,
      }}>
      <Text
        fontSize={TextStringSizeEnum['4xl']}
        style={tailwind('py-2 font-sans-m text-white text-center')}>
        精準行銷
      </Text>
      <Text
        fontSize={TextStringSizeEnum.base}
        style={tailwind('mb-8 py-2 text-white text-center')}>
        對的房屋，呈現給對的買家
      </Text>
      <Image
        onLayout={event => setLayout(event.nativeEvent.layout)}
        resizeMode={'contain'}
        style={{
          aspectRatio: 1368 / 2956,
          width: '80%',

          marginBottom: -(layout.height * 0.315),
        }}
        source={ImageProvider.phone_screen}
      />
    </View>
  );
};
