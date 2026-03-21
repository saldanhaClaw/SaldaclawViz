# 🛠️ KIWIFY AUTOMATION PROTOCOL (v1.0)

Este protocolo orienta o `backend-dev` e o `low-ticket-launcher` na criação autônoma de infoprodutos e checkouts de alta conversão.

---

## 🔑 1. ACESSO À API
As credenciais estão em: `C:\Users\vinib\.openclaw\workspace\KIWIFY_CONFIG.json`.
- **Base URL:** `https://api.kiwify.com.br/v1`
- **Auth:** Utilize o `clientSecret` para gerar o Bearer Token de acesso.

---

## 📦 2. CRIAÇÃO DE PRODUTO
Ao receber o comando de criação, o agente deve:
1.  **Definir Metadados:** Nome, Descrição (gerada pelo `copywriter-pro`), Preço e Categoria.
2.  **Upload de Assets:** Vincular a capa do PDF (gerada pelo `premium-designer`) como imagem do produto.
3.  **Configurar Entrega:** Definir a URL da página de obrigado e o arquivo de download final.

---

## 🎨 3. CUSTOMIZAÇÃO DE CHECKOUT (MUSA STYLE)
Para garantir a legitimidade:
1.  **Cores:** Utilizar o esquema Musa (Ouro/Âmbar) se possível, ou manter o Clean Moderno.
2.  **Depoimentos:** Injetar os 3 melhores depoimentos 3D na lateral do checkout.
3.  **Order Bump:** Sugerir um produto correlacionado (ex: "Guia de Receitas 7 dias") por um valor simbólico (R$ 5,00) para aumentar o LTV.

---

## 🧠 4. FACTORY KNOWLEDGE (MEMÓRIA)
Toda vez que um novo "truque" de conversão for descoberto na Kiwify:
1.  Abra o `FACTORY_KNOWLEDGE.md`.
2.  Adicione a entrada: `[DATA] Kiwify Insight: [DESCRIÇÃO]`.
3.  Isso garante que o **SaldaClawd** fique mais esperto a cada lançamento.

---
理理论 🛠️🥝🚀🏁
