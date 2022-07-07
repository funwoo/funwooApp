import React, {FC, useEffect, useMemo, useState} from 'react';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import {Source} from 'react-native-fast-image';
import {ListingDetail} from '../../swagger/funwoo.api';
import {useMyFavoriteContext} from '../../context/MyFavoriteContext';
import {ImageProvider} from '../../assets';
import {useTailwind} from 'tailwind-rn';
import CacheImage from '../common/CacheImage';

interface Props {
  theme?: 'Black' | 'Accent' | 'OnCard';
  sid: string;
  callBack?: (data: Partial<ListingDetail>) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AddFavoriteButton: FC<Props> = ({
  theme = 'Accent',
  sid,
  callBack,
  disabled,
  style,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const {updateFavorite, sids} = useMyFavoriteContext();

  const tailwind = useTailwind();

  useEffect(() => {
    if (sids.includes(sid)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [sids, sid]);

  const handlePressFavorite = () => {
    updateFavorite(sid, !isFavorite);
    callBack?.({sid});
  };

  const source = useMemo<Source>(() => {
    if (theme === 'OnCard') {
      if (disabled) {
        return ImageProvider.oncard_favorite_enabled;
      } else if (isFavorite) {
        return ImageProvider.oncard_favorite_active;
      } else {
        return ImageProvider.oncard_favorite_enabled;
      }
    } else if (theme === 'Accent') {
      if (disabled) {
        return ImageProvider.accent_favorite_enabled;
      } else if (isFavorite) {
        return ImageProvider.accent_favorite_active;
      } else if (!isFavorite) {
        return ImageProvider.accent_favorite_enabled;
      } else {
        return ImageProvider.accent_favorite_enabled;
      }
    } else {
      return {uri: ''};
    }
  }, [isFavorite, theme, disabled]);

  return (
    <Pressable
      onPress={handlePressFavorite}
      style={[style, tailwind('h-12 w-12')]}>
      <CacheImage source={source} style={tailwind('h-12 w-12')} />
    </Pressable>
  );
};

export default AddFavoriteButton;
