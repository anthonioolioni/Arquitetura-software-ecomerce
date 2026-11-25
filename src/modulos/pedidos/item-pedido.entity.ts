import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';
import { decimalTransformer } from '../../compartilhado/decimal.transformer';
import { Pedido } from './pedido.entity';

@Entity({ schema: 'pedidos', name: 'itens_pedido' })
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: number;

  // FK DENTRO do mesmo módulo (pedidos -> pedidos): permitido.
  @ManyToOne(() => Pedido, (pedido) => pedido.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pedido_id' })
  pedido: Relation<Pedido>;

  // Referência a OUTRO módulo: só guardamos o id, sem FK.
  @Column({ name: 'produto_id' })
  produtoId: number;

  @Column({ type: 'int' })
  quantidade: number;

  // Copiamos o preço do momento da compra (se o preço mudar depois, o pedido não muda).
  @Column({
    name: 'preco_unitario',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: decimalTransformer,
  })
  precoUnitario: number;
}