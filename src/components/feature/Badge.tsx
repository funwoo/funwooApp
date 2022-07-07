import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {ListingStatusEnum} from '../../swagger/funwoo.api';
import Text from '../common/Text/BaseText';

interface Props {
  status: ListingStatusEnum;
}

export default function Badge({status}: Props) {
  const tailwind = useTailwind();
  switch (status) {
    case ListingStatusEnum.Sold:
      return <Text style={tailwind('text-white')}>已售出</Text>;
    // case ListingStatus.PENDING:
    //   return <Text style={tw`text-white`}>PENDING</Text>;
    // case ListingStatus.NEW:
    //   return <Text style={tw`text-white`}>NEW</Text>;
    case ListingStatusEnum.Active:
      return null;
    default:
      return null;
  }
}
