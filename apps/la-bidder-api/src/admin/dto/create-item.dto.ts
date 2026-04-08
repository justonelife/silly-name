import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'The title of the auction item',
    example: 'Vintage Chair',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'The name of the creator or seller',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  creator!: string;

  @ApiPropertyOptional({
    description: 'Detailed description',
    example: 'A lovely vintage chair from 1980.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'URL to an image of the item',
    example: 'https://example.com/chair.jpg',
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'Categorization tags',
    type: [String],
    example: ['furniture', 'vintage'],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  @IsOptional()
  tags?: string[];

  @ApiProperty({ description: 'Starting bid price', example: 10.0 })
  @IsNumber({ maxDecimalPlaces: 6 })
  @IsPositive()
  startingPrice!: number;

  @ApiProperty({
    description: 'Duration of the auction in hours',
    example: 24,
    minimum: 1,
    maximum: 720,
  })
  @IsNumber()
  @Min(1)
  @Max(720)
  auctionDurationHours!: number;
}
