'use client';
import Image from 'next/image';
import shopflixLogo from '../../assets/images/shopflix.png';
import shopflixBackground from '../../assets/images/shopflix-bg.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login(): JSX.Element {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(${shopflixBackground.src})`,
            backgroundPosition: 'center'
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-80">
            <div>
              <h2 className="text-4xl font-bold text-white">SHOPFLIX</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Shopflix é uma lista de compras online para ajudar a organizar
                suas compras em um só lugar. Com uma interface simples e
                intuitiva, você pode adicionar itens à sua lista, categorizá-los
                por loja e compartilhá-los com outras pessoas.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1 ">
            <div className="flex text-center flex-col items-center justify-center">
              <Image
                src={shopflixLogo}
                width={200}
                height={200}
                alt="Shopflix Logo"
              />

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Entre para acessar sua lista de compras
              </p>
            </div>

            <div className="mt-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div>
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
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Senha
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Sua senha"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      router.push('register');
                    }}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Entrar
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Ainda não possui uma conta?{' '}
                <Link
                  href="/register"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Registre-se
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
