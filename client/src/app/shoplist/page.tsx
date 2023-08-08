'use client';

import { Header } from '@/components/Header';
import { ShopList } from '@/components/Shoplist';
import { ShoplistProvider } from '@/context/shoplistContext';

export default function ShopListPage(): JSX.Element {
  return (
    <ShoplistProvider>
      <div className="h-screen leading-[30px] sm:overflow-y-hidden">
        <Header />
        <main
          className="h-full flex items-center justify-center bg-[#DCDDE0] dark:bg-[#111726] sm:h-48 sm:block sm:pt-14"
          style={{
            height: 'calc(100vh - 80px)'
          }}
        >
          <ShopList />
        </main>
      </div>
    </ShoplistProvider>
  );
}
