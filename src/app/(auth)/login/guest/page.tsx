import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';

import Logo from '@/ui/Logo';
import { isValidSession } from '@/lib/auth';

import { LoginAndRedirectTo } from './LoginAndRedirectTo';

const isValidUrl = (urlLike: string) => {
  try {
    new URL(urlLike);
    return true;
  } catch (_) {
    return false;
  }
};

const getFromQueryFromUrl = (urlLike: string) => {
  if (isValidUrl(urlLike)) {
    const url = new URL(urlLike);
    return url.searchParams.get('from');
  }

  return null;
};

export default async function GuestLoginPage() {
  const refererFromHeaders = headers().get('X-Url') ?? '';
  const referer = getFromQueryFromUrl(refererFromHeaders) ?? '/dashboard';

  if (await isValidSession()) {
    return redirect(referer, RedirectType.replace);
  }

  return (
    <LoginAndRedirectTo
      path={referer}
      fallback={
        <div className="grid h-screen w-screen place-content-center">
          <Logo className="animate-pulse text-4xl duration-300" />
        </div>
      }
    />
  );
}
