'use client';

import { useState, useTransition } from 'react';

import { sendEmailLink } from '@/lib/auth';
import { clientStorage } from '@/lib/storage';

export const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const loginWithEmail = async () => {
    clientStorage.setItem('email', email);
    await sendEmailLink(email);
    setIsEmailSent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(loginWithEmail);
  };

  return isEmailSent ? (
    <div className="flex flex-col gap-2">
      <h3 className="font-light text-slate-700">
        Email has been sent to{' '}
        <em className="rounded-sm bg-slate-100 px-3 py-1 font-sans font-bold text-orange-500">
          {email}
        </em>
      </h3>
      <p className="text-xs text-slate-500">
        Check your email and click the link to complete the login.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="text-xs" htmlFor="email">
        You will receive an email to login
      </label>
      <input
        required
        id="email"
        name="email"
        type="email"
        value={email}
        placeholder="e.g. johndoe@example.com"
        className="w-full rounded bg-slate-100 p-3 text-sm outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button disabled={isPending} type="submit" className="btn bg-orange-400">
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
