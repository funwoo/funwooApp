import {PageNames} from '../navigator/PageNames';
import {NavigatorScreenParams} from '@react-navigation/native';

export declare global {
  type EntranceRootStackParamsList = {
    [PageNames.entranceTabs]: NavigatorScreenParams<EntranceTabParamsList>;
    [PageNames.signIn]?: undefined;
  };

  interface EntranceTabParamsList {
    [PageNames.home]?: undefined;
    [PageNames.search]?: undefined;
    [PageNames.fav]?: undefined;
    [PageNames.sell]?: undefined;
    [PageNames.more]?: undefined;
  }
}
