import React from 'react';
import {View} from 'react-native';
import {ListingDetail} from '../../../../swagger/funwoo.api';
import {useTailwind} from 'tailwind-rn';
import Text, {
  TextStringSizeEnum,
} from '../../../../components/common/Text/BaseText';
import ConditionalFragment from '../../../../components/common/ConditionalFragment';
import {isNotEmptyArray} from '../../../../utils';

const HouseFeature: React.FC<ListingDetail> = ({
  feature_tags,
  feature_content,
}) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('py-8 px-4')}>
      <Text
        fontSize={TextStringSizeEnum.xl}
        fontFamily={'NotoSansTC-Medium'}
        style={tailwind('py-2 mb-2')}>
        物件特色
      </Text>
      <ConditionalFragment condition={isNotEmptyArray(feature_tags ?? [])}>
        <View style={tailwind('mb-2')}>
          <View style={tailwind('flex-row flex-wrap -mr-2 -mb-2')}>
            {feature_tags?.map(tag => (
              <View
                key={tag}
                style={tailwind('mr-2 mb-2 px-2 border border-origin')}>
                <Text
                  fontSize={TextStringSizeEnum.md}
                  style={tailwind('text-origin')}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ConditionalFragment>
      <Text fontSize={TextStringSizeEnum.base}>{feature_content}</Text>
    </View>
  );
};

export default HouseFeature;
