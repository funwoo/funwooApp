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

export interface CurrentUserInfoStateProps {
  authToke: string,
  userId: string,
  image: string,
  name: string,
  jwt: string
}


export { currentUserInfoState }