import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
export const dynamic = 'force-dynamic';
import { Forgot } from '@gitroom/frontend/components/auth/forgot';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: `Forgot Password | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};
export default async function Auth() {
  return <Forgot />;
}
