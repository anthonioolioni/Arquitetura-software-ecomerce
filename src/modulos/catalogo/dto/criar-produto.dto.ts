import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';

export class CriarProdutoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  preco: number;
}