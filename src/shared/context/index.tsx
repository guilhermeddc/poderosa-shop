import React from 'react';

import {AuthProvider} from './auth';
import {BackgroundProvider} from './background';
import {CartProvider} from './cart';

interface IProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<IProps> = ({children}) => {
  return (
    <BackgroundProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </BackgroundProvider>
  );
};
