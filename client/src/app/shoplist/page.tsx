'use client';
import { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import '../input.css';

interface ITestList {
  text: string;
  checked: boolean;
}

export default function ShopList(): JSX.Element {
  const [testList, setTestList] = useState<ITestList[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTestList([
      {
        text: '',
        checked: false
      }
    ]);
  }, []);

  function handleCheckedChange(idx: number): void {
    setTestList((prevTestList) =>
      prevTestList.map((item, index) =>
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
        setTestList((prevTestList) =>
          prevTestList.map((item, index) =>
            index === idx ? { checked: false, text: inputValue } : item
          )
        );

        setTestList((prevTestList) => [
          ...prevTestList,
          { checked: false, text: '' }
        ]);

        if (inputRef.current !== null) {
          inputRef.current.value = '';
        }
        // Clear the input value after adding the new item
      }
    }
  }

  return (
    <div className="h-screen leading-[30px]">
      <Header />
      <main
        className="h-full sm:h-48 flex items-center justify-center"
        style={{
          height: 'calc(100vh - 80px)'
        }}
      >
        <div className="relative flex w-[90%] max-w-[800px] h-[400px] bg-neutral-50 shadow-[0_2px_8px_rgba(0,0,0,0.3)] overflow-hidden mx-auto my-0 rounded-[10px] before:content-[''] before:absolute before:w-[60px] before:bg-gradient-radial before:bg-repeat-y before:bg-[length:30px_30px] before:box-border before:border-r-[3px] before:border-r-[#D44147] before:border-solid before:left-0 before:inset-y-0">
          <div className="absolute bg-gradient-linear-lines bg-[length:30px_30px] left-[60px] right-0 inset-y-[20px] overflow-y-scroll">
            <ul className="text-[#555] text-[22px]">
              {testList.map((item: ITestList, idx: number) => {
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
