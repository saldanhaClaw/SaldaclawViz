"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Playfair_Display, Inter } from "next/font/google";
import { 
  Check, 
  Shield, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  Star, 
  Zap, 
  Flame, 
  Menu, 
  X,
  Instagram,
  Twitter,
  ChevronDown
} from "lucide-react";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(259200); // 72h
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen ${inter.className} bg-[#020617] text-white selection:bg-[#D4AF37] selection:text-black overflow-x-hidden`}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-[#D4AF37]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-[#1e40af]/20 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className={`${playfair.className} text-2xl font-bold tracking-tighter`}>
            MÉTODO<span className="text-[#D4AF37]">30D</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#metodo" className="hover:text-[#D4AF37] transition-colors">O Método</a>
            <a href="#prova" className="hover:text-[#D4AF37] transition-colors">Resultados</a>
            <a href="#faq" className="hover:text-[#D4AF37] transition-colors">FAQ</a>
            <button 
              onClick={handleCheckout}
              className="bg-[#D4AF37] text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-all"
            >
              Comprar Agora
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Cinematic BG */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_8k.png" 
            alt="Lifestyle" 
            fill 
            className="object-cover opacity-40 grayscale-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full mb-6 border-[#D4AF37]/30">
              <Flame className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">Protocolo de Elite Validado</span>
            </div>

            <h1 className={`${playfair.className} text-5xl md:text-8xl mb-8 leading-[1.1]`}>
              A Ciência por trás do <br />
              <span className="gold-gradient italic">Corpo Perfeito.</span>
            </h1>

            <p className="text-white/60 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              O Método 30D não é apenas um e-book. É um sistema matematicamente desenhado para resetar seu metabolismo e esculpir sua melhor versão em tempo recorde.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="gold-gradient text-black px-10 py-5 rounded-xl font-black text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                {loading ? "PROCESSANDO..." : "QUERO MEU MÉTODO 30D AGORA"}
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-gray-600" />
                ))}
              </div>
              <div className="text-sm text-white/50">
                <span className="text-white font-bold">+12,400</span> alunos transformados
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full max-w-lg mx-auto drop-shadow-[0_20px_50px_rgba(212,175,55,0.3)]">
              <Image 
                src="/mockup_8k.png" 
                alt="Método 30D Mockup" 
                width={800} 
                height={1000} 
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
            {/* Glossy Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#D4AF37]/5 blur-[100px] -z-10" />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#D4AF37]" />
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-12 border-y border-white/5 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 overflow-hidden whitespace-nowrap">
          <div className="flex justify-around items-center opacity-30 gap-8 grayscale">
             <span className="text-2xl font-black">FORBES FITNESS</span>
             <span className="text-2xl font-black">HEALTH WATCH</span>
             <span className="text-2xl font-black">ELITE BODY</span>
             <span className="text-2xl font-black">MEN'S HEALTH</span>
          </div>
        </div>
      </section>

      {/* The Pillars Section */}
      <section id="metodo" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className={`${playfair.className} text-4xl md:text-6xl mb-6`}>Os 3 Pilares do Sucesso</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Nutrição Bio-Adaptativa", 
                desc: "Ajuste milimétrico de macronutrientes que força seu corpo a queimar gordura visceral enquanto dorme.",
                icon: Zap 
              },
              { 
                title: "Neuro-Programação", 
                desc: "Gatilhos mentais de elite para eliminar a compulsão e o efeito sanfona de uma vez por todas.",
                icon: Star 
              },
              { 
                title: "Performance Híbrida", 
                desc: "Treinos de 15 minutos baseados em ciência de alta intensidade que entregam resultados de 2 horas.",
                icon: TrendingUp 
              }
            ].map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-3xl glass border border-white/10 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <p.icon className="w-20 h-20" />
                </div>
                <p.icon className="w-12 h-12 text-[#D4AF37] mb-8" />
                <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                <p className="text-white/60 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaser Section */}
      <section className="py-32 bg-gradient-to-b from-[#020617] to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
           <div className="relative">
             <Image 
               src="/fitness_luxury_hero_1773915118961.png" 
               alt="Atleta" 
               width={600} 
               height={800} 
               className="rounded-[40px] gold-border transition-all duration-700 hover:scale-[1.02]"
             />
             <div className="absolute -bottom-10 -right-10 w-64 p-8 glass rounded-3xl gold-border hidden md:block">
                <p className="italic text-lg mb-2 text-[#D4AF37]">"A melhor decisão da minha vida. Perdi 8kg de gordura e ganhei 3kg de músculo em 28 dias."</p>
                <p className="text-sm font-bold">— André S., Aluno Elite</p>
             </div>
           </div>

           <div>
              <h2 className={`${playfair.className} text-4xl md:text-6xl mb-12`}>O que você vai dominar:</h2>
              <div className="space-y-6">
                {[
                  "A Curva da Insulina: O segredo para parar de acumular gordura.",
                  "Ciclo de Carboidratos Inteligente para energia infinita.",
                  "Suplementação Oculta: O que a indústria não quer que você saiba.",
                  "Plano de Ação de 30 Dias: Passo a passo descomplicado.",
                  "Receitas Gourmet de 5 Minutos focadas em queima."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <p className="text-white/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
              <button 
                onClick={handleCheckout}
                className="mt-12 flex items-center gap-3 text-[#D4AF37] font-black text-xl hover:gap-6 transition-all"
              >
                ACESSO IMEDIATO AO PROTOCOLO <ArrowRight />
              </button>
           </div>
        </div>
      </section>

      {/* Social Proof Gallery - High Standard */}
      <section id="prova" className="py-32 bg-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className={`${playfair.className} text-4xl md:text-7xl mb-6`}>Resultados Inquestionáveis.</h2>
              <p className="text-white/60 text-lg md:text-xl italic">"O Método 30D não promete milagres. Ele entrega biologia aplicada."</p>
            </div>
            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-50 cursor-not-allowed">
                  <ArrowRight className="w-6 h-6 rotate-180" />
               </div>
               <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center cursor-pointer hover:bg-[#D4AF37] hover:text-black transition-all">
                  <ArrowRight className="w-6 h-6" />
               </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative rounded-[40px] overflow-hidden gold-border aspect-[4/5] md:aspect-video lg:aspect-square"
             >
                <Image 
                  src="/proof_transformation.png" 
                  alt="Transformação Real" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black via-black/40 to-transparent">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="px-4 py-1 bg-[#D4AF37] text-black text-[10px] font-black rounded-full uppercase">CASO #742</div>
                      <div className="text-white font-bold opacity-80">-14KG EM 28 DIAS</div>
                   </div>
                   <h3 className="text-2xl font-bold">"Minha saúde foi resetada. Nunca estive tão forte e definido."</h3>
                </div>
             </motion.div>

             <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                   <div className="p-1 rounded-[30px] glass gold-border overflow-hidden">
                      <Image 
                        src="/proof_whatsapp.png" 
                        alt="Depoimento WhatsApp" 
                        width={600} 
                        height={400} 
                        className="w-full h-auto rounded-[25px]"
                      />
                   </div>
                   
                   <div className="p-8 rounded-[30px] glass border border-white/5 flex flex-col justify-center">
                      <div className="flex gap-1 mb-6">
                         {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />)}
                      </div>
                      <p className="text-xl mb-6 text-white/90 font-medium">"O suporte e o material em PDF são de outro planeta. O bônus de receitas gourmet salvou meu paladar."</p>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
                         <div>
                            <p className="font-bold">Mariana V.</p>
                            <p className="text-xs text-white/40 uppercase tracking-widest">Empresária | @marianavix</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing / Final CTA */}
      <section className="py-40 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="mb-12 inline-block">
              <p className="text-sm tracking-[0.5em] font-black text-[#D4AF37] mb-4">OFERTA LIMITADA</p>
              <div className="text-4xl md:text-5xl font-mono glass px-8 py-4 rounded-2xl gold-border">
                {formatTime(timeLeft)}
              </div>
           </div>

           <h2 className={`${playfair.className} text-5xl md:text-8xl mb-12`}>Transforme-se por apenas <br /> 
             <span className="text-[#D4AF37]">12x R$ 4,81</span>
           </h2>
           <p className="text-2xl text-white/40 mb-16 line-through">De R$ 197,90 por R$ 47,90 à vista</p>

           <button 
             onClick={handleCheckout}
             className="w-full max-w-xl mx-auto gold-gradient text-black py-8 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4"
           >
             SIM, QUERO MINHA TRANSFORMAÇÃO
             <ArrowRight className="w-8 h-8" />
           </button>

           <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-50 text-xs tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" /> COMPRA 100% SEGURA
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" /> ACESSO VITALÍCIO
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> DOWNLOAD INSTANTÂNEO
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#010310]">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className={`${playfair.className} text-2xl font-bold`}>
              MÉTODO<span className="text-[#D4AF37]">30D</span>
            </div>
            <div className="flex gap-10 text-sm text-white/40 font-medium">
               <a href="#" className="hover:text-white">Termos de Uso</a>
               <a href="#" className="hover:text-white">Políticas de Privacidade</a>
               <a href="#" className="hover:text-white">Suporte</a>
            </div>
            <div className="flex gap-6">
               <Instagram className="w-5 h-5 text-white/40 hover:text-[#D4AF37] cursor-pointer" />
               <Twitter className="w-5 h-5 text-white/40 hover:text-[#D4AF37] cursor-pointer" />
            </div>
         </div>
         <div className="text-center mt-20 text-[10px] text-white/20 tracking-widest uppercase pb-10">
            © 2026 SALDACLOUD FACTORY - TODOS OS DIREITOS RESERVADOS
         </div>
      </footer>
    </div>
  );
}
