-- Executado pelo PostgreSQL apenas na PRIMEIRA vez que o volume é criado.
-- Um schema por módulo: cada módulo tem suas próprias tabelas.
CREATE SCHEMA IF NOT EXISTS catalogo;
CREATE SCHEMA IF NOT EXISTS estoque;
CREATE SCHEMA IF NOT EXISTS pedidos;