import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios'
import { rocketChatHttpClient } from "../../network/httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { currentUserInfoState } from "../../state/currentUserInfoState";
type FormData = {
    user: string;
    password: string;
};

const LoginScreen = () => {
    const { top, bottom } = useSafeAreaInsets()
    const { control, handleSubmit, formState: { errors, isValid, isSubmitting }, } = useForm<FormData>({
        defaultValues: {
            user: '',
            password: ''
        },
        mode: "all"
    });
    const refreshUserInfo = useRecoilRefresher_UNSTABLE(currentUserInfoState);
    const onSubmit = async (data: FormData) => {
        try {
            const { data: result } = await rocketChatHttpClient.post("/api/v1/login", {
                user: data.user,
                password: data.password
            })
            await AsyncStorage.setItem('userInfo', JSON.stringify(result.data))
            refreshUserInfo()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={{ flex: 1, paddingTop: top, paddingBottom: bottom, backgroundColor: 'white', paddingHorizontal: 16 }}>
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
            </View>
        </View>
    )
}
export default LoginScreen