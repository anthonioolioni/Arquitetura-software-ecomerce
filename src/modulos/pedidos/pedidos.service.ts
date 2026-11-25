import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogoApi } from '../catalogo/index';
import { EstoqueApi } from '../estoque/index';
import { CriarPedidoDto } from './dto/criar-pedido.dto';
import { ItemPedido } from './item-pedido.entity';
import { Pedido, StatusPedido } from './pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidos: Repository<Pedido>,
    private readonly catalogo: CatalogoApi, // contrato do Catálogo
    private readonly estoque: EstoqueApi, // contrato do Estoque
  ) {}

  async criar(dto: CriarPedidoDto): Promise<Pedido> {
    // 1) Consulta o Catálogo: o produto existe? qual o preço?
    const itens: ItemPedido[] = [];
    for (const item of dto.itens) {
      const produto = await this.catalogo.buscarPorId(item.produtoId);
      if (!produto) {
        throw new NotFoundException(`Produto ${item.produtoId} não existe no catálogo`);
      }
      const itemPedido = new ItemPedido();
      itemPedido.produtoId = produto.id;
      itemPedido.quantidade = item.quantidade;
      itemPedido.precoUnitario = produto.preco;
      itens.push(itemPedido);
    }

    // 2) Reserva no Estoque, item por item.
    //    Se um item falhar, devolvemos o que já tinha sido reservado (compensação)
    //    e o pedido é recusado.
    const reservados: ItemPedido[] = [];
    try {
      for (const item of itens) {
        await this.estoque.reservar(item.produtoId, item.quantidade);
        reservados.push(item);
      }

      // 3) Tudo reservado: grava o pedido (e os itens, por causa do cascade).
      const pedido = this.pedidos.create({
        status: StatusPedido.CONFIRMADO,
        total: this.calcularTotal(itens),
        itens,
      });
      return await this.pedidos.save(pedido);
    } catch (erro) {
      for (const item of reservados) {
        await this.estoque.devolver(item.produtoId, item.quantidade);
      }
      throw erro;
    }
  }

  async cancelar(id: number): Promise<Pedido> {
    const pedido = await this.pedidos.findOne({ where: { id }, relations: { itens: true } });
    if (!pedido) {
      throw new NotFoundException(`Pedido ${id} não encontrado`);
    }

    // UPDATE ... WHERE id = :id AND status = 'CONFIRMADO'
    // Atômico: se duas requisições cancelarem ao mesmo tempo, só uma devolve o estoque.
    const resultado = await this.pedidos.update(
      { id, status: StatusPedido.CONFIRMADO },
      { status: StatusPedido.CANCELADO },
    );
    if (resultado.affected === 0) {
      throw new ConflictException(`Pedido ${id} já está cancelado`);
    }

    // Contrato: cancelar devolve o estoque
    for (const item of pedido.itens) {
      await this.estoque.devolver(item.produtoId, item.quantidade);
    }

    pedido.status = StatusPedido.CANCELADO;
    return pedido;
  }

  private calcularTotal(itens: ItemPedido[]): number {
    const totalEmCentavos = itens.reduce(
      (soma, i) => soma + Math.round(i.precoUnitario * 100) * i.quantidade,
      0,
    );
    return totalEmCentavos / 100;
  }
}