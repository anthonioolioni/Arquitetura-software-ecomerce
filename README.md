# E-commerce com controle de estoque — Monolito Modular (NestJS)

Trabalho de Arquitetura de Software · Prof. Maikon Bueno · 2026/2

## Módulos

| Módulo   | Entidades             | Schema no banco | Contrato público                           |
|----------|-----------------------|-----------------|--------------------------------------------|
| Catálogo | Produto               | `catalogo`      | `CatalogoApi.buscarPorId(produtoId)`       |
| Estoque  | ItemEstoque           | `estoque`       | `EstoqueApi.reservar()` / `devolver()`     |
| Pedidos  | Pedido, ItemPedido    | `pedidos`       | — (só consome os outros)                   |

Dependências: `Pedidos → Catálogo`, `Pedidos → Estoque`, `Estoque → Catálogo` (sem ciclos).

## Rotas

- `POST /produtos`
- `GET /produtos`
- `PATCH /estoque/:produtoId`
- `POST /pedidos`
- `PATCH /pedidos/:id/cancelar`

## Como rodar

```bash
docker compose up --build
```

API em http://localhost:3000. Exemplos de requisições em `requests.http`.

Para zerar o banco: `docker compose down -v`.

## Desenvolvimento local

```bash
docker compose up -d db
npm install
npm run start:dev
```