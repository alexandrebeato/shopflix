import { type Dispatch, type SetStateAction } from 'react';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import ThemeSwitcher from '../ThemeSwitcher';
import { type ShoplistProps } from '@/app/shoplist/page';

interface HeaderProps {
  setShoplist: Dispatch<SetStateAction<ShoplistProps[]>>;
}

export default function Header({ setShoplist }: HeaderProps): JSX.Element {
  const router = useRouter();

  function handleClearList(): void {
    setShoplist([
      {
        text: '',
        checked: false
      }
    ]);
  }

  async function handleLogout(): Promise<void> {
    try {
      await fetch('http://localhost:3000/api/cookies', {
        method: 'DELETE'
      });
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <header className="flex items-center h-20 p-6 justify-between flex-wrap bg-[#DCDDE0] dark:bg-[#111726] sm:flex-col sm:h-fit">
      <Image
        src="/img/shopflix.png"
        width={130}
        height={100}
        alt="Shopflix Logo"
        className="select-none"
      />
      <nav className="text-xl text-[#575450] flex items-center select-none cursor-pointer dark:text-white sm:flex-col sm:mt-5 lg:flex-row">
        <a className="block mt-0 mr-12 sm:mr-0 sm:mt-4 lg:inline-block">
          <ThemeSwitcher />
        </a>
        <a
          className="block lg:inline-block mt-0  sm:mr-0 sm:mt-4 hover:text-white dark:hover:text-[#3F4347] hover:transition hover:ease-in-out hover: duration-500"
          onClick={handleClearList}
        >
          Limpar lista
        </a>
        <a
          className="block lg:inline-block mt-0 ml-12 sm:mr-0 sm:mt-4 sm:ml-0 hover:text-white dark:hover:text-[#3F4347] hover:transition hover:ease-in-out hover: duration-500"
          onClick={handleClearList}
        >
          <FiLogOut size={25} onClick={handleLogout} />
        </a>
      </nav>
    </header>
  );
}
