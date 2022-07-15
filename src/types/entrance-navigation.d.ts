import {HouseStackPageName, PageNames} from '../navigator/PageNames';
import {NavigatorScreenParams} from '@react-navigation/native';
import {ListingDetail, TrafficEnvEntity} from '../swagger/funwoo.api';
import {HouseAddAddressTravelModeEnum} from '../screens/entrance/HouseScreen/AddAddressScreen';

export declare global {
  type EntranceRootStackParamsList = {
    [PageNames.entranceTabs]: NavigatorScreenParams<EntranceTabParamsList>;
    [PageNames.signIn]?: undefined;
    [PageNames.house]: NavigatorScreenParams<HouseScreenStackParamsList>;
    [PageNames.agent]?: undefined;
    [PageNames['agent-detail']]: {
      sid: string;
    };
    [PageNames['agent-detail']]: {
      sid: string;
    };
    [PageNames.job]?: undefined;
    [PageNames['job-detail']]: {
      sid: string;
    };
  };

  type EntranceTabParamsList = {
    [PageNames.home]?: undefined;
    [PageNames.searchHouse]?: undefined;
    [PageNames.myFavorite]?: undefined;
    [PageNames.sell]?: undefined;
    [PageNames.more]?: undefined;
  };

  type HouseScreenStackParamsList = {
    [HouseStackPageName.detail]: {sid: string};
    [HouseStackPageName.addAddress]: HouseAddAddressScreenParams;
    [HouseStackPageName.map]: HouseMapScreenParams;
  };

  type HouseMapEnvData = NonNullable<
    Pick<
      ListingDetail,
      | 'traffic_env_corporate'
      | 'traffic_env_supermarket'
      | 'traffic_env_recreation'
      | 'traffic_env_hospital'
      | 'traffic_env_school'
      | 'traffic_env_traffic'
    >
  >;

  interface HouseEnvData {
    key: keyof HouseMapEnvData;
    label: string;
    env: Array<TrafficEnvEntity>;
  }

  interface HouseMapScreenParams {
    data: Array<HouseEnvData>;
    region: {
      lat: number;
      lng: number;
    };
    type: 'street' | 'map';
    address: string;
  }

  interface HouseAddAddressCallbackParams {
    name: string;
    time: string;
    type: HouseAddAddressTravelModeEnum;
  }

  interface HouseAddAddressScreenParams {
    region: {
      lat: number;
      lng: number;
    };
    callback: (params: HouseAddAddressCallbackParams) => void;
  }
}
