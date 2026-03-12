import { IsInt, IsUUID } from 'class-validator';

export class AdjustInventoryDto {
  @IsInt()
  quantityToAdjust: number; // can be negative or positive

  @IsUUID()
  inventoryId: string;
}

export class ReserveInventoryDto {
  @IsInt()
  quantityToReserve: number; // must be positive
}
