import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID, Min } from 'class-validator';

export class PlaceBidDto {
  @ApiProperty({
    description: 'UUIDv4 representing the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID(4, { message: 'userId must be a valid UUIDv4' })
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ description: 'The bid amount', example: 10.5 })
  @IsNumber({ maxDecimalPlaces: 6 })
  @IsPositive()
  @Min(0.000001)
  amount!: number;
}
