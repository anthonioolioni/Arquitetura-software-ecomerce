import { ConflictException } from '@nestjs/common';

// CONTRATO PÚBLICO do módulo Estoque.
export abstract class EstoqueApi {
  /**
   * Retira `quantidade` unidades do estoque do produto.
   * Lança EstoqueInsuficienteException se não houver quantidade suficiente.
   */
  abstract reservar(produtoId: number, quantidade: number): Promise<void>;

  /** Devolve `quantidade` unidades ao estoque do produto (usado no cancelamento). */
  abstract devolver(produtoId: number, quantidade: number): Promise<void>;
}

// Erro que faz parte do contrato: quem chama reservar() precisa saber que ele existe.
// Estende ConflictException, então vira HTTP 409 automaticamente.
export class EstoqueInsuficienteException extends ConflictException {
  constructor(produtoId: number) {
    super(`Estoque insuficiente para o produto ${produtoId}`);
  }
}