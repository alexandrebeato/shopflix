import { Sora } from 'next/font/google';
import './input.css';

const inter = Sora({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Shopflix - Lista de compras',
  description:
    'Shopflix é uma lista de compras online para ajudar a organizar suas compras em um só lugar. Com uma interface simples e intuitiva, você pode adicionar itens à sua lista, categorizá-los por loja e compartilhá-los com outras pessoas.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
