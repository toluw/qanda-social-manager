import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: `Authorize Application | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};

export default async function OAuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-[#0B0A0A] flex flex-1 min-h-screen w-screen">
      {children}
    </div>
  );
}
