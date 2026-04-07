import { IsNotEmpty, IsNumber, IsPositive, IsUUID, Min } from 'class-validator';

export class PlaceBidDto {
  @IsUUID(4, { message: 'userId must be a valid UUIDv4' })
  @IsNotEmpty()
  userId: string;

  @IsNumber({ maxDecimalPlaces: 6 })
  @IsPositive()
  @Min(0.000001)
  amount: number;
}
