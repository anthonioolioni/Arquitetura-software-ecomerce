import { IsInt, Min } from 'class-validator';

export class AtualizarEstoqueDto {
  @IsInt()
  @Min(0) // não aceita quantidade negativa já na entrada
  quantidade: number;
}