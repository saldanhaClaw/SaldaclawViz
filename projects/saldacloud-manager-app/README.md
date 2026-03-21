# SOP: Como fazer Upload do SaldaCloud Stripe App 🚀💳

Como o ambiente do agente é restrito, você deve executar o upload final a partir do seu terminal local onde o **Stripe CLI** está instalado.

## Pré-requisitos
## Pré-requisitos
1. **Instalar o Stripe CLI (Windows):**
   * Execute no PowerShell: `winget install -e --id Stripe.StripeCli` 
   * **IMPORTANTE:** Feche e abra o PowerShell novamente após instalar!
2. **Instalar o plugin de Apps:**
   * No PowerShell, execute: `stripe plugin install apps` 🏁
3. Estar logado na sua conta: `stripe login`.

## Passo a Passo para o Upload

1. **Acesse a pasta do projeto no seu terminal:**
   ```bash
   cd "c:\Users\vinib\Downloads\SaldaclawViz-main (1)\SaldaclawViz-main\projects\saldacloud-manager-app"
   ```

2. **Instale as dependências (necessário para o build interno da Stripe):**
   ```bash
   npm install
   ```

3. **Inicie o upload do App para o seu Dashboard:**
   ```bash
   stripe apps upload
   ```

4. **Confirmação no Dashboard:**
   - Após o comando, acesse: [dashboard.stripe.com/apps](https://dashboard.stripe.com/apps).
   - Localize o **SaldaCloud Manager**.
   - Clique em **Install for local team** ou **Install in live mode**.

5. **Pronto!**
   - Agora, ao abrir qualquer página do seu Dashboard Stripe, você verá uma aba lateral do SaldaCloud mostrando que a Fábrica está **ONLINE** e com atalhos diretos para o seu Viz.

---
**Nota:** Este app é **privado** e só será visível por você e sua equipe no Stripe.
