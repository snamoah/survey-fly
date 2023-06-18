import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      <nav className="h-16 bg-blue-900"></nav>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
