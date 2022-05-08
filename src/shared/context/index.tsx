import React from 'react';

import {BackgroundProvider} from './background';
import {CartProvider} from './cart';

interface IProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<IProps> = ({children}) => {
  return (
    <BackgroundProvider>
      <CartProvider>{children}</CartProvider>
    </BackgroundProvider>
  );
};
