/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRef } from 'react';
import { Comic_Neue } from 'next/font/google';
import { useShoplist, type ItemProps } from '@/context/shoplistContext';
import { type AxiosError } from 'axios';
import { toast } from 'react-toastify';

import Spinner from '../Spinner';
import api from '@/services/api';

interface CreateItemProps {
  userId: string;
  description: string;
}

interface PurchaseItemProps {
  id: string;
  userId: string;
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

export function ShopList(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const { shoplist, setShoplist, userId, loading, setLoading } = useShoplist();

  async function createItem(
    userId: string,
    description: string
  ): Promise<ItemProps | undefined> {
    try {
      const payload = { userId, description };
      setLoading(true);

      const res = await api.post<CreateItemProps, ResponseItemProps>(
        payload,
        '/items'
      );

      setLoading(false);

      return res.data.data;
    } catch (e) {
      const error = e as AxiosError;
      setLoading(false);
      toast.error(
        error.response?.status === 403
          ? 'O nome do item precisa ter mais de 2 caracteres.'
          : 'Ocorreu um erro ao registrar o item, tente novamente.'
      );
    }
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

    const updatedItem = await createItem(userId, inputValue);
    if (updatedItem !== undefined) {
      updateShoplist(idx, updatedItem);
      toast.success('Item registrado com sucesso!');
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  async function handleCheckedChange(
    item: ItemProps,
    idx: number
  ): Promise<void> {
    try {
      if (item.isPurchased) {
        return;
      }

      const payload = {
        id: item.id as string,
        userId
      };

      setLoading(true);
      const res = await api.post<PurchaseItemProps, ResponseItemProps>(
        payload,
        '/items/purchase'
      );
      setLoading(false);

      const updatedItem = res.data.data;

      setShoplist((prevShoplist: ItemProps[]): ItemProps[] => {
        return prevShoplist.map((item, index) =>
          index === idx ? updatedItem : item
        );
      });

      toast.success('Item comprado com sucesso!');
    } catch (e) {
      setLoading(false);
      toast.error(
        'Ocorreu um erro ao marcar o item como comprado, tente novamente.'
      );
    }
  }

  return (
    <div
      className={`relative flex w-[90%] max-w-[800px] h-[550px] bg-neutral-50 shadow-[0_2px_8px_rgba(0,0,0,0.3) overflow-hidden mx-auto my-0 rounded-[10px] before:content-[''] before:absolute before:w-[60px] before:bg-gradient-radial before:bg-repeat-y before:bg-[length:30px_30px] before:box-border before:border-r-[3px] before:border-r-[#D44147] before:border-solid before:left-0 before:inset-y-0 ${comicNeue.className}`}
    >
      {loading && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <Spinner className="h-10 w-10" />
        </div>
      )}

      <div
        className={`absolute ${
          !loading ? 'bg-gradient-linear-lines' : ''
        } bg-[length:30px_30px] left-[60px] right-0 inset-y-[20px] overflow-y-auto`}
      >
        <ul className="text-[#555] text-[22px]">
          {shoplist?.map((item: ItemProps, idx: number) => {
            return (
              <div key={item.id ?? idx} className="flex ml-2 items-start">
                <li
                  className={`ml-4 w-full transition-all duration-200 hover:cursor-pointer break-all inline-flex `}
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
  );
}
