import {PageNames} from '../navigator/PageNames';
import {NavigatorScreenParams} from '@react-navigation/native';

export declare global {
  type EntranceRootStackParamsList = {
    [PageNames.entranceTabs]: NavigatorScreenParams<EntranceTabParamsList>;
    [PageNames.signIn]?: undefined;
    [PageNames.house]: {sid: string};
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

  interface EntranceTabParamsList {
    [PageNames.home]?: undefined;
    [PageNames.search]?: undefined;
    [PageNames.fav]?: undefined;
    [PageNames.sell]?: undefined;
    [PageNames.more]?: undefined;
  }
}
