/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Comic_Neue } from 'next/font/google';
import { type AxiosResponse, type AxiosError } from 'axios';
import { toast } from 'react-toastify';

import api from '@/services/api';
import Header from '../../components/Header';
import '../input.css';
import { type CookieResponse } from '@/services/interceptor';

interface CreateItemProps {
  userId: string;
  description: string;
}

interface PurchaseItemProps {
  id: string;
  userId: string;
}

interface ItemProps {
  userId?: string;
  description: string;
  isPurchased: boolean;
  purchasedAt?: string;
  id?: string;
  createdAt?: string;
}

interface ResponseItemProps {
  data: {
    userId?: string;
    description: string;
    isPurchased: boolean;
    purchasedAt?: string;
    id?: string;
    createdAt?: string;
  };
}

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: '400' });

export default function ShopList(): JSX.Element {
  const [shoplist, setShoplist] = useState<ItemProps[]>([]);
  const [userId, setUserId] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const items = await fetchItems();
      const userId = await fetchUserId();
      setUserId(userId);
      setShoplist(items as ItemProps[]);
      setShoplist(
        (prevShoplist: ItemProps[]): ItemProps[] =>
          [
            ...prevShoplist,
            { description: '', isPurchased: 'false' }
          ] as ItemProps[]
      );
    })();
  }, []);

  async function fetchItems(): Promise<ItemProps[] | undefined> {
    try {
      const res = await api.get<AxiosResponse>('/items', {});

      return res.data.data;
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  }

  async function fetchUserId(): Promise<string> {
    const res = await api.get<CookieResponse>(
      '/api/cookies',
      {},
      'http://localhost:3000'
    );
    return res.data.userData.userId;
  }

  async function createItem(
    userId: string,
    description: string
  ): Promise<ItemProps> {
    const payload = { userId, description };
    const res = await api.post<CreateItemProps, ResponseItemProps>(
      payload,
      '/items'
    );
    return res.data.data;
  }

  function updateShoplist(idx: number, updatedItem: ItemProps): void {
    setShoplist((prevShoplist: ItemProps[]): ItemProps[] =>
      prevShoplist.map((item, index) => (index === idx ? updatedItem : item))
    );

    setShoplist(
      (prevShoplist: ItemProps[]): ItemProps[] =>
        [
          ...prevShoplist,
          { description: '', isPurchased: 'false' }
        ] as ItemProps[]
    );
  }

  async function handleAddItem(
    event: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ): Promise<void> {
    if (event.key !== 'Enter') {
      return;
    }

    const inputValue = inputRef.current?.value?.trim();
    if (!inputValue) {
      return;
    }

    try {
      const updatedItem = await createItem(userId, inputValue);
      updateShoplist(idx, updatedItem);

      if (inputRef.current) {
        inputRef.current.value = '';
      }

      toast.success('Item registrado com sucesso!');
    } catch (e) {
      const error = e as AxiosError;
      toast.error(
        error.response?.status === 403
          ? 'O nome do item precisa ter mais de 2 caracteres.'
          : 'Ocorreu um erro ao registrar o item, tente novamente.'
      );
    }
  }

  async function handleCheckedChange(
    item: ItemProps,
    idx: number
  ): Promise<void> {
    try {
      const payload = {
        id: item.id as string,
        userId
      };

      const res = await api.post<PurchaseItemProps, ResponseItemProps>(
        payload,
        '/items/purchase'
      );

      const updatedItem = res.data.data;

      setShoplist((prevShoplist: ItemProps[]): ItemProps[] => {
        return prevShoplist.map((item, index) =>
          index === idx ? updatedItem : item
        );
      });

      toast.success('Item comprado com sucesso!');
    } catch (e) {
      console.log(e);
      toast.error(
        'Ocorreu um erro ao marcar o item como comprado, tente novamente.'
      );
    }
  }

  return (
    <div className="h-screen leading-[30px] sm:overflow-y-hidden">
      <Header setShoplist={setShoplist} />
      <main
        className="h-full flex items-center justify-center bg-[#DCDDE0] dark:bg-[#111726] sm:h-48 sm:block sm:pt-14"
        style={{
          height: 'calc(100vh - 80px)'
        }}
      >
        <div
          className={`relative flex w-[90%] max-w-[800px] h-[550px] bg-neutral-50 shadow-[0_2px_8px_rgba(0,0,0,0.3) overflow-hidden mx-auto my-0 rounded-[10px] before:content-[''] before:absolute before:w-[60px] before:bg-gradient-radial before:bg-repeat-y before:bg-[length:30px_30px] before:box-border before:border-r-[3px] before:border-r-[#D44147] before:border-solid before:left-0 before:inset-y-0 ${comicNeue.className}`}
        >
          <div className="absolute bg-gradient-linear-lines bg-[length:30px_30px] left-[60px] right-0 inset-y-[20px] overflow-y-auto">
            <ul className="text-[#555] text-[22px]">
              {shoplist?.map((item: ItemProps, idx: number) => {
                return (
                  <div key={item.id ?? idx} className="flex ml-2 items-start">
                    <li
                      className={`capitalize ml-4 w-full transition-all duration-200 hover:cursor-pointer break-all inline-flex `}
                      key={idx}
                    >
                      {item.description === '' && (
                        <input
                          ref={inputRef}
                          className="inline select-none border-none outline-none bg-transparent w-full"
                          onKeyDown={async (e) => {
                            await handleAddItem(e, idx);
                          }}
                        />
                      )}
                      {item.description !== '' && (
                        <p
                          className={`inline select-none ${
                            item.isPurchased ? 'line-through' : ''
                          }`}
                          onClick={() => {
                            handleCheckedChange(item, idx);
                          }}
                        >
                          {item.description}
                        </p>
                      )}
                      {item.description === '' && (
                        <span
                          className="absolute right-3 text-xl font-bold cursor-default"
                          onClick={() => {}}
                        >
                          ←
                        </span>
                      )}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
