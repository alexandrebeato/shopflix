'use client';
import Image from 'next/image';
import shopflixLogo from '../../assets/images/shopflix.png';
import { useRouter } from 'next/navigation';

export default function ForgotPassword(): JSX.Element {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-black to-slate-900">
      <div className="flex-1 max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex text-center flex-col items-center justify-center">
          <Image
            src={shopflixLogo}
            width={200}
            height={200}
            alt="Shopflix Logo"
          />

          <p className="mt-3 text-gray-500 dark:text-gray-300">
            Digite seu e-mail e lhe enviaremos um e-mail de recuperação de
            senha.
          </p>
        </div>

        <div className="mt-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="exemplo@exemplo.com"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  router.push('login');
                }}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
