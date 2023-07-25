import { redirectToSignInIfNotSignedIn } from '@/lib/auth';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  await redirectToSignInIfNotSignedIn();

  return <>{children}</>;
};

export default Layout;
