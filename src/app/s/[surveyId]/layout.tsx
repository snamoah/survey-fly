import type { ReactNode } from 'react';

import { redirectToNotFoundIfNotSignedIn } from '@/lib/auth';

const Layout = async ({ children }: { children: ReactNode }) => {
  await redirectToNotFoundIfNotSignedIn();
  return <>{children}</>;
};

export default Layout;
