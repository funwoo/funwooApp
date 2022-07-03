import { View } from "react-native"
import React from 'react'
import ImageZoom from './components/ImageZoom';

const ImageViewerScreen = ({ route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <ImageZoom uri={route.params.images[0].uri} />
        </View>
    )
}
export default ImageViewerScreen