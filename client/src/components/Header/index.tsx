import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import ThemeSwitcher from '../ThemeSwitcher';
import api from '@/services/api';
import { useShoplist } from '@/context/shoplistContext';

export function Header(): JSX.Element {
  const { setShoplist, setLoading } = useShoplist();
  const router = useRouter();

  async function handleClearList(): Promise<void> {
    try {
      setLoading(true);

      await api.delete(`/items/list`);

      setShoplist([
        {
          description: '',
          isPurchased: false
        }
      ]);

      setLoading(false);
      toast.success('Lista limpa com sucesso!');
    } catch (e) {
      toast.error('Erro ao limpar a lista, tente novamente.');
    }
  }

  async function handleLogout(): Promise<void> {
    try {
      await api.delete('/api/cookies', {}, 'http://localhost:3000');
      router.push('/');
    } catch (e) {
      router.push('/');
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
        <a className="block lg:inline-block mt-0 ml-12 sm:mr-0 sm:mt-4 sm:ml-0 hover:text-white dark:hover:text-[#3F4347] hover:transition hover:ease-in-out hover: duration-500">
          <FiLogOut size={25} onClick={handleLogout} />
        </a>
      </nav>
    </header>
  );
}
