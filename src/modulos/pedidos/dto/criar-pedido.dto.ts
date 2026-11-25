import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, IsPositive, ValidateNested } from 'class-validator';

export class ItemPedidoDto {
  @IsInt()
  @IsPositive()
  produtoId: number;

  @IsInt()
  @IsPositive()
  quantidade: number;
}

export class CriarPedidoDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto) // diz ao class-transformer qual classe usar em cada item
  itens: ItemPedidoDto[];
}