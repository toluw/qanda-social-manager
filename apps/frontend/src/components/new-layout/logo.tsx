'use client';

import SafeImage from '@gitroom/react/helpers/safe.image';

export const Logo = () => {
  return (
    <SafeImage
      src="/q-and-a-icon.png"
      width={60}
      height={60}
      alt="Q and A Social Manager"
      className="mt-[8px] min-w-[60px] min-h-[60px] rounded-[8px]"
    />
  );
};
