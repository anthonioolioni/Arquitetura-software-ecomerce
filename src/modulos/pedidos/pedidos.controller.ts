import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CriarPedidoDto } from './dto/criar-pedido.dto';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidos: PedidosService) {}

  // POST /pedidos
  @Post()
  criar(@Body() dto: CriarPedidoDto) {
    return this.pedidos.criar(dto);
  }

  // PATCH /pedidos/:id/cancelar
  @Patch(':id/cancelar')
  cancelar(@Param('id', ParseIntPipe) id: number) {
    return this.pedidos.cancelar(id);
  }
}