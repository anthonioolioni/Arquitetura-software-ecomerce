import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoModule } from '../catalogo/index';
import { EstoqueModule } from '../estoque/index';
import { ItemPedido } from './item-pedido.entity';
import { Pedido } from './pedido.entity';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, ItemPedido]),
    CatalogoModule, // fornece CatalogoApi
    EstoqueModule, // fornece EstoqueApi
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  // Pedidos não exporta nada: nenhum outro módulo depende dele (ainda).
})
export class PedidosModule {}