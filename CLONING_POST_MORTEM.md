# 🧠 POST-MORTEM: ENGENHARIA DE CLONAGEM (Musa v1)

Este documento serve como guia de treinamento para os agentes da SaldaCloud Factory. Analisamos o sucesso da clonagem da `modelo-lp.html` e como repetir o padrão.

---

## 🏗️ 1. ARQUITETURA DE CONVERSÃO (O Fluxo)
A página clonada (`musa-clone-v1.html`) segue o **Fluxo Psicológico de Venda Direta**:

1.  **Headline Magnética:** Foco no benefício (Secar/Definir).
2.  **Prova Social Visual:** Antes/Depois gerado com luz dramática.
3.  **Tangibilização:** Checklist do que será entregue (caixa branca p/ contraste).
4.  **Diferenciação:** Cards de funcionalidades (bordas vermelhas p/ autoridade).
5.  **Oferta Irresistível:** Mockup 3D + Preço de Baixo Ticket (R$ 10,03).
6.  **Humanização:** Bio da Experta p/ quebra de objeção.

---

## 🎨 2. DIRETRIZES TÉCNICAS (Para Agentes)

-   **Ativos Visuais:** Use `generate_image` com prompts curtos e poderosos.
    -   *Erro Comum:* Pedir ao Antigravity.
    -   *Padrão Musa:* Gerar autonomamente 3D Mockups e Portraits 8k.
-   **CSS Masterclass:** 
    -   Use `clamp()` para fontes responsivas.
    -   Use `box-shadow` e `animation` (pulse) p/ botões de checkout.
    -   Mantenha o HTML limpo (Semantic tags) p/ fácil SEO e carregamento.

---

## 🛠️ 3. O COMANDO DE REPRODUÇÃO
Agente, quando solicitado a clonar, siga esta ordem:
1.  **View File** da referência.
2.  **Generate Images** (Hero, Mockup, Bio).
3.  **Write New HTML** usando o boilerplate da Musa v1.
4.  **Confirm Alignment** com o `MASTER_SYSTEM_PROMPT.md`.

---

理理论 🛠️🧛🚀🏁
