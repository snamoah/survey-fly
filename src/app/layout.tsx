import './globals.css';
import { Montserrat } from 'next/font/google';

import { classNames } from '@/utils';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'Survey Fly',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classNames(montserrat.className)}>{children}</body>
    </html>
  );
}
