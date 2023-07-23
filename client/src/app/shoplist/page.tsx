'use client';
import { useEffect, useRef, useState } from 'react';
import { Comic_Neue } from 'next/font/google';

import Header from '../../components/Header';
import '../input.css';

export interface ShoplistProps {
  text: string;
  checked: boolean;
}

const comicNeue = Comic_Neue({ subsets: ['latin'], weight: '400' });

export default function ShopList(): JSX.Element {
  const [shoplist, setShoplist] = useState<ShoplistProps[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShoplist([
      {
        text: '',
        checked: false
      }
    ]);
  }, []);

  function handleCheckedChange(idx: number): void {
    setShoplist((prevShoplist) =>
      prevShoplist.map((item, index) =>
        index === idx ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleAddItem(
    idx: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.key === 'Enter') {
      const inputValue = inputRef.current?.value ?? '';
      if (inputValue.trim() !== '') {
        setShoplist((prevShoplist) =>
          prevShoplist.map((item, index) =>
            index === idx ? { checked: false, text: inputValue } : item
          )
        );

        setShoplist((prevShoplist) => [
          ...prevShoplist,
          { checked: false, text: '' }
        ]);

        // Clear the input value after adding the new item
        if (inputRef.current !== null) {
          inputRef.current.value = '';
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
              {shoplist.map((item: ShoplistProps, idx: number) => {
                return (
                  <div key={idx} className="flex ml-2 items-start">
                    <li
                      className={`capitalize ml-4 w-full transition-all duration-200 hover:cursor-pointer break-all inline-flex `}
                      onClick={() => {
                        handleCheckedChange(idx);
                      }}
                      key={idx}
                    >
                      {item.text === '' && (
                        <input
                          ref={inputRef}
                          className="inline select-none border-none outline-none bg-transparent w-full"
                          onKeyDown={(e) => {
                            handleAddItem(idx, e);
                            inputRef.current?.focus();
                          }}
                        />
                      )}
                      {item.text !== '' && (
                        <p
                          className={`inline select-none ${
                            item.checked ? 'line-through' : ''
                          }`}
                        >
                          {item.text}
                        </p>
                      )}
                      {item.text === '' && (
                        <span
                          className="absolute right-3 text-2xl font-bold"
                          onClick={() => {}}
                        >
                          +
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
