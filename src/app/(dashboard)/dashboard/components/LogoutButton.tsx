'use client';

import { signOut } from '@/app/(auth)/login/helpers';

export const LogoutButton = () => (
  <button
    type="submit"
    onClick={signOut}
    className="rounded-sm px-3 py-2 font-medium text-slate-100 hover:bg-slate-600"
  >
    Logout
  </button>
);
