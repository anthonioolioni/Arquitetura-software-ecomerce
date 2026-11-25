import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { AtualizarEstoqueDto } from './dto/atualizar-estoque.dto';
import { EstoqueService } from './estoque.service';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoque: EstoqueService) {}

  // PATCH /estoque/:produtoId
  @Patch(':produtoId')
  atualizar(
    @Param('produtoId', ParseIntPipe) produtoId: number,
    @Body() dto: AtualizarEstoqueDto,
  ) {
    return this.estoque.definirQuantidade(produtoId, dto.quantidade);
  }
}