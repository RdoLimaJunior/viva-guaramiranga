# Spec: Endpoint Raiz "Hello, World"

**ID**: `API-001`
**Status**: `Draft`
**Autor**: `Time de Desenvolvimento`
**Data**: `2024-10-27`

## Descrição
O backend deve expor um endpoint raiz (`/`) que retorna uma mensagem de boas-vindas padronizada em formato JSON. Este endpoint serve como uma verificação de saúde básica da API.

## Critérios de Aceitação
- O endpoint deve estar disponível na rota raiz (`/`).
- O método HTTP suportado deve ser `GET`.
- A resposta deve ter o status code `200 OK`.
- O `Content-Type` da resposta deve ser `application/json`.
- O corpo da resposta deve ser um objeto JSON contendo a chave `message` com um valor de string.

## Exemplo 1: Requisição com Sucesso

**Given**: O servidor da API está em execução.
**When**: Um cliente faz uma requisição `GET` para o endpoint `/`.
**Then**: O servidor responde com o status `200 OK`.
**And**: O corpo da resposta é o seguinte JSON:
```json
{
  "message": "Hello, World from Python Backend!"
}
```