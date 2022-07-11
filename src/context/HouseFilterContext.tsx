import React, {createContext, useCallback, useContext, useState} from 'react';
import {noop} from 'react-use/lib/misc/util';
import {CountryEnum} from '../swagger/funwoo.api';

export type CountryOfAreaFilter = CountryEnum | 'ALL';

interface HouseFilterContextStore {
  showAreaFilter: boolean;
  showTypeFilter: boolean;
  country: CountryOfAreaFilter;

  triggerAreaFilter: () => void;
  triggerTypeFilter: () => void;
  setCountry: (country: CountryOfAreaFilter) => void;
}

const HouseFilterContext = createContext<HouseFilterContextStore>({
  showAreaFilter: false,
  showTypeFilter: false,
  country: 'ALL',

  triggerAreaFilter: noop,
  triggerTypeFilter: noop,
  setCountry: noop,
});

export const HouseFilterContextProvider: React.FC = ({children}) => {
  const [showAreaFilter, setShowAreaFilter] = useState<boolean>(false);
  const [showTypeFilter, setShowTypeFilter] = useState<boolean>(false);

  const [country, setCountry] = useState<CountryOfAreaFilter>('ALL');

  const triggerAreaFilter = useCallback(
    () => setShowAreaFilter(prev => !prev),
    [],
  );
  const triggerTypeFilter = useCallback(
    () => setShowTypeFilter(prev => !prev),
    [],
  );

  return (
    <HouseFilterContext.Provider
      value={{
        showAreaFilter,
        showTypeFilter,
        country,

        triggerAreaFilter,
        triggerTypeFilter,
        setCountry,
      }}>
      {children}
    </HouseFilterContext.Provider>
  );
};

export const useHouseFilterContext = () => useContext(HouseFilterContext);
