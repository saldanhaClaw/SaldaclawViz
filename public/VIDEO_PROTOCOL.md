# 🎥 VIDEO AUTOMATION PROTOCOL (v1.0)

Este protocolo define como o `community-manager` e o `premium-designer` devem produzir criativos em vídeo para TikTok, Reels e Shorts.

---

## 🛠️ 1. O DESAFIO DA API CAPCUT
O CapCut Pro **NÃO** possui uma API headless oficial. Para manter a autonomia da fábrica, utilizaremos dois caminhos:

### ✅ Caminho A: Shotstack / Creatomate (100% Autônomo)
-   **Uso:** Anúncios dinâmicos e posts de massa.
-   **Execução Técnica:**
    1.  **Carregar Template:** Use o arquivo absoluto em: `C:\Users\vinib\.openclaw\workspace\SHOTSTACK_TEMPLATE.json`.
    2.  **Injeção de Dados (Merge):** Substitua os campos `find` dentro do nó `merge` pelos valores gerados pelo `copywriter-pro` (Headline e Voiceover) e `premium-designer` (Image Prompts).
    3.  **TikTok Push:** O template já contém o destino TikTok configurado.
    4.  Execute o script: `python C:\Users\vinib\.openclaw\workspace\scripts\render_video.py [NOVO_JSON_GERADO] [API_KEY]`.
-   **Vantagem:** Escala infinita com padrão visual "Historical/Curiosity" de alta retenção.

### ✅ Caminho B: CapCut Hybrid (Alta Fidelidade)
-   **Uso:** VSLs de luxo e Criativos Virais complexos.
-   **Ação:** O agente prepara o "Pacote de Edição" na pasta do projeto:
    1.  `script.txt`: Roteiro com marcações de tempo.
    2.  `voiceover.mp3`: Gerado via ElevenLabs/OpenAI.
    3.  `assets/`: Imagens 8k e B-roll gerados.
    4.  `blueprint.json`: Guia de montagem para o humano ou script local.
-   **Vantagem:** Qualidade premium do CapCut Pro.

---

## 👥 2. FLUXO DE PRODUÇÃO (Agents)

1.  **Trend Researcher:** Identifica o "gancho" (hook) viral.
2.  **Copywriter:** Escreve o roteiro (15-30 segundos).
3.  **Premium Designer:** Gera as imagens 8k correspondentes ao roteiro.
4.  **Community Manager:** Orquestra a montagem (via API ou Pacote Hybrid) e prepara a legenda otimizada.

---

## 🚀 3. COMANDOS DE VÍDEO
-   **"Fábrica, Gerar Criativo Viral [Nicho]":** Aciona o Squad de Vídeo para criar o Pacote Hybrid.
-   **"Fábrica, Renderizar Ads [Projeto]":** Aciona a API do Shotstack para produção em massa.

---
理理论 🛠️🎥🚀🏁
