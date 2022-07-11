import React from 'react';

declare module 'react-native-store-view';

export declare module 'react-native-loading-dots' {
  interface JumpingDotsProps {
    dots?: number;
    colors?: Array<number>;
    size?: number;
    bounceHeight?: number;
    components?: React.ReactNode | null;
  }

  const JumpingDots: React.FC<JumpingDotsProps>;

  export default JumpingDots;
}
