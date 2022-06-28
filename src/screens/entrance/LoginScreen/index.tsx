import { ActivityIndicator, Button, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import OneSignal from "react-native-onesignal";
import FastImage from "react-native-fast-image";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { useUserInfoContextProvider } from "../../../context/UserInfoContextProvider";
import { backyardAPIHttpClient } from "../../../network/httpClient";
type FormData = {
    user: string;
    password: string;
};

const LoginScreen = () => {
    const { top, bottom } = useSafeAreaInsets()
    const { control, handleSubmit, formState: { errors, isValid, isSubmitting }, } = useForm<FormData>({
        defaultValues: {
            user: 'rocket.chat.admin',
            password: 'YjsYfaPtyKV6zXk3HQ9nwGqyN'
        },
        mode: "all"
    });
    const { userInfo, setUserInfo } = useUserInfoContextProvider()
    const onSubmit = async (data: FormData) => {
        try {
            const { data: result } = await backyardAPIHttpClient.post('/auth/google/auth/pwd', {
                pwd: data.password,
                usr: data.user
            })
            OneSignal.setExternalUserId(result.userId, (result) => {
                console.log(result)
            })
            await AsyncStorage.setItem('userInfo', JSON.stringify(result))
            setUserInfo(result)
        } catch (error) {
            console.log(error)
        }
    }
    const onGoogleSignInPress = async () => {
        try {
            const deepLinkUrl = "com.googleusercontent.apps.120470042915-bjcbrvkvn1818rep0j0sg536fcvu3tto://"
            const { data: { authURL } } = await backyardAPIHttpClient.get('/auth/google/issue', {
                params: {
                    state: deepLinkUrl
                },
                headers: {
                    platform: Platform.OS
                }
            })
            const result = await InAppBrowser.openAuth(authURL, deepLinkUrl, {
                ephemeralWebSession: false,
                // Android Properties
                showTitle: false,
                enableUrlBarHiding: true,
                enableDefaultShare: false
            })
            if (result.type === "success") {
                let queryString = decodeURI(result.url).split("?")[1]
                const item = queryString.split("&")
                let query: any = {}
                item.map((res) => {
                    const [key, value] = res.split("=")
                    query[key] = value
                })

                const { data } = await backyardAPIHttpClient.post('/auth/google/auth/mobile', {
                    code: query.code,
                    scope: query.scope,
                    authuser: query.authuser,
                    hd: query.hd,
                    prompt: query.prompt,
                    redirect_url: deepLinkUrl
                }, {

                    headers: {
                        platform: Platform.OS
                    }
                })
                await AsyncStorage.setItem('userInfo', JSON.stringify(data))
                setUserInfo(data)
            }
        } catch (error) {

        }

    }
    return (
        <ScrollView style={{ flex: 1, paddingTop: top, paddingBottom: bottom, backgroundColor: 'white', paddingHorizontal: 16 }}>
            <View style={{ flex: 2, justifyContent: 'flex-end' }}>
                <Controller rules={{ required: true }} name='user' control={control} render={({ field: {
                    onBlur,
                    onChange,
                    value
                } }) => {
                    return (
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: "normal",
                                fontStyle: "normal",
                                lineHeight: 24,
                                letterSpacing: 0.25,
                                textAlign: "left",
                                color: '#616161',
                                marginTop: 8,
                                marginBottom: 4
                            }}>帳號</Text>
                            <TextInput onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} autoComplete={'email'} keyboardType="email-address" style={{ height: 40, borderColor: '#e0e0e0', borderWidth: 1, paddingLeft: 10 }} />
                        </View>
                    )
                }} />
                <Controller rules={{ required: true }} name='password' control={control} render={({
                    field: {
                        onBlur,
                        onChange,
                        value
                    }
                }) => {
                    return <View style={{ flexDirection: 'column' }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: "normal",
                            fontStyle: "normal",
                            lineHeight: 24,
                            letterSpacing: 0.25,
                            textAlign: "left",
                            color: '#616161',
                            marginTop: 8,
                            marginBottom: 4
                        }}>密碼</Text>
                        <TextInput onBlur={onBlur}
                            onChangeText={onChange}
                            value={value} secureTextEntry={true} style={{ height: 40, borderColor: '#e0e0e0', borderWidth: 1, paddingLeft: 10 }} />
                    </View>
                }} />
            </View>

            <View style={{ flex: 3 }}>
                <TouchableOpacity disabled={!isValid} onPress={handleSubmit(onSubmit)} style={{ height: 48, justifyContent: 'center', alignItems: 'center', backgroundColor: isValid ? "black" : "#9e9e9e", marginTop: 40 }}>
                    {isSubmitting ? <ActivityIndicator /> : <Text style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "500",
                        fontStyle: "normal",
                        lineHeight: 24,
                        letterSpacing: 0.5,
                    }}>送出資料</Text>}

                </TouchableOpacity>
                <View>
                    <Pressable onPress={onGoogleSignInPress} style={{ height: 48, justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginTop: 20, borderColor: "gray", flexDirection: 'row' }}>
                        <FastImage style={{ width: 25, height: 25 }} source={{ uri: "https://cdn.funwoo.com.tw/inventory/funwoo_assets/2e0e4a88f775c0eb34b344400b314aa2593eca4b.jpeg" }} />
                        <Text style={{ fontWeight: "bold", marginLeft: 10, fontSize: 16 }}>Sign In With Google</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}
export default LoginScreen