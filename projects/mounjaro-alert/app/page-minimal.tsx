'use client';

import { useState, useEffect } from 'react';

const KIWIFY_LINK = process.env.NEXT_PUBLIC_KIWIFY_LINK || 'https://payments.kiwify.com.br/link/SEU-LINK';

export default function Home() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  const [open, setOpen] = useState(null);

  useEffect(() => {
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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* CSS Inline Total */}
      <style>{`
        .glass { 
          background: rgba(212,175,55,0.08); 
          backdrop-filter: blur(12px); 
          border: 1px solid rgba(212,175,55,0.2); 
          border-radius: 16px; 
        }
        .gold { color: #D4AF37; }
        .btn { 
          display: inline-block; 
          padding: 16px 32px; 
          border-radius: 9999px; 
          font-weight: bold; 
          text-decoration: none; 
          transition: transform 0.2s;
        }
        .btn-primary {
          background: linear-gradient(90deg, #D4AF37, #f7df1e);
          color: #000;
        }
        .btn-primary:hover { transform: scale(1.05); }
        .mesh-bg {
          position: fixed; inset: 0;
          background: radial-gradient(circle at 30% 50%, rgba(212,175,55,0.12) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(10,10,10,0.8) 0%, transparent 50%);
          filter: blur(60px); z-index: -1; pointer-events: none;
        }
      `}</style>

      <div className="mesh-bg"></div>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <div style={{ maxWidth: '900px', padding: '0 20px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            border: '1px solid rgba(239,68,68,0.5)',
            background: 'rgba(239,68,68,0.1)',
            color: '#fca5a5',
            fontSize: '14px',
            fontWeight: 700,
            marginBottom: '24px'
          }}>
            ⚠️ ATENÇÃO: Protocolo gratuito por tempo limitado
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 900,
            marginBottom: '24px',
            lineHeight: 1.1
          }}>
            Mounjaro <span style={{ color: '#D4AF37' }}>Alert</span>
            <br/>
            <span style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', color: '#9ca3af', fontWeight: 400 }}>
              Protocolo completo gratuito — mulheres 30+
            </span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: '#d1d5db', marginBottom: '32px', maxWidth: '700px', margin: '0 auto 32px' }}>
            Descubra como milhares de mulheres estão usando Mounjaro para emagrecer de forma segura. Guia urgente + atualizações diárias.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginBottom: '32px' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = KIWIFY_LINK; }} className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '20px 40px' }}>
              QUERO O PROTOCOLO GRATUITO
            </a>
            <a href="#depoimentos" style={{ border: '1px solid rgba(212,175,55,0.5)', color: '#D4AF37', padding: '16px 32px', borderRadius: '9999px', textDecoration: 'none' }}>
              Ver Depoimentos
            </a>
          </div>

          {/* Counters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '48px' }}>
            {[
              { target: 8542, label: 'Mulheres usando' },
              { target: 12, label: 'Kg perdidos (média)' },
              { target: 96, label: '% de aprovação' }
            ].map((c, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="gold" data-target={c.target} style={{ fontSize: '2.5rem', fontWeight: 700 }}>0</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: '48px', color: '#D4AF37' }}>
            O que você vai receber
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { title: 'Resultado Rápido', desc: 'Perda de peso visível em 45 dias.' },
              { title: 'Seguro', desc: 'Uso responsável com monitoramento.' },
              { title: 'Acompanhamento', desc: 'Grupo VIP WhatsApp.' },
              { title: 'Acesso Imediato', desc: 'Download automático.' },
              { title: 'Protocolo Validado', desc: 'Baseado em estudos reais.' },
              { title: 'Suporte Personalizado', desc: 'Mentoria direta.' },
            ].map((b, i) => (
              <div key={i} className="glass" style={{ padding: '24px', border: '1px solid rgba(212,175,55,0.2)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚡</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>{b.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: '48px', color: '#D4AF37' }}>
            Histórias de Sucesso
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { nome: 'Marina S.', resultado: '-6kg', tempo: 'primeiro mês', texto: 'Não acredito que perdi 6kg sem passar fome!' },
              { nome: 'Juliana R.', resultado: '-10kg', tempo: '45 dias', texto: 'Já tinha gastado R$ 800 com nutricionista. Aqui funcionou!' },
              { nome: 'Camila T.', resultado: '-8kg', tempo: '2 meses', texto: 'Os treinos de 15 min salvaram minha vida.' },
            ].map((d, i) => (
              <div key={i} className="glass" style={{ padding: '24px', textAlign: 'center', border: '1px solid rgba(212,175,55,0.1)' }}>
                <div style={{ width: '64px', height: '64px', margin: '0 auto 16px', borderRadius: '50%', background: 'rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📱</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#D4AF37', marginBottom: '8px' }}>{d.resultado}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>{d.tempo}</div>
                <p style={{ fontStyle: 'italic', color: '#d1d5db', marginBottom: '12px' }}>"{d.texto}"</p>
                <p style={{ fontWeight: 700, color: '#D4AF37' }}>{d.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="glass" style={{ padding: '48px', textAlign: 'center', position: 'relative', border: '1px solid rgba(212,175,55,0.3)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #dc2626, #D4AF37, #dc2626)', animation: 'pulse 2s infinite' }}></div>

            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '16px' }}>
              <span style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mounjaro Alert</span>
              <br/>
              <span style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#fff', fontWeight: 400 }}>GRATUITO — Por Tempo Limitado</span>
            </h2>

            <p style={{ color: '#d1d5db', marginBottom: '16px' }}>
              Normal: R$ 197 | Hoje: <strong style={{ color: '#D4AF37', fontSize: '1.5rem' }}>R$ 0</strong>
            </p>

            {/* Timer */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', margin: '32px 0' }}>
              {[['h', time.h], ['m', time.m], ['s', time.s]].map(([label, val]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid rgba(212,175,55,0.5)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    minWidth: '60px',
                    boxShadow: '0 0 20px rgba(255,215,0,0.2)',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: '#D4AF37'
                  }}>
                    {pad(val)}
                  </div>
                </div>
              ))}
            </div>

            <a href="#" onClick={(e) => { e.preventDefault(); window.location.href = KIWIFY_LINK; }} className="btn btn-primary" style={{ fontSize: '1.5rem', padding: '24px 48px', marginBottom: '24px' }}>
              GARANTIR MEU ACESSO GRATUITO
            </a>

            <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
              {[
                '✓ Protocolo completo Mounjaro',
                '✓ Guia de dosagem e efeitos',
                '✓ Checklist de acompanhamento',
                '✓ Acesso ao grupo VIP',
                '✓ Atualizações gratuitas',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', color: '#d1d5db' }}>
                  <span style={{ color: '#D4AF37' }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p style={{ marginTop: '24px', fontSize: '0.875rem', color: '#6b7280' }}>
              100% gratuito, sem cartão. Acesso imediato.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: '48px', color: '#D4AF37' }}>Perguntas Frequentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'O protocolo é realmente gratuito?', a: 'Sim! Por tempo limitado, oferecemos acesso completo gratuito.' },
              { q: 'Preciso ter prescrição médica?', a: 'Consultar um médico é recomendado. Nosso guia educa sobre uso responsável.' },
              { q: 'Funciona para mulheres 40+?', a: 'Sim! Protocolo desenvolvido para mulheres 30-60 anos.' },
              { q: 'Vou passar fome?', a: 'Não. O plano alimentar é saciante.' },
              { q: 'Tem garantia?', a: 'Garantia de 7 dias.' },
            ].map((item, i) => (
              <div key={i} className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <button style={{
                  width: '100%',
                  padding: '16px',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: '#D4AF37',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer'
                }} onClick={() => setOpen(open === i ? null : i)}>
                  {item.q}
                  <span>{open === i ? '▲' : '▼'}</span>
                </button>
                {open === i && (
                  <div style={{ padding: '0 16px 16px', color: '#9ca3af', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(212,175,55,0.2)', padding: '32px 20px', textAlign: 'center', color: '#6b7280' }}>
        <p>&copy; {new Date().getFullYear()} SaldaCloud Factory.</p>
      </footer>

      {/* Counter Animation */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const counters = document.querySelectorAll('[data-target]');
            const obs = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  const el = entry.target;
                  const target = parseInt(el.dataset.target);
                  const duration = 2000;
                  const start = performance.now();
                  const update = (now) => {
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
          });
        `
      }} />
    </div>
  );
}