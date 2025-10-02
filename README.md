# Viva Guaramiranga

Este projeto é estruturado seguindo o modelo de Spec-Driven Development (SDD) detalhado em `instructions.md`.

## Visão Geral

- **`/spec`**: Contém todas as especificações funcionais e técnicas.
- **`/src`**: Armazena o código-fonte, separado em `web`, `mobile` e `server`.
- **`/infra`**: Infraestrutura como Código (Docker, Kubernetes).
- **`/docs`**: Documentação do projeto.

## Começando (Web)

A aplicação web utiliza Vite para desenvolvimento e build. Para executá-la localmente:

```bash
# Navegue até o diretório web
cd src/web

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

## Começando (Mobile)

O aplicativo mobile é construído com React Native e estilizado com NativeWind (Tailwind CSS).

```bash
# Navegue até o diretório mobile
cd src/mobile

# Instale as dependências
npm install

# Inicie o Metro bundler
npx react-native start

# Em um terminal separado, execute o aplicativo em um simulador/dispositivo
npx react-native run-ios
# ou
npx react-native run-android
```
*(Nota: Uma configuração de ambiente React Native completa é necessária.)*

## Começando (Servidor)

O backend é uma API Python construída com FastAPI.

```bash
# Navegue até o diretório da API do servidor
cd src/server/api

# Crie um ambiente virtual e ative-o
python -m venv venv
source venv/bin/activate  # No Windows, use `venv\Scripts\activate`

# Instale as dependências a partir do requirements.txt
pip install -r requirements.txt

# Crie um arquivo .env para a chave de API
echo "API_KEY=SUA_CHAVE_DE_API_GEMINI" > .env

# Inicie o servidor de desenvolvimento
uvicorn main:app --reload --port 8000
```
O servidor da API estará disponível em `http://localhost:8000`.

## Deploy no Vercel

Este projeto está pré-configurado para deploy contínuo no Vercel.

1.  **Crie um Projeto no Vercel**: Conecte sua conta do GitHub, GitLab ou Bitbucket e importe este repositório.
2.  **Configuração do Projeto**: O Vercel detectará automaticamente as configurações no arquivo `vercel.json`. Ele irá:
    - Construir a aplicação web a partir de `src/web`.
    - Implementar a API Python a partir de `src/server/api` como uma Função Serverless.
3.  **Variáveis de Ambiente**: No dashboard do seu projeto no Vercel, vá para "Settings" -> "Environment Variables" e adicione sua chave da API Gemini:
    - **Name**: `API_KEY`
    - **Value**: `SUA_CHAVE_DE_API_GEMINI_SECRETA`

Após configurar a variável, qualquer `git push` para a branch principal acionará um novo deploy de produção.