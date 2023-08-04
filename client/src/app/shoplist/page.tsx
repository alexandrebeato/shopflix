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

interface ItemProps {
  userId?: string;
  description: string;
  isPurchased: boolean;
  purchasedAt?: string;
  id?: string;
  createdAt?: string;
}

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: '400' });

async function getItems(): Promise<ItemProps[] | undefined> {
  try {
    const res = await api.get<AxiosResponse>('/items', {});

    return res.data.data;
  } catch (e) {
    const error = e as AxiosError;
    console.log(error);
  }
}

export default function ShopList(): JSX.Element {
  const [shoplist, setShoplist] = useState<ItemProps[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(shoplist);

  useEffect(() => {
    (async () => {
      const items = await getItems();
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

  function handleCheckedChange(idx: number): void {
    setShoplist((prevShoplist) =>
      prevShoplist.map((item, index) =>
        index === idx ? { ...item, isPurchased: !item.isPurchased } : item
      )
    );
  }

  async function handleAddItem(
    idx: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> {
    if (event.key === 'Enter') {
      const inputValue = inputRef.current?.value ?? '';
      if (inputValue.trim() !== '') {
        try {
          const cookies = await api.get<CookieResponse>(
            '/api/cookies',
            {},
            'http://localhost:3000'
          );

          const payload = {
            userId: cookies.data.userData.userId,
            description: inputValue
          };

          const updatedItem = await api.post<CreateItemProps, any>(
            payload,
            '/items'
          );

          console.log(updatedItem);

          // if (inputRef?.current !== null) {
          //   inputRef.current.value = '';
          // }

          setShoplist((prevShoplist: ItemProps[]): ItemProps[] =>
            prevShoplist.map((item, index) =>
              index === idx ? updatedItem.data.data : item
            )
          );

          setShoplist((prevShoplist: ItemProps[]): ItemProps[] => {
            return [
              ...prevShoplist,
              { description: '', isPurchased: 'false' }
            ] as ItemProps[];
          });

          toast.success('Item registrado com sucesso!');
        } catch (e) {
          const error = e as AxiosError;
          console.log(error, 'ERRO POST');
          toast.error(
            error.response?.status === 403
              ? 'O nome do item precisa ter mais de 2 caracteres.'
              : 'Ocorreu um erro ao registrar o item, tente novamente.'
          );
        }
      }
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
                  <div key={idx} className="flex ml-2 items-start">
                    <li
                      className={`capitalize ml-4 w-full transition-all duration-200 hover:cursor-pointer break-all inline-flex `}
                      onClick={() => {
                        handleCheckedChange(idx);
                      }}
                      key={idx}
                    >
                      {item.description === '' && (
                        <input
                          ref={inputRef}
                          className="inline select-none border-none outline-none bg-transparent w-full"
                          onKeyDown={async (e) => {
                            await handleAddItem(idx, e);
                          }}
                        />
                      )}
                      {item.description !== '' && (
                        <p
                          className={`inline select-none ${
                            item.isPurchased ? 'line-through' : ''
                          }`}
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
