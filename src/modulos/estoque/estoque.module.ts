import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoModule } from '../catalogo/index';
import { EstoqueApi } from './estoque.contrato';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';
import { ItemEstoque } from './item-estoque.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemEstoque]),
    CatalogoModule, // para receber o CatalogoApi
  ],
  controllers: [EstoqueController],
  providers: [EstoqueService, { provide: EstoqueApi, useExisting: EstoqueService }],
  exports: [EstoqueApi],
})
export class EstoqueModule {}