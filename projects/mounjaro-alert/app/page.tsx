'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const KIWIFY_LINK = process.env.NEXT_PUBLIC_KIWIFY_LINK || 'https://payments.kiwify.com.br/link/SEU-LINK';

export default function Home() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  const [open, setOpen] = useState<number | null>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Mesh Background Animated Parallax
    gsap.to(meshRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });

    // Magnetic Button
    const btn = btnRef.current;
    if (btn) {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' });
      });
    }

    // Fade-in up elements
    gsap.utils.toArray('.gs-reveal').forEach(function(elem: any) {
      gsap.fromTo(elem, 
        { y: 80, opacity: 0 }, 
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Stagger Fade
    gsap.fromTo(".gs-fade", 
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%"
        }
      }
    );

    // Counter Animation
    const counters = document.querySelectorAll('[data-target]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLDivElement;
          const target = parseInt(el.dataset.target || '0');
          const duration = 2000;
          const start = performance.now();
          const update = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * ease).toLocaleString('pt-BR');
            if (progress < 1) requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));

    // Timer
    const iv = setInterval(() => {
      setTime(t => {
        if (t.s > 0) return { ...t, s: t.s - 1 };
        if (t.m > 0) return { h: t.h, m: t.m - 1, s: 59 };
        if (t.h > 0) return { h: t.h - 1, m: 59, s: 59 };
        return t;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n: number | string) => Number(n).toString().padStart(2, '0');

  // 3D Tilt Effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden'
    }}>
      <style>{`
        .glass { 
          background: rgba(212,175,55,0.05); 
          backdrop-filter: blur(20px) saturate(180%); 
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(212,175,55,0.15); 
          border-radius: 16px; 
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .gold { color: #D4AF37; }
        .btn { 
          display: inline-block; 
          padding: 18px 40px; 
          border-radius: 9999px; 
          font-weight: 900; 
          text-decoration: none; 
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary {
          background: linear-gradient(90deg, #D4AF37, #f7df1e);
          color: #000;
          box-shadow: 0 10px 40px rgba(212,175,55,0.4);
        }
        .btn-primary:hover { 
          transform: scale(1.05); 
          box-shadow: 0 15px 50px rgba(212,175,55,0.6);
        }
        .mesh-bg {
          position: fixed; inset: 0;
          background: radial-gradient(circle at 30% 50%, rgba(212,175,55,0.15) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(255,0,0,0.1) 0%, transparent 50%);
          filter: blur(60px); z-index: -1; pointer-events: none;
          will-change: transform;
        }
        .tilt-card {
          transition: transform 0.1s ease-out;
          transform-style: preserve-3d;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .proof-img {
          width: 300px;
          border-radius: 12px;
          border: 2px solid rgba(212,175,55,0.3);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transition: transform 0.3s;
        }
        .proof-img:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="mesh-bg" ref={meshRef}></div>

      {/* Hero */}
      <section className="gs-reveal" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', perspective: '1000px' }}>
        <div className="glass tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ maxWidth: '900px', padding: '60px 40px', textAlign: 'center', margin: '0 20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '9999px',
            border: '1px solid rgba(239,68,68,0.5)',
            background: 'rgba(239,68,68,0.15)',
            color: '#fca5a5',
            fontSize: '14px',
            fontWeight: 700,
            marginBottom: '32px',
            transform: 'translateZ(30px)'
          }}>
            ⚠️ ATENÇÃO: Protocolo gratuito por tempo limitado
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 900,
            marginBottom: '24px',
            lineHeight: 1.1,
            textShadow: '0 0 30px rgba(212,175,55,0.3)',
            transform: 'translateZ(50px)'
          }}>
            Mounjaro <span className="gold">Alert</span>
            <br/>
            <span style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', color: '#9ca3af', fontWeight: 400 }}>
              Protocolo completo gratuito — mulheres 30+
            </span>
          </h1>

          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: '#d1d5db', marginBottom: '40px', maxWidth: '750px', margin: '0 auto 40px', transform: 'translateZ(40px)' }}>
            Descubra como milhares de mulheres estão usando Mounjaro para emagrecer de forma segura. Guia urgente + atualizações diárias.
          </p>

          {/* Mockup 3D */}
          <div style={{ margin: '40px 0', transform: 'translateZ(70px)' }} className="gs-reveal">
            <img src="/images/2026-03-20-1640-mockup-mounjaro.png" alt="Protocolo Mounjaro - E-book Premium" style={{ maxWidth: '320px', width: '100%', filter: 'drop-shadow(0 20px 40px rgba(212,175,55,0.3))' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginBottom: '40px', transform: 'translateZ(60px)' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = KIWIFY_LINK; }} className="btn btn-primary" style={{ fontSize: '1.25rem', textTransform: 'uppercase' }}>
              QUERO O PROTOCOLO GRATUITO
            </a>
            <a href="#depoimentos" style={{ color: '#D4AF37', fontWeight: 700, textDecoration: 'underline', marginTop: '8px' }}>
              Ler histórias de sucesso ⬇️
            </a>
          </div>

          {/* Counters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', transform: 'translateZ(20px)' }}>
            {[
              { target: 8542, label: 'Mulheres usando' },
              { target: 12, label: 'Kg perdidos (média)' },
              { target: 96, label: '% de aprovação' }
            ].map((c, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="gold" data-target={c.target} style={{ fontSize: '3rem', fontWeight: 900, textShadow: '0 0 20px rgba(212,175,55,0.4)' }}>0</div>
                <div style={{ fontSize: '1rem', color: '#9ca3af', fontWeight: 600 }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="gs-reveal" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textAlign: 'center', marginBottom: '60px', color: '#D4AF37', textShadow: '0 0 30px rgba(212,175,55,0.3)' }}>
            O que você vai receber
          </h2>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { title: 'Resultado Rápido', desc: 'Perda de peso visível em 45 dias.' },
              { title: 'Seguro', desc: 'Uso responsável com monitoramento.' },
              { title: 'Acompanhamento', desc: 'Grupo VIP WhatsApp.' },
              { title: 'Acesso Imediato', desc: 'Download automático.' },
              { title: 'Protocolo Validado', desc: 'Baseado em estudos reais.' },
              { title: 'Suporte Personalizado', desc: 'Mentoria direta.' },
            ].map((b, i) => (
              <div key={i} className="glass gs-fade tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ padding: '32px', textAlign: 'left' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px', transform: 'translateZ(30px)' }}>⚡</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px', color: '#fff', transform: 'translateZ(25px)' }}>{b.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: 1.6, transform: 'translateZ(15px)' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - WhatsApp Carousel (21st.dev style) */}
      <section id="depoimentos" style={{ padding: '80px 0', overflow: 'hidden', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <h2 className="gs-reveal" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, textAlign: 'center', marginBottom: '60px', color: '#D4AF37', textShadow: '0 0 30px rgba(212,175,55,0.3)' }}>
          COMUNIDADE VIP
        </h2>
        <div style={{ display: 'flex', width: 'max-content', animation: 'scroll-left 40s linear infinite' }}>
          <div style={{ display: 'flex', gap: '2rem', padding: '0 1rem' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
              <img key={`p1-${i}`} src="C:/Users/vinib/.gemini/antigravity/brain/b1010371-d8ed-4b7e-bfe7-9c5cdc28bfb6/proof_whatsapp.png" alt="WhatsApp Proof" className="proof-img" />
            ))}
          </div>
          {/* Duplicated track for seamless infinite scroll */}
          <div aria-hidden="true" style={{ display: 'flex', gap: '2rem', padding: '0 1rem' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
              <img key={`p2-${i}`} src="C:/Users/vinib/.gemini/antigravity/brain/b1010371-d8ed-4b7e-bfe7-9c5cdc28bfb6/proof_whatsapp.png" alt="WhatsApp Proof" className="proof-img" />
            ))}
          </div>
        </div>
      </section>

      {/* Offer */}
      <section className="gs-reveal" style={{ padding: '100px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="glass tilt-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ padding: '60px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #dc2626, #D4AF37, #dc2626)', animation: 'pulse 2s infinite' }}></div>

            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '24px', transform: 'translateZ(40px)' }}>
              <span style={{ background: 'linear-gradient(90deg, #D4AF37, #FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mounjaro Alert</span>
              <br/>
              <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#fff', fontWeight: 400 }}>GRATUITO — Limitado</span>
            </h2>

            <p style={{ color: '#d1d5db', marginBottom: '24px', fontSize: '1.25rem', transform: 'translateZ(30px)' }}>
              Normal: <span style={{ textDecoration: 'line-through' }}>R$ 197</span> | Hoje: <strong className="gold" style={{ fontSize: '2rem' }}>R$ 0</strong>
            </p>

            {/* Timer */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '40px 0', transform: 'translateZ(50px)' }}>
              {[['h', time.h], ['m', time.m], ['s', time.s]].map(([label, val]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(212,175,55,0.6)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    minWidth: '80px',
                    boxShadow: '0 0 30px rgba(255,215,0,0.2)',
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: '#D4AF37'
                  }}>
                    {pad(val)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ transform: 'translateZ(60px)', marginBottom: '32px' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = KIWIFY_LINK; }} ref={btnRef} className="btn btn-primary" style={{ fontSize: '1.5rem', width: '100%', maxWidth: '500px' }}>
                GARANTIR ACESSO AGORA
              </a>
            </div>

            <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto', transform: 'translateZ(20px)' }}>
              {[
                '✓ Protocolo completo Mounjaro',
                '✓ Guia de dosagem e efeitos',
                '✓ Checklist de acompanhamento',
                '✓ Acesso ao grupo VIP',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', color: '#e5e7eb', fontSize: '1.1rem', fontWeight: 600 }}>
                  <span style={{ color: '#D4AF37', fontSize: '1.5rem' }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="gs-reveal" style={{ padding: '80px 20px 120px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: '48px', color: '#D4AF37' }}>Perguntas Frequentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: 'O protocolo é realmente gratuito?', a: 'Sim! Por tempo limitado, oferecemos acesso completo gratuito pela Kiwify.' },
              { q: 'Preciso ter prescrição médica?', a: 'Consultar um médico é recomendado. Nosso guia educa sobre uso responsável.' },
              { q: 'Funciona para mulheres 40+?', a: 'Sim! O Protocolo foi cirurgicamente desenvolvido para mulheres na faixa dos 30 a 60 anos.' },
              { q: 'Vou passar fome?', a: 'Não. O plano alimentar aliado ao protocolo Mounjaro promove saciedade prolongada.' },
              { q: 'Tem garantia?', a: 'Você possui uma garantia incondicional de 7 dias suportada pela Kiwify.' },
            ].map((item, i) => (
              <div key={i} className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <button style={{
                  width: '100%',
                  padding: '24px',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: '#D4AF37',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                  cursor: 'pointer'
                }} onClick={() => setOpen(open === i ? null : i)}>
                  {item.q}
                  <span style={{ transition: 'transform 0.3s', transform: open === i ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                </button>
                <div style={{ 
                  maxHeight: open === i ? '200px' : '0', 
                  overflow: 'hidden', 
                  transition: 'max-height 0.3s ease-out',
                  padding: open === i ? '0 24px 24px' : '0 24px', 
                  color: '#d1d5db', 
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(212,175,55,0.2)', padding: '40px 20px', textAlign: 'center', color: '#6b7280', background: 'rgba(0,0,0,0.8)' }}>
        <p style={{ fontWeight: 600 }}>&copy; {new Date().getFullYear()} SaldaCloud Factory. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}