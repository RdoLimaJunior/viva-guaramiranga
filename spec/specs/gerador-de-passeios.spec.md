
# Spec: Gerador de Passeios com IA

**ID**: `FEATURE-001`
**Status**: `Draft`
**Autor**: `Time de Desenvolvimento`
**Data**: `2024-10-27`

## Descrição
O sistema deve fornecer uma interface interativa (wizard) para coletar as preferências de um turista e, em seguida, usar um modelo de IA (Gemini) para gerar um roteiro de passeio personalizado para a cidade de Guaramiranga.

## Critérios de Aceitação
- A interface deve guiar o usuário por um processo de 3 etapas para coletar: companhia, interesses e duração da estadia.
- O usuário deve poder selecionar uma ou mais opções em cada etapa.
- Após o envio, uma tela de carregamento deve ser exibida enquanto a IA processa a solicitação.
- O roteiro gerado deve ser exibido de forma clara e estruturada (título, descrição, atividades por período).
- Em caso de erro na comunicação com a IA, uma mensagem amigável deve ser mostrada.

## Fluxo da Interface

1.  **Tela Inicial**: Boas-vindas e botão para "Criar Meu Passeio".
2.  **Etapa 1: Companhia**:
    - Pergunta: "Com quem você vai viajar?"
    - Opções: "Sozinho(a)", "Casal", "Família", "Amigos".
3.  **Etapa 2: Interesses**:
    - Pergunta: "Quais são seus interesses?"
    - Opções: "Natureza", "Aventura", "Gastronomia", "Cultura", "Relaxar". (Permite múltipla seleção)
4.  **Etapa 3: Duração**:
    - Pergunta: "Quanto tempo você tem?"
    - Opções: "Meio Período", "Dia Inteiro", "Mais de um dia".
5.  **Geração**:
    - O usuário clica em "Gerar Roteiro".
    - A UI envia as preferências para o endpoint `/api/generate-itinerary`.
    - Uma animação de carregamento é exibida.
6.  **Resultado**:
    - A UI recebe o JSON do roteiro e o renderiza de forma legível.

## Exemplo de Interação

**Given**: Um usuário acessa o Gerador de Passeios.
**When**: Ele seleciona "Casal", "Natureza" e "Gastronomia", e "Dia Inteiro".
**And**: Ele clica em "Gerar Roteiro".
**Then**: O frontend envia um POST para `/api/generate-itinerary` com `{"company": "Casal", "interests": ["Natureza", "Gastronomia"], "duration": "Dia Inteiro"}`.
**And**: O backend consulta a IA do Gemini com um prompt detalhado.
**And**: O backend retorna um JSON com o roteiro.
**And**: O frontend exibe o título, descrição e as atividades de Manhã, Tarde e Noite para o casal.
