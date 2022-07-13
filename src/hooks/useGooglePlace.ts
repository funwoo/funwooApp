import {useEffect, useRef, useState} from 'react';
import axios, {CancelTokenSource, CancelTokenStatic} from 'axios';
import * as RNLocalize from 'react-native-localize';
import DeviceInfo from 'react-native-device-info';
import {useMountedState} from 'react-use';

export const API_KEY = 'AIzaSyBzPTttxb_2u8qwQun452WOfv6Z2DJKtuE';

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface MainTextMatchedSubstring {
  length: number;
  offset: number;
}

export interface SecondaryTextMatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MainTextMatchedSubstring[];
  secondary_text: string;
  secondary_text_matched_substrings: SecondaryTextMatchedSubstring[];
}

export interface Term {
  offset: number;
  value: string;
}

export interface Prediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}

export interface GooglePlaceResponse {
  predictions: Prediction[];
  status: string;
}

const useGooglePlace = (address: string) => {
  const [addresses, setAddresses] = useState<GooglePlaceResponse | null>(null);

  const CancelToken = useRef<CancelTokenStatic>(axios.CancelToken);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const source = useRef<CancelTokenSource | null>(null);

  const isMounted = useMountedState();

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(async () => {
      if (source.current) {
        source.current.cancel();
      }
      source.current = CancelToken.current.source();
      try {
        const {data} = await axios.get<GooglePlaceResponse>(
          'https://maps.googleapis.com/maps/api/place/autocomplete/json',
          {
            cancelToken: source.current.token,
            params: {
              input: address,
              key: API_KEY,
              // 回傳語言
              language: RNLocalize.getLocales()[0].languageTag,
              //address mode https://developers.google.com/maps/documentation/places/web-service/autocomplete#place_types
              types: 'address',
              //限制國家 避免搜尋到其他國家的地址，綁定用戶手機
              components: 'country:' + RNLocalize.getLocales()[0].countryCode,
              //收費id
              sessiontoken: DeviceInfo.getUniqueId(),
            },
          },
        );
        if (isMounted()) {
          setAddresses(data);
        }
      } catch (error) {
        if (isMounted()) {
          setAddresses(null);
        }
      }
    }, 700);
  }, [address]);

  return {addresses};
};

export default useGooglePlace;
