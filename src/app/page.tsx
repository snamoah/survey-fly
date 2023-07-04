import Link from 'next/link';
import Image from 'next/image';

import Logo from '@/ui/Logo';
import { DashboardImage } from '@/ui/images';
import { isValidSession } from '@/lib/auth';

export default async function LandingPage() {
  const isAuthenticated = await isValidSession();

  return (
    <main className="min-h-screen">
      <header className="relative grid grid-flow-row bg-slate-800">
        <nav className="flex h-20 items-center justify-between px-8 text-white">
          <Logo />
          <ul>
            <li>
              <Link href="/dashboard">See Demo</Link>
            </li>
          </ul>
          <ul>
            {isAuthenticated ? (
              <li>
                <Link href="/dashboard">Go to Dashboard</Link>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <section className="mt-20 flex flex-col items-center gap-8 text-center text-white">
          <h1 className="text-4xl font-semibold">Create beautiful surveys</h1>
          <p>
            Creating surveys should not be boring.
            <br /> Easily create and manage your surveys all from one dashboard.
          </p>

          <div className="relative flex h-80  w-full flex-col items-center">
            <div className="absolute box-content">
              <Image
                width={800}
                height={800}
                src={DashboardImage}
                alt="Image of SurveyFly dashboard"
                className="rounded-sm shadow-md ring-1"
              />
            </div>
          </div>
        </section>
      </header>
      <section></section>
      <section></section>
      <footer></footer>
    </main>
  );
}
