// CONTRATO PÚBLICO do módulo Catálogo.
// É a única coisa que os outros módulos podem usar do Catálogo.
// A classe abstrata serve ao mesmo tempo como "interface" e como token de injeção do Nest.

export interface ProdutoResumo {
  id: number;
  nome: string;
  preco: number;
}

export abstract class CatalogoApi {
  /** Retorna o produto ou null se ele não existir. */
  abstract buscarPorId(produtoId: number): Promise<ProdutoResumo | null>;
}