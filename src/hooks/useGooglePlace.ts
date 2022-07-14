import {useEffect, useRef, useState} from 'react';
import axios, {CancelTokenSource, CancelTokenStatic} from 'axios';
import * as RNLocalize from 'react-native-localize';
import DeviceInfo from 'react-native-device-info';
import {useMountedState} from 'react-use';
import {
  Client,
  PlaceAutocompleteType,
} from '@googlemaps/google-maps-services-js';
import {PlaceAutocompleteResponseData} from '@googlemaps/google-maps-services-js/dist/places/autocomplete';
import {isEmptyString} from '../utils';

export const API_KEY = 'AIzaSyBzPTttxb_2u8qwQun452WOfv6Z2DJKtuE';

export interface Term {
  offset: number;
  value: string;
}

const useGooglePlace = (address: string) => {
  const [addresses, setAddresses] =
    useState<PlaceAutocompleteResponseData | null>(null);

  const CancelToken = useRef<CancelTokenStatic>(axios.CancelToken);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const source = useRef<CancelTokenSource | null>(null);

  const isMounted = useMountedState();

  useEffect(() => {
    if (isEmptyString(address)) {
      return () => {
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(async () => {
      if (source.current) {
        source.current.cancel();
      }
      source.current = CancelToken.current.source();
      try {
        const client = new Client();
        const {data} = await client.placeAutocomplete({
          cancelToken: source.current?.token,
          params: {
            input: address,
            key: API_KEY,
            // 回傳語言
            language: RNLocalize.getLocales()[0].languageTag,
            //address mode https://developers.google.com/maps/documentation/places/web-service/autocomplete#place_types
            types: PlaceAutocompleteType.address,
            //限制國家 避免搜尋到其他國家的地址，綁定用戶手機
            components: [`country:${RNLocalize.getLocales()[0].countryCode}`],
            //收費id
            sessiontoken: DeviceInfo.getUniqueId(),
          },
        });

        if (isMounted()) {
          setAddresses(data);
        }
      } catch (error) {
        console.log(error);
        if (isMounted()) {
          setAddresses(null);
        }
      }
    }, 700);
  }, [address]);

  return {addresses};
};

export default useGooglePlace;
