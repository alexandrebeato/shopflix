'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import Button from '@/components/Button';

const validationSchema = z.object({
  email: z
    .string()
    .nonempty('Email é obrigatório.')
    .email({ message: 'Informe um e-mail válido.' })
});

type FormProps = z.infer<typeof validationSchema>;

export default function ForgotPassword(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
      email: ''
    }
  });

  const handleFormSubmit: SubmitHandler<FormProps> = async (
    data: FormProps
  ): Promise<void> => {
    setLoading(true);
    console.log(data);
  };

  useEffect(() => {
    setError('email', {
      message: undefined
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100 dark:bg-gradient-to-r from-black to-slate-900 relative select-none">
      <ThemeSwitcher className="absolute top-2 left-1/2 transform -translate-x-1/2 cursor-pointer" />
      <div className="flex-1 max-w-lg mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex text-center flex-col items-center justify-center">
          <FiArrowLeft
            size={25}
            className="absolute top-0 left-3 cursor-pointer"
            onClick={() => {
              router.push('/');
            }}
          />
          <Image
            src="/img/shopflix.png"
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
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mt-6">
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
              <Button
                disabled={Object.entries(errors).length > 0 || loading}
                text="Enviar"
                loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
