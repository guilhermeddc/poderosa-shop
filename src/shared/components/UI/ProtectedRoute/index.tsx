import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {useAuth} from 'shared/hooks';

interface IProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProps> = ({children}) => {
  const {user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return <>{user ? children : null}</>;
};
