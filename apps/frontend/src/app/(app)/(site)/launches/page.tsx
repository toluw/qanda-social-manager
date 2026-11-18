import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
export const dynamic = 'force-dynamic';
import { LaunchesComponent } from '@gitroom/frontend/components/launches/launches.component';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: `Calendar | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};
export default async function Index() {
  return <LaunchesComponent />;
}
