import { APP_NAME, APP_DESCRIPTION } from '@gitroom/frontend/branding';
export const dynamic = 'force-dynamic';
import { AdminErrorsComponent } from '@gitroom/frontend/components/admin/admin-errors.component';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Admin Errors | ${APP_NAME}`,
  description: APP_DESCRIPTION,
};

export default async function Page() {
  return (
    <div className="bg-newBgColorInner flex-1 flex-col flex p-[20px] gap-[12px]">
      <AdminErrorsComponent />
    </div>
  );
}
