import {useContext} from 'react';

import {
  BackgroundProvider,
  BackgroundContext,
  IContextBackground,
} from 'shared/context/background';

function useBackground(): IContextBackground {
  const context = useContext(BackgroundContext);

  if (!context) {
    throw new Error('useBackground must be used within an TitleProvider');
  }

  return context;
}

export {BackgroundProvider, useBackground};
