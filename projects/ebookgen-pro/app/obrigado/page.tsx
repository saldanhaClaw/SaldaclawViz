'use client';

import { motion } from "framer-motion";
import { CheckCircle, Mail, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-black" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-luxury mb-6 gold-gradient">Sua compra foi confirmada! 🎉</h1>
        <p className="text-gray-400 text-lg mb-12">
          O seu **Método 30D** acaba de ser enviado para o seu e-mail. <br />
          Verifique sua caixa de entrada (e a pasta de spam).
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12 text-left">
          <div className="p-6 glass rounded-2xl gold-border">
            <Mail className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="font-bold mb-2">E-mail Enviado</h3>
            <p className="text-sm text-gray-400">Enviamos o link de acesso vitalício para você agora mesmo.</p>
          </div>
          <div className="p-6 glass rounded-2xl">
            <Download className="w-8 h-8 text-[#D4AF37] mb-4" />
            <h3 className="font-bold mb-2">Download Direto</h3>
            <p className="text-sm text-gray-400">Você também pode baixar uma cópia de segurança aqui.</p>
          </div>
        </div>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-[#D4AF37] font-bold hover:underline"
        >
          Voltar para o site <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
