import { CheckCircle, Download } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ObrigadoPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const sessionId = searchParams?.session_id || null;
  const downloadUrl = sessionId ? `/api/download/${sessionId}` : null;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-display font-black text-gold-500">
            OBRIGADO PELA COMPRA!
          </h1>
          <p className="text-lg text-gray-300">
            Seu acesso ao <strong>Mounjaro Alert</strong> está liberado.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gold-500/30 p-8 rounded-2xl shadow-2xl text-center space-y-6">
          <div>
            <h2 className="text-2xl font-display font-bold mb-2">Baixe seu E-book Agora</h2>
            <p className="text-gray-400">Clique no botão abaixo para fazer o download do PDF.</p>
          </div>

          {downloadUrl ? (
            <a
              href={downloadUrl}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-500 to-yellow-600 text-black font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              <Download className="w-6 h-6" />
              BAIXAR E-BOOK (PDF)
            </a>
          ) : (
            <p className="text-sm text-red-400">Link de download indisponível. Contate o suporte.</p>
          )}

          <p className="text-sm text-gray-500">
            O link também foi enviado para seu e-mail.
          </p>
        </div>

        <div className="text-center text-sm text-gray-500">
          Dúvidas? Entre em contato: suporte@mounjaro-alert.com.br
        </div>
      </div>
    </div>
  );
}
