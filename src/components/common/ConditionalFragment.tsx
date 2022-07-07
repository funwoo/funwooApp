import React from 'react';

const ConditionalFragment: React.FC<{ condition?: boolean }> = ({ children, condition = true }) => {
  if (!condition) return null;

  return <React.Fragment>{children}</React.Fragment>;
};

export default ConditionalFragment;
