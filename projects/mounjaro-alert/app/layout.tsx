import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mounjaro Alert - 15 Coisas que Você Precisa Saber',
  description: 'Descubra tudo sobre o Mounjaro: como funciona, efeitos colaterais, dosagem correta, onde comprar e muito mais. Guia completo em português.',
  keywords: 'Mounjaro, ozempic, emagrecimento, diabetes, perda de peso, medicamento',
  openGraph: {
    title: 'Mounjaro Alert - 15 Coisas que Você Precisa Saber',
    description: 'Guia essencial sobre o Mounjaro. Tudo que você precisa saber antes de começar.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${outfit.variable} font-body bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
