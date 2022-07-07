import React from 'react';
import AnimationFunwooHeader from '../../../components/layout/AnimationFunwooHeader';
import HomeScreenBanner from './components/HomeScreenBanner';

const HomeScreen = () => {
  return (
    <AnimationFunwooHeader
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <HomeScreenBanner />
    </AnimationFunwooHeader>
  );
};
export default HomeScreen;
