import './globals.css';
import { Montserrat } from 'next/font/google';

import { classNames } from '@/utils';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'SurveyFly',
  description:
    "Surveys don't have to be boring. Create beatiful engaging surveys.",
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
