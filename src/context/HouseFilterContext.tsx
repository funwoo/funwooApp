import React, {
  createContext,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { noop } from 'react-use/lib/misc/util';
import {
  CountryEnum,
  ListingDetail,
  ListingPaginationEntity,
  SearchListingDto,
} from '../swagger/funwoo.api';
import { useAsync, useAsyncFn } from 'react-use';
import { swaggerHttpClient } from '../swagger';
import { isEmptyArray } from '../utils';
import { FlatList } from 'react-native';

export type CountryOfAreaFilter = CountryEnum | 'ALL';

interface HouseFilterContextStore {
  data: Array<ListingDetail>;
  showAreaFilter: boolean;
  showBuildingTypeFilter: boolean;
  country: CountryOfAreaFilter;
  cities: Array<string>;
  buildingTypesData: Array<string>;
  citiesData: Array<string>;
  buildingType: Array<string>;
  totalCount: number;
  listRef: MutableRefObject<FlatList<ListingDetail> | null>;
  onClose: () => void;
  triggerAreaFilter: () => void;
  triggerBuildingTypeFilter: () => void;
  setCountry: (country: CountryOfAreaFilter) => void;
  setCities: (city: string, concurrently?: boolean) => void;
  setBuildingType: (type: string, concurrently?: boolean) => void;
  resetArea: () => void;
  resetBuildingType: () => void;
  turnPage: () => void;
  search: (skipCache?: boolean) => void;
  registryListRef: (ref: FlatList<ListingDetail>) => void;
}

const HouseFilterContext = createContext<HouseFilterContextStore>({
  data: [],
  showAreaFilter: false,
  showBuildingTypeFilter: false,
  country: 'ALL',
  cities: [],
  buildingTypesData: [],
  citiesData: [],
  buildingType: [],
  totalCount: 0,
  listRef: { current: null },
  onClose: () => { },
  triggerAreaFilter: noop,
  triggerBuildingTypeFilter: noop,
  setCountry: noop,
  setCities: noop,
  setBuildingType: noop,
  resetArea: noop,
  resetBuildingType: noop,
  turnPage: noop,
  search: noop,
  registryListRef: noop,
});

export const HouseFilterContextProvider: React.FC = ({ children }) => {
  const [showAreaFilter, setShowAreaFilter] = useState<boolean>(false);
  const [showBuildingTypeFilter, setShowBuildingTypeFilter] =
    useState<boolean>(false);

  const [country, setCountry] = useState<CountryOfAreaFilter>('ALL');
  const [cities, _setCities] = useState<Array<string>>([]);
  const [buildingType, _setBuildingType] = useState<Array<string>>([]);

  const cachedCountry = useRef<CountryOfAreaFilter>(country);
  const cachedCities = useRef<Array<string>>(cities);
  const cachedBuildingType = useRef<Array<string>>(buildingType);

  const listRef = useRef<FlatList<ListingDetail> | null>(null);

  const [{ value: data, loading }, loadHouse] = useAsyncFn(
    async (
      {
        cities: _cities = [],
        buildingType: _buildingType = [],
        ...criteria
      }: SearchListingDto,
      currentData: Array<ListingDetail> = [],
    ) =>
      await swaggerHttpClient.listingApi
        .search({
          ...criteria,
          cities: isEmptyArray(_cities) ? undefined : _cities,
          buildingType: isEmptyArray(_buildingType) ? undefined : _buildingType,
        })
        .then(res => {
          return {
            ...res.data,
            payload:
              res.data.page <= 1
                ? res.data.payload
                : currentData.concat(res.data.payload),
          } as ListingPaginationEntity;
        }),
    [],
  );

  const { value: totalCount = 0 } = useAsync(async () => {
    if (!showAreaFilter && !showBuildingTypeFilter) {
      return 0;
    }

    const result = await swaggerHttpClient.listingApi.search({
      country: country === 'ALL' ? undefined : country,
      cities: isEmptyArray(cities) ? undefined : cities,
      buildingType: isEmptyArray(buildingType) ? undefined : buildingType,
      paging: {
        page: 1,
        pageSize: 1,
      },
    });

    return result.data.totalCount;
  }, [showAreaFilter, showBuildingTypeFilter, country, cities, buildingType]);

  useEffect(() => {
    loadHouse({
      country:
        cachedCountry.current === 'ALL' ? undefined : cachedCountry.current,
      cities: cachedCities.current,
      buildingType: cachedBuildingType.current,
      paging: {
        page: 1,
        pageSize: 6,
      },
    });
  }, []);

  useEffect(() => {
    setCountry(cachedCountry.current);
    _setCities(cachedCities.current);
  }, [showAreaFilter]);

  useEffect(() => {
    _setBuildingType(cachedBuildingType.current);
  }, [showBuildingTypeFilter]);

  const {
    value: { buildingTypesData, citiesData } = {
      buildingTypesData: [],
      citiesData: [],
    },
  } = useAsync(
    () => swaggerHttpClient.optionApi.getOptionsForBuy().then(res => res.data),
    [],
  );

  const triggerAreaFilter = useCallback(
    () => setShowAreaFilter(prev => !prev),
    [],
  );
  const triggerBuildingTypeFilter = useCallback(
    () => setShowBuildingTypeFilter(prev => !prev),
    [],
  );

  const setCities = useCallback((city: string, concurrently?: boolean) => {
    _setCities(prev => {
      const result = prev.includes(city)
        ? prev.filter(_city => _city !== city)
        : prev.concat(city);

      if (concurrently) {
        console.log('_setCities', { concurrently, result });
        cachedCities.current = result;
      }

      return result;
    });
  }, []);

  const setBuildingType = useCallback(
    (type: string, concurrently?: boolean) => {
      _setBuildingType(prev => {
        const result = prev.includes(type)
          ? prev.filter(_type => _type !== type)
          : prev.concat(type);

        if (concurrently) {
          console.log('_setBuildingType', { concurrently, result });
          cachedBuildingType.current = result;
        }

        return result;
      });
    },
    [],
  );

  const resetArea = useCallback(() => {
    _setCities([]);
    setCountry('ALL');
  }, []);

  const resetBuildingType = useCallback(() => {
    _setBuildingType([]);
  }, []);

  const turnPage = useCallback(() => {
    if (!data || loading) {
      return;
    }

    if (data.totalCount <= data.payload.length) {
      return;
    }

    loadHouse(
      {
        country:
          cachedCountry.current === 'ALL' ? undefined : cachedCountry.current,
        cities: cachedCities.current,
        buildingType: cachedBuildingType.current,
        paging: {
          page: data.page + 1,
          pageSize: data.pageSize,
        },
      },
      data.payload,
    );
  }, [data]);

  const search = useCallback(
    async (skipCache?: boolean) => {
      if (!skipCache) {
        cachedCountry.current = country;
        cachedCities.current = cities;
        cachedBuildingType.current = buildingType;
      }

      await loadHouse({
        country:
          cachedCountry.current === 'ALL' ? undefined : cachedCountry.current,
        cities: cachedCities.current,
        buildingType: cachedBuildingType.current,
        paging: {
          page: 1,
          pageSize: 6,
        },
      });
      setShowAreaFilter(false);
      setShowBuildingTypeFilter(false);

      if (listRef.current) {
        listRef.current?.scrollToIndex({ index: 0 });
      }
    },
    [country, cities, buildingType],
  );
  const onClose = useCallback(() => {
    setShowAreaFilter(false)
  }, [])
  const registryListRef = useCallback((ref: FlatList<ListingDetail>) => {
    listRef.current = ref;
  }, []);

  return (
    <HouseFilterContext.Provider
      value={{
        data: data?.payload ?? [],
        showAreaFilter,
        showBuildingTypeFilter,
        country,
        cities,
        buildingTypesData,
        citiesData,
        buildingType,
        totalCount,
        listRef: listRef,
        onClose: onClose,
        triggerAreaFilter,
        triggerBuildingTypeFilter,
        setCountry,
        setCities,
        setBuildingType,
        resetArea,
        resetBuildingType,
        turnPage,
        search,
        registryListRef,
      }}>
      {children}
    </HouseFilterContext.Provider>
  );
};

export const useHouseFilterContext = () => useContext(HouseFilterContext);
