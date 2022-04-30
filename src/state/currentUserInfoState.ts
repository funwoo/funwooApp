import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";

const currentUserInfoState = selector<CurrentUserInfoStateProps>({
  key: 'CurrentUserInfoState',
  get: async ({ get }) => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo')
      if (userInfo) {
        return JSON.parse(userInfo)
      }
      return null
    } catch (error) {
      return null
    }
  },
});


export interface Password {
  bcrypt: string;
}

export interface Services {
  password: Password;
}

export interface Email {
  address: string;
  verified: boolean;
}

export interface Preferences {
  enableAutoAway: boolean;
  idleTimeLimit: number;
  desktopNotificationRequireInteraction: boolean;
  desktopNotifications: string;
  pushNotifications: string;
  unreadAlert: boolean;
  useEmojis: boolean;
  convertAsciiEmoji: boolean;
  autoImageLoad: boolean;
  saveMobileBandwidth: boolean;
  collapseMediaByDefault: boolean;
  hideUsernames: boolean;
  hideRoles: boolean;
  hideFlexTab: boolean;
  displayAvatars: boolean;
  sidebarGroupByType: boolean;
  sidebarViewMode: string;
  sidebarDisplayAvatar: boolean;
  sidebarShowUnread: boolean;
  sidebarSortby: string;
  showMessageInMainThread: boolean;
  sidebarShowFavorites: boolean;
  sendOnEnter: string;
  messageViewMode: number;
  emailNotificationMode: string;
  newRoomNotification: string;
  newMessageNotification: string;
  muteFocusedConversations: boolean;
  notificationsSoundVolume: number;
  enableMessageParserEarlyAdoption: boolean;
}

export interface Settings {
  preferences: Preferences;
}

export interface Me {
  _id: string;
  services: Services;
  emails: Email[];
  status: string;
  active: boolean;
  _updatedAt: Date;
  roles: string[];
  name: string;
  statusConnection: string;
  utcOffset: number;
  username: string;
  statusText: string;
  requirePasswordChange: boolean;
  statusLivechat: string;
  email: string;
  avatarUrl: string;
  settings: Settings;
}

export interface CurrentUserInfoStateProps {
  userId: string;
  authToken: string;
  me: Me;
}


export { currentUserInfoState }