import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CatalogoApi } from '../catalogo/index';
import { EstoqueApi, EstoqueInsuficienteException } from './estoque.contrato';
import { ItemEstoque } from './item-estoque.entity';

@Injectable()
export class EstoqueService implements EstoqueApi {
  constructor(
    @InjectRepository(ItemEstoque)
    private readonly itens: Repository<ItemEstoque>,
    private readonly catalogo: CatalogoApi, // contrato público do Catálogo
  ) {}

  // PATCH /estoque/:produtoId -> define a quantidade em estoque do produto
  async definirQuantidade(produtoId: number, quantidade: number): Promise<ItemEstoque> {
    const produto = await this.catalogo.buscarPorId(produtoId);
    if (!produto) {
      throw new NotFoundException(`Produto ${produtoId} não existe no catálogo`);
    }
    // save() faz INSERT se não existir e UPDATE se já existir (produto_id é a chave)
    await this.itens.save({ produtoId, quantidade });
    return this.itens.findOneByOrFail({ produtoId });
  }

  // --- métodos do contrato público ---

  async reservar(produtoId: number, quantidade: number): Promise<void> {
    // UPDATE estoque.itens_estoque
    //    SET quantidade = quantidade - :qtd
    //  WHERE produto_id = :id AND quantidade >= :qtd
    // É UM comando só (atômico): dois pedidos ao mesmo tempo não conseguem
    // deixar o estoque negativo.
    const resultado = await this.itens.decrement(
      { produtoId, quantidade: MoreThanOrEqual(quantidade) },
      'quantidade',
      quantidade,
    );
    if (resultado.affected === 0) {
      throw new EstoqueInsuficienteException(produtoId);
    }
  }

  async devolver(produtoId: number, quantidade: number): Promise<void> {
    await this.itens.increment({ produtoId }, 'quantidade', quantidade);
  }
}