import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
import { MediaLayoutComponent } from '@gitroom/frontend/components/new-layout/layout.media.component';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Media | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};

export default async function Page() {
  return <MediaLayoutComponent />
}
