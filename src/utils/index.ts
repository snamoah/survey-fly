import type { UserRecord } from 'firebase-admin/auth';

export const classNames = (...classes: (string | boolean | undefined)[]) => {
  return classes
    .filter((name) => typeof name === 'string')
    .filter(Boolean)
    .join(' ');
};

export const isAnonymousUser = (user: UserRecord) =>
  user.providerData.length === 0;
