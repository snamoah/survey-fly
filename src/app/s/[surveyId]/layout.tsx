import type { ReactNode } from 'react';

import { redirectToSignInIfNotSignedIn } from '@/lib/auth';

const Layout = async ({ children }: { children: ReactNode }) => {
  await redirectToSignInIfNotSignedIn({ asGuest: true });
  return <>{children}</>;
};

export default Layout;
