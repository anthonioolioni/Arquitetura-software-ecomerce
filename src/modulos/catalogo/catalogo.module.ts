import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoApi } from './catalogo.contrato.js';
import { CatalogoService } from './catalogo.service.js';
import { Produto } from './produto.entity.js';
import { ProdutosController } from './produtos.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])], // só este módulo acessa a tabela de produtos
  controllers: [ProdutosController],
  providers: [
    CatalogoService,
    // Quem pedir CatalogoApi recebe a mesma instância de CatalogoService.
    { provide: CatalogoApi, useExisting: CatalogoService },
  ],
  exports: [CatalogoApi], // SÓ o contrato sai do módulo (o service e o repositório ficam escondidos)
})
export class CatalogoModule {}