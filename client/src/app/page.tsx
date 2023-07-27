'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useTheme } from 'next-themes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosError } from 'axios';

import shopflixLogo from '../assets/images/shopflix.png';
import shopflixBackground from '../assets/images/shopflix-bg.png';
import shopflixWhiteBackground from '../assets/images/shopflix-bg-white.png';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import api from '@/services/api';

const validationSchema = z.object({
  email: z
    .string()
    .nonempty('Email é obrigatório.')
    .email({ message: 'Informe um e-mail válido.' }),
  password: z
    .string()
    .min(8, { message: 'Senha precisa ter no mínimo 8 caracteres.' })
    .nonempty('Senha é obrigatório.')
});

type FormProps = z.infer<typeof validationSchema>;

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    token: string;
  };
}

export default function Login(): JSX.Element {
  const { theme } = useTheme();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm<FormProps>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleFormSubmit: SubmitHandler<FormProps> = async (
    data: FormProps
  ): Promise<any> => {
    try {
      const payload = {
        email: data.email,
        password: data.password
      };

      const res = await api.post<LoginProps, LoginResponse>(
        payload,
        '/users/login'
      );

      await api.post(
        { token: res.data.data.token },
        '/api/cookies',
        {},
        'http://localhost:3000'
      );

      router.push('/shoplist');
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  };

  useEffect(() => {
    setError('email', {
      message: undefined
    });
    setError('password', {
      message: undefined
    });
  }, []);

  return (
    <div className="bg-slate-100 dark:bg-[#111726] select-none">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `${
              theme === 'light'
                ? `url(${shopflixWhiteBackground.src})`
                : `url(${shopflixBackground.src})`
            }`,
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

        <div className="flex items-center w-full max-w-md px-6 mx-auto relative lg:w-2/6">
          <ThemeSwitcher className="absolute top-2 left-1/2 transform -translate-x-1/2 cursor-pointer" />
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
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="exemplo@exemplo.com"
                    className={`${
                      errors.email?.message !== undefined
                        ? 'border border-red-500'
                        : ''
                    }  focus:outline-none relative block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700focus:outline-none`}
                  />
                  {errors.email?.message !== undefined && (
                    <p className="absolute text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mt-8">
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
                    {...register('password')}
                    type="password"
                    placeholder="Sua senha"
                    className={`${
                      errors.password?.message !== undefined
                        ? 'border border-red-500'
                        : ''
                    } block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:outline-none`}
                  />
                  {errors.password?.message !== undefined && (
                    <p className="absolute text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="mt-10 sm:mt-11">
                  <button
                    type="submit"
                    disabled={Object.entries(errors).length > 0}
                    className="w-full cursor-pointer px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md  disabled:bg-blue-400 disabled:cursor-default focus:outline-none "
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
