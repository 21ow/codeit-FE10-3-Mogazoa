'use client';

import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import Navigation from '@/shared/navigation/Navigation';
import Category from '@/shared/category/Category';
import RankingList from '@/feature/landingpage/RankingList/RankingList';
import styles from './layout.module.scss';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <html lang="ko">
      <Head>
        <title>Mogazoa</title>
        <meta name="description" content="Mogazoa application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <QueryClientProvider client={queryClient}>
          <div className={styles.layout}>
            <header className={styles.header}>
              {!isAuthPage && <Navigation />}
            </header>
            <div className={styles.content}>
              <aside className={styles.aside}>
                {!isMobile && !isAuthPage && <Category />}
              </aside>
              <main className={styles.main}>{children}</main>
              <article className={styles.article}>
                {!isMobile && !isAuthPage && <RankingList />}
              </article>
            </div>
          </div>

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
