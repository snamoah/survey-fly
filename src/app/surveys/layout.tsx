import { redirectToNotFoundIfNotSignedIn } from '@/lib/auth';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await redirectToNotFoundIfNotSignedIn();

  return <>{children}</>;
};

export default Layout;
