import { ReactNode } from 'react';

import Navbar from '../navbar/navbar';

interface iLayoutProps {
  children: ReactNode;
}

function Layout({ children }: iLayoutProps) {
  return (
    <>
      <Navbar />
      <main> {children}</main>
    </>
  );
}

export default Layout;
