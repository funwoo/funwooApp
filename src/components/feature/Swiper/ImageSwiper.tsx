import React, {LegacyRef, useMemo, useRef, useState} from 'react';
import {Animated, TouchableWithoutFeedback, View} from 'react-native';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
  RecyclerListViewProps,
} from 'recyclerlistview';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import {ListingStatusEnum} from '../../../swagger/funwoo.api';
import CacheImage from '../../common/CacheImage';
import Badge from '../Badge';
import {RecyclerListViewState} from 'recyclerlistview/src/core/RecyclerListView';
import YoutubePlayer from 'react-native-youtube-iframe';

interface Props {
  width: number;
  height: number;
  imageUrls: Array<string>;
  videoUrls?: Array<string>;
  onItemPress: () => void;
  status: ListingStatusEnum;
  customRef?:
    | LegacyRef<RecyclerListView<RecyclerListViewProps, RecyclerListViewState>>
    | undefined;
}

interface Data {
  type: 'image' | 'video';
  url: string;
}

const dataProvider = new DataProvider((r1, r2) => {
  return r1 !== r2;
});

const ImageSwiper: React.FC<Props> = ({
  width,
  height,
  imageUrls,
  videoUrls,
  onItemPress,
  status,
  customRef,
}) => {
  const [page, setPage] = useState(0);
  let index = useRef(new Animated.Value(0)).current;
  const enableTouch = useRef(true);

  const _layoutProvider = useMemo(() => {
    return new LayoutProvider(
      () => {
        return 0;
      },
      (type, dim) => {
        dim.width = width;
        dim.height = height;
      },
    );
  }, [width, height]);

  const displayData = useMemo<Array<Data>>(() => {
    return ([] as Array<Data>)
      .concat(
        imageUrls.map(url => ({
          type: 'image',
          url,
        })),
      )
      .concat(videoUrls?.map(url => ({type: 'video', url})) ?? []);
  }, [imageUrls, videoUrls]);

  if (!displayData || displayData.length === 0) {
    return <View style={{minHeight: 240}} />;
  }

  return (
    <View
      style={{
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Badge status={status} />
      <RecyclerListView
        ref={customRef}
        scrollThrottle={20}
        renderAheadOffset={width}
        isHorizontal
        onScroll={event => {
          setPage(Math.round(event.nativeEvent.contentOffset.x / width));
          index.setValue(Math.round(event.nativeEvent.contentOffset.x / width));
        }}
        scrollViewProps={{
          pagingEnabled: true,
          showsVerticalScrollIndicator: false,
          showsHorizontalScrollIndicator: false,
        }}
        style={{width, height}}
        layoutProvider={_layoutProvider}
        dataProvider={dataProvider.cloneWithRows(displayData ?? [])}
        rowRenderer={(_, data: Data) => (
          <RowRenderer
            type={data.type}
            url={data.url}
            width={width}
            enableTouch={enableTouch.current}
            onItemPress={onItemPress}
          />
        )}
      />
      <View style={{position: 'absolute', height: 10, bottom: 10}}>
        <AnimatedDotsCarousel
          length={displayData?.length}
          currentIndex={page}
          maxIndicators={4}
          interpolateOpacityAndColor={true}
          activeIndicatorConfig={{
            color: 'black',
            margin: 2,
            opacity: 1,
            size: 4,
          }}
          inactiveIndicatorConfig={{
            color: 'white',
            margin: 2,
            opacity: 1,
            size: 4,
          }}
          decreasingDots={[
            {
              config: {color: 'white', margin: 2, opacity: 1, size: 3},
              quantity: 1,
            },
            {
              config: {color: 'white', margin: 2, opacity: 1, size: 2},
              quantity: 1,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default ImageSwiper;

interface RowRendererProps extends Data {
  enableTouch: boolean;
  onItemPress: () => void;
  width: number;
}

const RowRenderer: React.FC<RowRendererProps> = ({
  type,
  url,
  onItemPress,
  enableTouch,
  width,
}) => {
  if (type === 'video') {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (enableTouch) {
            onItemPress();
          }
        }}>
        <View
          style={[
            {
              width: width,
              aspectRatio: 3 / 2,
              backgroundColor: 'black',
            },
          ]}>
          <YoutubePlayer
            height={(width / 3) * 2}
            videoId={url.replace('https://www.youtube.com/watch?v=', '')}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  if (type === 'image') {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (enableTouch) {
            onItemPress();
          }
        }}>
        <CacheImage
          animation={'none'}
          style={{
            width: width,
            aspectRatio: 3 / 2,
          }}
          source={{
            uri: url || 'https://i.imgur.com/fMuoheX.png',
          }}
          resizeMode="contain"
        />
      </TouchableWithoutFeedback>
    );
  }

  return null;
};
