import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {CustomTabIcon} from '../assets/fonts';
import HomeScreen from '../screens/entrance/HomeScreen';
import MoreScreen from '../screens/entrance/MoreScreen';
import {PageNames} from './PageNames';

const Tab = createBottomTabNavigator();

const EntranceNavigatorTabs = () => {
  const getRouteTitle = useCallback((name: string) => {
    switch (name) {
      case PageNames.home:
        return '首頁';
      case PageNames.search:
        return '買屋';
      case PageNames.fav:
        return '我的收藏';
      case PageNames.sell:
        return '賣屋';
      case PageNames.more:
        return '更多';
      default:
        break;
    }
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={{
                fontFamily: 'NotoSansTC-Regular',
                fontSize: 12,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 18,
                letterSpacing: 0.4,
                textAlign: 'center',
                color: focused ? '#1c1e21' : '#6d6d6d',
              }}>
              {getRouteTitle(route?.name)}
            </Text>
          );
        },
        tabBarIcon: ({size, focused}) => {
          const state = focused ? 'active' : 'inactive';
          const color = focused ? 'black' : 'gray';
          switch (route.name) {
            case PageNames.home:
              return (
                <CustomTabIcon
                  name={`home-${state}`}
                  size={size}
                  color={color}
                />
              );
            case PageNames.search:
              return (
                <CustomTabIcon
                  name={`search-${state}`}
                  size={size}
                  color={color}
                />
              );
            case PageNames.fav:
              return (
                <CustomTabIcon
                  name={`fav-${state}`}
                  size={size}
                  color={color}
                />
              );
            case PageNames.sell:
              return (
                <CustomTabIcon
                  name={`sell-${state}`}
                  size={size}
                  color={color}
                />
              );
            case PageNames.more:
              return (
                <CustomTabIcon
                  name={`more-${state}`}
                  size={size}
                  color={color}
                />
              );
            default:
              break;
          }
        },
      })}
      defaultScreenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabelStyle: {
          marginBottom: 5,
        },
      }}>
      <Tab.Screen
        name={PageNames.home}
        options={{
          title: '首頁',
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={PageNames.search}
        options={{
          title: '買屋',
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={PageNames.fav}
        options={{
          title: '我的收藏',
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={PageNames.sell}
        options={{
          title: '賣屋',
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={PageNames.more}
        options={{
          title: '更多',
          headerShown: false,
        }}
        component={MoreScreen}
      />
    </Tab.Navigator>
  );
};
export default EntranceNavigatorTabs;
