import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useAsync} from 'react-use';
import {swaggerHttpClient} from '../../../swagger';
import {useTailwind} from 'tailwind-rn';
import Text, {
  TextStringSizeEnum,
} from '../../../components/common/Text/BaseText';
import {ImageProvider} from '../../../assets';
import HouseDetail from './components/HouseDetail';
import HouseFeature from './components/HouseFeature';
import HouseEnvironment from './components/HouseEnvironment';
import HouseAgentSection from './components/HouseAgentSection';
import HouseLoan from './components/HouseLoan';
import BaseIcon from '../../../components/common/icons/Icons/BaseIcon';
import CacheImage from '../../../components/common/CacheImage';
import HouseHeader from './components/HouseHeader';
import HousePhoneCallModal from '../../../components/feature/HousePhoneCallModal';
import HouseInformation from './components/HouseInformation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HouseTabs, {TabData} from './components/HouseTabs';
import {inRange} from 'lodash';
import {deepClone} from '../../../utils';

const HouseScreen = () => {
  const [showPhoneCallModal, setShowPhoneCallModal] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [tabs, setTabs] = useState<Array<TabData>>([
    {
      key: 'information',
      label: '房屋資訊',
      yAxis: 0,
      tabWidth: 0,
      tabXOffset: 0,
    },
    {
      key: 'detail',
      label: '詳細資料',
      yAxis: 0,
      tabWidth: 0,
      tabXOffset: 0,
    },
    {
      key: 'feature',
      label: '物件特色',
      yAxis: 0,
      tabWidth: 0,
      tabXOffset: 0,
    },
    {
      key: 'environment',
      label: '周邊環境',
      yAxis: 0,
      tabWidth: 0,
      tabXOffset: 0,
    },
    {
      key: 'agent',
      label: '房產顧問',
      yAxis: 0,
      tabWidth: 0,
      tabXOffset: 0,
    },
  ]);

  const {bottom} = useSafeAreaInsets();

  const scrollViewRef = useRef<ScrollView | null>(null);

  const activeTabIndex = useMemo(() => {
    const index = tabs.findIndex(({yAxis}, _index, array) => {
      const next = array[_index + 1];
      const yAxisEnd = next?.yAxis ? next.yAxis - 1 : Number.MAX_VALUE;
      return inRange(scrollPosition, yAxis, yAxisEnd);
    });
    return index >= 0 ? index : 0;
  }, [scrollPosition]);

  const registryTabItem = useCallback((index: number) => {
    return (event: LayoutChangeEvent) => {
      setTabs(prev => {
        let _tabs = deepClone(prev);
        const {width, x} = event.nativeEvent.layout;
        _tabs[index].tabWidth = width;
        _tabs[index].tabXOffset = x;
        return _tabs;
      });
    };
  }, []);

  const {
    params: {sid},
  } = useRoute<RouteProp<HouseScreenStackParamsList, 'detail'>>();

  const tailwind = useTailwind();

  const {value: data} = useAsync(
    async () =>
      await swaggerHttpClient.listingApi
        .findOne(sid)
        .then(response => response.data),
    [sid],
  );

  const {value: agent} = useAsync(
    async () =>
      data
        ? await swaggerHttpClient.agentApi
            .findOne(data.agent1_id)
            .then(response => response.data)
        : null,
    [data?.agent1_id],
  );

  const triggerPhoneCallModal = useCallback(
    () => setShowPhoneCallModal(prev => !prev),
    [],
  );

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const yPosition = event.nativeEvent.contentOffset.y;
      setScrollPosition(yPosition);
    },
    [],
  );

  const HouseInformationRef = useRef<View>(null);
  const HouseDetailRef = useRef<View>(null);
  const HouseFeatureRef = useRef<View>(null);
  const HouseEnvironmentRef = useRef<View>(null);
  const HouseAgentSectionRef = useRef<View>(null);
  useEffect(() => {
    if (agent && data) {
      HouseInformationRef.current?.measure((x: number, y: number) => {
        setTabs(_tabs => {
          let temp = _tabs;
          temp[0].yAxis = y;
          return temp;
        });
      });
      HouseDetailRef.current?.measure((x: number, y: number) => {
        setTabs(_tabs => {
          let temp = _tabs;
          temp[1].yAxis = y;
          return temp;
        });
      });
      HouseFeatureRef.current?.measure((x: number, y: number) => {
        setTabs(_tabs => {
          let temp = _tabs;
          temp[2].yAxis = y;
          return temp;
        });
      });
      HouseEnvironmentRef.current?.measure((x: number, y: number) => {
        setTabs(_tabs => {
          let temp = _tabs;
          temp[3].yAxis = y;
          return temp;
        });
      });
      HouseAgentSectionRef.current?.measure((x: number, y: number) => {
        setTabs(_tabs => {
          let temp = _tabs;
          temp[4].yAxis = y;
          return temp;
        });
      });
    }
  }, [agent, data]);

  if (!data) {
    return null;
  }

  return (
    <React.Fragment>
      <HousePhoneCallModal
        show={showPhoneCallModal}
        triggerPhoneCallModal={triggerPhoneCallModal}
        agent={agent}
      />
      <SafeAreaView style={tailwind('bg-white flex-1')}>
        <HouseHeader title={data.title} />
        <View style={tailwind('flex-1')}>
          <HouseTabs
            activeTabIndex={activeTabIndex}
            yPosition={scrollPosition}
            tabs={tabs}
            scrollViewRef={scrollViewRef}
            registryTabItem={registryTabItem}
          />
          <ScrollView
            ref={scrollViewRef}
            onScroll={onScroll}
            scrollEventThrottle={100}>
            <View ref={HouseInformationRef}>
              <HouseInformation data={data} />
            </View>
            <View ref={HouseDetailRef}>
              <HouseDetail {...data} />
            </View>
            <Divider />
            <View ref={HouseFeatureRef}>
              <HouseFeature {...data} />
            </View>
            <Divider />
            <View ref={HouseEnvironmentRef}>
              <HouseEnvironment {...data} />
            </View>
            <Divider />
            <HouseLoan {...data} />
            <Divider />
            <View ref={HouseAgentSectionRef}>
              <HouseAgentSection agent={agent} />
            </View>
            <Divider />
            <View style={tailwind('h-16')} />
          </ScrollView>
        </View>
        <View
          style={[tailwind('absolute flex-row px-4 w-full z-50'), {bottom}]}>
          <Pressable
            onPress={triggerPhoneCallModal}
            style={tailwind(
              'flex-1 flex-row items-center justify-center mr-4 py-3 bg-gray900',
            )}>
            <BaseIcon
              size={20}
              color={'#FFF'}
              name={'phone'}
              type={'FontAwesome'}
              style={tailwind('mr-2')}
            />
            <Text
              fontSize={TextStringSizeEnum.base}
              fontFamily={'NotoSansTC-Medium'}
              style={tailwind('text-white')}>
              來電諮詢
            </Text>
          </Pressable>
          <Pressable
            style={tailwind(
              'flex-1 flex-row items-center justify-center py-3 bg-gray900',
            )}
            onPress={() => {
              Linking.openURL(`${agent?.contact_line}`);
            }}>
            <CacheImage
              style={[{width: 22, height: 22}, tailwind('mr-2')]}
              source={ImageProvider.lineIconWhite}
            />
            <Text
              fontSize={TextStringSizeEnum.base}
              fontFamily={'NotoSansTC-Medium'}
              style={tailwind('text-white')}>
              加Line 聯絡
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default HouseScreen;

const Divider = () => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('py-2 px-4')}>
      <View style={tailwind('w-full h-px bg-gray300')} />
    </View>
  );
};
