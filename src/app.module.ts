import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoModule } from './modulos/catalogo/index';
import { EstoqueModule } from './modulos/estoque/index';
import { PedidosModule } from './modulos/pedidos/pedidos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5433),
      username: process.env.DB_USER ?? 'ecommerce',
      password: process.env.DB_PASSWORD ?? 'ecommerce',
      database: process.env.DB_NAME ?? 'ecommerce',
      autoLoadEntities: true, // pega as entidades registradas com forFeature() em cada módulo
      synchronize: true, // cria/atualiza as tabelas a partir das entidades (ok para o trabalho)
    }),
    CatalogoModule,
    EstoqueModule,
    PedidosModule,
  ],
})
export class AppModule {}