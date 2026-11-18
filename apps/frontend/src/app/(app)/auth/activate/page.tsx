import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { Activate } from '@gitroom/frontend/components/auth/activate';
export const metadata: Metadata = {
  title: `Activate your account | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};
export default async function Auth() {
  return <Activate />;
}
