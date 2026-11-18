import { LegalLink } from '@gitroom/frontend/components/ui/legal-link.component';
import { APP_NAME } from '@gitroom/frontend/branding';
import { BillingComponent } from '@gitroom/frontend/components/billing/billing.component';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { Logo } from '@gitroom/frontend/components/new-layout/logo';
import { LogoutComponent } from '@gitroom/frontend/components/layout/logout.component';
import React from 'react';
import { OrganizationSelector } from '@gitroom/frontend/components/layout/organization.selector';

export const BillingAfter = () => {
  const t = useT();
  return (
    <div className="flex-1 rounded-3xl px-0 py-[17px] flex flex-col max-w-[1440px] mx-auto">
      <div>
        <OrganizationSelector asOpenSelect={true} />
      </div>
      <div className="flex justify-center mb-[10px]">
        <Logo />
      </div>
      <div className="text-center mb-[20px] text-xl [@media(max-width:1024px)]:text-xl">
        <h1 className="text-3xl [@media(max-width:1024px)]:text-xl">
          {APP_NAME}
        </h1>
        <p className="mt-[12px]">
          {t(
            'qanda_review_plan_details',
            'Review the selected plan and checkout details before subscribing.'
          )}
        </p>
      </div>
      <BillingComponent />
      <div className="flex flex-wrap gap-[16px] justify-center items-center mt-[20px]">
        <LogoutComponent />
        <LegalLink />
      </div>
    </div>
  );
};
