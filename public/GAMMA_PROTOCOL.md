# 🎨 GAMMA ELITE PROTOCOL (Technical Manual v1.0)

Este manual define como o `premium-designer` deve executar a geração de PDFs e apresentações de alto luxo via API.

---

## 🛠️ 1. ENDPOINTS & AUTH
-   **Base URL:** `https://public-api.gamma.app/v1.0`
-   **Header Obrigatório:** `X-API-KEY` (Usar a chave configurada no `openclaw.json`).
-   **Content-Type:** `application/json`

---

## 🚀 2. FLUXO DE GERAÇÃO (Step-by-Step)

### Etapa 1: Iniciar Geração (POST `/generations`)
Envie um payload JSON com:
```json
{
  "inputText": "[Prompts detalhados baseados no Copywriter]",
  "textMode": "generate",
  "format": "presentation",
  "numCards": 10,
  "exportAs": "pdf"
}
```

### Etapa 2: Polling de Status (GET `/generations/{generationId}`)
Consulte o status a cada 5 segundos.
-   **Status:** `completed` -> Sucesso.
-   **Status:** `failed` -> Reiniciar com prompt simplificado.

### Etapa 3: Entrega
-   Capture o `exportUrl` para o PDF físico.
-   Capture o `gammaUrl` para a versão interativa web.
-   Registre ambos no `HEARTBEAT.md` e no log do projeto.

---

## 🎨 3. DIRETRIZES DE ESTÉTICA SALDANHA
-   **Prompts no `inputText`:** Sempre inclua "Elite branding, clean fonts, professional high-end photography, cinematic lighting, gold and black palette".
-   **Estrutura do Ebook:** Capa de Impacto -> Manifesto -> Conteúdo Estratégico -> CTA Final p/ Upsell.

---
理理论 🛠️🎨🚀🏁
