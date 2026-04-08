import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlaceBidDto } from './dto/place-bid.dto';
import { ItemsService } from './items.service';
@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all items with pagination' })
  @ApiQuery({ name: 'page', required: false, type: String, example: '1' })
  @ApiQuery({ name: 'limit', required: false, type: String, example: '10' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of paginated items retrieved successfully.',
  })
  findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.itemsService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific item by its ID' })
  @ApiParam({ name: 'id', description: 'UUID of the item', type: String })
  @ApiResponse({ status: HttpStatus.OK, description: 'Item found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item not found' })
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Get(':id/bids')
  @ApiOperation({ summary: 'Get bids for a specific item' })
  @ApiParam({ name: 'id', description: 'UUID of the item', type: String })
  @ApiQuery({ name: 'page', required: false, type: String, example: '1' })
  @ApiQuery({ name: 'limit', required: false, type: String, example: '10' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of paginated bids for the item.',
  })
  findBids(
    @Param('id') id: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10'
  ) {
    return this.itemsService.findBids(id, Number(page), Number(limit));
  }

  @Post(':id/bids')
  @ApiOperation({ summary: 'Place a bid on a specific item' })
  @ApiParam({ name: 'id', description: 'UUID of the item', type: String })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Bid placed successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed or item ended.',
  })
  placeBid(@Param('id') id: string, @Body() dto: PlaceBidDto) {
    return this.itemsService.placeBid(id, dto);
  }
}
