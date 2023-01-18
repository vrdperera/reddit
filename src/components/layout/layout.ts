import { ReactNode } from 'react';

interface iLayoutProps {
  children: ReactNode;
}

function Layout({ children }: iLayoutProps) {
  return (
    <>
      // <Nav />
      <main> {children}</main>
    </>
  );
}

export default Layout;
