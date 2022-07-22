import React, {useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useAppState} from '@react-native-community/hooks';
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const currentAppState = useAppState();
  const firstTimeRef = React.useRef(true);
  useEffect(() => {
    console.log('currentAppState', currentAppState);
    if (currentAppState === 'active') {
      refetch();
    }
  }, [currentAppState, refetch]);
  // useFocusEffect(
  //     React.useCallback(() => {
  //         if (firstTimeRef.current) {
  //             firstTimeRef.current = false;
  //             return;
  //         }

  //         refetch()
  //     }, [refetch])
  // )
}
