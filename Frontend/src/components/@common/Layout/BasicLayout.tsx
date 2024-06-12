import { PropsWithChildren } from 'react';

import { IndieroHeader, NavigationBar } from '@/components/@common';

function BasicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <IndieroHeader />
      {children}
      <NavigationBar />
    </>
  );
}

export default BasicLayout;
