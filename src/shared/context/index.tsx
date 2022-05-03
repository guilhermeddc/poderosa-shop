import React from 'react';

import {BackgroundProvider} from './background';

interface IProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<IProps> = ({children}) => {
  return <BackgroundProvider>{children}</BackgroundProvider>;
};
