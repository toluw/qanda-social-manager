import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
import { LifetimeDeal } from '@gitroom/frontend/components/billing/lifetime.deal';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: `Lifetime deal | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};
export default async function Page() {
  return <LifetimeDeal />;
}
