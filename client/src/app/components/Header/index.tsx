import Image from 'next/image';

import shopflixLogo from '../../../assets/images/shopflix.png';

export default function Header(): JSX.Element {
  return (
    <header className="flex items-center h-20 justify-between flex-wrap bg-teal-500 p-6 sm:flex-col sm:h-fit">
      <Image src={shopflixLogo} width={130} height={100} alt="Shopflix Logo" />
      <div className="text-xl flex items-center  sm:flex-col sm:mt-5 lg:flex-row">
        <a
          href="#responsive-header"
          className="block sm:mt-4 lg:inline-block mt-0 text-teal-200 hover:text-white mr-12 sm:mr-0"
        >
          ThemeS
        </a>
        {/* <a
          href="#responsive-header"
          className="block sm:mt-4 lg:inline-block mt-0 text-teal-200 hover:text-white mr-12 sm:mr-0"
        >
          TODO: Recycled Paper
        </a> */}
        <a
          href="#responsive-header"
          className="block sm:mt-4 lg:inline-block mt-0 text-teal-200 hover:text-white sm:mr-0"
        >
          Sobre
        </a>
      </div>
    </header>
  );
}
