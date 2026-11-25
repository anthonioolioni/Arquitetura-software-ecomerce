import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatalogoApi, ProdutoResumo } from './catalogo.contrato';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { Produto } from './produto.entity';

// Implementação INTERNA do módulo. Ela implementa o contrato público (CatalogoApi)
// e também tem métodos usados só pelo controller do próprio módulo.
@Injectable()
export class CatalogoService implements CatalogoApi {
  constructor(
    @InjectRepository(Produto)
    private readonly produtos: Repository<Produto>,
  ) {}

  criar(dto: CriarProdutoDto): Promise<Produto> {
    const produto = this.produtos.create(dto);
    return this.produtos.save(produto);
  }

  listar(): Promise<Produto[]> {
    return this.produtos.find({ order: { id: 'ASC' } });
  }

  // --- método do contrato público ---
  async buscarPorId(produtoId: number): Promise<ProdutoResumo | null> {
    const p = await this.produtos.findOneBy({ id: produtoId });
    return p ? { id: p.id, nome: p.nome, preco: p.preco } : null;
  }
}