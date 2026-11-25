import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { decimalTransformer } from '../../compartilhado/decimal.transformer.js';

// Tabela própria do módulo Catálogo: schema "catalogo", tabela "produtos".
@Entity({ schema: 'catalogo', name: 'produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  nome: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, transformer: decimalTransformer })
  preco: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
}