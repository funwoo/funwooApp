import {PageNames} from '../navigator/PageNames';
import {NavigatorScreenParams} from '@react-navigation/native';

export declare global {
  type RootStackParamsList = {
    [PageNames.entrance]: NavigatorScreenParams<EntranceRootStackParamsList>;
    [PageNames.backyard]?: undefined;
  };
}
