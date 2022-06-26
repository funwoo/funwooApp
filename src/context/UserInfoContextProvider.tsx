import React, { FC, useContext, useState } from 'react'
const UserInfoContext = React.createContext({

} as {
    userInfo: UserInfoStateProps | undefined,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoStateProps | undefined>>
})
const UserInfoContextProvider: FC<{}> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfoStateProps>()
    return (
        <UserInfoContext.Provider value={{
            userInfo,
            setUserInfo
        }}>
            {children}
        </UserInfoContext.Provider>
    )
}
interface UserInfoStateProps {
    authToke: string,
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