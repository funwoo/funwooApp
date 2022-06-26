import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { FC, useCallback, useContext, useEffect, useState } from 'react'
import Config from '../models/index'
const UserInfoContext = React.createContext({

} as {
    userInfo: UserInfoStateProps | undefined,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoStateProps | undefined>>
    signOut: () => void
})
const { useRealm, useQuery: useRealmQuery, useObject } = Config;
const UserInfoContextProvider: FC<{}> = ({ children }) => {
    const realm = useRealm();
    const [userInfo, setUserInfo] = useState<UserInfoStateProps>()
    const signOut = useCallback(async () => {
        await AsyncStorage.clear()
        realm.write(() => {
            realm.deleteAll()
        })
        setUserInfo(undefined)
    }, [setUserInfo])
    useEffect(() => {
        (async () => {
            try {
                const userInfo = await AsyncStorage.getItem('userInfo')
                if (userInfo)
                    setUserInfo(JSON.parse(userInfo!))
                console.warn("login sucess", JSON.parse(userInfo!))
            } catch (error) {
                console.warn("login fail")
            }


        })()
    }, [])
    return (
        <UserInfoContext.Provider value={{
            userInfo,
            setUserInfo,
            signOut
        }}>
            {children}
        </UserInfoContext.Provider>
    )
}
interface UserInfoStateProps {
    authToken: string,
    userId: string,
    image: string,
    name: string,
    jwt: string
}
const useUserInfoContextProvider = () => {
    const context = useContext(UserInfoContext)
    return context
}
export { useUserInfoContextProvider }
export default UserInfoContextProvider