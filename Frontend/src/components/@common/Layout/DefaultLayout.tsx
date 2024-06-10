import { PropsWithChildren } from 'react';

import { IndieroHeader, NavigationBar } from '@/components/@common';

function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <IndieroHeader />
      {children}
      <NavigationBar />
    </>
  );
}

export default DefaultLayout;
