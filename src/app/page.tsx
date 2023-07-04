import Link from 'next/link';
import Image from 'next/image';

import Logo from '@/ui/Logo';
import { DashboardImage } from '@/ui/images';
import { isValidSession } from '@/lib/auth';

export default async function LandingPage() {
  const isAuthenticated = await isValidSession();

  return (
    <main className="min-h-screen">
      <section className="relative grid grid-flow-row bg-slate-800">
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
        <header className="mt-20 flex flex-col items-center gap-8 text-center text-white">
          <h1 className="text-4xl font-semibold">
            <span className="text-yellow-400">Create</span> beautiful surveys
          </h1>
          <p>
            Creating surveys should not be boring.
            <br /> Easily create and manage your surveys all from one dashboard.
          </p>

          <Link href="/login" className="btn w-1/5 bg-orange-500">
            Get started now!
          </Link>

          <div className="relative flex h-80  w-full flex-col items-center">
            <div className="absolute box-content">
              <Image
                priority
                width={800}
                height={800}
                src={DashboardImage}
                alt="Image of SurveyFly dashboard"
                className="rounded-sm shadow-md ring-1"
              />
            </div>
          </div>
        </header>
      </section>
      <section className="my-60 grid grid-flow-row gap-10 px-20">
        <header>
          <h1 className="text-center text-3xl">Key Features</h1>
          <p className="text-center">
            We provide you with all you need to manage your surveys
          </p>
        </header>
        <div className="relative grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-6 text-center">
            <h2 className="text-base font-semibold">Create</h2>
            <p>
              Easily create surveys with different question options for your use
              case.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 text-center">
            <h2 className="text-base font-semibold">Customize</h2>
            <p>
              Customize the appearance of your surveys to fit your branding.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 text-center">
            <h2 className="text-base font-semibold">Share</h2>
            <p>
              Do you plan to share your survey on social media, embed it in your
              app or email or want a link, we got your covered
            </p>
          </div>
        </div>
      </section>
      <footer className="flex h-36 flex-col justify-end bg-slate-700">
        <p className="mb-6 text-center text-sm text-white">
          Built with ❤️ and ☕️ by{' '}
          <Link
            className="font-bold"
            href="https://snamoah.dev"
            target="_blank"
          >
            @snamoah
          </Link>
        </p>
      </footer>
    </main>
  );
}
