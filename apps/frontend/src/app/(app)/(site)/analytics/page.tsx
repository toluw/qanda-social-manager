import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { PlatformAnalytics } from '@gitroom/frontend/components/platform-analytics/platform.analytics';
export const metadata: Metadata = {
  title: `Analytics | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};
export default async function Index() {
  return <PlatformAnalytics />;
}
