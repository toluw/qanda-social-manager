import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: `Agents | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};

export default async function Page() {
  return redirect('/agents/new');
}
