import React from 'react';
import SafeImage from '@gitroom/react/helpers/safe.image';

export const LogoTextComponent = () => {
  return (
    <span className="inline-flex max-w-full items-center gap-[12px]">
      <SafeImage
        src="/q-and-a-icon.png"
        width={44}
        height={44}
        alt=""
        className="shrink-0 rounded-[6px]"
      />
      <span className="text-[18px] font-semibold leading-tight">
        Q and A Social Manager
      </span>
    </span>
  );
};
