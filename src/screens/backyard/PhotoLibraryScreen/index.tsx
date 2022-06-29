import CameraRoll from "@react-native-community/cameraroll"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, Text, View } from "react-native"
import AntDesign from 'react-native-vector-icons/dist/AntDesign'
import { useNavigation } from "@react-navigation/native"
import { openLimitedPhotoLibraryPicker } from "react-native-permissions"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import apis from "../../../network/apis"
import { getImagePath } from "../../../nativeModule/CameraRollFetcher"
const PhotoLibraryScreen = ({ route }) => {
    const { bottom } = useSafeAreaInsets()
    const navigation = useNavigation()
    const end_cursor = useRef<string | undefined>()
    const [photo, setPhoto] = useState<CameraRoll.PhotoIdentifier[]>([])
    const [selectedPhoto, setSelectedPhoto] = useState<CameraRoll.PhotoIdentifier>()
    const [showRefreshButton, setShowRefreshButton] = useState(false)
    const [loading, setLoading] = useState(false)
    const headerRight = () => {
        if (route.params?.permission) {
            return <Pressable onPress={() => {
                // navigation.goBack()
                setShowRefreshButton(true)
                setSelectedPhoto(false)
                openLimitedPhotoLibraryPicker()

            }}>
                <Text >管理</Text>
            </Pressable>
        } else {
            return null
        }

    }
    const loadPhotos = useCallback(() => {
        return CameraRoll.getPhotos({
            first: 24,
            after: end_cursor.current,
            assetType: 'Photos',
        })
            .then(r => {
                console.log("load photo")
                setPhoto((photos) => photos.concat(r.edges))

                end_cursor.current = r.page_info.end_cursor
            })
            .catch((err) => {
                //Error Loading Images
            });
    }, [])

    useEffect(() => {
        loadPhotos()
        navigation.setOptions({
            headerRight: headerRight
        })
    }, [])
    const onUpload = async () => {
        try {
            setLoading(true)
            const realPath = await getImagePath(selectedPhoto?.node.image.uri!)
            const response = await apis.setImageMessage({
                filename: selectedPhoto?.node.image.filename!,
                filepath: realPath,
                name: 'file'
            }, route.params.roomId)

            navigation.goBack()
        } catch (error) {
            console.warn(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList onEndReached={loadPhotos} data={photo} numColumns={3} renderItem={({ item }) => {
                return <Pressable onPress={() => {
                    setSelectedPhoto(item)
                    if (selectedPhoto?.node?.image?.filename === item.node.image.filename) {
                        setSelectedPhoto(undefined)
                    } else {
                        setSelectedPhoto(item)
                    }
                }} style={{ justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width / 3, padding: 1 }}>
                    <>
                        <Image source={{ uri: item.node.image.uri }} style={{ width: '100%', aspectRatio: 1, }} />
                        {selectedPhoto ? <View style={{ position: 'absolute', backgroundColor: "rgba(0,0,0,0.5)", width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                            {selectedPhoto?.node?.image?.filename === item.node.image.filename && <AntDesign size={50} name="checkcircleo" color={'green'} />}

                        </View> : null}

                    </>

                </Pressable>
            }} />
            {selectedPhoto && <View style={{ position: 'absolute', bottom: 0, width: "100%", paddingBottom: bottom, paddingHorizontal: 10 }}>
                <Pressable disabled={loading} onPress={onUpload} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "black", minHeight: 48, borderRadius: 8, }}>
                    {loading ? <ActivityIndicator /> : <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>送出</Text>}
                </Pressable>
            </View>}
            {showRefreshButton && <View style={{ position: 'absolute', bottom: 0, width: "100%", paddingBottom: bottom, paddingHorizontal: 10 }}>
                <Pressable onPress={() => {
                    setShowRefreshButton(false)
                    end_cursor.current = undefined
                    setPhoto([])
                    loadPhotos()
                }} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "black", minHeight: 48, borderRadius: 8, }}>

                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>重新整理</Text>
                </Pressable>
            </View>}

        </View>
    )
}
export default PhotoLibraryScreen