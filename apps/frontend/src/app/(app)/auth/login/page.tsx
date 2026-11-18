import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
export const dynamic = 'force-dynamic';
import { Login } from '@gitroom/frontend/components/auth/login';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: `Login | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};
export default async function Auth() {
  return <Login />;
}
