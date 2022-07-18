import {MoreStackPageName} from '../navigator/PageNames';

export declare global {
  type MoreScreenParamsList = {
    [MoreStackPageName.navigate]?: undefined;
    [MoreStackPageName.aboutUs]?: undefined;
    [MoreStackPageName.aboutFounder]: {key: string};
    [MoreStackPageName.agents]?: undefined;
    [MoreStackPageName.jobs]?: undefined;
    [MoreStackPageName.contactUs]?: undefined;
    [MoreStackPageName.overseas]?: undefined;
    [MoreStackPageName.serviceTerms]?: undefined;
    [MoreStackPageName.privatePolicy]?: undefined;
    [MoreStackPageName.userCookieTerms]?: undefined;
    [MoreStackPageName.license]?: undefined;
  };
}
