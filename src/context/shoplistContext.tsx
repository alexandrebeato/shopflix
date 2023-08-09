/* eslint-disable @typescript-eslint/no-floating-promises */
// ShoplistContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react';
import { type AxiosResponse } from 'axios';

import api from '@/services/api';
import { type CookieResponse } from '@/services/interceptor';

export interface ItemProps {
  userId?: string;
  description: string;
  isPurchased: boolean;
  purchasedAt?: string;
  id?: string;
  createdAt?: string;
}

interface ShoplistContextProps {
  shoplist: ItemProps[];
  setShoplist: React.Dispatch<React.SetStateAction<ItemProps[]>>;
  userId: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShoplistContext = createContext<ShoplistContextProps>({
  shoplist: [],
  setShoplist: () => {},
  userId: '',
  loading: false,
  setLoading: () => {}
});

export const useShoplist = () => useContext(ShoplistContext);

export const ShoplistProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [shoplist, setShoplist] = useState<ItemProps[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const userId = await fetchUserId();
        setUserId(userId);
        const items = await fetchItems();
        items.push({ description: '', isPurchased: false });
        setShoplist(items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  async function fetchUserId(): Promise<string> {
    const res = await api.get<CookieResponse>(
      '/api/cookies',
      {},
      'http://localhost:3000'
    );
    return res.data.userData.userId;
  }

  async function fetchItems(): Promise<ItemProps[]> {
    const res = await api.get<AxiosResponse>('/items', {});
    return res.data.data;
  }

  return (
    <ShoplistContext.Provider
      value={{ shoplist, setShoplist, userId, loading, setLoading }}
    >
      {children}
    </ShoplistContext.Provider>
  );
};
