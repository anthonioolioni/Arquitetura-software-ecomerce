import { ValueTransformer } from 'typeorm';

// O PostgreSQL devolve colunas NUMERIC como string ("19.90").
// Este transformer converte para number ao ler e mantém number ao gravar.
export const decimalTransformer: ValueTransformer = {
  to: (valor?: number | null) => valor,
  from: (valor?: string | null) => (valor === null || valor === undefined ? valor : Number(valor)),
};