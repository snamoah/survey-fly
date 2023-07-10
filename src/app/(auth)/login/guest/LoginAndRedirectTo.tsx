'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { signInAsGuest } from '../helpers';

type Props = {
  path: string;
  fallback: ReactNode;
};

export const LoginAndRedirectTo = ({ path, fallback }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const { error } = await signInAsGuest();

      if (error) {
        router.replace('/');
      } else {
        router.replace(path);
      }
    };
    handleLogin();
  }, []);

  return <>{fallback}</>;
};
