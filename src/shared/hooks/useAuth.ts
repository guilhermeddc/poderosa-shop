import {useContext} from 'react';

import {AuthProvider, AuthContext, IContextAuth} from 'shared/context/auth';

function useAuth(): IContextAuth {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
