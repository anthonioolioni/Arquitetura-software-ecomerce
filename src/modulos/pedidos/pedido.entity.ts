import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { decimalTransformer } from '../../compartilhado/decimal.transformer';
import { ItemPedido } from './item-pedido.entity';

export enum StatusPedido {
  CONFIRMADO = 'CONFIRMADO',
  CANCELADO = 'CANCELADO',
}

@Entity({ schema: 'pedidos', name: 'pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, default: StatusPedido.CONFIRMADO })
  status: StatusPedido;

  @Column({ type: 'numeric', precision: 12, scale: 2, transformer: decimalTransformer })
  total: number;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  // cascade: ao salvar o pedido, os itens são salvos junto
  @OneToMany(() => ItemPedido, (item) => item.pedido, { cascade: true })
  itens: Relation<ItemPedido>[];
}