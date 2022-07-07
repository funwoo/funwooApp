import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';
import {Noop} from '../utils';

interface MyFavoriteContextState {
  sids: Array<string>;
  updateFavorite: (sid: string, isFavorite: boolean) => void;
}

const MyFavoriteContext = React.createContext<MyFavoriteContextState>({
  sids: [],
  updateFavorite: Noop,
});

const MyFavoriteContextProvider = ({children}: {children: ReactNode}) => {
  const [sids, setSids] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await AsyncStorage.getItem('sids');
        if (result) {
          try {
            setSids(JSON.parse(result));
          } catch {
            setSids([]);
          }
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('sids', JSON.stringify(sids));
  }, [sids]);

  const updateFavorite = async (sid: string, isFavorite = false) => {
    if (isFavorite) {
      setSids(prev => [...prev, sid]);
    } else {
      setSids(prev => prev.filter(_sid => _sid !== sid));
    }
  };

  return (
    <MyFavoriteContext.Provider
      value={{
        sids,
        updateFavorite,
      }}>
      {children}
    </MyFavoriteContext.Provider>
  );
};
const useMyFavoriteContext = () => {
  return useContext(MyFavoriteContext);
};
export {MyFavoriteContextProvider, useMyFavoriteContext};
