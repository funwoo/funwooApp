import {Image, Pressable, StyleSheet, View} from 'react-native';
import {IMessage, MessageImageProps} from 'react-native-gifted-chat';
import React, {useEffect, useState} from 'react';
import Lightbox from 'react-native-lightbox-v2';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {PageNames} from '../../../../navigator/PageNames';
export const ImageMessageRender = ({
  props,
}: {
  props: MessageImageProps<IMessage>;
}) => {
  const navigation = useNavigation();
  const [imageSize, setImageSize] = useState({
    width: 150,
    height: 100,
  });
  if (props.currentMessage == null) {
    return null;
  }
  useEffect(() => {
    Image.getSize(props?.currentMessage?.image ?? '', (width, height) => {
      setImageSize({
        width: 150,
        height: (150 / width) * height,
      });
    });
  }, [props?.currentMessage?.image]);
  return (
    <View style={[styles.container, props.containerStyle]}>
      <Pressable
        onPress={() => {
          navigation.navigate(PageNames.imageViewer, {
            images: [{uri: props.currentMessage.image}],
          });
        }}>
        <FastImage
          {...props.imageProps}
          style={[
            styles.image,
            props.imageStyle,
            {
              width: imageSize.width,
              height: imageSize.height,
            },
          ]}
          source={{uri: props.currentMessage.image}}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});
export default ImageMessageRender;
