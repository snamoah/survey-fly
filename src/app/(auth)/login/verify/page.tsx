'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Logo from '@/ui/Logo';

import { verifyLoginLink } from '../helpers';

const Page = () => {
  const router = useRouter();

  /**
   * Handle redirection client side
   */
  useEffect(() => {
    const handleLogin = async () => {
      const { error } = await verifyLoginLink();
      if (error) {
        router.replace('/login');
      }

      router.replace('/dashboard');
    };

    handleLogin();
  }, [router]);

  return (
    <div className="grid h-screen w-screen place-content-center">
      <Logo className="animate-pulse text-4xl duration-300" />
    </div>
  );
};

export default Page;
