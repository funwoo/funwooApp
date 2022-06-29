import React, { FC, useCallback } from 'react'
import { Platform, Pressable, View } from 'react-native'
import { PERMISSIONS } from 'react-native-permissions';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { checkPermission } from '../../../../lib/Permission';
import { launchCamera } from 'react-native-image-picker';
import { PageNames } from '../../../../navigator/PageNames';
interface ActionButtonProps {
    showActions: boolean,
    setShowActions: (showActions: boolean,) => void
    navigation: any;
    onImageButtonPress: () => void,
    onCameraButtonPress: () => void
}
const ActionButton: FC<ActionButtonProps> = ({ showActions, setShowActions, route, navigation, onCameraButtonPress, onImageButtonPress }) => {

    return (
        <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 5, height: "100%" }}>
            {showActions ? <View style={{ flexDirection: 'row' }}>
                <Pressable onPress={onCameraButtonPress}>
                    <AntDesign style={{ marginRight: 5 }} name='camerao' size={25} />
                </Pressable>
                <Pressable onPress={onImageButtonPress}>
                    <Ionicons name='image-outline' size={25} />
                </Pressable>

            </View> : <Pressable onPress={() => {
                setShowActions(true)
            }}>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </Pressable>}

        </View>
    )
}
export default ActionButton