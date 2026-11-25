import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoApi } from './catalogo.contrato';
import { CatalogoService } from './catalogo.service';
import { Produto } from './produto.entity';
import { ProdutosController } from './produtos.controller';

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