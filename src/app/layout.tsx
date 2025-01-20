'use client';

import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';
import Navigation from '@/shared/navigation/Navigation';
import Category from '@/shared/category/Category';
import RankingList from '@/feature/landingpage/RankingList/RankingList';
import styles from './layout.module.scss';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth';
  const isRootPage = pathname === '/';

  return (
    <html lang="ko">
      <Head>
        <title>Mogazoa</title>
        <meta name="description" content="Mogazoa application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <QueryClientProvider client={queryClient}>
          {!isAuthPage ? (
            <div className={styles.layout}>
              <header className={styles.header}>
                <Navigation />
              </header>

              <div className={styles.content}>
                {isRootPage && (
                  <aside className={styles.aside}>
                    <Category />
                  </aside>
                )}
                <main className={styles.main}>{children}</main>
                {isRootPage && (
                  <article className={styles.article}>
                    <RankingList />
                  </article>
                )}
              </div>
            </div>
          ) : (
            <>{children}</>
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
