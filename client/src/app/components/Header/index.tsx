import Image from 'next/image';
import { FiMoon, FiSun } from 'react-icons/fi';

import shopflixLogo from '../../../assets/images/shopflix.png';
import useThemeSwitcher from '@/app/utils/hooks/useThemeSwitcher';

export default function Header(): JSX.Element {
  const [theme, setTheme] = useThemeSwitcher();

  function handleToggleTheme(): void {
    setTheme((previousTheme) => (previousTheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <header className="flex items-center h-20 justify-between flex-wrap bg-teal-500 p-6 sm:flex-col sm:h-fit">
      <Image src={shopflixLogo} width={130} height={100} alt="Shopflix Logo" />
      <div className="text-xl flex items-center  sm:flex-col sm:mt-5 lg:flex-row">
        <a className="block sm:mt-4 lg:inline-block mt-0 text-teal-200 hover:text-white mr-12 sm:mr-0 hover:cursor-pointer">
          {theme === 'dark' ? (
            <FiMoon size={25} onClick={handleToggleTheme} />
          ) : (
            <FiSun size={25} onClick={handleToggleTheme} />
          )}
        </a>
        {/* <a
          href="#responsive-header"
          className="block sm:mt-4 lg:inline-block mt-0 text-teal-200 hover:text-white mr-12 sm:mr-0"
        >
          TODO: Recycled Paper
        </a> */}
        <a className="block sm:mt-4 lg:inline-block mt-0 text-teal-200 hover:text-white sm:mr-0 select-non">
          Limpar lista
        </a>
      </div>
    </header>
  );
}
