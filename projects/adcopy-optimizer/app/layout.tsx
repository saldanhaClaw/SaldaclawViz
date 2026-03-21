import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdCopy Optimizer | Maximize seu ROI com Inteligência Artificial",
  description: "Diga adeus ao 'achismo' e olá ao ROI máximo. Ferramenta data-driven de otimização de textos de anúncios.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
