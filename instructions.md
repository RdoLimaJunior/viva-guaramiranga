
# Instructions — Projeto Viva Guaramiranga

Estas instruções definem como todo o desenvolvimento deve seguir o modelo de **Spec-Driven Development (SDD)**, garantindo consistência, rastreabilidade e clareza desde o início.

---

## 1. Estilo de Desenvolvimento

* Usar o **Spec Kit** para criar e rodar especificações.
* Toda funcionalidade deve nascer como um arquivo `.spec.md` em `/spec/specs/`.
* Specs devem conter exemplos claros de entrada/saída e critérios de aceitação.
* Implementações só começam depois de a spec estar aprovada.
* Sempre validar com `specify run` antes de integrar.

---

## 2. Organização de Pastas

Estrutura recomendada (pode ser ajustada conforme stack do projeto):

```
/viva-guaramiranga
├─ README.md
├─ instructions.md
├─ spec/
│  ├─ constitution.md
│  ├─ specs/
│  │  ├─ exemplo.spec.md
├─ src/
│  ├─ mobile/ (aplicativo mobile)
│  ├─ web/ (painel/admin/front-end web)
│  ├─ server/
│  │  ├─ api/ (endpoints)
│  │  ├─ services/ (regras de negócio, IA, integrações)
│  │  └─ workers/ (tarefas assíncronas)
├─ infra/
│  ├─ docker/
│  └─ k8s/
└─ docs/
```

---

## 3. Tecnologias e Modelos

* **Mobile**: React Native (com NativeWind para estilização).
* **Web**: React, Vue ou Angular.
* **Backend**: Node.js (NestJS/Express), Python (FastAPI/Django) ou outro conforme necessidade.
* **Banco**: PostgreSQL, MySQL ou MongoDB.
* **IA/ML**: integração opcional conforme caso de uso.
* **Infra**: Docker e Kubernetes para deploy escalável.

*(Essas escolhas podem ser ajustadas por projeto.)*

---

## 4. Convenções

* Nome oficial do projeto deve ser mantido em todos os arquivos e documentação.
* Specs ficam em português claro, código e comentários técnicos podem ser em inglês.
* Commits devem referenciar a spec implementada.
* Cada feature deve ter:

  * Arquivo `.spec.md` correspondente
  * Implementação em `/src/`
  * Testes automatizados associados

---

## 5. Fluxo de Trabalho

1. Criar/atualizar uma spec em `/spec/specs/`.
2. Validar com `specify run`.
3. Implementar conforme spec aprovada.
4. Subir PR referenciando a spec.
5. Atualizar documentação em `/docs/` se necessário.

---

## 6. Objetivo

Assegurar que todos os projetos desenvolvidos sigam a filosofia de **SDD**, mantendo organização, rastreabilidade e foco no valor entregue, com clareza desde a concepção até a implementação.
