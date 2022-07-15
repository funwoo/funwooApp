import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Noop} from '../utils';

interface MyFavoriteContextState {
  sids: Array<string>;
  deFavoriteSid: string | null;
  updateFavorite: (sid: string) => void;
  reFavorite: () => void;
}

const MyFavoriteContext = React.createContext<MyFavoriteContextState>({
  sids: [],
  deFavoriteSid: null,
  updateFavorite: Noop,
  reFavorite: Noop,
});

const MyFavoriteContextProvider = ({children}: {children: ReactNode}) => {
  const [sids, setSids] = useState<Array<string>>([]);
  const [deFavoriteSid, setDeFavoriteSid] = useState<string | null>(null);

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

  useEffect(() => {
    let id: NodeJS.Timeout | null = null;
    if (!deFavoriteSid) {
      if (id) {
        clearTimeout(id);
      }
      return;
    }

    id = setTimeout(() => setDeFavoriteSid(null), 5000);

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [deFavoriteSid]);

  const updateFavorite = useCallback(async (sid: string) => {
    setSids(prev => {
      const hadFavorite = prev.includes(sid);

      if (!hadFavorite) {
        return [...prev, sid].sort();
      } else {
        setDeFavoriteSid(sid);
        return prev.filter(_sid => _sid !== sid).sort();
      }
    });
  }, []);

  const reFavorite = useCallback(() => {
    if (deFavoriteSid) {
      updateFavorite(deFavoriteSid);
      setDeFavoriteSid(null);
    }
  }, [deFavoriteSid]);

  return (
    <MyFavoriteContext.Provider
      value={{
        sids,
        deFavoriteSid,
        updateFavorite,
        reFavorite,
      }}>
      {children}
    </MyFavoriteContext.Provider>
  );
};
const useMyFavoriteContext = () => {
  return useContext(MyFavoriteContext);
};
export {MyFavoriteContextProvider, useMyFavoriteContext};
