import React, {createContext, useCallback, useEffect, useState} from 'react';
import {feedback} from 'shared/services/alertService';
import {authService} from 'shared/services/api/auth';
import {IUser, userService} from 'shared/services/api/user';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from 'shared/services/firebase';
import {useRouter} from 'next/router';

export interface IContextAuth {
  user: IUser | null;
  signIn: (type: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<IContextAuth>({} as IContextAuth);

interface IProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IProps> = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line
  console.log('*** user', user);

  const router = useRouter();

  const handleSignIn = useCallback(async (type: string) => {
    try {
      const response = await authService.signIn(type);

      if (response) {
        setUser(response);

        // eslint-disable-next-line
        console.log('*** response', response);
        router.push('/');
      }
    } catch (error) {
      feedback(String(error), 'error');
    }
  }, []);

  const handleSignOut = useCallback(() => {
    try {
      authService.signOut();

      setUser({} as IUser);
    } catch (error) {
      feedback(String(error), 'error');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user
        ? userService.getUser(user.uid).then((user) => {
            setUser(user);
          })
        : setUser(null);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signOut: handleSignOut,
        user,
      }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
