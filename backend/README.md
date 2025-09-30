# 💰 Backend: Motor de Simulação Patrimonial (Fastify + Prisma)

## 📝 Descrição do Projeto

Este repositório contém a API RESTful construída em Node.js com Fastify e TypeScript, responsável pela gestão de simulações financeiras, dados de entrada (Alocações, Movimentações, Seguros) e pelo **Motor de Projeção Patrimonial** até 2060.

A arquitetura foi projetada para garantir a atomicidade das operações críticas (criação de versão, situação atual) usando transações do Prisma e imutabilidade dos registros de valor (AssetRecords).

## 🛠️ Stack Tecnológica

| Componente         | Tecnologia              | Observações                                                          |
| :----------------- | :---------------------- | :------------------------------------------------------------------- |
| **Linguagem**      | TypeScript (Node.js 20) | Tipagem estática e moderna.                                          |
| **Framework**      | Fastify 4               | Alto desempenho e foco em DX (Developer Experience).                 |
| **ORM**            | Prisma ORM              | Usado para gerenciamento e migrações do banco de dados.              |
| **Banco de Dados** | PostgreSQL 15           | Banco relacional robusto (via Docker Compose).                       |
| **Validação**      | Zod v4                  | Validação de schemas integrada ao Fastify.                           |
| **Testes**         | Jest + Supertest        | Cobertura de testes unitários e de integração (priorizando o Motor). |

## ⚙️ Configuração e Instalação (Docker Compose)

O projeto é entregue com um `docker-compose.yml` para rodar o Backend e o PostgreSQL em conjunto.

1.  **Pré-requisitos:** Certifique-se de ter o Docker e o Docker Compose instalados.
2.  **Subir os Serviços:** Execute o comando na raiz do projeto (`docker-compose.yml`):
    ```bash
    docker compose up --build -d
    ```
3.  **Acessar a API:** A API estará disponível em `http://localhost:4000` (ou a porta definida).
4.  **Acessar o Banco (Opcional):** Você pode se conectar ao PostgreSQL usando as credenciais definidas no `docker-compose.yml`:
    - **Host:** `localhost:5432`
    - **User:** `planner`
    - **Password:** `plannerpw`
    - **Database:** `plannerdb`

## 📚 Endpoints da API

| Módulo         | Método | Endpoint                         | Propósito                                                                      |
| :------------- | :----- | :------------------------------- | :----------------------------------------------------------------------------- |
| **Simulação**  | `POST` | `/criar-simulacao`               | Cria plano, cópia ou Situação Atual.                                           |
| **Simulação**  | `GET`  | `/listar-simulacoes`             | Lista todas as simulações (inclui filtro de versão mais recente).              |
| **Projeção**   | `POST` | `/projections`                   | [cite_start]**Motor de Projeção Patrimonial:** Gera a série temporal até 2060. |
| **Assets**     | `POST` | `/simulations/:simId/assets`     | Cria Asset e seu primeiro registro de valor (`AssetRecord`).                   |
| **Assets**     | `POST` | `/assets/:id/record`             | [cite_start]Adiciona **novo registro** de valor (implementa imutabilidade).    |
| **Movimentos** | `POST` | `/simulations/:simId/movements`  | Cria uma nova movimentação (entrada/saída).                                    |
| **Seguros**    | `POST` | `/simulations/:simId/insurances` | Cria um registro de seguro (vida/invalidez).                                   |

## 🧪 Testes

Os testes são focados em garantir a lógica de negócio crítica.

### Executar Testes

<!-- Não incluido -->
