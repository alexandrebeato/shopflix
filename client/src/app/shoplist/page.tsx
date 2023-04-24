'use client';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function ShopList(): JSX.Element {
  const [testList, setTestList] = useState<any>([]);

  useEffect(() => {
    setTestList([
      {
        text: 'Eat Breakfeastkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'
      },
      {
        text: 'Feed Pugsly, the coasdasdsadasdsadw'
      },
      {
        text: 'Prepare Dinner'
      },
      {
        text: 'Join a hangout in google+'
      },
      {
        text: 'Call mom'
      },
      {
        text: 'Tweet about feeding my cow, pugsly'
      }
    ]);
  }, []);

  return (
    <div className="h-screen leading-[30px]">
      <Header />
      <main
        className="h-full sm:h-48 flex items-center justify-center"
        style={{
          height: 'calc(100vh - 80px)'
        }}
      >
        <div className="relative w-[90%] max-w-[800px] h-[400px] bg-neutral-50 shadow-[0_2px_8px_rgba(0,0,0,0.3)] overflow-hidden mx-auto my-0 rounded-[10px] before:content-[''] before:absolute before:w-[60px] before:bg-gradient-radial before:bg-repeat-y before:bg-[length:30px_30px] before:box-border before:border-r-[3px] before:border-r-[#D44147] before:border-solid before:left-0 before:inset-y-0">
          <div className="absolute bg-gradient-linear-lines bg-[length:30px_30px] left-[60px] right-0 inset-y-[20px]">
            <ul className="text-[#555] text-[22px]">
              {testList.map((item: any, idx: number) => {
                return (
                  <div key={idx} className="flex ml-10 items-start">
                    <input type="checkbox" className="mt-2" />
                    <li
                      className="capitalize ml-4 hover:bg-gray-200 transition-all duration-200 hover:cursor-pointer break-all inline-flex"
                      key={idx}
                    >
                      <p className="inline">{item.text}</p>
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
