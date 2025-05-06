'use client';

import { ErrorBoundary } from 'react-error-boundary';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-svh w-full flex-col box-border">
      <header className="sticky w-full top-0 z-30 flex h-14  items-center justify-center gap-4 border-b bg-background  px-4 ">
        <h1 className="text-2xl font-bold text-white">Prompt A</h1>
        <nav className="flex flex-row gap-2 pl-6">
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
          <a href="/prompts" className="text-white hover:underline">
            Prompts
          </a>
        </nav>
        <div className="flex-0" />
      </header>
      <main className="box-border flex-1 overflow-hidden">{children}</main>
    </div>
  );
};

function Fallback({ error }: { error: Error }) {
  return <p>Error: {error.message ?? 'Something went wrong!'}</p>;
}

const PromptLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <Layout>
      <ErrorBoundary key={pathname} FallbackComponent={Fallback}>
        <div className="flex flex-col h-full box-border">{children}</div>
      </ErrorBoundary>
    </Layout>
  );
};

export default PromptLayout;
