'use client';
import { SessionProvider as NextSessionProvider } from 'next-auth/react';

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <NextSessionProvider>{children}</NextSessionProvider>;
};

export default SessionProvider;
