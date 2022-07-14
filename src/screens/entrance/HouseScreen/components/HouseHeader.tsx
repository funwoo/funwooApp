import React, {useMemo} from 'react';
import {Pressable, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import openShare from '../../../../lib/Share';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useTailwind} from 'tailwind-rn';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useMyFavoriteContext} from '../../../../context/MyFavoriteContext';

const HouseHeader: React.FC<{title: string}> = ({title}) => {
  const tailwind = useTailwind();
  const navigate = useNavigation<NavigationProp<EntranceRootStackParamsList>>();
  const {sids, updateFavorite} = useMyFavoriteContext();
  const {
    params: {sid},
  } = useRoute<RouteProp<HouseScreenStackParamsList, 'detail'>>();
  const isFavorite = useMemo(() => sids.includes(sid), [sids, sid]);

  return (
    <View
      style={tailwind(
        'flex-row items-center justify-between py-1 z-20 bg-white',
      )}>
      <View style={tailwind('flex-row')}>
        <Pressable
          onPress={() => navigate.goBack()}
          style={tailwind('items-center justify-center w-12 h-12')}>
          <AntDesignIcon size={20} name={'arrowleft'} />
        </Pressable>
        <View style={tailwind('w-12 h-12')} />
      </View>
      <Text
        fontFamily={'NotoSansTC-Medium'}
        fontSize={TextStringSizeEnum['3xl']}>
        {title}
      </Text>
      <View style={tailwind('flex-row')}>
        <Pressable
          onPress={() => updateFavorite(sid, !isFavorite)}
          style={tailwind('items-center justify-center w-12 h-12')}>
          <AntDesignIcon
            size={20}
            color={isFavorite ? '#FF8080' : '#212121'}
            name={isFavorite ? 'heart' : 'hearto'}
          />
        </Pressable>
        <Pressable
          onPress={() =>
            openShare(
              `https://funwoo.com.tw/buy/${sid}`,
              '你覺得這個物件如何',
              title,
            )
          }
          style={tailwind('items-center justify-center w-12 h-12')}>
          <EntypoIcon size={20} name={'share'} />
        </Pressable>
      </View>
    </View>
  );
};

export default HouseHeader;
