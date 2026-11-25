import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatalogoService } from './catalogo.service.js';
import { CriarProdutoDto } from './dto/criar-produto.dto.js';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly catalogo: CatalogoService) {}

  // POST /produtos
  @Post()
  criar(@Body() dto: CriarProdutoDto) {
    return this.catalogo.criar(dto);
  }

  // GET /produtos
  @Get()
  listar() {
    return this.catalogo.listar();
  }
}