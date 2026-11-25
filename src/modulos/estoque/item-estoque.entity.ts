import { Check, Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// Tabela própria do módulo Estoque: schema "estoque", tabela "itens_estoque".
// produto_id NÃO é chave estrangeira para catalogo.produtos de propósito:
// módulos não se ligam pelo banco, só pelo contrato.
@Entity({ schema: 'estoque', name: 'itens_estoque' })
@Check('ck_quantidade_nao_negativa', '"quantidade" >= 0') // REGRA FORTE garantida também pelo banco
export class ItemEstoque {
  @PrimaryColumn({ name: 'produto_id' })
  produtoId: number;

  @Column({ type: 'int', default: 0 })
  quantidade: number;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}